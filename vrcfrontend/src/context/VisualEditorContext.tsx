import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabase';
import { registerAllBlocks } from '../components/sections';
import { getBlock } from '../components/admin/builder/SectionRegistry';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface VisualEditorContextType {
  editMode: boolean;
  contentData: any;
  updateField: (fieldKey: string, value: string) => void;
  updateSectionProps: (id: string, newProps: any) => void;
  addSection: (type: string, index?: number) => void;
  removeSection: (id: string) => void;
  reorderSections: (newSections: any[]) => void;
  moveSection: (id: string, direction: 'up' | 'down') => void;
  syncSections: (sections: any[]) => void;
  selectedSectionId: string | null;
  setSelectedSectionId: (id: string | null) => void;
  requestImageChange: (fieldKey: string) => void;
  forceSync: () => void;
  isLoading: boolean;
  isPageActive: boolean;
  slug: string;
}

const VisualEditorContext = createContext<VisualEditorContextType>({
  editMode: false,
  contentData: {},
  updateField: () => {},
  updateSectionProps: () => {},
  addSection: () => {},
  removeSection: () => {},
  reorderSections: () => {},
  moveSection: () => {},
  syncSections: () => {},
  selectedSectionId: null,
  setSelectedSectionId: () => {},
  requestImageChange: () => {},
  forceSync: () => {},
  isLoading: false,
  isPageActive: true,
  slug: '',
});

export const useVisualEditor = () => useContext(VisualEditorContext);

interface VisualEditorProviderProps {
  children: ReactNode;
  slug?: string;
}

