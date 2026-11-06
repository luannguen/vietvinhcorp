import React, { useState, useEffect } from 'react';
import { Save, Loader2, Upload, Image as ImageIcon, X, Plus, Trash2, MapPin, Phone, Mail, ExternalLink, FolderOpen, Headset, Navigation } from 'lucide-react';
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

const SettingsPage: React.FC = () => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [originalSettings, setOriginalSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
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
            const settingMap = result.data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>);
            setSettings(settingMap);
            setOriginalSettings(settingMap);
        } else {
            toast.error(t('load_settings_fail'));
        }
        setLoading(false);
    };

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSloganViChange = (value: string) => {
        setSettings(prev => ({
            ...prev,
            site_description: value,
            footer_slogan: value,
            company_slogan: value
        }));
    };

    const handleSloganEnChange = (value: string) => {
        setSettings(prev => ({
            ...prev,
            site_description_en: value,
            footer_slogan_en: value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string, setUploading: (val: boolean) => void) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        if (file.size > 2 * 1024 * 1024) {
            toast.error(t('logo_too_large'));
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
            value
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
    const activeFooterSloganVi = settings['footer_slogan'] || settings['site_description'] || settings['company_slogan'] || 'Chuyên nghiệp - Tận tâm - Tân tiến';
    const activeFooterSloganEn = settings['footer_slogan_en'] || settings['site_description_en'] || '';
    const footerLogoWidthNum = settings['footer_logo_width'] ? parseInt(settings['footer_logo_width'], 10) : 0;

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('system_settings')}</h1>
                <div className="flex space-x-3">
                    <button
                        onClick={handleSave}
                        disabled={saving || !hasChanges}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                            !hasChanges ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        } transition-colors disabled:opacity-50`}
                    >
                        {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        {t('save_changes')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Brand Identity */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg lg:col-span-2">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('brand_identity')}</h3>
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
                                    {t('website_logo')}
                                </label>
                                <p className="text-sm text-gray-500">
                                    {t('logo_recommendation')}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <label htmlFor="logo-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                                        onChange={(e) => handleImageUpload(e, 'site_logo', setUploadingLogo)}
                                        disabled={uploadingLogo}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Logo & Live Footer Preview */}
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                            <div className="flex flex-col lg:flex-row items-start gap-6">
                                {/* Live Preview on Actual Footer Blue Background */}
                                <div className="w-full lg:w-auto flex-shrink-0">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                        Xem trước hiển thị trên Footer (Không viền nổi & Cân đều dòng chữ)
                                    </p>
                                    <div className="bg-[#0B3B8C] text-white p-6 rounded-xl shadow-inner min-w-[280px] flex flex-col items-start justify-center relative group">
                                        {activeFooterLogo ? (
                                            <div className="inline-flex flex-col items-center min-w-[200px] max-w-full space-y-3">
                                                <div className={footerLogoWidthNum > 0 ? '' : 'w-0 min-w-full'}>
                                                    <img
                                                        src={activeFooterLogo}
                                                        alt="Footer Logo Preview"
                                                        style={footerLogoWidthNum > 0 ? { width: `${footerLogoWidthNum}px` } : undefined}
                                                        className={`${footerLogoWidthNum > 0 ? '' : 'w-full'} h-auto max-h-24 object-contain block`}
                                                    />
                                                </div>
                                                <p className="text-gray-200 text-base font-medium leading-relaxed text-center whitespace-nowrap">
                                                    {activeFooterSloganVi}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="h-24 w-48 border-2 border-dashed border-white/30 rounded-md flex items-center justify-center">
                                                <ImageIcon className="h-8 w-8 text-white/50" />
                                            </div>
                                        )}
                                        {settings['footer_logo'] && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage('footer_logo')}
                                                className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Xóa Logo Footer riêng (dùng chung Logo Header)"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4 w-full">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t('footer_logo_label')}
                                        </label>
                                        <p className="text-sm text-gray-500">
                                            Sử dụng cho phần chân trang (Footer). Đã bỏ khung viền nổi và tự động căn đều theo dòng chữ Slogan bên dưới. Nếu để trống sẽ tự động dùng Logo Header.
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <label htmlFor="footer-logo-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                {uploadingFooterLogo ? (
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                ) : (
                                                    <Upload className="h-4 w-4 mr-2" />
                                                )}
                                                {uploadingFooterLogo ? t('uploading') : t('change_logo')}
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setPickerTargetKey('footer_logo')}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                <FolderOpen className="h-4 w-4 mr-2 text-blue-600" />
                                                Chọn từ Thư viện
                                            </button>
                                            {settings['footer_logo'] && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage('footer_logo')}
                                                    className="inline-flex items-center px-3 py-2 border border-red-200 text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100"
                                                >
                                                    <X className="h-4 w-4 mr-1" />
                                                    Dùng chung Logo Header
                                                </button>
                                            )}
                                            <input
                                                id="footer-logo-upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'footer_logo', setUploadingFooterLogo)}
                                                disabled={uploadingFooterLogo}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer Logo Width & Slogan Customization */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                        <div>
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                                Độ rộng Logo Footer
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={400}
                                                    step={5}
                                                    value={settings['footer_logo_width'] || ''}
                                                    onChange={(e) => handleChange('footer_logo_width', e.target.value)}
                                                    placeholder="Tự động cân đều dòng chữ"
                                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                />
                                                {settings['footer_logo_width'] && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleChange('footer_logo_width', '')}
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
                                        <div>
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
                                                Dòng chữ dưới Logo Footer (Tiếng Việt)
                                            </label>
                                            <input
                                                type="text"
                                                value={activeFooterSloganVi}
                                                onChange={(e) => handleSloganViChange(e.target.value)}
                                                placeholder="Chuyên nghiệp - Tận tâm - Tân tiến"
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Quick Footer Contact & Menu Manager Link */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 bg-gray-50 dark:bg-gray-700/40 p-3.5 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <div>
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1.5">
                                                <Headset size={13} className="text-blue-600" />
                                                Hotline Liên hệ (Footer)
                                            </label>
                                            <input
                                                type="text"
                                                value={settings['contact_hotline'] || ''}
                                                onChange={(e) => handleChange('contact_hotline', e.target.value)}
                                                placeholder="(+84) 981 789 248"
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
                                                onChange={(e) => handleChange('contact_email', e.target.value)}
                                                placeholder="contact@vietvinhcorp.com"
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
                                    <label htmlFor="favicon-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                                        onChange={(e) => handleImageUpload(e, 'favicon_url', setUploadingFavicon)}
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
                                    <label htmlFor="og-image-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
                                        onChange={(e) => handleImageUpload(e, 'og_image_url', setUploadingOgImage)}
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('general_info_seo')}</h3>
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('company_name')}</label>
                                <input
                                    type="text"
                                    value={settings['company_name'] || ''}
                                    onChange={(e) => handleChange('company_name', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="VIETVINH INDUSTRIES CORPORATION"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('slogan')} (Tiếng Việt)</label>
                                <input
                                    type="text"
                                    value={activeFooterSloganVi}
                                    onChange={(e) => handleSloganViChange(e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Chuyên nghiệp - Tận tâm - Tân tiến"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('slogan')} (Tiếng Anh - EN)</label>
                                <input
                                    type="text"
                                    value={activeFooterSloganEn}
                                    onChange={(e) => handleSloganEnChange(e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Professional - Dedicated - Innovative"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('meta_title')}</label>
                                <input
                                    type="text"
                                    value={settings['site_title'] || ''}
                                    onChange={(e) => handleChange('site_title', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên miền Website (Domain URL)</label>
                                <input
                                    type="text"
                                    value={settings['site_url'] || ''}
                                    onChange={(e) => handleChange('site_url', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="http://vietvinhcorp.com/"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('meta_description')}</label>
                                <textarea
                                    rows={2}
                                    value={settings['site_description'] || ''}
                                    onChange={(e) => handleSloganViChange(e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Từ Khóa SEO (Meta Keywords)</label>
                                <input
                                    type="text"
                                    value={settings['site_keywords'] || ''}
                                    onChange={(e) => handleChange('site_keywords', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="ví dụ: điện lạnh, máy lạnh, thi công..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('copyright_text_label')} (Tiếng Việt)</label>
                                <textarea
                                    rows={2}
                                    value={settings['copyright_text'] || ''}
                                    onChange={(e) => handleChange('copyright_text', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder={t('copyright_text_placeholder')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('copyright_text_label')} (Tiếng Anh - EN)</label>
                                <textarea
                                    rows={2}
                                    value={settings['copyright_text_en'] || ''}
                                    onChange={(e) => handleChange('copyright_text_en', e.target.value)}
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('contact_details')}</h3>
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{t('address')} & Hệ thống Chi nhánh</label>
                                <div className="space-y-4">
                                    {(() => {
                                        let branches: Branch[] = [];
                                        try {
                                            const rawValue = settings['contact_address'] || '[]';
                                            if (rawValue.startsWith('[') || rawValue.startsWith('{')) {
                                                branches = JSON.parse(rawValue);
                                                if (!Array.isArray(branches)) branches = [branches];
                                            } else if (rawValue.trim()) {
                                                branches = [{
                                                    id: 'legacy-1',
                                                    title: 'Trụ sở chính',
                                                    address: rawValue,
                                                    phone: settings['contact_phone'] || '',
                                                    email: settings['contact_email'] || ''
                                                }];
                                            }
                                        } catch (e) {
                                            branches = [];
                                        }

                                        const updateBranches = (newBranches: Branch[]) => {
                                            handleChange('contact_address', JSON.stringify(newBranches));
                                        };

                                        const addBranch = () => {
                                            const newBranch: Branch = {
                                                id: Date.now().toString(),
                                                title: '',
                                                address: '',
                                                phone: '',
                                                email: ''
                                            };
                                            updateBranches([...branches, newBranch]);
                                        };

                                        const removeBranch = (id: string) => {
                                            updateBranches(branches.filter(b => b.id !== id));
                                        };

                                        const handleBranchChange = (id: string, field: keyof Branch, value: string) => {
                                            updateBranches(branches.map(b => b.id === id ? { ...b, [field]: value } : b));
                                        };

                                        return (
                                            <div className="space-y-6">
                                                {branches.map((branch) => (
                                                    <div key={branch.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700 relative group">
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
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Tên Chi nhánh / Văn phòng</label>
                                                                <input
                                                                    type="text"
                                                                    value={branch.title}
                                                                    onChange={(e) => handleBranchChange(branch.id, 'title', e.target.value)}
                                                                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2"
                                                                    placeholder="e.g. Trụ sở chính, Chi nhánh Thủ Đức..."
                                                                />
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Địa chỉ chi tiết</label>
                                                                <div className="relative">
                                                                    <MapPin size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                                                                    <input
                                                                        type="text"
                                                                        value={branch.address}
                                                                        onChange={(e) => handleBranchChange(branch.id, 'address', e.target.value)}
                                                                        className="w-full pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2"
                                                                        placeholder="Số nhà, tên đường, quận/huyện..."
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Số điện thoại</label>
                                                                <div className="relative">
                                                                    <Phone size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                                                                    <input
                                                                        type="text"
                                                                        value={branch.phone}
                                                                        onChange={(e) => handleBranchChange(branch.id, 'phone', e.target.value)}
                                                                        className="w-full pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2"
                                                                        placeholder="+84..."
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Email liên hệ</label>
                                                                <div className="relative">
                                                                    <Mail size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                                                                    <input
                                                                        type="text"
                                                                        value={branch.email}
                                                                        onChange={(e) => handleBranchChange(branch.id, 'email', e.target.value)}
                                                                        className="w-full pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2"
                                                                        placeholder="contact@..."
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Google Maps Link (Tùy chọn)</label>
                                                                <div className="relative">
                                                                    <ExternalLink size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                                                                    <input
                                                                        type="text"
                                                                        value={branch.map_url || ''}
                                                                        onChange={(e) => handleBranchChange(branch.id, 'map_url', e.target.value)}
                                                                        className="w-full pl-9 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 font-mono text-xs"
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('phone')}</label>
                                    <input
                                        type="text"
                                        value={settings['contact_phone'] || ''}
                                        onChange={(e) => handleChange('contact_phone', e.target.value)}
                                        className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="+84 775 842 789"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('hotline')}</label>
                                    <input
                                        type="text"
                                        value={settings['contact_hotline'] || ''}
                                        onChange={(e) => handleChange('contact_hotline', e.target.value)}
                                        className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="(+84) 981 789 248"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('email')}</label>
                                    <input
                                        type="email"
                                        value={settings['contact_email'] || ''}
                                        onChange={(e) => handleChange('contact_email', e.target.value)}
                                        className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="contact@vietvinhcorp.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('working_hours')}</label>
                                    <input
                                        type="text"
                                        value={settings['contact_working_hours'] || ''}
                                        onChange={(e) => handleChange('contact_working_hours', e.target.value)}
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('social_media_links')}</h3>
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('facebook_label')}</label>
                                <input
                                    type="text"
                                    value={settings['social_facebook'] || ''}
                                    onChange={(e) => handleChange('social_facebook', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('zalo_label')}</label>
                                <input
                                    type="text"
                                    value={settings['social_zalo'] || ''}
                                    onChange={(e) => handleChange('social_zalo', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="https://zalo.me/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('youtube_label')}</label>
                                <input
                                    type="text"
                                    value={settings['social_youtube'] || ''}
                                    onChange={(e) => handleChange('social_youtube', e.target.value)}
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('map_embeds')}</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('map_embed_url')}</label>
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
                            <p className="mt-1 text-xs text-gray-500">Bạn có thể dán toàn bộ mã &lt;iframe&gt; từ Google Maps, hệ thống sẽ tự động lọc lấy link nhúng chuẩn.</p>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('security_settings')}</h3>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="security_disable_copy"
                                    type="checkbox"
                                    checked={settings['security_disable_copy'] === 'true'}
                                    onChange={(e) => handleChange('security_disable_copy', e.target.checked ? 'true' : 'false')}
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="security_disable_copy" className="font-medium text-gray-700 dark:text-gray-300">
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{t('feature_settings')}</h3>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="enable_profile_download"
                                    type="checkbox"
                                    checked={settings['enable_profile_download'] !== 'false'}
                                    onChange={(e) => handleChange('enable_profile_download', e.target.checked ? 'true' : 'false')}
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="enable_profile_download" className="font-medium text-gray-700 dark:text-gray-300">
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Nâng cao (Advanced)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Header Scripts (Thêm vào &lt;head&gt; - GTM, Fb Pixel...)</label>
                                <textarea
                                    rows={6}
                                    value={settings['header_scripts'] || ''}
                                    onChange={(e) => handleChange('header_scripts', e.target.value)}
                                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-xs"
                                    placeholder="<script>...</script>"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Footer Scripts (Thêm trước &lt;/body&gt; - Chat widget...)</label>
                                <textarea
                                    rows={6}
                                    value={settings['footer_scripts'] || ''}
                                    onChange={(e) => handleChange('footer_scripts', e.target.value)}
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
                        toast.success('Đã chọn ảnh từ thư viện. Nhấn "Lưu thay đổi" để áp dụng.');
                        setPickerTargetKey(null);
                    }
                }}
            />
        </div>
    );
};

export default SettingsPage;
