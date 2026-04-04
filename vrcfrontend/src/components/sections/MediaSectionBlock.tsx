import React from 'react';
import { EditableElement } from '../admin/EditableElement';

interface MediaSectionProps {
  title?: string;
  description?: string;
  image?: string;
  layout?: 'image-left' | 'image-right' | 'image-top' | 'image-bottom';
  imageWidth?: number; // percentage (e.g. 50 for 50%)
  padding?: 'none' | 'small' | 'medium' | 'large';
  bgColor?: 'white' | 'muted' | 'primary-light';
  sectionId?: string;
}

export const MediaSectionBlock = ({
  title = "Section Title",
  description = "Content for this media section goes here.",
  image = "https://via.placeholder.com/800x450",
  layout = 'image-right',
  imageWidth = 50,
  padding = 'medium',
  bgColor = 'white',
  sectionId
}: MediaSectionProps) => {
  const paddingClasses = {
    none: 'py-0',
    small: 'py-8',
    medium: 'py-16',
    large: 'py-24'
  };

  const bgClasses = {
    white: 'bg-white',
    muted: 'bg-muted',
    'primary-light': 'bg-primary/5'
  };

  const isVertical = layout === 'image-top' || layout === 'image-bottom';
  const isImageRight = layout === 'image-right';

  const containerStyle = !isVertical ? {
    display: 'grid',
    gridTemplateColumns: isVertical ? '1fr' : (isImageRight ? `1fr ${imageWidth}%` : `${imageWidth}% 1fr`),
    gap: '2.5rem',
    alignItems: 'center'
  } : {};

  return (
    <section className={`${bgClasses[bgColor]} ${paddingClasses[padding]}`}>
      <div className="container-custom">
        <div 
          className={`flex ${isVertical ? 'flex-col' : 'grid'} gap-8 md:gap-12 items-center`}
          style={!isVertical ? { gridTemplateColumns: isImageRight ? `1fr ${imageWidth}%` : `${imageWidth}% 1fr` } : {}}
        >
          {/* Media Column */}
          <div className={`${isVertical ? 'w-full' : ''} ${layout === 'image-bottom' ? 'order-2' : (layout === 'image-right' ? 'order-2' : 'order-1')}`}>
            <EditableElement
              type="image"
              fieldKey="image"
              sectionId={sectionId}
              defaultContent={image}
              className="rounded-2xl shadow-xl overflow-hidden w-full h-full min-h-[300px]"
            >
              <img src={image} className="w-full h-full object-cover" alt={title} />
            </EditableElement>
          </div>

          {/* Content Column */}
          <div className={`${isVertical ? 'w-full text-center' : ''} ${layout === 'image-bottom' ? 'order-1' : (layout === 'image-right' ? 'order-1' : 'order-2')}`}>
            {title && (
              <EditableElement
                tagName="h2"
                fieldKey="title"
                sectionId={sectionId}
                defaultContent={title}
                className="text-3xl md:text-4xl font-bold text-primary mb-6"
              />
            )}
            <EditableElement
              tagName="div"
              fieldKey="description"
              type="rich-text"
              sectionId={sectionId}
              defaultContent={description}
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-secondary text-muted-foreground leading-relaxed"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
