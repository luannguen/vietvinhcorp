import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { 
    Settings2, 
    Zap, 
    X, 
    Info, 
    ExternalLink, 
    Languages,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    List,
    Maximize2,
    MoveVertical,
    Palette,
    Type,
    Sliders
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BLOCK_LIBRARY } from './BlockLibrary';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from 'react-router-dom';

interface PropertyInspectorProps {
    selectedSectionId: string | null;
    sections: any[];
    updateSection: (id: string, updates: any) => void;
    setSelectedSectionId: (id: string | null) => void;
    onPickImage: (fieldId: string) => void;
    frontendUrl?: string;
    language?: string;
    onLanguageChange?: (lng: string) => void;
    sendToIframe?: (type: string, data: any) => void;
}

const SUPPORTED_LANGUAGES = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
    { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
    { code: 'sr', name: 'Српски', flag: '🇷🇸' }
];

// Categorization of field types
const STYLE_FIELD_IDS = [
    'textAlign', 'textSize', 'style', 'cardStyle', 
    'imageAspect', 'imageRounded', 'imageShadow', 'accent'
];

const LAYOUT_FIELD_IDS = [
    'containerWidth', 'minHeight', 'paddingY', 'padding', 
    'bgStyle', 'bgColor', 'columns', 'layout', 'gap'
];

