import React from 'react';
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
import { Settings2, Zap, X, Info, ExternalLink, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

    return (
        <div className="flex-grow flex flex-col overflow-hidden bg-white">
            <div className="p-4 flex items-center justify-between border-b bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        Thuộc tính: {blockDef?.name || section.type}
                    </h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedSectionId(null)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex-grow overflow-y-auto p-5 space-y-6">
                {/* Language Switcher in Inspector */}
                <div className="space-y-2 mb-8">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Languages className="w-3 h-3" /> Ngôn ngữ đang sửa ({SUPPORTED_LANGUAGES.find(l => l.code === language)?.name})
                    </Label>
                    <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto no-scrollbar scroll-smooth">
                        <div className="flex gap-1 min-w-max px-0.5">
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <button 
                                    key={lang.code}
                                    onClick={() => handleLanguageToggle(lang.code)}
                                    className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all whitespace-nowrap ${language === lang.code ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <span className="mr-1.5 opacity-80">{lang.flag}</span>
                                    {lang.name.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {blockDef?.fields?.map((field: any) => {
                        const effectiveFieldId = language === 'vi' ? field.id : `${field.id}_${language}`;
                        // Try localized value first, then base field value as fallback
                        const localizedValue = section.props?.[effectiveFieldId];
                        const baseValue = section.props?.[field.id];
                        const fieldValue = (localizedValue !== undefined && localizedValue !== '') 
                            ? localizedValue 
                            : (language !== 'vi' ? (baseValue || '') : (baseValue || ''));
                        
                        return (
                            <div key={field.id} className="space-y-2.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                    {field.label}
                                    {language !== 'vi' && <span className="text-[9px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded uppercase font-bold">{language}</span>}
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
                                    <Textarea 
                                        className="min-h-[120px] border-slate-200 focus-visible:ring-primary text-sm shadow-sm resize-none"
                                        value={fieldValue}
                                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                        placeholder={`Nhập ${field.label.toLowerCase()}...`}
                                    />
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
                                        value={fieldValue}
                                        onValueChange={(val) => handleFieldChange(field.id, val)}
                                    >
                                        <SelectTrigger className="h-10 border-slate-200 focus-visible:ring-primary shadow-sm bg-white">
                                            <SelectValue placeholder="Chọn giá trị..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {field.options?.map((opt: any) => (
                                                <SelectItem key={opt.value} value={opt.value}>
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
                                                className="h-9 text-[10px] border-slate-200 bg-slate-50 focus-visible:ring-primary truncate"
                                                value={fieldValue}
                                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                placeholder="Dán URL ảnh..."
                                            />
                                            <Button 
                                                size="sm" 
                                                variant="outline" 
                                                className="h-9 px-3 shrink-0 rounded-lg border-slate-200 hover:bg-slate-50 hover:text-primary transition-all"
                                                onClick={() => onPickImage(effectiveFieldId)}
                                            >
                                                <Zap className="w-3 h-3 mr-1" />
                                            </Button>
                                        </div>
                                        {fieldValue && (
                                            <div className="relative aspect-video rounded-lg overflow-hidden border bg-slate-50 shadow-inner group">
                                                <img 
                                                    src={fieldValue.startsWith('http') ? fieldValue : (frontendUrl ? `${frontendUrl}${fieldValue}` : fieldValue)} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover" 
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

                                {field.type === 'rich-text' && (
                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-400 font-medium">
                                        [Rich Text Editor - Ready for future binding]
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                {(!blockDef?.fields || blockDef.fields.length === 0) && (
                    <div className="text-center py-10 opacity-40 grayscale flex flex-col items-center">
                        <Settings2 className="h-8 w-8 mb-2" />
                        <p className="text-[10px] font-bold">Khối này chưa có thuộc tính tùy chỉnh</p>
                    </div>
                )}
            </div>
        </div>
    );
};
