import { EditableElement } from '../admin/EditableElement';
import { useVisualEditor } from '../../context/VisualEditorContext';

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
  sectionId?: string;
}

export const FeatureListBlock = ({ 
  title = "Features", 
  subtitle,
  items = [], 
  columns = 3, 
  padding = 'medium',
  sectionId
}: FeatureListProps) => {
  const { updateSectionProps } = useVisualEditor();
  
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

  const handleUpdateItem = (index: number, key: keyof FeatureItem, value: string) => {
    if (!sectionId) return;
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    updateSectionProps(sectionId, { items: newItems });
  };

  return (
    <div className={`bg-white ${paddingClasses[padding]}`}>
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-16">
            <EditableElement 
              tagName="h2" 
              fieldKey="title" 
              sectionId={sectionId} 
              defaultContent={title} 
              className="text-3xl font-bold text-primary mb-4" 
            />
            {subtitle && (
              <EditableElement 
                tagName="p" 
                fieldKey="subtitle" 
                sectionId={sectionId} 
                defaultContent={subtitle} 
                className="text-lg text-muted-foreground" 
              />
            )}
          </div>
        )}
        <div className={`grid ${gridCols[columns]} gap-y-12 gap-x-8`}>
          {items.map((item, idx) => (
            <div key={item.id} className="flex gap-4 group">
              <EditableElement
                type="image"
                fieldKey={`items.${idx}.image`}
                sectionId={sectionId}
                defaultContent={item.icon || '/assets/icons/check.svg'}
                onUpdate={(val) => handleUpdateItem(idx, 'icon' as any, val)}
                className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 overflow-hidden"
              >
                {item.icon && item.icon.startsWith('<svg') ? (
                  <div dangerouslySetInnerHTML={{ __html: item.icon }} className="w-6 h-6" />
                ) : (
                  <img src={item.icon || '/assets/icons/check.svg'} className="w-6 h-6 object-contain" alt="" />
                )}
              </EditableElement>
              <div className="flex-grow">
                <EditableElement 
                  tagName="h3" 
                  fieldKey={`items.${idx}.title`} 
                  sectionId={sectionId} 
                  defaultContent={item.title} 
                  className="text-xl font-bold text-primary mb-2 block" 
                  onUpdate={(val) => handleUpdateItem(idx, 'title', val)}
                />
                <EditableElement 
                  tagName="p" 
                  fieldKey={`items.${idx}.description`} 
                  sectionId={sectionId} 
                  defaultContent={item.description} 
                  className="text-muted-foreground leading-relaxed block" 
                  onUpdate={(val) => handleUpdateItem(idx, 'description', val)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
