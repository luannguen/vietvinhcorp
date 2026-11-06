import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Project, Category } from "@/components/data/types";
import { projectService } from "@/services/projectService";
import { ArrowRight, Calendar, ChevronLeft, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const ProjectCategory = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [category, setCategory] = useState<Category | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      setError(false);
      try {
        const catResult = await projectService.getCategoryBySlug(slug);
        if (!catResult.success || !catResult.data) {
          setError(true);
          return;
        }
        setCategory(catResult.data);

        const projResult = await projectService.getProjects({ categoryId: catResult.data.id });
        if (projResult.success && projResult.data) {
          setProjects(projResult.data);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex-grow pt-20 animate-pulse">
        <div className="h-64 bg-primary/80" />
        <div className="container-custom py-12 grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-slate-100 rounded-2xl" />
          ))}
        </div>
      </main>
    );
  }

  if (error || !category) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold">{t("no_project_cats", "Danh mục không tồn tại")}</h1>
        <Button asChild>
          <Link to="/projects">{t("projects_Back_to_list", "Quay lại danh sách dự án")}</Link>
        </Button>
      </div>
    );
  }

  const localeStr = i18n.language?.startsWith("vi") ? "vi-VN" : "en-US";

  return (
    <main className="flex-grow">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#082B66] via-primary to-[#0D47A1] pt-28 pb-16 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <Link
              to="/projects"
              className="text-white/80 hover:text-white mb-4 inline-flex items-center gap-1 text-sm font-medium"
            >
              <ChevronLeft size={16} />
              {t("all_projects_works", "Tất cả dự án công trình")}
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-lg md:text-xl text-blue-100/90">
              {category.description || `Danh sách các dự án thuộc lĩnh vực ${category.name}`}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-slate-50/60">
        <div className="container-custom">
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-xl transition-all group flex flex-col"
                >
                  <Link
                    to={`/project-details/${project.slug || project.id}`}
                    className="block relative h-56 bg-slate-100 overflow-hidden"
                  >
                    <img
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    {project.is_featured && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white inline-flex items-center gap-1 shadow-sm">
                        <Star size={11} className="fill-current" />
                        {t("projects_featured_badge", "Tiêu biểu")}
                      </span>
                    )}
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    <Link to={`/project-details/${project.slug || project.id}`}>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {project.name}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-3">
                      {project.client && (
                        <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                          <User size={13} className="text-primary" />
                          {project.client}
                        </span>
                      )}
                      {project.completion_date && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} className="text-primary" />
                          {new Date(project.completion_date).toLocaleDateString(localeStr, {
                            month: "2-digit",
                            year: "numeric"
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
                      {project.description}
                    </p>
                    <Link
                      to={`/project-details/${project.slug || project.id}`}
                      className="flex items-center text-sm text-primary font-semibold hover:text-accent pt-3 border-t border-slate-100"
                    >
                      {t("view_details", "Xem chi tiết")} <ArrowRight size={15} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl">
              <p className="text-lg text-slate-500 mb-4">
                {t("projects_empty_filter", "Chưa có dự án nào trong danh mục này.")}
              </p>
              <Button asChild>
                <Link to="/contact">{t("service_consulting", "Liên hệ tư vấn")}</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProjectCategory;
