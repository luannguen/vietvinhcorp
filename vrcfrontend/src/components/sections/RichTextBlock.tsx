import React from 'react';

interface RichTextBlockProps {
  content: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  maxWidth?: string;
  className?: string;
}

export const RichTextBlock = ({ 
  content = "Enter content here...", 
  padding = 'medium',
  maxWidth = '800px',
  className = ''
}: RichTextBlockProps) => {
  const paddingClasses = {
    none: 'py-0',
    small: 'py-8',
    medium: 'py-16',
    large: 'py-24'
  };

  return (
    <div className={`container-custom ${paddingClasses[padding]} ${className}`}>
      <div 
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-secondary"
        style={{ maxWidth: maxWidth }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
