import React, { useState, useEffect } from 'react';
import {
    Save,
    Loader2,
    Upload,
    Image as ImageIcon,
    X,
    Plus,
    Trash2,
    MapPin,
    Phone,
    Mail,
    ExternalLink,
    FolderOpen,
    Headset,
    Navigation,
    Palette,
    Sparkles,
    RotateCcw,
} from 'lucide-react';
import { settingsService } from '@/services/settingsService';
import { useTranslation } from 'react-i18next';
import { mediaService } from '@/services/mediaService';
import { toast } from 'react-hot-toast';
import { ImagePickerModal } from '@/components/admin/media/ImagePickerModal';
import { Link } from 'react-router-dom';

interface Branch {
    id: string;
    title: string;
    address: string;
    phone: string;
    email: string;
    map_url?: string;
}

interface FooterPreset {
    id: string;
    name: string;
    desc: string;
    bgStyle: 'gradient' | 'solid';
    bgColor: string;
    bgColorEnd: string;
    accentColor: string;
    textMode: 'auto' | 'light' | 'dark';
    logoMode: string;
    pattern: string;
}

const FOOTER_PRESETS: FooterPreset[] = [
    {
        id: 'classic-blue',
        name: 'Xanh VRC Tiêu chuẩn',
        desc: 'Xanh thương hiệu VRC + Chữ VRC Trắng & Đỏ',
        bgStyle: 'gradient',
        bgColor: '#0B3B8C',
        bgColorEnd: '#062256',
        accentColor: '#FACC15',
        textMode: 'light',
        logoMode: 'smart-contrast',
        pattern: 'none',
    },
    {
        id: 'royal-navy',
        name: 'Xanh Navy Hoàng gia',
        desc: 'Nền xanh biển sâu sang trọng, tương phản cao',
        bgStyle: 'gradient',
        bgColor: '#071E48',
        bgColorEnd: '#031029',
        accentColor: '#38BDF8',
        textMode: 'light',
        logoMode: 'smart-contrast',
        pattern: 'grid',
    },
    {
        id: 'slate-dark',
        name: 'Xám Đen Kỹ thuật',
        desc: 'Phong cách tập đoàn công nghiệp hiện đại',
        bgStyle: 'gradient',
        bgColor: '#0F172A',
        bgColorEnd: '#090D16',
        accentColor: '#FACC15',
        textMode: 'light',
        logoMode: 'smart-contrast',
        pattern: 'dots',
    },
    {
        id: 'emerald-tech',
        name: 'Xanh Công nghệ HVAC',
        desc: 'Tông xanh lục bảo đậm tiết kiệm năng lượng',
        bgStyle: 'gradient',
        bgColor: '#063940',
        bgColorEnd: '#032227',
        accentColor: '#34D399',
        textMode: 'light',
        logoMode: 'smart-contrast',
        pattern: 'glow',
    },
    {
        id: 'corporate-light',
        name: 'Sáng Trang nhã (Light)',
        desc: 'Nền xám trắng sáng — Giữ nguyên Logo gốc Xanh & Đỏ',
        bgStyle: 'gradient',
        bgColor: '#F8FAFC',
        bgColorEnd: '#EEF2F6',
        accentColor: '#0B3B8C',
        textMode: 'dark',
        logoMode: 'original',
        pattern: 'none',
    },
    {
        id: 'pure-white',
        name: 'Trắng Tinh khiết',
        desc: 'Đồng bộ với Header sáng, nổi bật Logo gốc 100%',
        bgStyle: 'solid',
        bgColor: '#FFFFFF',
        bgColorEnd: '#F1F5F9',
        accentColor: '#0B3B8C',
        textMode: 'dark',
        logoMode: 'original',
        pattern: 'grid',
    },
];

const isHexLight = (hex: string): boolean => {
    const clean = (hex || '#0B3B8C').replace('#', '').trim();
    if (clean.length !== 3 && clean.length !== 6) return false;
    const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
    const r = parseInt(full.substring(0, 2), 16) || 0;
    const g = parseInt(full.substring(2, 4), 16) || 0;
    const b = parseInt(full.substring(4, 6), 16) || 0;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
};