export const PropertyInspector: React.FC<PropertyInspectorProps> = ({
    selectedSectionId,
    sections,
    updateSection,
    setSelectedSectionId,
    onPickImage,
    frontendUrl,
    language = 'vi',
    onLanguageChange,
    sendToIframe
}) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');

    const section = sections?.find(s => s.id === selectedSectionId);
    const blockDef = BLOCK_LIBRARY.find(b => b.type === section?.type);

    const handleFieldChange = (fieldId: string, value: any) => {
        if (!section) return;
        const effectiveFieldId = language === 'vi' ? fieldId : `${fieldId}_${language}`;
        const newProps = { ...(section.props || {}), [effectiveFieldId]: value };
        updateSection(section.id, { props: newProps });
    };

    const handleLanguageToggle = (lng: string) => {
        if (onLanguageChange) onLanguageChange(lng);
        if (sendToIframe) {
            sendToIframe('VISUAL_EDIT_CHANGE_LANGUAGE', { language: lng });
        }
    };

    // Quick text formatting helper
    const handleQuickFormat = (fieldId: string, formatType: 'bold' | 'italic' | 'bullet' | 'break' | 'highlight') => {
        if (!section) return;
        const effectiveFieldId = language === 'vi' ? fieldId : `${fieldId}_${language}`;
        const currentValue = section.props?.[effectiveFieldId] || section.props?.[fieldId] || '';

        let newValue = currentValue;
        switch (formatType) {
            case 'bold':
                newValue = currentValue ? `${currentValue} **in đậm**` : '**in đậm**';
                break;
            case 'italic':
                newValue = currentValue ? `${currentValue} *in nghiêng*` : '*in nghiêng*';
                break;
            case 'bullet':
                newValue = currentValue ? `${currentValue}\n• ` : '• ';
                break;
            case 'break':
                newValue = currentValue ? `${currentValue}\n\n` : '\n\n';
                break;
            case 'highlight':
                newValue = currentValue ? `${currentValue} [nổi bật]` : '[nổi bật]';
                break;
        }

        handleFieldChange(fieldId, newValue);
    };

    if (!section) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-slate-50/10">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-4">
                    <Settings2 className="h-8 w-8 text-slate-300" />
                </div>
                <h4 className="text-sm font-bold text-slate-400">Chưa chọn phần tử</h4>
                <p className="text-[11px] text-slate-400 mt-1">Bấm vào các khối trên trang hoặc trong danh sách cấu trúc để chỉnh sửa thuộc tính.</p>
            </div>
        );
    }

    const allFields = blockDef?.fields || [];
    
    // Split fields by category
    const contentFields = allFields.filter(f => !STYLE_FIELD_IDS.includes(f.id) && !LAYOUT_FIELD_IDS.includes(f.id));
    const styleFields = allFields.filter(f => STYLE_FIELD_IDS.includes(f.id));
    const layoutFields = allFields.filter(f => LAYOUT_FIELD_IDS.includes(f.id));

    // Render an individual field based on type
    const renderFieldInput = (field: any) => {
        const effectiveFieldId = language === 'vi' ? field.id : `${field.id}_${language}`;
        const localizedValue = section.props?.[effectiveFieldId];
        const baseValue = section.props?.[field.id];
        const fieldValue = (localizedValue !== undefined && localizedValue !== '') 
            ? localizedValue 
            : (language !== 'vi' ? (baseValue || '') : (baseValue || ''));

        // Special render for Text Alignment
        if (field.id === 'textAlign') {
            const currentAlign = fieldValue || 'left';
            return (
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        {field.label}
                    </label>
                    <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
                        {[
                            { value: 'left', icon: AlignLeft, label: 'Trái' },
                            { value: 'center', icon: AlignCenter, label: 'Giữa' },
                            { value: 'right', icon: AlignRight, label: 'Phải' },
                            { value: 'justify', icon: AlignJustify, label: 'Đều' }
                        ].map((btn) => {
                            const Icon = btn.icon;
                            const isActive = currentAlign === btn.value;
                            return (
                                <button
                                    key={btn.value}
                                    type="button"
                                    onClick={() => handleFieldChange(field.id, btn.value)}
                                    className={`py-1.5 flex flex-col items-center justify-center gap-1 rounded-md text-[10px] font-semibold transition-all ${
                                        isActive ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{btn.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <div key={field.id} className="space-y-2.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{field.label}</span>
                    {language !== 'vi' && (
                        <span className="text-[9px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded uppercase font-bold">
                            {language}
                        </span>
                    )}
                </label>
                
                {field.type === 'text' && (
                    <Input 
                        className="h-10 border-slate-200 focus-visible:ring-primary text-sm shadow-sm"
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={`Nhập ${field.label.toLowerCase()}...`}
                    />
                )}
                
                {field.type === 'textarea' && (
                    <div className="space-y-1.5">
                        {/* Quick format bar */}
                        <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-200 rounded-md text-[10px] text-slate-500">
                            <span className="px-1.5 text-[9px] font-bold uppercase text-slate-400 tracking-wider">Định dạng:</span>
                            <button
                                type="button"
                                title="Thêm chữ đậm"
                                onClick={() => handleQuickFormat(field.id, 'bold')}
                                className="px-2 py-0.5 rounded hover:bg-white hover:text-primary transition-colors font-bold border border-transparent hover:border-slate-200"
                            >
                                B
                            </button>
                            <button
                                type="button"
                                title="Thêm chữ nghiêng"
                                onClick={() => handleQuickFormat(field.id, 'italic')}
                                className="px-2 py-0.5 rounded hover:bg-white hover:text-primary transition-colors italic border border-transparent hover:border-slate-200"
                            >
                                I
                            </button>
                            <button
                                type="button"
                                title="Thêm gạch đầu dòng"
                                onClick={() => handleQuickFormat(field.id, 'bullet')}
                                className="px-2 py-0.5 rounded hover:bg-white hover:text-primary transition-colors border border-transparent hover:border-slate-200 flex items-center gap-1"
                            >
                                <List className="w-3 h-3" /> Danh sách
                            </button>
                            <button
                                type="button"
                                title="Xuống dòng ngắt đoạn"
                                onClick={() => handleQuickFormat(field.id, 'break')}
                                className="px-2 py-0.5 rounded hover:bg-white hover:text-primary transition-colors border border-transparent hover:border-slate-200"
                            >
                                ↵ Ngắt dòng
                            </button>
                        </div>
                        <Textarea 
                            className="min-h-[130px] border-slate-200 focus-visible:ring-primary text-sm shadow-sm resize-y leading-relaxed font-sans"
                            value={fieldValue}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            placeholder={`Nhập ${field.label.toLowerCase()}...`}
                        />
                    </div>
                )}

                {field.type === 'number' && (
                    <Input 
                        type="number"
                        className="h-10 border-slate-200 focus-visible:ring-primary text-sm shadow-sm"
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    />
                )}

                {field.type === 'select' && (
                    <Select 
                        value={fieldValue ? String(fieldValue) : undefined}
                        onValueChange={(val) => handleFieldChange(field.id, val)}
                    >
                        <SelectTrigger className="h-10 border-slate-200 focus-visible:ring-primary shadow-sm bg-white">
                            <SelectValue placeholder="Chọn giá trị..." />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((opt: any) => (
                                <SelectItem key={opt.value} value={String(opt.value)}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {field.type === 'image' && (
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <Input 
                                className="h-9 text-[11px] border-slate-200 bg-slate-50 focus-visible:ring-primary truncate"
                                value={fieldValue}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder="Dán URL ảnh hoặc chọn..."
                            />
                            <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-9 px-3 shrink-0 rounded-lg border-slate-200 hover:bg-slate-50 hover:text-primary transition-all flex items-center gap-1 text-xs font-semibold"
                                onClick={() => onPickImage(effectiveFieldId)}
                            >
                                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span>Đổi ảnh</span>
                            </Button>
                        </div>
                        {fieldValue && (
                            <div className="relative aspect-video rounded-xl overflow-hidden border bg-slate-50 shadow-inner group">
                                <img 
                                    src={fieldValue.startsWith('http') ? fieldValue : (frontendUrl ? `${frontendUrl}${fieldValue}` : fieldValue)} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                />
                            </div>
                        )}
                    </div>
                )}

                {field.type === 'info' && (
                    <Alert className="bg-blue-50/50 border-blue-200 shadow-sm">
                        <Info className="h-4 w-4 text-blue-500" />
                        <AlertTitle className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-1">
                            {field.label}
                        </AlertTitle>
                        <AlertDescription className="text-xs text-blue-600 leading-relaxed mb-3">
                            {field.description}
                        </AlertDescription>
                        {field.action && (
                            <Button 
                                size="sm" 
                                className="w-full h-8 text-[10px] font-bold uppercase bg-blue-600 hover:bg-blue-700 shadow-sm"
                                onClick={() => field.action.url ? (field.action.url.startsWith('http') ? window.open(field.action.url, '_blank') : navigate(field.action.url)) : null}
                            >
                                <ExternalLink className="w-3 h-3 mr-1.5" />
                                {field.action.label}
                            </Button>
                        )}
                    </Alert>
                )}
            </div>
        );
    };

    return (
        <div className="flex-grow flex flex-col overflow-hidden bg-white">
            {/* Header */}
            <div className="p-3.5 px-4 flex items-center justify-between border-b bg-slate-50/60">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-800 leading-none">
                            {blockDef?.name || section.type}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">#{section.id?.slice(0, 10)}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-700" onClick={() => setSelectedSectionId(null)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Language Switcher */}
            <div className="p-3 border-b bg-slate-50/30">
                <div className="flex items-center justify-between mb-1.5">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Languages className="w-3 h-3 text-primary" /> Ngôn ngữ ({SUPPORTED_LANGUAGES.find(l => l.code === language)?.name})
                    </Label>
                </div>
                <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto no-scrollbar scroll-smooth">
                    <div className="flex gap-1 min-w-max px-0.5">
                        {SUPPORTED_LANGUAGES.map((lang) => (
                            <button 
                                key={lang.code}
                                onClick={() => handleLanguageToggle(lang.code)}
                                className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all whitespace-nowrap ${
                                    language === lang.code ? 'bg-white shadow-sm text-primary font-bold' : 'text-slate-500 hover:text-slate-800'
                                }`}
                            >
                                <span className="mr-1">{lang.flag}</span>
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs for Category Organization */}
            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="flex-grow flex flex-col overflow-hidden">
                <div className="px-3 pt-2 border-b bg-white">
                    <TabsList className="grid w-full grid-cols-3 h-9 p-1 bg-slate-100/80">
                        <TabsTrigger value="content" className="flex items-center gap-1.5 text-xs py-1 font-semibold">
                            <Type className="w-3.5 h-3.5 text-primary" />
                            <span>Nội dung</span>
                        </TabsTrigger>
                        <TabsTrigger value="style" className="flex items-center gap-1.5 text-xs py-1 font-semibold">
                            <Palette className="w-3.5 h-3.5 text-blue-500" />
                            <span>Định dạng</span>
                        </TabsTrigger>
                        <TabsTrigger value="layout" className="flex items-center gap-1.5 text-xs py-1 font-semibold">
                            <Sliders className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Kích thước</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-6">
                    {/* TAB 1: NỘI DUNG (Content) */}
                    <TabsContent value="content" className="m-0 space-y-5">
                        {contentFields.map(renderFieldInput)}
                        {contentFields.length === 0 && (
                            <div className="text-center py-8 text-slate-400 text-xs">
                                Khối này không có trường nội dung chữ riêng biệt.
                            </div>
                        )}
                    </TabsContent>

                    {/* TAB 2: ĐỊNH DẠNG (Typography & Media Style) */}
                    <TabsContent value="style" className="m-0 space-y-5">
                        {styleFields.map(renderFieldInput)}

                        {/* Always available fallback typography controls if not in schema */}
                        {!styleFields.some(f => f.id === 'textAlign') && (
                            <div className="space-y-2 pt-2 border-t border-slate-100">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    Căn lề chữ (Text Alignment)
                                </label>
                                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
                                    {[
                                        { value: 'left', icon: AlignLeft, label: 'Trái' },
                                        { value: 'center', icon: AlignCenter, label: 'Giữa' },
                                        { value: 'right', icon: AlignRight, label: 'Phải' },
                                        { value: 'justify', icon: AlignJustify, label: 'Đều' }
                                    ].map((btn) => {
                                        const currentAlign = section.props?.textAlign || 'left';
                                        const isActive = currentAlign === btn.value;
                                        return (
                                            <button
                                                key={btn.value}
                                                type="button"
                                                onClick={() => handleFieldChange('textAlign', btn.value)}
                                                className={`py-1.5 flex flex-col items-center justify-center gap-1 rounded-md text-[10px] font-semibold transition-all ${
                                                    isActive ? 'bg-white text-primary shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'
                                                }`}
                                            >
                                                <btn.icon className="w-4 h-4" />
                                                <span>{btn.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Card Style helper if cards block */}
                        {!styleFields.some(f => f.id === 'cardStyle' || f.id === 'style') && (
                            <div className="space-y-2 pt-2 border-t border-slate-100">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    Hiệu ứng Card (Style)
                                </label>
                                <Select 
                                    value={section.props?.cardStyle || section.props?.style || 'modern'} 
                                    onValueChange={(val) => handleFieldChange('cardStyle', val)}
                                >
                                    <SelectTrigger className="h-10 bg-white">
                                        <SelectValue placeholder="Chọn phong cách card..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="modern">Hiện đại (Trắng đổ bóng 3D)</SelectItem>
                                        <SelectItem value="glass">Kính mờ (Glassmorphism)</SelectItem>
                                        <SelectItem value="bordered">Viền thanh lịch tinh tế</SelectItem>
                                        <SelectItem value="tech-dark">Tối kỹ thuật công nghệ</SelectItem>
                                        <SelectItem value="flat">Tối giản (Flat)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </TabsContent>

                    {/* TAB 3: KÍCH THƯỚC & BỐ CỤC (Dimensions & Layout) */}
                    <TabsContent value="layout" className="m-0 space-y-5">
                        {/* Universal Width Control */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                <span>Độ rộng khung chứa (Width)</span>
                                <Maximize2 className="w-3.5 h-3.5 text-primary" />
                            </label>
                            <Select 
                                value={section.props?.containerWidth || 'normal'} 
                                onValueChange={(val) => handleFieldChange('containerWidth', val)}
                            >
                                <SelectTrigger className="h-10 bg-white">
                                    <SelectValue placeholder="Chọn độ rộng..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="narrow">Thu hẹp (896px - Dễ đọc bài viết)</SelectItem>
                                    <SelectItem value="normal">Tiêu chuẩn (1280px - Mặc định)</SelectItem>
                                    <SelectItem value="wide">Rộng rãi (1536px - Toàn cảnh)</SelectItem>
                                    <SelectItem value="full">Tràn màn hình (100% Full-width)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Universal Min Height Control */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                <span>Độ cao tối thiểu (Min Height)</span>
                                <MoveVertical className="w-3.5 h-3.5 text-primary" />
                            </label>
                            <Select 
                                value={section.props?.minHeight || 'auto'} 
                                onValueChange={(val) => handleFieldChange('minHeight', val)}
                            >
                                <SelectTrigger className="h-10 bg-white">
                                    <SelectValue placeholder="Chọn độ cao..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="auto">Tự động theo nội dung</SelectItem>
                                    <SelectItem value="small">Nhỏ gọn (~350px)</SelectItem>
                                    <SelectItem value="medium">Vừa vặn (~500px)</SelectItem>
                                    <SelectItem value="large">Lớn nổi bật (~650px)</SelectItem>
                                    <SelectItem value="screen">Toàn màn hình (100vh)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Universal Padding Y Control */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Khoảng cách đệm trên/dưới (Padding)
                            </label>
                            <Select 
                                value={section.props?.paddingY || section.props?.padding || 'medium'} 
                                onValueChange={(val) => handleFieldChange('paddingY', val)}
                            >
                                <SelectTrigger className="h-10 bg-white">
                                    <SelectValue placeholder="Chọn khoảng cách lề..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Không đệm (py-0)</SelectItem>
                                    <SelectItem value="small">Đệm nhỏ (py-8)</SelectItem>
                                    <SelectItem value="medium">Đệm vừa (py-14)</SelectItem>
                                    <SelectItem value="large">Đệm lớn (py-24)</SelectItem>
                                    <SelectItem value="xlarge">Đệm cực lớn (py-32)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Universal Background Style Control */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                <span>Màu nền / Phong cách khối</span>
                                <Palette className="w-3.5 h-3.5 text-primary" />
                            </label>
                            <Select 
                                value={section.props?.bgStyle || 'white'} 
                                onValueChange={(val) => handleFieldChange('bgStyle', val)}
                            >
                                <SelectTrigger className="h-10 bg-white">
                                    <SelectValue placeholder="Chọn màu nền..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="white">Trắng tinh khôi (White)</SelectItem>
                                    <SelectItem value="slate">Xám nhẹ hiện đại (Slate)</SelectItem>
                                    <SelectItem value="gradient-light">Gradient sáng nhẹ</SelectItem>
                                    <SelectItem value="gradient-primary">Gradient xanh Vietvinh</SelectItem>
                                    <SelectItem value="tech-dark">Tối kỹ thuật công nghệ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Specific layout fields defined in block schema */}
                        {layoutFields.filter(f => !['containerWidth', 'minHeight', 'paddingY', 'bgStyle'].includes(f.id)).map(renderFieldInput)}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};
