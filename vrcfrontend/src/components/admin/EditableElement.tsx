import React, { useRef, useEffect } from 'react';
import { useVisualEditor } from '../../context/VisualEditorContext';

interface EditableElementProps {
  fieldKey: string;
  defaultText: string;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
}

export const EditableElement = ({
  fieldKey,
  defaultText,
  className = '',
  tagName = 'span',
}: EditableElementProps) => {
  const { editMode, contentData, updateField } = useVisualEditor();
  const Tag = tagName as any;
  const contentRef = useRef<HTMLElement>(null);

  // Determine current text
  const currentText = contentData[fieldKey] !== undefined ? contentData[fieldKey] : defaultText;

  // Sync ref when not in focus to avoid jumping cursor, but we don't strictly need two-way binding inside the editable 
  // since it manages its own DOM until blur.
  useEffect(() => {
    if (contentRef.current && contentRef.current.textContent !== currentText) {
      // Only set text if it's actually different to avoid interrupting typing
      contentRef.current.textContent = currentText;
    }
  }, [currentText]);

  if (!editMode) {
    return <Tag className={className}>{currentText}</Tag>;
  }

  return (
    <Tag
      ref={contentRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const newText = e.currentTarget.textContent || '';
        updateField(fieldKey, newText);
      }}
      className={`outline-dashed outline-1 outline-blue-400 hover:outline-2 hover:bg-blue-50/50 transition-all cursor-text min-w-[20px] inline-block ${className}`}
    >
      {currentText}
    </Tag>
  );
};
