import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabase';

interface VisualEditorContextType {
  editMode: boolean;
  contentData: Record<string, string>;
  updateField: (fieldKey: string, value: string) => void;
  requestImageChange: (fieldKey: string) => void;
  isLoading: boolean;
}

const VisualEditorContext = createContext<VisualEditorContextType>({
  editMode: false,
  contentData: {},
  updateField: () => {},
  requestImageChange: () => {},
  isLoading: false,
});

export const useVisualEditor = () => useContext(VisualEditorContext);

interface VisualEditorProviderProps {
  children: ReactNode;
  slug: string;
}

export const VisualEditorProvider = ({ children, slug }: VisualEditorProviderProps) => {
  const [editMode, setEditMode] = useState(false);
  const [contentData, setContentData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Check URL params for edit_mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit_mode') === 'true') {
      setEditMode(true);
    }
  }, []);

  // Listen for messages from Admin (Image Selected)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, fieldKey, imageUrl } = event.data;
      if (type === 'VISUAL_EDIT_IMAGE_SELECTED') {
        updateField(fieldKey, imageUrl);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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

  // Handle updates from EditableElement
  const updateField = (fieldKey: string, value: string) => {
    if (!editMode) return;
    
    setContentData((prev) => {
      const newData = { ...prev, [fieldKey]: value };
      
      // Notify the parent iframe (Admin Dashboard)
      window.parent.postMessage(
        {
          type: 'VISUAL_EDIT_UPDATE',
          slug,
          data: newData,
        },
        '*' // Make sure Admin dashboard origin is used in production
      );
      
      return newData;
    });
  };

  // Handle image pick requests
  const requestImageChange = (fieldKey: string) => {
    if (!editMode) return;
    
    window.parent.postMessage({
      type: 'VISUAL_EDIT_PICK_IMAGE',
      fieldKey,
      slug
    }, '*');
  };

  return (
    <VisualEditorContext.Provider value={{ editMode, contentData, updateField, requestImageChange, isLoading }}>
      {children}
    </VisualEditorContext.Provider>
  );
};