const SettingsPage: React.FC = () => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [originalSettings, setOriginalSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
    const [uploadingFooterBg, setUploadingFooterBg] = useState(false);
    const [uploadingFavicon, setUploadingFavicon] = useState(false);
    const [uploadingOgImage, setUploadingOgImage] = useState(false);
    const [pickerTargetKey, setPickerTargetKey] = useState<string | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        const result = await settingsService.getSettings();
        if (result.success && result.data) {
            const settingMap = result.data.reduce(
                (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
                {} as Record<string, string>
            );
            setSettings(settingMap);
            setOriginalSettings(settingMap);
        } else {
            toast.error(t('load_settings_fail'));
        }
        setLoading(false);
    };

    const handleChange = (key: string, value: string) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const applyFooterPreset = (preset: FooterPreset) => {
        setSettings((prev) => ({
            ...prev,
            footer_theme_preset: preset.id,
            footer_bg_style: preset.bgStyle,
            footer_bg_color: preset.bgColor,
            footer_bg_color_end: preset.bgColorEnd,
            footer_accent_color: preset.accentColor,
            footer_text_mode: preset.textMode,
            footer_logo_mode: preset.logoMode,
            footer_pattern: preset.pattern,
        }));
        toast.success(`Đã áp dụng chủ đề Footer "${preset.name}". Nhấn "Lưu thay đổi" để xuất bản.`);
    };

    const handleSloganViChange = (value: string) => {
        setSettings((prev) => ({
            ...prev,
            site_description: value,
            footer_slogan: value,
            company_slogan: value,
        }));
    };

    const handleSloganEnChange = (value: string) => {
        setSettings((prev) => ({
            ...prev,
            site_description_en: value,
            footer_slogan_en: value,
        }));
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string,
        setUploading: (val: boolean) => void
    ) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        if (file.size > 4 * 1024 * 1024) {
            toast.error(t('logo_too_large') || 'Dung lượng ảnh tối đa 4MB');
            return;
        }

        setUploading(true);
        try {
            const result = await mediaService.uploadImage(file, 'settings');
            if (result) {
                handleChange(key, result.url);
                toast.success(t('logo_uploaded_temp'));
            }
        } catch (error) {
            console.error(error);
            toast.error(t('upload_logo_fail'));
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleRemoveImage = (key: string) => {
        handleChange(key, '');
        toast.success('Đã gỡ hình ảnh tạm thời. Nhấn "Lưu thay đổi" để áp dụng.');
    };

    const handleSave = async () => {
        setSaving(true);
        const updates = Object.entries(settings).map(([key, value]) => ({
            key,
            value,
        }));

        const result = await settingsService.updateSettings(updates);
        if (result.success) {
            try {
                localStorage.removeItem('vrc_site_settings_cache');
            } catch (e) {
                // ignore storage error
            }
            toast.success(t('settings_saved'));
            setOriginalSettings({ ...settings });
        } else {
            toast.error(t('save_settings_fail'));
        }
        setSaving(false);
    };

    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);

    const activeFooterLogo = settings['footer_logo'] || settings['site_logo'] || '';
    const activeFooterSloganVi =
        settings['footer_slogan'] ||
        settings['site_description'] ||
        settings['company_slogan'] ||
        'Chuyên nghiệp - Tận tâm - Tân tiến';
    const activeFooterSloganEn =
        settings['footer_slogan_en'] || settings['site_description_en'] || '';
    const footerLogoWidthNum = settings['footer_logo_width']
        ? parseInt(settings['footer_logo_width'], 10)
        : 0;

    // Footer Theme Preview State
    const footerBgStyle = settings['footer_bg_style'] || 'gradient';
    const footerBgColor = settings['footer_bg_color'] || '#0B3B8C';
    const footerBgColorEnd = settings['footer_bg_color_end'] || '#062256';
    const footerBgImage = settings['footer_bg_image'] || '';
    const footerBgOverlay = settings['footer_bg_overlay']
        ? parseInt(settings['footer_bg_overlay'], 10) / 100
        : 0.88;
    const footerPattern = settings['footer_pattern'] || 'none';
    const footerTextMode = settings['footer_text_mode'] || 'auto';
    const isLightPreview =
        footerTextMode === 'dark'
            ? true
            : footerTextMode === 'light'
            ? false
            : isHexLight(footerBgColor);
    const footerAccentColor =
        settings['footer_accent_color'] || (isLightPreview ? '#0B3B8C' : '#FACC15');

    const rawLogoMode = settings['footer_logo_mode'] || 'auto';
    const effectiveLogoMode =
        rawLogoMode === 'auto'
            ? isLightPreview
                ? 'original'
                : 'smart-contrast'
            : rawLogoMode;

    const getPreviewLogoStyle = (): React.CSSProperties => {
        const base: React.CSSProperties =
            footerLogoWidthNum > 0 ? { width: `${footerLogoWidthNum}px` } : {};
        switch (effectiveLogoMode) {
            case 'smart-contrast':
                return {
                    ...base,
                    filter: 'url(#vrc-admin-smart-logo) drop-shadow(0 2px 8px rgba(0,0,0,0.18))',
                };
            case 'white-glow':
                return {
                    ...base,
                    filter: 'drop-shadow(0 0 1.5px #ffffff) drop-shadow(0 0 2px #ffffff) drop-shadow(0 2px 10px rgba(255,255,255,0.45))',
                };
            case 'monochrome-white':
                return {
                    ...base,
                    filter: 'brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.18))',
                };
            default:
                return base;
        }
    };

    const getPreviewBgStyle = (): React.CSSProperties => {
        if (footerBgStyle === 'image' && footerBgImage) {
            const alphaHex = Math.round(footerBgOverlay * 255)
                .toString(16)
                .padStart(2, '0');
            return {
                backgroundImage: `linear-gradient(135deg, ${footerBgColor}${alphaHex}, ${footerBgColorEnd}${alphaHex}), url(${footerBgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            };
        }
        if (footerBgStyle === 'solid') {
            return { backgroundColor: footerBgColor };
        }
        return {
            background: `linear-gradient(135deg, ${footerBgColor} 0%, ${footerBgColorEnd} 100%)`,
        };
    };

    if (loading)
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="animate-spin" />
            </div>
        );

    return (
        <div className="space-y-6">
            {/* Hidden SVG Filter for Live Preview of Smart Contrast Logo */}
            <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
                <defs>
                    <filter id="vrc-admin-smart-logo" colorInterpolationFilters="sRGB">
                        <feColorMatrix
                            type="matrix"
                            values="
                                1.30  0.60  2.50  0  0.04
                               -0.38  0.60  2.50  0  0.14
                               -0.38  0.60  2.50  0  0.14
                                0     0     0     1  0"
                        />
                    </filter>
                </defs>
            </svg>

            <div className="flex justify-between items-center sticky top-0 z-20 bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur py-3 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {t('system_settings')}
                </h1>
                <div className="flex space-x-3">
                    <button
                        onClick={handleSave}
                        disabled={saving || !hasChanges}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                            !hasChanges
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        } transition-colors disabled:opacity-50`}
                    >
                        {saving ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4 mr-2" />
                        )}
                        {t('save_changes')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Brand Identity & Footer Studio */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg lg:col-span-2">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            {t('brand_identity')} & Thiết kế Giao diện Footer (Footer Studio)
                        </h3>

                        {/* Header Logo */}
                        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="flex-shrink-0">
                                {settings['site_logo'] ? (
                                    <div className="relative group">
                                        <img
                                            src={settings['site_logo']}
                                            alt="Site Logo"
                                            className="h-24 w-auto object-contain bg-gray-50 border rounded-md p-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage('site_logo')}
                                            className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove Logo"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50/50">
                                        <ImageIcon className="h-8 w-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('website_logo')} (Header)
                                </label>
                                <p className="text-sm text-gray-500">{t('logo_recommendation')}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <label
                                        htmlFor="logo-upload"
                                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        {uploadingLogo ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                            <Upload className="h-4 w-4 mr-2" />
                                        )}
                                        {uploadingLogo ? t('uploading') : t('change_logo')}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setPickerTargetKey('site_logo')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        <FolderOpen className="h-4 w-4 mr-2 text-blue-600" />
                                        Chọn từ Thư viện
                                    </button>
                                    <input
                                        id="logo-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageUpload(e, 'site_logo', setUploadingLogo)
                                        }
                                        disabled={uploadingLogo}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Logo, Contrast Mode & Background Studio */}
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                            {/* Live Interactive Preview Box */}
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                                        <Sparkles className="h-4 w-4" />
                                        Xem trước trực tiếp Giao diện Footer (Live Preview — Nền, Logo & Độ tương phản)
                                    </p>
                                    <span className="text-xs text-gray-500">
                                        Chế độ Logo đang dùng:{' '}
                                        <strong className="text-gray-800 dark:text-gray-200">
                                            {effectiveLogoMode === 'smart-contrast'
                                                ? 'Tương phản thông minh (Chữ VRC Trắng + Đỏ)'
                                                : effectiveLogoMode === 'white-glow'
                                                ? 'Viền sáng tách nền'
                                                : effectiveLogoMode === 'monochrome-white'
                                                ? 'Trắng đơn sắc 100%'
                                                : effectiveLogoMode === 'soft-light-pad'
                                                ? 'Đế sáng bo mịn'
                                                : 'Giữ nguyên màu gốc'}
                                        </strong>
                                    </span>
                                </div>

                                <div
                                    style={getPreviewBgStyle()}
                                    className={`relative overflow-hidden rounded-xl p-6 sm:p-8 shadow-inner border transition-all ${
                                        isLightPreview
                                            ? 'text-slate-800 border-slate-200'
                                            : 'text-white border-slate-800'
                                    }`}
                                >
                                    {footerPattern === 'grid' && (
                                        <div
                                            className="absolute inset-0 pointer-events-none opacity-[0.06]"
                                            style={{
                                                backgroundImage: `linear-gradient(to right, ${
                                                    isLightPreview ? '#0f172a' : '#ffffff'
                                                } 1px, transparent 1px), linear-gradient(to bottom, ${
                                                    isLightPreview ? '#0f172a' : '#ffffff'
                                                } 1px, transparent 1px)`,
                                                backgroundSize: '32px 32px',
                                            }}
                                        />
                                    )}
                                    {footerPattern === 'dots' && (
                                        <div
                                            className="absolute inset-0 pointer-events-none opacity-[0.09]"
                                            style={{
                                                backgroundImage: `radial-gradient(${
                                                    isLightPreview ? '#0f172a' : '#ffffff'
                                                } 1px, transparent 1px)`,
                                                backgroundSize: '18px 18px',
                                            }}
                                        />
                                    )}
                                    {footerPattern === 'glow' && (
                                        <div
                                            className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-25"
                                            style={{ backgroundColor: footerAccentColor }}
                                        />
                                    )}

                                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                        {/* Preview Column 1: Logo + Slogan */}
                                        <div className="md:col-span-5 flex flex-col items-start">
                                            {activeFooterLogo ? (
                                                <div className="inline-flex flex-col items-center min-w-[200px] max-w-full space-y-3">
                                                    <div
                                                        className={`${
                                                            footerLogoWidthNum > 0
                                                                ? ''
                                                                : 'w-0 min-w-full'
                                                        } ${
                                                            effectiveLogoMode === 'soft-light-pad'
                                                                ? 'bg-white/95 px-4 py-2.5 rounded-2xl shadow-md'
                                                                : ''
                                                        }`}
                                                    >
                                                        <img
                                                            src={activeFooterLogo}
                                                            alt="Footer Logo Preview"
                                                            style={getPreviewLogoStyle()}
                                                            className={`${
                                                                footerLogoWidthNum > 0
                                                                    ? ''
                                                                    : 'w-full'
                                                            } h-auto max-h-24 object-contain block`}
                                                        />
                                                    </div>
                                                    <p
                                                        className={`${
                                                            isLightPreview
                                                                ? 'text-slate-600'
                                                                : 'text-gray-200'
                                                        } text-base font-medium leading-relaxed text-center whitespace-nowrap`}
                                                    >
                                                        {activeFooterSloganVi}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="h-24 w-48 border-2 border-dashed border-current/30 rounded-md flex items-center justify-center">
                                                    <ImageIcon className="h-8 w-8 opacity-50" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Preview Column 2: Sample Menu */}
                                        <div className="md:col-span-3 space-y-3">
                                            <h4
                                                className={`font-bold text-sm relative inline-block ${
                                                    isLightPreview ? 'text-slate-900' : 'text-white'
                                                }`}
                                            >
                                                Về Việt Vinh
                                                <span
                                                    style={{ backgroundColor: footerAccentColor }}
                                                    className="absolute -bottom-1 left-0 w-1/2 h-0.5 rounded-full"
                                                />
                                            </h4>
                                            <ul
                                                className={`space-y-2 text-xs font-medium ${
                                                    isLightPreview
                                                        ? 'text-slate-600'
                                                        : 'text-gray-200'
                                                }`}
                                            >
                                                <li>Giới thiệu chung</li>
                                                <li>Hồ sơ năng lực</li>
                                                <li>Dự án tiêu biểu</li>
                                            </ul>
                                        </div>

                                        {/* Preview Column 3: Fast Contact */}
                                        <div className="md:col-span-4 space-y-3">
                                            <h4
                                                className={`font-bold text-sm relative inline-block ${
                                                    isLightPreview ? 'text-slate-900' : 'text-white'
                                                }`}
                                            >
                                                Liên hệ
                                                <span
                                                    style={{ backgroundColor: footerAccentColor }}
                                                    className="absolute -bottom-1 left-0 w-1/2 h-0.5 rounded-full"
                                                />
                                            </h4>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex items-center gap-2.5">
                                                    <div
                                                        style={{ color: footerAccentColor }}
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                            isLightPreview
                                                                ? 'bg-blue-50 border border-blue-100'
                                                                : 'bg-white/10'
                                                        }`}
                                                    >
                                                        <Headset size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase opacity-70 font-bold">
                                                            HOTLINE
                                                        </p>
                                                        <p className="font-semibold whitespace-nowrap">
                                                            {settings['contact_hotline'] ||
                                                                '(+84) 981 789 248'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2.5">
                                                    <div
                                                        style={{ color: footerAccentColor }}
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                            isLightPreview
                                                                ? 'bg-blue-50 border border-blue-100'
                                                                : 'bg-white/10'
                                                        }`}
                                                    >
                                                        <Mail size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase opacity-70 font-bold">
                                                            EMAIL
                                                        </p>
                                                        <p className="font-semibold whitespace-nowrap">
                                                            {settings['contact_email'] ||
                                                                'contact@vietvinhcorp.com'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 1: Logo Upload & Contrast Mode */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/70 dark:bg-gray-700/30 p-4 rounded-xl border border-slate-200/80 dark:border-gray-700">
                                <div className="lg:col-span-5 space-y-3">
                                    <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                        1. Hình ảnh & Chế độ Tương phản Logo Footer
                                    </label>
                                    <p className="text-xs text-gray-500">
                                        Khắc phục triệt để tình trạng chữ <strong>VRC</strong> xanh đậm bị chìm trên nền xanh mà không tạo khung viền hộp thô.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <label
                                            htmlFor="footer-logo-upload"
                                            className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-xs text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            {uploadingFooterLogo ? (
                                                <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                                            ) : (
                                                <Upload className="h-4 w-4 mr-1.5" />
                                            )}
                                            {uploadingFooterLogo ? t('uploading') : 'Tải Logo Footer'}
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setPickerTargetKey('footer_logo')}
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-xs text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <FolderOpen className="h-4 w-4 mr-1.5 text-blue-600" />
                                            Chọn từ Thư viện
                                        </button>
                                        {settings['footer_logo'] && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage('footer_logo')}
                                                className="inline-flex items-center px-2.5 py-2 border border-red-200 text-xs font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100"
                                            >
                                                <X className="h-3.5 w-3.5 mr-1" />
                                                Dùng chung Logo Header
                                            </button>
                                        )}
                                        <input
                                            id="footer-logo-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleImageUpload(
                                                    e,
                                                    'footer_logo',
                                                    setUploadingFooterLogo
                                                )
                                            }
                                            disabled={uploadingFooterLogo}
                                        />
                                    </div>
                                </div>

                                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                            Chế độ hiển thị Logo Footer
                                        </label>
                                        <select
                                            value={settings['footer_logo_mode'] || 'auto'}
                                            onChange={(e) =>
                                                handleChange('footer_logo_mode', e.target.value)
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-xs focus:border-blue-500 focus:ring-blue-500 text-sm p-2 border bg-white dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="auto">
                                                ✨ Tự động thông minh (Nền tối: Chữ VRC Trắng+Đỏ / Nền sáng: Bản gốc)
                                            </option>
                                            <option value="smart-contrast">
                                                🎯 Chữ VRC Trắng tinh + Giữ nguyên Đỏ thương hiệu (Không viền)
                                            </option>
                                            <option value="white-glow">
                                                🌟 Viền sáng tách nền tự nhiên (Giữ nguyên màu gốc)
                                            </option>
                                            <option value="monochrome-white">
                                                ⚪ Trắng đơn sắc 100% (Monochrome White)
                                            </option>
                                            <option value="soft-light-pad">
                                                🪪 Đế sáng bo mịn không viền (Soft Light Pad)
                                            </option>
                                            <option value="original">
                                                🖼️ Giữ nguyên ảnh gốc 100% (Dùng cho nền Footer sáng)
                                            </option>
                                        </select>
                                        <p className="text-[11px] text-gray-500 mt-1">
                                            Chế độ <strong>Chữ VRC Trắng + Đỏ</strong> tự động tách nền chữ xanh sang trắng mà vẫn giữ màu đỏ của chữ <em>Service First</em>.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                            Độ rộng Logo Footer (px)
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                min={0}
                                                max={400}
                                                step={5}
                                                value={settings['footer_logo_width'] || ''}
                                                onChange={(e) =>
                                                    handleChange('footer_logo_width', e.target.value)
                                                }
                                                placeholder="Tự động cân đều dòng Slogan"
                                                className="shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-800 dark:text-white"
                                            />
                                            {settings['footer_logo_width'] && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleChange('footer_logo_width', '')
                                                    }
                                                    className="text-xs text-blue-600 hover:underline whitespace-nowrap"
                                                >
                                                    Tự động
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-gray-500 mt-1">
                                            Để trống = tự động bằng đúng độ rộng dòng Slogan bên dưới.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Footer Background & Theme Studio */}
                            <div className="bg-slate-50/70 dark:bg-gray-700/30 p-4 rounded-xl border border-slate-200/80 dark:border-gray-700 space-y-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <Palette className="h-4 w-4 text-blue-600" />
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            2. Tùy chỉnh Nền & Chủ đề Footer (Footer Background & Theme)
                                        </h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => applyFooterPreset(FOOTER_PRESETS[0])}
                                        className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-blue-600"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                        Khôi phục mặc định VRC
                                    </button>
                                </div>

                                {/* 6 Quick Presets */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                        Chọn nhanh Chủ đề mẫu (1-Click Presets)
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
                                        {FOOTER_PRESETS.map((preset) => {
                                            const isSelected =
                                                settings['footer_bg_color'] === preset.bgColor &&
                                                settings['footer_bg_color_end'] === preset.bgColorEnd;
                                            return (
                                                <button
                                                    key={preset.id}
                                                    type="button"
                                                    onClick={() => applyFooterPreset(preset)}
                                                    className={`text-left p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                                                        isSelected
                                                            ? 'border-blue-600 ring-2 ring-blue-500/20 bg-white dark:bg-gray-800 shadow-xs'
                                                            : 'border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/60 hover:border-blue-300'
                                                    }`}
                                                >
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span
                                                                className="w-6 h-6 rounded-md border border-black/10 shadow-2xs shrink-0"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${preset.bgColor} 0%, ${preset.bgColorEnd} 100%)`,
                                                                }}
                                                            />
                                                            <span
                                                                className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                                                                style={{
                                                                    backgroundColor: preset.accentColor,
                                                                }}
                                                                title="Màu điểm nhấn"
                                                            />
                                                        </div>
                                                        <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                                                            {preset.name}
                                                        </p>
                                                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                                                            {preset.desc}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Custom Color Pickers & Background Style */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-2 border-t border-gray-200/70 dark:border-gray-700">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                            Kiểu nền Footer
                                        </label>
                                        <select
                                            value={footerBgStyle}
                                            onChange={(e) =>
                                                handleChange('footer_bg_style', e.target.value)
                                            }
                                            className="block w-full rounded-md border-gray-300 text-sm p-2 border bg-white dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="gradient">Chuyển sắc (Gradient)</option>
                                            <option value="solid">Màu đơn sắc (Solid)</option>
                                            <option value="image">Ảnh nền + Lớp phủ màu</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                            Màu nền chính
                                        </label>
                                        <div className="flex items-center gap-1.5">
                                            <input
                                                type="color"
                                                value={footerBgColor}
                                                onChange={(e) =>
                                                    handleChange('footer_bg_color', e.target.value)
                                                }
                                                className="h-9 w-11 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
                                            />
                                            <input
                                                type="text"
                                                value={footerBgColor}
                                                onChange={(e) =>
                                                    handleChange('footer_bg_color', e.target.value)
                                                }
                                                className="block w-full rounded-md border-gray-300 text-xs font-mono p-2 border bg-white dark:bg-gray-800 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                            Màu chuyển sắc / Đáy
                                        </label>
                                        <div className="flex items-center gap-1.5">
                                            <input
                                                type="color"
                                                value={footerBgColorEnd}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'footer_bg_color_end',
                                                        e.target.value
                                                    )
                                                }
                                                className="h-9 w-11 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
                                            />
                                            <input
                                                type="text"
                                                value={footerBgColorEnd}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'footer_bg_color_end',
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md border-gray-300 text-xs font-mono p-2 border bg-white dark:bg-gray-800 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                            Màu điểm nhấn (Icon/Line)
                                        </label>
                                        <div className="flex items-center gap-1.5">
                                            <input
                                                type="color"
                                                value={footerAccentColor}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'footer_accent_color',
                                                        e.target.value
                                                    )
                                                }
                                                className="h-9 w-11 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
                                            />
                                            <input
                                                type="text"
                                                value={footerAccentColor}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'footer_accent_color',
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md border-gray-300 text-xs font-mono p-2 border bg-white dark:bg-gray-800 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                            Họa tiết chìm
                                        </label>
                                        <select
                                            value={footerPattern}
                                            onChange={(e) =>
                                                handleChange('footer_pattern', e.target.value)
                                            }
                                            className="block w-full rounded-md border-gray-300 text-sm p-2 border bg-white dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="none">Không dùng họa tiết</option>
                                            <option value="grid">Lưới kỹ thuật (Grid)</option>
                                            <option value="dots">Chấm bi mịn (Dots)</option>
                                            <option value="glow">Ánh sáng góc (Ambient Glow)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                            Màu chữ Footer
                                        </label>
                                        <select
                                            value={footerTextMode}
                                            onChange={(e) =>
                                                handleChange('footer_text_mode', e.target.value)
                                            }
                                            className="block w-full rounded-md border-gray-300 text-sm p-2 border bg-white dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="auto">Tự động theo độ sáng nền</option>
                                            <option value="light">Chữ Trắng / Sáng</option>
                                            <option value="dark">Chữ Đen / Xám đậm</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Optional Background Image Controls when style === 'image' */}
                                {footerBgStyle === 'image' && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-gray-200/70 bg-white dark:bg-gray-800 p-3 rounded-lg">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                                                Ảnh nền Footer (Background Image)
                                            </label>
                                            <div className="flex flex-wrap gap-2 items-center">
                                                <input
                                                    type="text"
                                                    value={footerBgImage}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            'footer_bg_image',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="https://..."
                                                    className="flex-1 rounded-md border-gray-300 text-xs p-2 border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPickerTargetKey('footer_bg_image')
                                                    }
                                                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                                                >
                                                    <FolderOpen className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                                                    Thư viện
                                                </button>
                                                <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100">
                                                    {uploadingFooterBg ? (
                                                        <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                                                    ) : (
                                                        <Upload className="h-3.5 w-3.5 mr-1.5" />
                                                    )}
                                                    Tải ảnh
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) =>
                                                            handleImageUpload(
                                                                e,
                                                                'footer_bg_image',
                                                                setUploadingFooterBg
                                                            )
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                                                Độ phủ màu nền ({settings['footer_bg_overlay'] || '88'}%)
                                            </label>
                                            <input
                                                type="range"
                                                min={40}
                                                max={98}
                                                value={settings['footer_bg_overlay'] || '88'}
                                                onChange={(e) =>
                                                    handleChange('footer_bg_overlay', e.target.value)
                                                }
                                                className="w-full mt-2"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Section 3: Slogan, Contact & Menu Shortcuts */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                        Dòng chữ dưới Logo Footer (Tiếng Việt)
                                    </label>
                                    <input
                                        type="text"
                                        value={activeFooterSloganVi}
                                        onChange={(e) => handleSloganViChange(e.target.value)}
                                        placeholder="Chuyên nghiệp - Tận tâm - Tân tiến"
                                        className="shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                        Dòng chữ dưới Logo Footer (Tiếng Anh - EN)
                                    </label>
                                    <input
                                        type="text"
                                        value={activeFooterSloganEn}
                                        onChange={(e) => handleSloganEnChange(e.target.value)}
                                        placeholder="Professional - Dedicated - Innovative"
                                        className="shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                        Chứng nhận chất lượng góc phải đáy Footer
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            settings['footer_certification_text'] ??
                                            'Certified ISO 9001:2015'
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                'footer_certification_text',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Certified ISO 9001:2015"
                                        className="shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Quick Footer Contact & Menu Manager Link */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-700/40 p-3.5 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1.5">
                                        <Headset size={13} className="text-blue-600" />
                                        Hotline Liên hệ (Footer)
                                    </label>
                                    <input
                                        type="text"
                                        value={settings['contact_hotline'] || ''}
                                        onChange={(e) =>
                                            handleChange('contact_hotline', e.target.value)
                                        }
                                        placeholder="(+84) 981 789 248"
                                        className="shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1.5">
                                        <Mail size={13} className="text-blue-600" />
                                        Email Liên hệ (Footer - 1 dòng)
                                    </label>
                                    <input
                                        type="email"
                                        value={settings['contact_email'] || ''}
                                        onChange={(e) =>
                                            handleChange('contact_email', e.target.value)
                                        }
                                        placeholder="contact@vietvinhcorp.com"
                                        className="shadow-xs focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div className="flex flex-col justify-end">
                                    <Link
                                        to="/menu"
                                        className="inline-flex items-center justify-center px-3 py-2 border border-blue-200 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors h-[38px]"
                                    >
                                        <Navigation className="h-3.5 w-3.5 mr-1.5" />
                                        Chỉnh các cột Menu Footer
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Favicon */}
                        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex-shrink-0">
                                {settings['favicon_url'] ? (
                                    <div className="relative group">
                                        <img
                                            src={settings['favicon_url']}
                                            alt="Favicon"
                                            className="h-16 w-16 object-contain bg-gray-50 border rounded-md p-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage('favicon_url')}
                                            className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Xóa Favicon"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-16 w-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50/50">
                                        <ImageIcon className="h-6 w-6 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Favicon (Biểu tượng thanh trình duyệt)
                                </label>
                                <p className="text-sm text-gray-500">
                                    Khuyên dùng ảnh vuông, định dạng .ico, .png, hoặc .svg (ví dụ 32x32px).
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <label
                                        htmlFor="favicon-upload"
                                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        {uploadingFavicon ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                            <Upload className="h-4 w-4 mr-2" />
                                        )}
                                        {uploadingFavicon ? t('uploading') : 'Đổi Favicon'}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setPickerTargetKey('favicon_url')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        <FolderOpen className="h-4 w-4 mr-2 text-blue-600" />
                                        Chọn từ Thư viện
                                    </button>
                                    <input
                                        id="favicon-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*,.ico"
                                        onChange={(e) =>
                                            handleImageUpload(e, 'favicon_url', setUploadingFavicon)
                                        }
                                        disabled={uploadingFavicon}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* OG Image */}
                        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex-shrink-0">
                                {settings['og_image_url'] ? (
                                    <div className="relative group">
                                        <img
                                            src={settings['og_image_url']}
                                            alt="OG Image"
                                            className="h-24 w-auto max-w-[200px] object-cover bg-gray-50 border rounded-md p-1"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage('og_image_url')}
                                            className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Xóa Ảnh"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-24 w-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50/50">
                                        <ImageIcon className="h-8 w-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Ảnh Mạng Xã Hội (OG Image)
                                </label>
                                <p className="text-sm text-gray-500">
                                    Ảnh hiển thị khi chia sẻ link lên Facebook, Zalo, Twitter. Khuyên dùng tỉ lệ 1200x630px.
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <label
                                        htmlFor="og-image-upload"
                                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        {uploadingOgImage ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        ) : (
                                            <Upload className="h-4 w-4 mr-2" />
                                        )}
                                        {uploadingOgImage ? t('uploading') : 'Đổi Ảnh'}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setPickerTargetKey('og_image_url')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        <FolderOpen className="h-4 w-4 mr-2 text-blue-600" />
                                        Chọn từ Thư viện
                                    </button>
                                    <input
                                        id="og-image-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageUpload(
                                                e,
                                                'og_image_url',
                                                setUploadingOgImage
                                            )
                                        }
                                        disabled={uploadingOgImage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* General Information */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            {t('general_info_seo')}
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('company_name')}
                                </label>
                                <input
                                    type="text"
                                    value={settings['company_name'] || ''}
                                    onChange={(e) => handleChange('company_name', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="VIETVINH INDUSTRIES CORPORATION"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('slogan')} (Tiếng Việt)
                                </label>
                                <input
                                    type="text"
                                    value={activeFooterSloganVi}
                                    onChange={(e) => handleSloganViChange(e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Chuyên nghiệp - Tận tâm - Tân tiến"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('slogan')} (Tiếng Anh - EN)
                                </label>
                                <input
                                    type="text"
                                    value={activeFooterSloganEn}
                                    onChange={(e) => handleSloganEnChange(e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Professional - Dedicated - Innovative"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('meta_title')}
                                </label>
                                <input
                                    type="text"
                                    value={settings['site_title'] || ''}
                                    onChange={(e) => handleChange('site_title', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tên miền Website (Domain URL)
                                </label>
                                <input
                                    type="text"
                                    value={settings['site_url'] || ''}
                                    onChange={(e) => handleChange('site_url', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="http://vietvinhcorp.com/"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('meta_description')}
                                </label>
                                <textarea
                                    rows={2}
                                    value={settings['site_description'] || ''}
                                    onChange={(e) => handleSloganViChange(e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Từ Khóa SEO (Meta Keywords)
                                </label>
                                <input
                                    type="text"
                                    value={settings['site_keywords'] || ''}
                                    onChange={(e) => handleChange('site_keywords', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="ví dụ: điện lạnh, máy lạnh, thi công..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('copyright_text_label')} (Tiếng Việt)
                                </label>
                                <textarea
                                    rows={2}
                                    value={settings['copyright_text'] || ''}
                                    onChange={(e) => handleChange('copyright_text', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder={t('copyright_text_placeholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('copyright_text_label')} (Tiếng Anh - EN)
                                </label>
                                <textarea
                                    rows={2}
                                    value={settings['copyright_text_en'] || ''}
                                    onChange={(e) =>
                                        handleChange('copyright_text_en', e.target.value)
                                    }
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="© 2026 VIETVINH INDUSTRIES CORPORATION. All rights reserved."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            {t('contact_details')}
                        </h3>
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                                    {t('address')} & Hệ thống Chi nhánh
                                </label>
                                <div className="space-y-4">
                                    {(() => {
                                        let branches: Branch[] = [];
                                        try {
                                            const rawValue = settings['contact_address'] || '[]';
                                            if (
                                                rawValue.startsWith('[') ||
                                                rawValue.startsWith('{')
                                            ) {
                                                branches = JSON.parse(rawValue);
                                                if (!Array.isArray(branches))
                                                    branches = [branches];
                                            } else if (rawValue.trim()) {
                                                branches = [
                                                    {
                                                        id: 'legacy-1',
                                                        title: 'Trụ sở chính',
                                                        address: rawValue,
                                                        phone: settings['contact_phone'] || '',
                                                        email: settings['contact_email'] || '',
                                                    },
                                                ];
                                            }
                                        } catch (e) {
                                            branches = [];
                                        }

                                        const updateBranches = (newBranches: Branch[]) => {
                                            handleChange(
                                                'contact_address',
                                                JSON.stringify(newBranches)
                                            );
                                        };

                                        const addBranch = () => {
                                            const newBranch: Branch = {
                                                id: Date.now().toString(),
                                                title: '',
                                                address: '',
                                                phone: '',
                                                email: '',
                                            };
                                            updateBranches([...branches, newBranch]);
                                        };

                                        const removeBranch = (id: string) => {
                                            updateBranches(branches.filter((b) => b.id !== id));
                                        };

                                        const handleBranchChange = (
                                            id: string,
                                            field: keyof Branch,
                                            value: string
                                        ) => {
                                            updateBranches(
                                                branches.map((b) =>
                                                    b.id === id ? { ...b, [field]: value } : b
                                                )
                                            );
                                        };

                                        return (
                                            <div className="space-y-6">
                                                {branches.map((branch) => (
                                                    <div
                                                        key={branch.id}
                                                        className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 relative group"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() => removeBranch(branch.id)}
                                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Xóa chi nhánh"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="md:col-span-2">
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                                                                    Tên Chi nhánh / Văn phòng
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={branch.title}
                                                                    onChange={(e) =>
                                                                        handleBranchChange(
                                                                            branch.id,
                                                                            'title',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 border"
                                                                    placeholder="e.g. Trụ sở chính, Chi nhánh Thủ Đức..."
                                                                />
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                                                                    Địa chỉ chi tiết
                                                                </label>
                                                                <div className="relative">
                                                                    <MapPin
                                                                        size={14}
                                                                        className="absolute left-2.5 top-2.5 text-gray-400"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={branch.address}
                                                                        onChange={(e) =>
                                                                            handleBranchChange(
                                                                                branch.id,
                                                                                'address',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="w-full pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 border"
                                                                        placeholder="Số nhà, tên đường, quận/huyện..."
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                                                                    Số điện thoại
                                                                </label>
                                                                <div className="relative">
                                                                    <Phone
                                                                        size={14}
                                                                        className="absolute left-2.5 top-2.5 text-gray-400"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={branch.phone}
                                                                        onChange={(e) =>
                                                                            handleBranchChange(
                                                                                branch.id,
                                                                                'phone',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="w-full pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 border"
                                                                        placeholder="+84..."
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                                                                    Email liên hệ
                                                                </label>
                                                                <div className="relative">
                                                                    <Mail
                                                                        size={14}
                                                                        className="absolute left-2.5 top-2.5 text-gray-400"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={branch.email}
                                                                        onChange={(e) =>
                                                                            handleBranchChange(
                                                                                branch.id,
                                                                                'email',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="w-full pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 border"
                                                                        placeholder="contact@..."
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                                                                    Google Maps Link (Tùy chọn)
                                                                </label>
                                                                <div className="relative">
                                                                    <ExternalLink
                                                                        size={14}
                                                                        className="absolute left-2.5 top-2.5 text-gray-400"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={branch.map_url || ''}
                                                                        onChange={(e) =>
                                                                            handleBranchChange(
                                                                                branch.id,
                                                                                'map_url',
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="w-full pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 font-mono text-xs border"
                                                                        placeholder="https://maps.app.goo.gl/..."
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                <button
                                                    type="button"
                                                    onClick={addBranch}
                                                    className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-2 font-medium"
                                                >
                                                    <Plus size={18} />
                                                    Thêm chi nhánh / Văn phòng mới
                                                </button>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('phone')}
                                    </label>
                                    <input
                                        type="text"
                                        value={settings['contact_phone'] || ''}
                                        onChange={(e) =>
                                            handleChange('contact_phone', e.target.value)
                                        }
                                        className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="+84 775 842 789"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('hotline')}
                                    </label>
                                    <input
                                        type="text"
                                        value={settings['contact_hotline'] || ''}
                                        onChange={(e) =>
                                            handleChange('contact_hotline', e.target.value)
                                        }
                                        className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="(+84) 981 789 248"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('email')}
                                    </label>
                                    <input
                                        type="email"
                                        value={settings['contact_email'] || ''}
                                        onChange={(e) =>
                                            handleChange('contact_email', e.target.value)
                                        }
                                        className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="contact@vietvinhcorp.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('working_hours')}
                                    </label>
                                    <input
                                        type="text"
                                        value={settings['contact_working_hours'] || ''}
                                        onChange={(e) =>
                                            handleChange('contact_working_hours', e.target.value)
                                        }
                                        className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="8:00 - 17:30, Thứ 2 - Thứ 6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            {t('social_media_links')}
                        </h3>
                        <div className="grid grid-cols-1 gap-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('facebook_label')}
                                </label>
                                <input
                                    type="text"
                                    value={settings['social_facebook'] || ''}
                                    onChange={(e) =>
                                        handleChange('social_facebook', e.target.value)
                                    }
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('zalo_label')}
                                </label>
                                <input
                                    type="text"
                                    value={settings['social_zalo'] || ''}
                                    onChange={(e) => handleChange('social_zalo', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="https://zalo.me/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    LinkedIn
                                </label>
                                <input
                                    type="text"
                                    value={settings['social_linkedin'] || ''}
                                    onChange={(e) =>
                                        handleChange('social_linkedin', e.target.value)
                                    }
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="https://linkedin.com/company/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('youtube_label')}
                                </label>
                                <input
                                    type="text"
                                    value={settings['social_youtube'] || ''}
                                    onChange={(e) =>
                                        handleChange('social_youtube', e.target.value)
                                    }
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map & Embeds */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            {t('map_embeds')}
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('map_embed_url')}
                            </label>
                            <textarea
                                rows={4}
                                value={settings['map_embed_url'] || ''}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val.includes('<iframe')) {
                                        const match = val.match(/src=["']([^"']+)["']/);
                                        if (match) {
                                            handleChange('map_embed_url', match[1]);
                                            return;
                                        }
                                    }
                                    handleChange('map_embed_url', val);
                                }}
                                className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-xs"
                                placeholder="Dán mã nhúng <iframe> hoặc link nhúng Google Maps..."
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Bạn có thể dán toàn bộ mã &lt;iframe&gt; từ Google Maps, hệ thống sẽ tự động lọc lấy link nhúng chuẩn.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            {t('security_settings')}
                        </h3>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="security_disable_copy"
                                    type="checkbox"
                                    checked={settings['security_disable_copy'] === 'true'}
                                    onChange={(e) =>
                                        handleChange(
                                            'security_disable_copy',
                                            e.target.checked ? 'true' : 'false'
                                        )
                                    }
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="security_disable_copy"
                                    className="font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {t('disable_copy')}
                                </label>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {t('disable_copy_hint')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Settings */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            {t('feature_settings')}
                        </h3>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="enable_profile_download"
                                    type="checkbox"
                                    checked={settings['enable_profile_download'] !== 'false'}
                                    onChange={(e) =>
                                        handleChange(
                                            'enable_profile_download',
                                            e.target.checked ? 'true' : 'false'
                                        )
                                    }
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="enable_profile_download"
                                    className="font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {t('enable_profile_download')}
                                </label>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {t('enable_profile_download_hint')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Settings */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg lg:col-span-2">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                            Nâng cao (Advanced)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Header Scripts (Thêm vào &lt;head&gt; - GTM, Fb Pixel...)
                                </label>
                                <textarea
                                    rows={6}
                                    value={settings['header_scripts'] || ''}
                                    onChange={(e) =>
                                        handleChange('header_scripts', e.target.value)
                                    }
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-xs"
                                    placeholder="<script>...</script>"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Footer Scripts (Thêm trước &lt;/body&gt; - Chat widget...)
                                </label>
                                <textarea
                                    rows={6}
                                    value={settings['footer_scripts'] || ''}
                                    onChange={(e) =>
                                        handleChange('footer_scripts', e.target.value)
                                    }
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-xs"
                                    placeholder="<script>...</script>"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ImagePickerModal
                open={Boolean(pickerTargetKey)}
                onOpenChange={(open) => {
                    if (!open) setPickerTargetKey(null);
                }}
                onSelect={(url) => {
                    if (pickerTargetKey) {
                        handleChange(pickerTargetKey, url);
                        toast.success(
                            'Đã chọn ảnh từ thư viện. Nhấn "Lưu thay đổi" để áp dụng.'
                        );
                        setPickerTargetKey(null);
                    }
                }}
            />
        </div>
    );
};

export default SettingsPage;
