import React from 'react';

interface CardItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  link?: string;
}

interface CardBlockProps {
  items: CardItem[];
  columns?: 1 | 2 | 3 | 4;
  style?: 'elevated' | 'bordered' | 'flat';
  padding?: 'none' | 'small' | 'medium' | 'large';
  title?: string;
}

export const CardBlock = ({ 
  items = [], 
  columns = 3, 
  style = 'elevated', 
  padding = 'medium',
  title
}: CardBlockProps) => {
  const paddingClasses = {
    none: 'py-0',
    small: 'py-8',
    medium: 'py-16',
    large: 'py-24'
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const cardStyles = {
    elevated: 'bg-white shadow-md hover:shadow-xl',
    bordered: 'bg-white border border-gray-200 hover:border-primary/50',
    flat: 'bg-gray-50'
  };

  return (
    <div className={`container-custom ${paddingClasses[padding]}`}>
      {title && <h2 className="text-3xl font-bold text-primary mb-12 text-center">{title}</h2>}
      <div className={`grid ${gridCols[columns]} gap-8`}>
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${cardStyles[style]}`}
          >
            {item.image && (
              <div className="aspect-video overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              {item.link && (
                <a href={item.link} className="mt-4 inline-flex items-center text-secondary font-semibold hover:gap-2 transition-all">
                  Chi tiết <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
