import React from 'react';

interface HeroBlockProps {
  title: string;
  description: string;
  backgroundImage?: string;
  alignment?: 'left' | 'center';
  buttonText?: string;
  buttonLink?: string;
}

export const HeroBlock = ({ 
  title = "Hero Title", 
  description = "Hero description content goes here.",
  backgroundImage,
  alignment = 'left',
  buttonText,
  buttonLink
}: HeroBlockProps) => {
  return (
    <div className={`relative py-20 md:py-32 overflow-hidden ${backgroundImage ? 'text-white' : ''}`}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      <div className={`container-custom relative z-10 ${alignment === 'center' ? 'text-center items-center' : 'text-left'}`}>
        <div className={`max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 transition-all tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl leading-relaxed">
            {description}
          </p>
          {buttonText && (
            <a 
              href={buttonLink || "#"} 
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              {buttonText}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
