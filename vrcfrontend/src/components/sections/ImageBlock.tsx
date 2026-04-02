import React from 'react';
import { EditableElement } from '../admin/EditableElement';

interface ImageBlockProps {
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
}

export const ImageBlock = ({ 
  url = "https://via.placeholder.com/800x450", 
  alt = "Image", 
  caption, 
  width = 100 
}: ImageBlockProps) => {
  return (
    <div className="container-custom py-8 flex flex-col items-center">
      <EditableElement 
        fieldKey="url" 
        defaultContent={url} 
        type="image"
        className="overflow-hidden rounded-xl shadow-lg border border-gray-100"
        style={{ width: `${width}%`, maxWidth: '100%' }}
      >
        <img 
          src={url} 
          alt={alt} 
          className="w-full h-auto object-cover"
        />
      </EditableElement>
      
      {caption !== undefined && (
        <EditableElement 
          fieldKey="caption" 
          defaultContent={caption} 
          type="text"
          tagName="p"
          className="mt-3 text-sm text-muted-foreground italic text-center"
        >
          {caption}
        </EditableElement>
      )}
      
      {alt !== undefined && (
        <div className="hidden">
           <EditableElement fieldKey="alt" defaultContent={alt} type="text" />
        </div>
      )}
    </div>
  );
};
