import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '@/services/projectService';
import { categoryService } from '@/services/categoryService';
import { Project, Category } from '@/components/data/types';
import { useRBAC } from '@/features/auth/useRBAC';
import {
    Plus,
    Edit2,
    Trash2,
    Search,
    Loader2,
    Briefcase,
    Wand2,
    Star,
    FolderOpen,
    Building2,
    Calendar,
} from 'lucide-react';
import ProjectForm from '@/components/admin/projects/ProjectForm';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const { hasPermission } = useRBAC();

    const canCreate = hasPermission('content.create');
    const canEdit = hasPermission('content.edit');
    const canDelete = hasPermission('content.delete');

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
    const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'standard'>('all');

    // Edit/Create/Delete State
    const [isEditing, setIsEditing] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const clearFrontendProjectCache = () => {
        try {
            localStorage.removeItem('vrc_projects_list_cache');
            localStorage.removeItem('vrc_project_cats_cache');
        } catch {}
    };

    const loadData = async () => {
        setLoading(true);
        try {
            const [projectsData, catData] = await Promise.all([
                projectService.getProjects(),
                categoryService.getCategories('project'),
            ]);

            setProjects(projectsData || []);
            setCategories(catData || []);
        } catch (error) {
            console.error('Failed to load projects data', error);
            toast.error('Không thể tải dữ liệu dự án');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!canDelete) {
            toast.error('Bạn không có quyền xóa dự án');
            return;
        }
        try {
            await projectService.deleteProject(id);
            setProjects((prev) => prev.filter((p) => p.id !== id));
            setDeleteConfirmId(null);
            clearFrontendProjectCache();
            toast.success('Đã xóa dự án thành công');
        } catch (error) {
            toast.error(t('delete_project_fail') || 'Lỗi khi xóa dự án');
        }
    };

    const handleToggleFeatured = async (project: Project) => {
        if (!canEdit) {
            toast.error('Bạn không có quyền chỉnh sửa dự án');
            return;
        }
        setTogglingId(project.id);
        try {
            const updated = await projectService.updateProject(project.id, {
                is_featured: !project.is_featured,
            });
            setProjects((prev) =>
                prev.map((p) =>
                    p.id === project.id ? { ...p, is_featured: updated.is_featured } : p
                )
            );
            clearFrontendProjectCache();
            toast.success(
                updated.is_featured
                    ? `Đã đánh dấu "${project.name}" là Dự án tiêu biểu`
                    : `Đã bỏ đánh dấu tiêu biểu cho "${project.name}"`
            );
        } catch (error) {
            toast.error('Không thể cập nhật trạng thái tiêu biểu');
        } finally {
            setTogglingId(null);
        }
    };

    const handleSave = async (projectData: Partial<Project>) => {
        try {
            if (editingProject?.id) {
                if (!canEdit) {
                    toast.error('Bạn không có quyền chỉnh sửa dự án');
                    return;
                }
                await projectService.updateProject(editingProject.id, projectData);
                toast.success('Đã cập nhật thông tin dự án thành công');
            } else {
                if (!canCreate) {
                    toast.error('Bạn không có quyền thêm dự án mới');
                    return;
                }
                await projectService.createProject(projectData as any);
                toast.success('Đã thêm dự án mới thành công');
            }
            clearFrontendProjectCache();
            setIsEditing(false);
            setEditingProject(undefined);
            loadData();
        } catch (error) {
            toast.error(t('save_project_fail') || 'Lỗi khi lưu thông tin dự án');
        }
    };

    const filteredProjects = projects.filter((project) => {
        const q = searchTerm.toLowerCase().trim();
        const matchesSearch =
            !q ||
            project.name.toLowerCase().includes(q) ||
            (project.client || '').toLowerCase().includes(q) ||
            (project.description || '').toLowerCase().includes(q);

        const matchesCategory =
            selectedCategoryId === 'all' || project.category_id === selectedCategoryId;

        const matchesFeatured =
            featuredFilter === 'all' ||
            (featuredFilter === 'featured' && project.is_featured) ||
            (featuredFilter === 'standard' && !project.is_featured);

        return matchesSearch && matchesCategory && matchesFeatured;
    });

    if (isEditing) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-900">
                        {editingProject ? t('edit_project') : t('create_project')}
                    </h1>
                </div>
                <ProjectForm
                    initialData={editingProject}
                    categories={categories}
                    onSave={handleSave}
                    onCancel={() => {
                        setIsEditing(false);
                        setEditingProject(undefined);
                    }}
                    onCategoryCreated={(newCat) =>
                        setCategories((prev) => [...prev, newCat])
                    }
                />
            </div>
        );
    }

    const featuredCount = projects.filter((p) => p.is_featured).length;

    return (
        <div className="space-y-6">
            {/* Header & Quick Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Quản lý Dự án & Công trình ({t('projects')})
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Quản lý danh sách công trình thực tế, phân loại hạng mục và tùy chỉnh nội dung trang /projects.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                    {canEdit && (
                        <Link
                            to="/pages/visual-edit/projects"
                            className="inline-flex items-center px-4 py-2 border border-blue-200 text-sm font-medium rounded-lg shadow-xs text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                            <Wand2 className="h-4 w-4 mr-2 text-blue-600" />
                            Chỉnh sửa trang /projects (Visual Editor)
                        </Link>
                    )}
                    <Link
                        to="/categories"
                        className="inline-flex items-center px-3.5 py-2 border border-slate-200 text-sm font-medium rounded-lg shadow-xs text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                    >
                        <FolderOpen className="h-4 w-4 mr-1.5 text-slate-500" />
                        Danh mục ({categories.length})
                    </Link>
                    {canCreate && (
                        <button
                            onClick={() => {
                                setEditingProject(undefined);
                                setIsEditing(true);
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            {t('add_project')}
                        </button>
                    )}
                </div>
            </div>

            {/* Banner hướng dẫn chỉnh sửa nội dung trang /projects */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300">
                        <Wand2 className="h-3.5 w-3.5" />
                        Trình chỉnh sửa trực quan trang Dự án (/projects)
                    </div>
                    <h2 className="text-base font-bold text-white">
                        Cập nhật Tiêu đề, Mô tả giới thiệu, Nút điều hướng & Tổng quan năng lực trên trang /projects
                    </h2>
                    <p className="text-xs text-slate-300 max-w-3xl">
                        Bạn có thể chỉnh sửa trực tiếp các câu chữ (hỗ trợ song ngữ Tiếng Việt & Tiếng Anh), hình ảnh năng lực thi công và bố cục hiển thị của trang <code className="bg-white/10 px-1.5 py-0.5 rounded">/projects</code> mà không cần sửa code.
                    </p>
                </div>
                {canEdit && (
                    <Link
                        to="/pages/visual-edit/projects"
                        className="shrink-0 inline-flex items-center px-4 py-2.5 rounded-lg bg-white text-slate-900 hover:bg-blue-50 font-semibold text-xs shadow transition-colors"
                    >
                        <Wand2 className="h-4 w-4 mr-2 text-blue-600" />
                        Mở Visual Editor /projects
                    </Link>
                )}
            </div>

            {/* Summary KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-slate-500">Tổng số công trình</p>
                        <p className="text-2xl font-bold text-slate-900 mt-0.5">{projects.length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Briefcase className="h-5 w-5" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-slate-500">Dự án tiêu biểu (Featured)</p>
                        <p className="text-2xl font-bold text-amber-600 mt-0.5">{featuredCount}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Star className="h-5 w-5 fill-amber-400" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-slate-500">Danh mục phân loại</p>
                        <p className="text-2xl font-bold text-emerald-600 mt-0.5">{categories.length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <FolderOpen className="h-5 w-5" />
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 sm:text-sm border-slate-300 rounded-lg border p-2"
                        placeholder="Tìm theo tên dự án, chủ đầu tư, mô tả..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                    <select
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="all">Tất cả danh mục ({categories.length})</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={featuredFilter}
                        onChange={(e) => setFeaturedFilter(e.target.value as any)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="featured">★ Dự án tiêu biểu</option>
                        <option value="standard">Dự án thường</option>
                    </select>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white shadow-xs border border-slate-200/80 overflow-hidden rounded-xl">
                {loading ? (
                    <div className="flex justify-center p-10">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 text-slate-500">
                        <Briefcase className="h-12 w-12 mb-2 opacity-40" />
                        <p className="font-medium">{t('no_projects') || 'Không tìm thấy dự án nào phù hợp'}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                    >
                                        {t('project_header') || 'Công trình / Dự án'}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                    >
                                        Danh mục
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                    >
                                        {t('client_header') || 'Chủ đầu tư'}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                    >
                                        {t('completion_date_header') || 'Hoàn thành'}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                    >
                                        {t('featured_header') || 'Tiêu biểu'}
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100">
                                {filteredProjects.map((project) => {
                                    const categoryName =
                                        project.category?.name ||
                                        categories.find((c) => c.id === project.category_id)?.name;

                                    return (
                                        <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-16">
                                                        {project.image_url ? (
                                                            <img
                                                                className="h-12 w-16 rounded-lg object-cover border border-slate-200"
                                                                src={project.image_url}
                                                                alt={project.name}
                                                            />
                                                        ) : (
                                                            <div className="h-12 w-16 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                                                                <Briefcase className="h-5 w-5 text-slate-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4 max-w-sm">
                                                        <div className="text-sm font-semibold text-slate-900 line-clamp-1">
                                                            {project.name}
                                                        </div>
                                                        <div className="text-xs text-slate-500 font-mono">
                                                            /{project.slug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {categoryName ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                                        {categoryName}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-slate-400">Chưa phân loại</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {project.client ? (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                                        {project.client}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {project.completion_date ? (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                        {project.completion_date.split('T')[0]}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button
                                                    type="button"
                                                    disabled={!canEdit || togglingId === project.id}
                                                    onClick={() => handleToggleFeatured(project)}
                                                    title={
                                                        project.is_featured
                                                            ? 'Click để bỏ đánh dấu tiêu biểu'
                                                            : 'Click để đánh dấu là Dự án tiêu biểu'
                                                    }
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                                                        project.is_featured
                                                            ? 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                    }`}
                                                >
                                                    <Star
                                                        className={`h-3.5 w-3.5 ${
                                                            project.is_featured
                                                                ? 'text-amber-500 fill-amber-500'
                                                                : 'text-slate-400'
                                                        }`}
                                                    />
                                                    {project.is_featured ? 'Tiêu biểu' : 'Thường'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {deleteConfirmId === project.id ? (
                                                    <div className="inline-flex items-center gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(project.id)}
                                                            className="px-2.5 py-1 rounded bg-red-600 text-white text-xs font-medium hover:bg-red-700"
                                                        >
                                                            Xác nhận xóa
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setDeleteConfirmId(null)}
                                                            className="px-2 py-1 rounded border border-slate-200 text-slate-600 text-xs hover:bg-slate-100"
                                                        >
                                                            Hủy
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-3">
                                                        {canEdit && (
                                                            <button
                                                                onClick={() => {
                                                                    setEditingProject(project);
                                                                    setIsEditing(true);
                                                                }}
                                                                className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                                title="Chỉnh sửa dự án"
                                                            >
                                                                <Edit2 className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                        {canDelete && (
                                                            <button
                                                                onClick={() => setDeleteConfirmId(project.id)}
                                                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                                title="Xóa dự án"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
