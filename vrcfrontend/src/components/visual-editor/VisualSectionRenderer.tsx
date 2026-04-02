import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { cn } from '@/lib/utils';

interface SectionProps {
    id: string;
    type: string;
    props: any;
}

interface VisualSectionRendererProps {
    sections: SectionProps[];
    isEditMode?: boolean;
}

export const VisualSectionRenderer: React.FC<VisualSectionRendererProps> = ({ 
    sections, 
    isEditMode = false 
}) => {
    return (
        <div className="flex flex-col">
            {sections.map((section, index) => (
                <EditableSectionWrapper 
                    key={section.id} 
                    id={section.id} 
                    isEditMode={isEditMode}
                >
                    <SectionDispatcher section={section} />
                </EditableSectionWrapper>
            ))}
        </div>
    );
};

const SectionDispatcher: React.FC<{ section: SectionProps }> = ({ section }) => {
    switch (section.type) {
        case 'hero':
            return (
                <div className={cn(
                    "py-20 flex flex-col items-center text-center px-4",
                    section.props.alignment === 'left' && "items-start text-left",
                    section.props.alignment === 'right' && "items-end text-right"
                )}>
                    <div className="container-custom">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">{section.props.title || 'Tiêu đề Hero'}</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">{section.props.description || 'Mô tả nội dung cho đoạn hero của bạn.'}</p>
                    </div>
                </div>
            );
        case 'rich_text':
            return (
                <div className="py-12 bg-white">
                    <div className="container-custom">
                        <div 
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: section.props.content || '<p>Nhập nội dung văn bản ở đây...</p>' }}
                        />
                    </div>
                </div>
            );
        case 'grid':
            const columns = section.props.columns || 3;
            const gap = (section.props.gap || 8) * 4; // Assuming Tailwind spacing scale
            return (
                <div className={cn(
                    "py-16",
                    section.props.padding === 'small' ? 'py-8' : 
                    section.props.padding === 'large' ? 'py-24' : 'py-16'
                )}>
                    <div className="container-custom">
                        <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-${gap / 4}`}>
                            {/* In a real app, this would contain child blocks */}
                            <div className="bg-slate-100 p-8 rounded-lg text-center border-2 border-dashed border-slate-200">
                                Grid Column (Placeholder)
                            </div>
                        </div>
                    </div>
                </div>
            );
        case 'cards':
            return (
                <div className="py-16 bg-slate-50">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-bold mb-12">{section.props.title || 'Danh sách Card'}</h2>
                        <div className={`grid grid-cols-1 md:grid-cols-${section.props.columns || 3} gap-8`}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto" />
                                    <h3 className="font-bold mb-2 text-lg">Card {i}</h3>
                                    <p className="text-sm text-muted-foreground">Đây là nội dung mẫu cho một card trong lưới.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'features':
            return (
                <div className="py-20 bg-primary/5">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-bold mb-4">{section.props.title || 'Tính năng nổi bật'}</h2>
                        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">{section.props.subtitle || 'Giải pháp toàn diện cho mọi nhu cầu của khách hàng.'}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl mb-4 font-bold">
                                        0{i}
                                    </div>
                                    <h4 className="font-bold text-lg mb-2">Tính năng 0{i}</h4>
                                    <p className="text-sm text-muted-foreground">Mô tả tóm tắt về lợi ích và cách thức hoạt động của tính năng này.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        default:
            return <div className="p-8 text-center text-muted-foreground">Khối không xác định: {section.type}</div>;
    }
};

const EditableSectionWrapper: React.FC<{ 
    id: string; 
    isEditMode: boolean; 
    children: React.ReactNode 
}> = ({ id, isEditMode, children }) => {
    const handleSelect = () => {
        if (!isEditMode) return;
        window.parent.postMessage({ 
            type: 'VISUAL_EDIT_SECTION_SELECTED', 
            sectionId: id 
        }, '*');
    };

    if (!isEditMode) return <>{children}</>;

    return (
        <div 
            className="group relative cursor-pointer hover:ring-2 hover:ring-primary transition-all rounded-sm"
            onClick={handleSelect}
            data-section-id={id}
        >
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] px-2 py-0.5 opacity-0 group-hover:opacity-100 z-10 font-bold uppercase tracking-wider">
                Section
            </div>
            {children}
        </div>
    );
};
