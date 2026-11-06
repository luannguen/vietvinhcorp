import React, { useState, useEffect } from 'react';
import { Project, Category } from '@/components/data/types';
import { mediaService } from '@/services/mediaService';
import { categoryService } from '@/services/categoryService';
import { ImagePickerModal } from '@/components/admin/media/ImagePickerModal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { X, Upload, Image as ImageIcon, Loader2, Plus, Code, Eye, Star } from 'lucide-react';

interface ProjectFormProps {
    initialData?: Project;
    categories: Category[];
    onSave: (project: Partial<Project>) => Promise<void>;
    onCancel: () => void;
    onCategoryCreated?: (newCat: Category) => void;
}

const toSlug = (str: string) =>
    str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

const ProjectForm: React.FC<ProjectFormProps> = ({
    initialData,
    categories,
    onSave,
    onCancel,
    onCategoryCreated,
}) => {
    const [formData, setFormData] = useState<Partial<Project>>({
        name: '',
        slug: '',
        description: '',
        content: '',
        client: '',
        completion_date: '',
        category_id: '',
        image_url: '',
        is_featured: false,
    });

    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
    const [showRawHtml, setShowRawHtml] = useState(false);

    // Quick-create category state
    const [showNewCatForm, setShowNewCatForm] = useState(false);
    const [newCatName, setNewCatName] = useState('');
    const [newCatDesc, setNewCatDesc] = useState('');
    const [creatingCat, setCreatingCat] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                category_id: initialData.category_id || '',
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleNameBlur = () => {
        if (formData.name && !formData.slug) {
            setFormData((prev) => ({ ...prev, slug: toSlug(formData.name || '') }));
        }
    };

    const handleDirectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Dung lượng ảnh tối đa là 5MB');
            return;
        }

        setUploadingImage(true);
        try {
            const uploaded = await mediaService.uploadImage(file, 'projects');
            if (uploaded?.url) {
                setFormData((prev) => ({ ...prev, image_url: uploaded.url }));
                toast.success('Đã tải ảnh dự án lên thành công');
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err?.message || 'Lỗi khi tải ảnh lên');
        } finally {
            setUploadingImage(false);
            e.target.value = '';
        }
    };

    const handleQuickCreateCategory = async () => {
        if (!newCatName.trim()) {
            toast.error('Vui lòng nhập tên danh mục dự án');
            return;
        }
        setCreatingCat(true);
        try {
            const created = await categoryService.createCategory({
                name: newCatName.trim(),
                slug: toSlug(newCatName.trim()),
                description: newCatDesc.trim() || undefined,
                type: 'project',
            } as any);
            onCategoryCreated?.(created);
            setFormData((prev) => ({ ...prev, category_id: created.id }));
            setNewCatName('');
            setNewCatDesc('');
            setShowNewCatForm(false);
            toast.success(`Đã tạo danh mục "${created.name}"`);
        } catch (err: any) {
            console.error(err);
            toast.error('Không thể tạo danh mục mới');
        } finally {
            setCreatingCat(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name?.trim()) {
            toast.error('Vui lòng nhập tên dự án');
            return;
        }
        const finalSlug = formData.slug?.trim() || toSlug(formData.name);
        setLoading(true);
        try {
            await onSave({
                ...formData,
                name: formData.name.trim(),
                slug: finalSlug,
                category_id: formData.category_id || undefined,
                completion_date: formData.completion_date || undefined,
            });
        } catch (error) {
            console.error('Failed to save', error);
        } finally {
            setLoading(false);
        }
    };

    const projectCategories = categories.filter((c) => c.type === 'project' || !c.type);

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">
                        {initialData ? 'Chỉnh sửa thông tin Dự án' : 'Thêm Dự án tiêu biểu mới'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Điền đầy đủ thông tin chủ đầu tư, thời gian hoàn thành và hình ảnh thực tế để tăng độ tin cậy B2B.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Basic Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Tên dự án / Công trình <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            onBlur={handleNameBlur}
                            placeholder="VD: Hệ thống Chiller giải nhiệt nước Nhà máy Thực phẩm Á Châu"
                            required
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-xs focus:border-blue-600 focus:ring-blue-600 sm:text-sm border p-2.5"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-slate-700">
                                Đường dẫn tĩnh (Slug) <span className="text-red-500">*</span>
                            </label>
                            <button
                                type="button"
                                onClick={() =>
                                    formData.name &&
                                    setFormData((prev) => ({ ...prev, slug: toSlug(formData.name || '') }))
                                }
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Tạo tự động từ tên
                            </button>
                        </div>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug || ''}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-xs focus:border-blue-600 focus:ring-blue-600 sm:text-sm border p-2.5 font-mono text-xs"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-medium text-slate-700">
                                Danh mục dự án
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowNewCatForm(!showNewCatForm)}
                                className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                            >
                                <Plus className="h-3.5 w-3.5" />
                                {showNewCatForm ? 'Đóng tạo danh mục' : 'Thêm danh mục mới'}
                            </button>
                        </div>
                        <select
                            name="category_id"
                            value={formData.category_id || ''}
                            onChange={handleChange}
                            className="block w-full rounded-lg border-slate-300 shadow-xs focus:border-blue-600 focus:ring-blue-600 sm:text-sm border p-2.5 bg-white"
                        >
                            <option value="">-- Chọn danh mục dự án --</option>
                            {projectCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {showNewCatForm && (
                            <div className="mt-2 p-3 rounded-lg bg-blue-50/60 border border-blue-200 space-y-2">
                                <p className="text-xs font-semibold text-blue-900">Tạo nhanh danh mục dự án mới</p>
                                <input
                                    type="text"
                                    value={newCatName}
                                    onChange={(e) => setNewCatName(e.target.value)}
                                    placeholder="Tên danh mục (VD: Dự án Công nghiệp, Kho lạnh...)"
                                    className="block w-full rounded border-slate-300 text-xs p-2 bg-white border"
                                />
                                <input
                                    type="text"
                                    value={newCatDesc}
                                    onChange={(e) => setNewCatDesc(e.target.value)}
                                    placeholder="Mô tả ngắn (không bắt buộc)"
                                    className="block w-full rounded border-slate-300 text-xs p-2 bg-white border"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowNewCatForm(false)}
                                        className="px-2.5 py-1 text-xs rounded border border-slate-300 bg-white text-slate-600"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="button"
                                        disabled={creatingCat}
                                        onClick={handleQuickCreateCategory}
                                        className="px-3 py-1 text-xs rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {creatingCat ? 'Đang tạo...' : 'Lưu danh mục'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Chủ đầu tư / Khách hàng
                            </label>
                            <input
                                type="text"
                                name="client"
                                value={formData.client || ''}
                                onChange={handleChange}
                                placeholder="VD: Tập đoàn Vinamilk, KCN VSIP..."
                                className="mt-1 block w-full rounded-lg border-slate-300 shadow-xs focus:border-blue-600 focus:ring-blue-600 sm:text-sm border p-2.5"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Ngày hoàn thành / Nghiệm thu
                            </label>
                            <input
                                type="date"
                                name="completion_date"
                                value={
                                    formData.completion_date
                                        ? formData.completion_date.split('T')[0]
                                        : ''
                                }
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border-slate-300 shadow-xs focus:border-blue-600 focus:ring-blue-600 sm:text-sm border p-2.5"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="inline-flex items-center gap-3 p-3 rounded-lg border border-amber-200 bg-amber-50/50 cursor-pointer w-full">
                            <input
                                type="checkbox"
                                name="is_featured"
                                checked={formData.is_featured || false}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded"
                            />
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-400" />
                                <div>
                                    <span className="text-sm font-semibold text-slate-900 block">
                                        Đánh dấu là Dự án tiêu biểu (Featured)
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        Ưu tiên hiển thị ở đầu trang /projects và gắn nhãn nổi bật
                                    </span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Right Column: Image & Summary */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Hình ảnh đại diện công trình
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <button
                                type="button"
                                onClick={() => setIsImagePickerOpen(true)}
                                className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                                <ImageIcon className="h-4 w-4 mr-1.5" />
                                Chọn từ Thư viện Media
                            </button>

                            <label className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                                {uploadingImage ? (
                                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                                ) : (
                                    <Upload className="h-4 w-4 mr-1.5" />
                                )}
                                {uploadingImage ? 'Đang tải lên...' : 'Tải ảnh từ máy tính'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleDirectFileUpload}
                                    disabled={uploadingImage}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <input
                            type="text"
                            name="image_url"
                            value={formData.image_url || ''}
                            onChange={handleChange}
                            placeholder="Hoặc dán đường dẫn ảnh (https://...)"
                            className="block w-full rounded-lg border-slate-300 focus:border-blue-600 focus:ring-blue-600 sm:text-sm border p-2 text-xs"
                        />

                        {formData.image_url ? (
                            <div className="mt-2 relative h-40 w-full bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                                <img
                                    src={formData.image_url}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, image_url: '' }))}
                                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full"
                                    title="Xóa ảnh"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="mt-2 h-32 w-full bg-slate-50 rounded-lg flex flex-col items-center justify-center border border-dashed border-slate-200 text-slate-400 text-xs">
                                <ImageIcon className="h-7 w-7 mb-1 opacity-50" />
                                Chưa có ảnh đại diện công trình
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Tóm tắt quy mô & Hạng mục thực hiện (Description)
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            value={formData.description || ''}
                            onChange={handleChange}
                            placeholder="Mô tả ngắn hiển thị trên thẻ dự án (VD: Thiết kế và thi công trọn gói hệ thống điều hòa trung tâm VRV IV công suất 450HP...)"
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-xs focus:border-blue-600 focus:ring-blue-600 sm:text-sm border p-2.5"
                        />
                    </div>
                </div>
            </div>

            {/* Detailed Rich Text Content */}
            <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-700">
                        Nội dung chi tiết công trình (Thông số kỹ thuật, Phạm vi công việc, Hình ảnh...)
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowRawHtml(!showRawHtml)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 px-2.5 py-1 rounded border border-slate-200 bg-slate-50"
                    >
                        {showRawHtml ? (
                            <>
                                <Eye className="h-3.5 w-3.5" /> Chuyển sang Soạn thảo trực quan
                            </>
                        ) : (
                            <>
                                <Code className="h-3.5 w-3.5" /> Sửa mã HTML
                            </>
                        )}
                    </button>
                </div>

                {showRawHtml ? (
                    <textarea
                        name="content"
                        rows={10}
                        value={formData.content || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-slate-300 font-mono text-xs border p-3"
                        placeholder="<p>Nội dung HTML chi tiết dự án...</p>"
                    />
                ) : (
                    <div className="bg-white rounded-lg">
                        <ReactQuill
                            theme="snow"
                            value={formData.content || ''}
                            onChange={(val) => setFormData((prev) => ({ ...prev, content: val }))}
                            placeholder="Nhập thông tin chi tiết về bài toán kỹ thuật, giải pháp thiết kế, thiết bị cung cấp và kết quả nghiệm thu..."
                            className="h-64 mb-12"
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end space-x-3 border-t border-slate-100 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-white py-2.5 px-4 border border-slate-300 rounded-lg shadow-xs text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                    Hủy bỏ
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center py-2.5 px-5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {loading ? 'Đang lưu...' : 'Lưu thông tin Dự án'}
                </button>
            </div>

            <ImagePickerModal
                open={isImagePickerOpen}
                onOpenChange={setIsImagePickerOpen}
                onSelect={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
            />
        </form>
    );
};

export default ProjectForm;
