import React, { useState, useEffect } from 'react';
import { useVisualEditor } from '../../../context/VisualEditorContext';
import { getBlock } from './SectionRegistry';
import { EditWrapper } from './EditWrapper';

export const VisualPageRenderer = ({ customSections }: { customSections?: any[] }) => {
    const { editMode, contentData, slug, syncSections, selectedSectionId, setSelectedSectionId } = useVisualEditor();

    // Dynamic sections from JSON content or custom fallback
    const sections = (contentData?.sections && contentData.sections.length > 0) 
        ? contentData.sections 
        : (customSections || []);

    // Listen for messages from Admin (e.g., Select Section)
    useEffect(() => {
        // Hydrate context with initial sections if empty
        if (sections && sections.length > 0 && (!contentData.sections || contentData.sections.length === 0)) {
            syncSections(sections);
        }

        // Signal to parent that we are ready and provide current sections (especially for hardcoded pages like About)
        if (sections && sections.length > 0) {
            window.parent.postMessage({ 
                type: 'VISUAL_EDIT_SYNC_SECTIONS', 
                sections,
                slug
            }, '*');
        }

        const handleMessage = (event: MessageEvent) => {
            if (!event.data) return;
            const { type, sectionId } = event.data;
            if (type === 'VISUAL_EDIT_SELECT_SECTION') {
                setSelectedSectionId(sectionId);
                const el = document.getElementById(`section-${sectionId}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleSectionSelect = (id: string, type: string) => {
        setSelectedSectionId(id);
        
        // Notify the Admin (parent window) that a section was selected in the preview
        window.parent.postMessage({
            type: 'VISUAL_EDIT_SECTION_SELECTED',
            sectionId: id,
            sectionType: type,
            slug
        }, '*');
    };

    const handleRemoveSection = (sectionId: string) => {
        window.parent.postMessage({
            type: 'VISUAL_EDIT_REMOVE_SECTION',
            sectionId
        }, '*');
    };

    if (!sections || sections.length === 0) {
        return (
            <div className="py-20 text-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg m-8">
                <p className="text-muted-foreground">This page is empty. Start adding sections!</p>
            </div>
        );
    }

    return (
        <div className="page-builder-canvas space-y-0">
            {sections.map((section: any, index: number) => {
                const blockDef = getBlock(section.type);
                if (!blockDef) {
                    return (
                        <div key={section.id || index} className="p-4 bg-red-50 text-red-600 border border-red-200">
                            Error: Unknown block type "{section.type}"
                        </div>
                    );
                }

                const Component = blockDef.component;
                const sectionId = section.id;

                // Wrap in a standard section container
                const content = (
                    <section id={`section-${sectionId}`} className="visual-builder-section">
                        <Component sectionId={sectionId} {...section.props} />
                    </section>
                );

                if (editMode) {
                    return (
                        <EditWrapper 
                            key={sectionId} 
                            id={sectionId} 
                            type={section.type}
                            isSelected={selectedSectionId === sectionId}
                            onSelect={(id) => handleSectionSelect(id, section.type)}
                            onDelete={handleRemoveSection}
                        >
                            {content}
                        </EditWrapper>
                    );
                }

                return (
                    <React.Fragment key={sectionId}>
                        {content}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
