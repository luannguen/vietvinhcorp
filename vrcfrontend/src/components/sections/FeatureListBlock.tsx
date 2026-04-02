import React from 'react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface FeatureListProps {
  title?: string;
  subtitle?: string;
  items: FeatureItem[];
  columns?: 1 | 2 | 3;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const FeatureListBlock = ({ 
  title = "Features", 
  subtitle,
  items = [], 
  columns = 3, 
  padding = 'medium' 
}: FeatureListProps) => {
  const paddingClasses = {
    none: 'py-0',
    small: 'py-8',
    medium: 'py-16',
    large: 'py-24'
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3'
  };

  return (
    <div className={`bg-white ${paddingClasses[padding]}`}>
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-16">
            {title && <h2 className="text-3xl font-bold text-primary mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        <div className={`grid ${gridCols[columns]} gap-y-12 gap-x-8`}>
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {/* Fallback Icon if not provided */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
