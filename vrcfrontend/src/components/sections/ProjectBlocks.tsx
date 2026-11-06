import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building,
  Building2,
  Calendar,
  CheckCircle2,
  Factory,
  Search,
  Sparkles,
  Star,
  User,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EditableElement } from '../admin/EditableElement';
import { useVisualEditor } from '@/context/VisualEditorContext';
import { useProjectsData } from '@/hooks/useProjectsData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ProjectHeroBlock = ({
  badge,
  title,
  description,
  primaryButtonLabel,
  primaryButtonLink = '/contact',
  secondaryButtonLabel,
  secondaryButtonLink = '/services',
  sectionId
}: {
  badge?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonLink?: string;
  secondaryButtonLabel?: string;
  secondaryButtonLink?: string;
  sectionId?: string;
}) => {
  const { t } = useTranslation();

  const displayBadge = badge || t('projects_hero_badge', 'NĂNG LỰC THI CÔNG • DỰ ÁN TIÊU BIỂU');
  const displayTitle = title || t('featured_projects_title', 'Dự án tiêu biểu');
  const displayDesc =
    description ||
    t(
      'featured_projects_desc',
      'Những công trình thực tế đã được Việt Vinh Corporation thiết kế, cung cấp thiết bị và thi công lắp đặt trên khắp cả nước.'
    );
  const displayPrimary = primaryButtonLabel || t('service_consulting', 'Liên hệ tư vấn');
  const displaySecondary = secondaryButtonLabel || t('view_services', 'Xem dịch vụ');

  return (
    <section className="relative bg-gradient-to-br from-[#082B66] via-primary to-[#0D47A1] pt-28 pb-20 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-semibold tracking-wider uppercase text-secondary mb-6">
            <Sparkles size={14} />
            <EditableElement
              tagName="span"
              fieldKey="badge"
              sectionId={sectionId}
              defaultContent={displayBadge}
            />
          </div>
          <EditableElement
            tagName="h1"
            fieldKey="title"
            sectionId={sectionId}
            defaultContent={displayTitle}
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"
          />
          <EditableElement
            tagName="p"
            fieldKey="description"
            sectionId={sectionId}
            defaultContent={displayDesc}
            className="text-lg md:text-xl text-blue-100/95 mb-8 leading-relaxed"
          />
          <div className="flex flex-wrap gap-4">
            <EditableElement
              tagName="a"
              href={primaryButtonLink}
              fieldKey="primaryButtonLabel"
              sectionId={sectionId}
              defaultContent={displayPrimary}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-secondary text-slate-900 font-bold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl cursor-pointer min-h-[44px]"
            />
            <EditableElement
              tagName="a"
              href={secondaryButtonLink}
              fieldKey="secondaryButtonLabel"
              sectionId={sectionId}
              defaultContent={displaySecondary}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-white/10 text-white font-semibold border border-white/30 hover:bg-white hover:text-primary transition-all backdrop-blur-sm cursor-pointer min-h-[44px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProjectOverviewBlock = ({
  title,
  description,
  stat1,
  stat2,
  stat3,
  stat4,
  image,
  sectionId
}: {
  title?: string;
  description?: string;
  stat1?: string;
  stat2?: string;
  stat3?: string;
  stat4?: string;
  image?: string;
  sectionId?: string;
}) => {
  const { t } = useTranslation();
  const { editMode, triggerImagePicker } = useVisualEditor();

  const displayTitle = title || t('capability_experience', 'Năng lực và kinh nghiệm');
  const displayDesc =
    description ||
    t(
      'projects_overview_desc',
      'Với hơn 20 năm kinh nghiệm, Việt Vinh Corporation đã thực hiện hàng trăm dự án lớn nhỏ trong lĩnh vực điện lạnh công nghiệp và dân dụng. Chúng tôi tự hào là đối tác tin cậy của nhiều tập đoàn lớn và các đơn vị hàng đầu trong các ngành công nghiệp.'
    );
  const stats = [
    { key: 'stat1', val: stat1 || t('completed_projects_stat', 'Hơn 500 dự án lớn nhỏ đã hoàn thành') },
    { key: 'stat2', val: stat2 || t('trusted_partner_stat', 'Đối tác của các tập đoàn và doanh nghiệp hàng đầu') },
    { key: 'stat3', val: stat3 || t('expert_team_stat', 'Đội ngũ kỹ sư và chuyên viên giàu kinh nghiệm') },
    { key: 'stat4', val: stat4 || t('quality_commitment_stat', 'Cam kết chất lượng và tiến độ thi công') }
  ];
  const imgSrc = image || '/assets/images/projects-overview.jpg';

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <EditableElement
              tagName="h2"
              fieldKey="title"
              sectionId={sectionId}
              defaultContent={displayTitle}
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-5"
            />
            <EditableElement
              tagName="p"
              fieldKey="description"
              sectionId={sectionId}
              defaultContent={displayDesc}
              className="text-slate-600 text-base md:text-lg leading-relaxed mb-6"
            />
            <ul className="space-y-3.5">
              {stats.map((item) => (
                <li key={item.key} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <EditableElement
                    tagName="span"
                    fieldKey={item.key}
                    sectionId={sectionId}
                    defaultContent={item.val}
                    className="text-slate-700 font-medium"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <img
              src={imgSrc}
              alt={displayTitle}
              className="w-full h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            {editMode && sectionId && (
              <button
                type="button"
                onClick={() => triggerImagePicker('image', sectionId)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-sm"
              >
                Đổi hình ảnh minh họa
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProjectShowcaseBlock = ({
  catTitle,
  catDescription,
  listTitle,
  sectionId
}: {
  catTitle?: string;
  catDescription?: string;
  listTitle?: string;
  sectionId?: string;
}) => {
  const { t, i18n } = useTranslation();
  const {
    categories,
    filteredProjects,
    categoryCounts,
    isLoading,
    selectedFilter,
    setSelectedFilter,
    searchQuery,
    setSearchQuery
  } = useProjectsData();

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('công nghiệp') || name.includes('nhà máy') || name.includes('industrial')) {
      return <Factory className="text-primary h-6 w-6" />;
    }
    if (name.includes('thương mại') || name.includes('tòa nhà') || name.includes('commercial')) {
      return <Building className="text-primary h-6 w-6" />;
    }
    return <Building2 className="text-primary h-6 w-6" />;
  };

  return (
    <div className="bg-slate-50/70">
      {/* Project Categories */}
      <section className="py-16 border-t border-slate-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <EditableElement
              tagName="h2"
              fieldKey="catTitle"
              sectionId={sectionId}
              defaultContent={catTitle || t('project_cat_title', 'Danh mục dự án')}
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
            />
            <EditableElement
              tagName="p"
              fieldKey="catDescription"
              sectionId={sectionId}
              defaultContent={
                catDescription ||
                t(
                  'project_cat_desc_list',
                  'Việt Vinh Corporation tự hào thực hiện các dự án đa dạng với quy mô khác nhau, từ hệ thống điều hòa không khí trung tâm cho tòa nhà thương mại đến các hệ thống làm lạnh công nghiệp phức tạp.'
                )
              }
              className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg"
            />
          </div>

          {categories.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="bg-white border-slate-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                        {getCategoryIcon(category.name)}
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium">
                        {categoryCounts[category.id] || 0} {t('projects', 'Dự án').toLowerCase()}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900">{category.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {category.description || `Các dự án tiêu biểu thuộc lĩnh vực ${category.name}`}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFilter(category.id);
                        document.getElementById('projects-directory-grid')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                    >
                      Lọc nhanh tại đây
                    </button>
                    <Link
                      to={`/projects/category/${category.slug || category.id}`}
                      className="text-sm font-semibold text-primary hover:text-accent inline-flex items-center gap-1"
                    >
                      {t('view_project', 'Xem dự án')}
                      <ArrowUpRight size={15} />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Projects Directory & Interactive Filter */}
          <div id="projects-directory-grid" className="pt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <EditableElement
                tagName="h2"
                fieldKey="listTitle"
                sectionId={sectionId}
                defaultContent={listTitle || t('featured_projects_list', 'Dự án nổi bật')}
                className="text-2xl md:text-3xl font-bold text-slate-900"
              />

              {/* Search Input */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('projects_search_placeholder', 'Tìm theo tên dự án, chủ đầu tư...')}
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                type="button"
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
                className="rounded-full px-4 min-h-[38px]"
              >
                {t('projects_filter_all', 'Tất cả công trình')} ({categoryCounts.all || 0})
              </Button>
              <Button
                type="button"
                variant={selectedFilter === 'featured' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('featured')}
                className="rounded-full px-4 min-h-[38px] gap-1.5"
              >
                <Star size={14} className={selectedFilter === 'featured' ? 'fill-current' : 'text-amber-500'} />
                {t('projects_filter_featured', 'Dự án tiêu biểu')} ({categoryCounts.featured || 0})
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  type="button"
                  variant={selectedFilter === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(cat.id)}
                  className="rounded-full px-4 min-h-[38px]"
                >
                  {cat.name} ({categoryCounts[cat.id] || 0})
                </Button>
              ))}
            </div>

            {/* Projects Cards Grid */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-slate-100 shadow-sm" />
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => {
                  const categoryObj = typeof project.category === 'object' ? (project.category as any) : null;
                  return (
                    <article
                      key={project.id}
                      className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                      <Link
                        to={`/project-details/${project.slug || project.id}`}
                        className="relative h-56 bg-slate-100 overflow-hidden block"
                      >
                        <img
                          src={project.image_url || '/placeholder.svg'}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {categoryObj?.name && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/90 text-white backdrop-blur-sm">
                              {categoryObj.name}
                            </span>
                          )}
                          {project.is_featured && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white inline-flex items-center gap-1 shadow-sm">
                              <Star size={11} className="fill-current" />
                              {t('projects_featured_badge', 'Tiêu biểu')}
                            </span>
                          )}
                        </div>
                      </Link>

                      <div className="p-6 flex-1 flex flex-col">
                        <Link to={`/project-details/${project.slug || project.id}`}>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
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
                              {new Date(project.completion_date).toLocaleDateString(
                                i18n.language?.startsWith('vi') ? 'vi-VN' : 'en-US',
                                { month: '2-digit', year: 'numeric' }
                              )}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-3 mb-5 flex-1">
                          {project.description}
                        </p>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <Link
                            to={`/project-details/${project.slug || project.id}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
                          >
                            {t('project_details', 'Chi tiết dự án')}
                            <ArrowRight size={15} />
                          </Link>
                          <Link
                            to={`/contact?subject=${encodeURIComponent(`Tư vấn dự án tương tự: ${project.name}`)}`}
                            className="text-xs font-medium text-slate-500 hover:text-primary underline-offset-2 hover:underline"
                          >
                            {t('contact_consultancy', 'Liên hệ tư vấn')}
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
                <p className="text-slate-500 mb-4">
                  {t('projects_empty_filter', 'Không tìm thấy dự án phù hợp với bộ lọc hiện tại.')}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedFilter('all');
                    setSearchQuery('');
                  }}
                >
                  {t('clear_filter', 'Xóa bộ lọc')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