export const VisualEditorProvider = ({ children, slug = '' }: VisualEditorProviderProps) => {
  const { i18n } = useTranslation();
  const [editMode, setEditMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('edit_mode') === 'true';
    }
    return false;
  });
  const [contentData, setContentData] = useState<any>({});
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageActive, setIsPageActive] = useState(true);

  const isUpdatingFromParent = React.useRef(false);
  const lastLocalUpdateAt = React.useRef(0);
  const lastSentTimestamp = React.useRef(0);
  const syncTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Initialize blocks
  useEffect(() => {
    registerAllBlocks();
  }, []);

  const syncWithParent = React.useCallback((data: any) => {
    if (!editMode || window.parent === window) return;
    
    // Ensure we send sections in the format parent expects
    const sectionsToSend = data.sections || [];
    const currentLang = i18n.language?.split('-')[0] || 'vi';
    
    // Update our local timestamp
    const timestamp = Date.now();
    lastLocalUpdateAt.current = timestamp;
    lastSentTimestamp.current = timestamp;

    console.log('[VisualEditor Child] Syncing to parent:', sectionsToSend.length, 'sections', 'TS:', timestamp);
    
    // Send sections at TOP LEVEL so parent can read data.sections directly
    window.parent.postMessage(
      {
        type: 'VISUAL_EDIT_UPDATE',
        slug,
        sections: sectionsToSend,
        language: currentLang,
        source: 'visual-editor-child',
        lastUpdated: timestamp
      },
      '*'
    );
  }, [slug, editMode, i18n.language]);

  // Notify parent of language changes
  useEffect(() => {
    if (editMode && window.parent !== window) {
      const currentLang = i18n.language?.split('-')[0] || 'vi';
      window.parent.postMessage({
        type: 'VISUAL_EDIT_LANGUAGE_CHANGED',
        language: currentLang,
        slug
      }, '*');
    }
  }, [i18n.language, editMode, slug]);

  // Synchronize state with parent whenever contentData changes
  useEffect(() => {
    if (!editMode || window.parent === window) return;
    if (Object.keys(contentData).length === 0) return;

    // Only sync if we have local changes NEWER than what we last sent
    if (lastLocalUpdateAt.current <= lastSentTimestamp.current) {
      return;
    }

    // Debounce sync
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    
    syncTimeoutRef.current = setTimeout(() => {
      syncWithParent(contentData);
    }, 50);

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [contentData, editMode, syncWithParent]);

  // Handle updates from EditableElement (Legacy/Simple)
  const updateField = React.useCallback((fieldKey: string, value: string) => {
    if (!editMode) return;
    
    lastLocalUpdateAt.current = Date.now();
    setContentData((prev: any) => ({ ...prev, [fieldKey]: value }));
  }, [editMode]);

  // Builder Methods
  const addSection = React.useCallback((type: string, index?: number) => {
    if (!editMode) return;
    const blockDef = getBlock(type);
    if (!blockDef) return;

    const newSection = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      props: { ...blockDef.defaultProps }
    };

    setContentData((prev: any) => {
      const sections = [...(prev.sections || [])];
      if (typeof index === 'number') {
        sections.splice(index, 0, newSection);
      } else {
        sections.push(newSection);
      }
      return { ...prev, sections };
    });
  }, [editMode]);

  const removeSection = React.useCallback((id: string) => {
    if (!editMode) return;
    setContentData((prev: any) => {
      const sections = (prev.sections || []).filter((s: any) => s.id !== id);
      return { ...prev, sections };
    });
  }, [editMode]);

  const reorderSections = React.useCallback((newSections: any[]) => {
    if (!editMode) return;
    setContentData((prev: any) => ({ ...prev, sections: newSections }));
  }, [editMode]);

  const moveSection = React.useCallback((id: string, direction: 'up' | 'down') => {
    if (!editMode) return;
    setContentData((prev: any) => {
      const sections = [...(prev.sections || [])];
      const index = sections.findIndex((s: any) => s.id === id);
      if (index === -1) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= sections.length) return prev;

      // Swap
      [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];

      return { ...prev, sections };
    });
  }, [editMode]);

  const syncSections = React.useCallback((sections: any[]) => {
    setContentData((prev: any) => {
      // Only initialize if context doesn't have sections yet
      if (!prev.sections || prev.sections.length === 0) {
        const sectionsWithIds = sections.map((s: any, idx: number) => ({
          ...s,
          id: s.id || `sec_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 4)}`
        }));
        console.log('[VisualEditorContext] Hydrating context with sections:', sectionsWithIds.length);
        return { ...prev, sections: sectionsWithIds };
      }
      return prev;
    });
  }, []);

  const updateSectionProps = React.useCallback((id: string, newProps: any) => {
    lastLocalUpdateAt.current = Date.now();
    setContentData((prev: any) => {
      const newSections = (prev.sections || []).map((s: any) => 
        s.id === id ? { ...s, props: { ...s.props, ...newProps } } : s
      );
      return { ...prev, sections: newSections };
    });
  }, []);

  // Keep a ref for the latest contentData to avoid stale closures
  const contentDataRef = React.useRef(contentData);
  useEffect(() => {
    contentDataRef.current = contentData;
  }, [contentData]);

  const forceSync = React.useCallback(() => {
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncWithParent(contentDataRef.current);
  }, [syncWithParent]);

  // Handle image pick requests
  const requestImageChange = React.useCallback((fieldKey: string) => {
    if (!editMode) return;
    
    window.parent.postMessage({
      type: 'VISUAL_EDIT_PICK_IMAGE',
      fieldKey,
      sectionId: selectedSectionId,
      slug
    }, '*');
  }, [editMode, slug, selectedSectionId]);



  // Listen for messages from Admin
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, fieldKey, imageUrl, sectionId, props, blockType, index, direction, sections } = event.data;
      
      switch (type) {
        case 'VISUAL_EDIT_UPDATE_DATA':
          const incomingLastUpdated = event.data.lastUpdated || 0;
          const isFromParent = event.data.source === 'visual-editor-parent';
          
          // Only filter by timestamp if it's NOT from the parent (to allow Right Panel edits to win)
          // Or if it IS from parent, still check timestamp but be more lenient if needed
          if (!isFromParent && incomingLastUpdated > 0 && incomingLastUpdated < lastLocalUpdateAt.current) {
            console.log('[VisualEditor Child] Ignoring STALE update (Local is newer)', {
              incoming: incomingLastUpdated,
              local: lastLocalUpdateAt.current
            });
            return;
          }

          if (sections) {
            console.log('[VisualEditorContext] Updating data from parent:', sections.length, 'TS:', incomingLastUpdated, 'FromParent:', isFromParent);
            isUpdatingFromParent.current = true;
            lastLocalUpdateAt.current = Math.max(lastLocalUpdateAt.current, incomingLastUpdated);
            lastSentTimestamp.current = Math.max(lastSentTimestamp.current, incomingLastUpdated); 

            
            // Auto-hydrate: fill empty props with block defaultProps
            const hydratedSections = sections.map((s: any) => {
              const blockDef = getBlock(s.type);
              if (!blockDef) return s;
              
              const hydratedProps = { ...(blockDef.defaultProps || {}), ...(s.props || {}) };
              return { ...s, props: hydratedProps };
            });
            
            // Check if hydration actually changed anything
            const hasChanges = hydratedSections.some((hs: any, i: number) => {
              const origProps = sections[i]?.props || {};
              return Object.keys(hs.props || {}).length > Object.keys(origProps).length;
            });
            
            setContentData((prev: any) => ({ ...prev, sections: hydratedSections }));
            
            // If hydration added new props, sync back to parent after a short delay
            if (hasChanges && window.parent !== window) {
              const timestamp = Date.now();
              lastLocalUpdateAt.current = timestamp;
              
              setTimeout(() => {
                window.parent.postMessage({
                  type: 'VISUAL_EDIT_UPDATE',
                  slug,
                  sections: hydratedSections,
                  language: i18n.language?.split('-')[0] || 'vi',
                  lastUpdated: timestamp,
                  source: 'visual-editor-child'
                }, '*');
              }, 200);
            }
          }
          break;
        case 'VISUAL_EDIT_CHANGE_LANGUAGE':
          if (event.data.language && i18n.language !== event.data.language) {
            console.log('[VisualEditorContext] Changing language from parent:', event.data.language);
            i18n.changeLanguage(event.data.language);
          }
          break;
        case 'VISUAL_EDIT_IMAGE_SELECTED':
          if (sectionId) {
            updateSectionProps(sectionId, { [fieldKey]: imageUrl });
          } else {
            updateField(fieldKey, imageUrl);
          }
          break;
        case 'VISUAL_EDIT_ADD_SECTION':
          addSection(blockType, index);
          break;
        case 'VISUAL_EDIT_REMOVE_SECTION':
          removeSection(sectionId);
          break;
        case 'VISUAL_EDIT_UPDATE_SECTION_PROPS':
          updateSectionProps(sectionId, props);
          break;
        case 'VISUAL_EDIT_REORDER_SECTIONS':
          if (direction) {
            moveSection(sectionId, direction);
          } else if (sections) {
            reorderSections(sections);
          }
          break;
        case 'VISUAL_EDIT_SELECT_SECTION':
          setSelectedSectionId(sectionId);
          break;
        case 'VISUAL_EDIT_CHANGE_LANGUAGE':
          if (event.data.lng) {
            console.log('[VisualEditorContext] Changing language to:', event.data.lng);
            i18n.changeLanguage(event.data.lng);
          }
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [updateField, addSection, removeSection, updateSectionProps, reorderSections, moveSection]);

  // Fetch initial content
  useEffect(() => {
    const fetchContent = async () => {
      // If in editMode, we wait for parent to push initial data
      if (editMode) {
        console.log('[VisualEditor Child] In edit_mode, skipping internal fetch, waiting for parent.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('static_pages')
          .select('content, is_active')
          .eq('slug', slug)
          .single();

        if (data) {
          setIsPageActive(data.is_active ?? true);
          if (data.content) {
            try {
              const parsed = JSON.parse(data.content);
              setContentData(parsed);
            } catch (e) {
              console.log('Content is not JSON. Starting with empty visual data.');
              setContentData({});
            }
          }
        }
      } catch (err) {
        console.error('Failed to load content', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [slug, editMode]);

  // Handle signalling Readiness to Admin
  useEffect(() => {
    if (editMode && !isLoading) {
      console.log('[VisualEditor Child] Signalling READY to parent for slug:', slug);
      window.parent.postMessage({ type: 'VISUAL_EDIT_READY', slug }, '*');
      
      // Also request initial data sync just in case
      window.parent.postMessage({ type: 'VISUAL_EDIT_SYNC_REQUEST', slug }, '*');
    }
  }, [editMode, isLoading, slug]);

  // Sync language changes back to parent
  useEffect(() => {
    if (!editMode || window.parent === window) return;
    
    const handleLangChange = (lng: string) => {
      const normalizedLang = lng.split('-')[0];
      console.log('[VisualEditor Child] Language changed to:', normalizedLang, 'notifying parent.');
      window.parent.postMessage({
        type: 'VISUAL_EDIT_LANGUAGE_CHANGED',
        language: normalizedLang
      }, '*');
    };

    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, [editMode, i18n]);

  return (
    <VisualEditorContext.Provider value={{ 
      editMode, contentData, updateField, updateSectionProps, 
      addSection, removeSection, reorderSections, moveSection, syncSections,
      selectedSectionId, setSelectedSectionId,
      requestImageChange, forceSync, isLoading, isPageActive, slug 
    }}>
      {children}
    </VisualEditorContext.Provider>
  );
};
