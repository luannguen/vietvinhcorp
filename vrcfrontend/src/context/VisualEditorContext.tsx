import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabase';
import { registerAllBlocks } from '../components/sections';
import { getBlock } from '../components/admin/builder/SectionRegistry';

interface VisualEditorContextType {
  editMode: boolean;
  contentData: any;
  updateField: (fieldKey: string, value: string) => void;
  updateSectionProps: (id: string, newProps: any) => void;
  addSection: (type: string, index?: number) => void;
  removeSection: (id: string) => void;
  reorderSections: (newSections: any[]) => void;
  moveSection: (id: string, direction: 'up' | 'down') => void;
  selectedSectionId: string | null;
  setSelectedSectionId: (id: string | null) => void;
  requestImageChange: (fieldKey: string) => void;
  isLoading: boolean;
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
  selectedSectionId: null,
  setSelectedSectionId: () => {},
  requestImageChange: () => {},
  isLoading: false,
  slug: '',
});

export const useVisualEditor = () => useContext(VisualEditorContext);

interface VisualEditorProviderProps {
  children: ReactNode;
  slug: string;
}

export const VisualEditorProvider = ({ children, slug }: VisualEditorProviderProps) => {
  const [editMode, setEditMode] = useState(false);
  const [contentData, setContentData] = useState<any>({});
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize blocks
  useEffect(() => {
    registerAllBlocks();
  }, []);

  const syncWithParent = React.useCallback((newData: any) => {
    window.parent.postMessage(
      {
        type: 'VISUAL_EDIT_UPDATE',
        slug,
        data: newData,
      },
      '*'
    );
  }, [slug]);

  // Handle updates from EditableElement (Legacy/Simple)
  const updateField = React.useCallback((fieldKey: string, value: string) => {
    if (!editMode) return;
    
    setContentData((prev: any) => {
      const newData = { ...prev, [fieldKey]: value };
      syncWithParent(newData);
      return newData;
    });
  }, [editMode, syncWithParent]);

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
      const newData = { ...prev, sections };
      syncWithParent(newData);
      return newData;
    });
  }, [editMode, syncWithParent]);

  const removeSection = React.useCallback((id: string) => {
    if (!editMode) return;
    setContentData((prev: any) => {
      const sections = (prev.sections || []).filter((s: any) => s.id !== id);
      const newData = { ...prev, sections };
      syncWithParent(newData);
      return newData;
    });
  }, [editMode, syncWithParent]);

  const reorderSections = React.useCallback((newSections: any[]) => {
    if (!editMode) return;
    setContentData((prev: any) => {
      const newData = { ...prev, sections: newSections };
      syncWithParent(newData);
      return newData;
    });
  }, [editMode, syncWithParent]);

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

      const newData = { ...prev, sections };
      syncWithParent(newData);
      return newData;
    });
  }, [editMode, syncWithParent]);

  const updateSectionProps = React.useCallback((id: string, newProps: any) => {
    if (!editMode) return;
    setContentData((prev: any) => {
      const sections = (prev.sections || []).map((s: any) => 
        s.id === id ? { ...s, props: { ...s.props, ...newProps } } : s
      );
      const newData = { ...prev, sections };
      syncWithParent(newData);
      return newData;
    });
  }, [editMode, syncWithParent]);

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

  // Check URL params for edit_mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit_mode') === 'true') {
      setEditMode(true);
    }
  }, []);

  // Listen for messages from Admin
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, fieldKey, imageUrl, sectionId, props, blockType, index, direction, sections } = event.data;
      
      switch (type) {
        case 'VISUAL_EDIT_UPDATE_DATA':
          if (sections) {
            setContentData((prev: any) => ({ ...prev, sections }));
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
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [updateField, addSection, removeSection, updateSectionProps, reorderSections, moveSection]);

  // Fetch initial content
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('static_pages')
          .select('content')
          .eq('slug', slug)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching visual editor content:', error);
        }

        if (data && data.content) {
          try {
             // We try to parse content as JSON. If it fails, maybe it was normal HTML.
            const parsed = JSON.parse(data.content);
            setContentData(parsed);
          } catch (e) {
            console.log('Content is not JSON. Starting with empty visual data.');
            setContentData({});
          }
        }
      } catch (err) {
        console.error('Failed to load content', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  return (
    <VisualEditorContext.Provider value={{ 
      editMode, contentData, updateField, updateSectionProps, 
      addSection, removeSection, reorderSections, moveSection,
      selectedSectionId, setSelectedSectionId,
      requestImageChange, isLoading, slug 
    }}>
      {children}
    </VisualEditorContext.Provider>
  );
};
