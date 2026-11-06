import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building,
  Calendar,
  Check,
  CheckCircle,
  ChevronLeft,
  Share2,
  Star,
  User
} from "lucide-react";
import { projectService } from "@/services/projectService";
import { Project } from "@/components/data/types";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { sanitizeHtml } from "@/utils/htmlUtils";

const ProjectDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      setLoading(true);
      setError(false);
      try {
        const result = await projectService.getProject(id);
        if (result.success && result.data) {
          setProject(result.data);

          const allRes = await projectService.getProjects({ limit: 6 });
          if (allRes.success && allRes.data) {
            const others = allRes.data
              .filter((p) => p.id !== result.data.id)
              .sort((a, b) => {
                const aSameCat = a.category_id === result.data.category_id ? 1 : 0;
                const bSameCat = b.category_id === result.data.category_id ? 1 : 0;
                return bSameCat - aSameCat;
              })
              .slice(0, 3);
            setRelatedProjects(others);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch project details", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share && project) {
      try {
        await navigator.share({
          title: project.name,
          text: project.description || project.name,
          url: shareUrl
        });
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: t("success", "Thành công"),
        description: t("projects_share_copied", "Đã sao chép đường dẫn dự án vào bộ nhớ tạm!")
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore clipboard error
    }
  };

  if (loading) {
    return (
      <div className="pt-28 pb-16 container-custom max-w-6xl mx-auto animate-pulse space-y-8">
        <div className="h-6 w-48 bg-slate-200 rounded" />
        <div className="space-y-4 max-w-3xl mx-auto text-center">
          <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto" />
          <div className="h-12 w-3/4 bg-slate-200 rounded mx-auto" />
          <div className="h-6 w-2/3 bg-slate-200 rounded mx-auto" />
        </div>
        <div className="aspect-video max-w-5xl mx-auto bg-slate-200 rounded-2xl" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center flex-col gap-4 pt-24">
        <div className="text-red-500 text-xl font-bold">
          {t("no_featured_projects", "Không tìm thấy dự án!")}
        </div>
        <Button asChild>
          <Link to="/projects">
            <ChevronLeft size={16} className="mr-2" />
            {t("projects_Back_to_list", "Quay lại danh sách dự án")}
          </Link>
        </Button>
      </div>
    );
  }

  const localeStr = i18n.language?.startsWith("vi") ? "vi-VN" : "en-US";
  const safeContentHtml = sanitizeHtml(project.content);

  return (
    <div className="pt-24 pb-16 bg-white">
      {/* Breadcrumb / Navigation */}
      <div className="container-custom mb-8">
        <Link
          to="/projects"
          className="inline-flex items-center text-slate-600 hover:text-primary font-medium transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          {t("projects_Back_to_list", "Quay lại danh sách dự án")}
        </Link>
      </div>

      <div className="container-custom">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {project.category && (
              <Badge className="text-sm px-3.5 py-1 font-medium bg-primary/10 text-primary hover:bg-primary/20">
                {project.category.name}
              </Badge>
            )}
            {project.is_featured && (
              <Badge className="text-sm px-3.5 py-1 font-medium bg-amber-500 text-white hover:bg-amber-600 inline-flex items-center gap-1">
                <Star size={12} className="fill-current" />
                {t("projects_featured_badge", "Tiêu biểu")}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {project.name}
          </h1>
          {project.description && (
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {/* Featured Image */}
        {project.image_url && (
          <div className="rounded-2xl overflow-hidden mb-12 shadow-xl aspect-video max-w-5xl mx-auto border border-slate-100">
            <img
              src={project.image_url}
              alt={project.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
        )}

        {/* Project Info & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Sidebar / Info */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 sticky top-28">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-3">
                {t("projects_info_sidebar", "Thông tin công trình")}
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <User className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-semibold text-slate-500">
                      {t("projects_client_label", "Chủ đầu tư")}
                    </span>
                    <span className="block font-semibold text-slate-900 mt-0.5">
                      {project.client || t("projects_Updating", "Đang cập nhật")}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-semibold text-slate-500">
                      {t("projects_completed_label", "Hoàn thành")}
                    </span>
                    <span className="block font-semibold text-slate-900 mt-0.5">
                      {project.completion_date
                        ? new Date(project.completion_date).toLocaleDateString(localeStr, {
                            month: "long",
                            year: "numeric"
                          })
                        : t("projects_Updating", "Đang cập nhật")}
                    </span>
                  </div>
                </li>
                {project.category && (
                  <li className="flex items-start">
                    <Building className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="block text-xs uppercase tracking-wider font-semibold text-slate-500">
                        {t("projects_sector_label", "Lĩnh vực")}
                      </span>
                      <span className="block font-semibold text-slate-900 mt-0.5">
                        {project.category.name}
                      </span>
                    </div>
                  </li>
                )}
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider font-semibold text-slate-500">
                      {t("projects_status_label", "Trạng thái")}
                    </span>
                    <span className="block font-semibold text-emerald-600 mt-0.5">
                      {t("projects_status_completed", "Đã bàn giao & vận hành")}
                    </span>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Button className="w-full min-h-[44px]" asChild>
                  <Link
                    to={`/contact?subject=${encodeURIComponent(`Tư vấn dự án: ${project.name}`)}`}
                  >
                    {t("contact_project", "Liên hệ dự án tương tự")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="prose prose-lg max-w-none text-slate-700 prose-headings:text-slate-900 prose-a:text-primary">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {t("project_details", "Chi tiết dự án")}
              </h3>
              {safeContentHtml ? (
                <div dangerouslySetInnerHTML={{ __html: safeContentHtml }} />
              ) : (
                <p className="text-slate-600 leading-relaxed">
                  {project.description ||
                    t("projects_Updating", "Nội dung chi tiết dự án đang được cập nhật...")}
                </p>
              )}
            </div>

            {/* Share */}
            <div className="flex items-center justify-between gap-3 mt-10 pt-6 border-t border-slate-200">
              <span className="text-slate-600 font-medium text-sm">
                {t("projects_share_label", "Chia sẻ dự án này:")}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="rounded-full gap-2 hover:border-primary hover:text-primary"
              >
                {copied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
                {copied ? t("success", "Đã sao chép") : "Share / Copy Link"}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="max-w-6xl mx-auto mt-20 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("projects_related_title", "Các dự án tiêu biểu khác")}
              </h2>
              <Link
                to="/projects"
                className="text-sm font-semibold text-primary hover:text-accent inline-flex items-center gap-1"
              >
                {t("all_projects_works", "Tất cả dự án công trình")}
                <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/project-details/${rel.slug || rel.id}`}
                  className="group bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="h-48 bg-slate-200 overflow-hidden">
                    <img
                      src={rel.image_url || "/placeholder.svg"}
                      alt={rel.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3 flex-1">
                      {rel.description}
                    </p>
                    <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                      {t("view_details", "Xem chi tiết")}
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
