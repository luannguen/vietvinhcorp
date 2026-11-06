import { VisualEditorProvider, useVisualEditor } from "@/context/VisualEditorContext";
import { VisualPageRenderer } from "@/components/admin/builder/VisualPageRenderer";

const DEFAULT_PROJECTS_SECTIONS = [
  {
    id: "projects_hero",
    type: "project_hero",
    props: {
      badge: "NĂNG LỰC THI CÔNG • DỰ ÁN TIÊU BIỂU",
      badge_en: "ENGINEERING EXCELLENCE • FEATURED PROJECTS",
      title: "Dự án tiêu biểu",
      title_en: "Typical Projects",
      description:
        "Những công trình thực tế đã được Việt Vinh Corporation thiết kế, cung cấp thiết bị và thi công lắp đặt trên khắp cả nước.",
      description_en:
        "Actual projects designed, supplied and installed by Viet Vinh Corporation across the country.",
      primaryButtonLabel: "Liên hệ tư vấn",
      primaryButtonLabel_en: "Contact for Consultation",
      primaryButtonLink: "/contact",
      secondaryButtonLabel: "Xem dịch vụ",
      secondaryButtonLabel_en: "View Services",
      secondaryButtonLink: "/services"
    }
  },
  {
    id: "projects_overview",
    type: "project_overview",
    props: {
      title: "Năng lực và kinh nghiệm",
      title_en: "Capability & Experience",
      description:
        "Với hơn 20 năm kinh nghiệm, Việt Vinh Corporation đã thực hiện hàng trăm dự án lớn nhỏ trong lĩnh vực điện lạnh công nghiệp và dân dụng. Chúng tôi tự hào là đối tác tin cậy của nhiều tập đoàn lớn và các đơn vị hàng đầu trong các ngành công nghiệp.",
      description_en:
        "With over 20 years of experience, Viet Vinh Corporation has performed hundreds of projects in industrial and civil refrigeration. We are proud to be a trusted partner of many large corporations and leading units in industries.",
      image: "/assets/images/projects-overview.jpg"
    }
  },
  {
    id: "projects_showcase",
    type: "project_showcase",
    props: {
      catTitle: "Danh mục dự án",
      catTitle_en: "Project Categories",
      catDescription:
        "Việt Vinh Corporation tự hào thực hiện các dự án đa dạng với quy mô khác nhau, từ hệ thống điều hòa không khí trung tâm cho tòa nhà thương mại đến các hệ thống làm lạnh công nghiệp phức tạp.",
      catDescription_en:
        "Viet Vinh Corporation is proud to implement diverse projects at different scales, from central air conditioning systems for commercial buildings to complex industrial refrigeration systems.",
      listTitle: "Dự án nổi bật",
      listTitle_en: "Featured Projects"
    }
  },
  {
    id: "projects_achievements",
    type: "about_achievements",
    props: {
      title: "Thành tựu nổi bật",
      title_en: "Notable Achievements"
    }
  },
  {
    id: "projects_cta",
    type: "cta_section",
    props: {
      badge: "Tư vấn miễn phí",
      badge_en: "Free Consultation",
      title: "Bạn có dự án cần tư vấn giải pháp?",
      title_en: "Do you have a project that needs consultation?",
      description:
        "Hãy liên hệ với đội ngũ kỹ sư của chúng tôi để được khảo sát và tư vấn giải pháp tối ưu cho công trình của bạn. Việt Vinh Corporation cam kết mang đến hệ thống cơ điện lạnh hiện đại, hiệu quả và tiết kiệm năng lượng.",
      description_en:
        "Contact our engineering team for a site survey and optimal technical solution for your facility. Viet Vinh Corporation is committed to delivering modern, high-efficiency, and energy-saving HVAC/R & M&E systems.",
      primaryButtonLabel: "Liên hệ ngay",
      primaryButtonLabel_en: "Contact Now",
      primaryButtonLink: "/contact",
      secondaryButtonLabel: "Xem dịch vụ",
      secondaryButtonLabel_en: "View Services",
      secondaryButtonLink: "/services"
    }
  }
];

const ProjectsContent = () => {
  const { contentData, isLoading } = useVisualEditor();

  if (isLoading && (!contentData?.sections || contentData.sections.length === 0)) {
    return (
      <div className="min-h-screen bg-slate-50 animate-pulse">
        <div className="h-80 bg-primary/80" />
        <div className="container-custom py-16 space-y-8">
          <div className="h-64 bg-white rounded-2xl" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-48 bg-white rounded-2xl" />
            <div className="h-48 bg-white rounded-2xl" />
            <div className="h-48 bg-white rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (contentData?.sections && contentData.sections.length > 0) {
    const hasShowcase = contentData.sections.some((s: any) => s.type === "project_showcase");
    const displaySections = [...contentData.sections];

    if (!hasShowcase) {
      const showcaseBlock = DEFAULT_PROJECTS_SECTIONS.find((s) => s.id === "projects_showcase");
      if (showcaseBlock) displaySections.push(showcaseBlock);
    }

    return <VisualPageRenderer customSections={displaySections} />;
  }

  return <VisualPageRenderer customSections={DEFAULT_PROJECTS_SECTIONS} />;
};

const Projects = () => {
  return (
    <VisualEditorProvider slug="projects">
      <ProjectsContent />
    </VisualEditorProvider>
  );
};

export default Projects;
