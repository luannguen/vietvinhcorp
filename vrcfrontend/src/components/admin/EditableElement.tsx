import React, { useRef, useEffect } from 'react';
import { useVisualEditor } from '../../context/VisualEditorContext';

interface EditableElementProps {
  fieldKey: string;
  defaultContent: string;
  type?: 'text' | 'image';
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export const EditableElement = ({
  fieldKey,
  defaultContent,
  type = 'text',
  className = '',
  tagName,
  children,
}: EditableElementProps) => {
  const { editMode, contentData, updateField, requestImageChange } = useVisualEditor();
  const contentRef = useRef<HTMLElement>(null);

  // Default tagName based on type if not provided
  const Tag = (tagName || (type === 'image' ? 'div' : 'span')) as any;

  // Determine current content
  const currentContent = contentData[fieldKey] !== undefined ? contentData[fieldKey] : defaultContent;

  // Sync ref when not in focus (only for text)
  useEffect(() => {
    if (type === 'text' && contentRef.current && contentRef.current.textContent !== currentContent) {
      contentRef.current.textContent = currentContent;
    }
  }, [currentContent, type]);

  if (!editMode) {
    if (type === 'image') {
      return React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === 'img') {
          return React.cloneElement(child as React.ReactElement<any>, { src: currentContent });
        }
        return child;
      }) || <img src={currentContent} className={className} alt="" />;
    }
    return <Tag className={className}>{currentContent}</Tag>;
  }

  // Edit Mode for Text
  if (type === 'text') {
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
        {currentContent}
      </Tag>
    );
  }

  // Edit Mode for Image
  return (
    <Tag
      className={`relative group cursor-pointer outline-dashed outline-1 outline-blue-400 hover:outline-2 transition-all ${className}`}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        requestImageChange(fieldKey);
      }}
    >
      {/* Render the actual image with dynamic src */}
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === 'img') {
          return React.cloneElement(child as React.ReactElement<any>, { src: currentContent });
        }
        return child;
      }) || <img src={currentContent} className="w-full h-full object-cover" alt="" />}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <div className="bg-white/90 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-semibold text-blue-600">Thay đổi ảnh</span>
        </div>
      </div>
    </Tag>
  );
};
