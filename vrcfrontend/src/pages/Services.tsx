import { useEffect, useState } from "react";
import {
  ArrowRight, CheckCircle, ArrowUpRight,
  FileCheck, Wrench, Cog, Shield, Clock,
  HelpCircle, LucideIcon, Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceService, Service, ServiceCategory } from "@/services/serviceService";
import { pageService, StaticPage } from "@/services/pageService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

// Map icon strings from DB to Lucide components
const iconMap: Record<string, LucideIcon> = {
  FileCheck,
  Wrench,
  Cog,
  Shield,
  Clock,
  HelpCircle,
  default: FileCheck
};

const Services = () => {
  const [pageData, setPageData] = useState<StaticPage | null>(null);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch Page Content, Categories and Services in parallel
        const [pageRes, catRes, servicesRes] = await Promise.all([
          pageService.getPageBySlug('services').catch(() => null),
          serviceService.getCategories(),
          serviceService.getServices()
        ]);

        if (pageRes) setPageData(pageRes);
        if (catRes.success) setCategories(catRes.data || []);
        if (servicesRes.success) setServices(servicesRes.data || []);

      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIcon = (iconName: string | undefined) => {
    if (!iconName) return iconMap.default;
    return iconMap[iconName] || iconMap.default;
  };

  const filteredServices = selectedCategoryId 
    ? services.filter(s => s.category_id === selectedCategoryId)
    : services;

  // Parse page content JSON
  let contentData: any = null;
  if (pageData?.content) {
    try {
      contentData = typeof pageData.content === 'string' ? JSON.parse(pageData.content) : pageData.content;
    } catch (e) {
      console.error("Failed to parse page content", e);
    }
  }

  const { t } = useTranslation();

  const heroSection = contentData?.sections?.find((s: any) => s.type === "HeroBlock")?.data || {
    title: t('service_professional_title'),
    description: t('service_professional_desc')
  };

  const overviewSection = contentData?.sections?.find((s: any) => s.type === "ContentBlock")?.data || {
    title: t('service_overview'),
    content: t('service_overview_content', "Với hơn 20 năm kinh nghiệm trong lĩnh vực điện lạnh công nghiệp và dân dụng, VVC đã trở thành đối tác tin cậy của hàng nghìn khách hàng trên cả nước. Chúng tôi tự hào cung cấp các dịch vụ kỹ thuật chất lượng cao với đội ngũ chuyên viên được đào tạo bài bản."),
    features: [
      t('service_feature_1', "Đội ngũ kỹ sư giàu kinh nghiệm, được chứng nhận chuyên môn"),
      t('service_feature_2', "Phục vụ 24/7 với thời gian phản hồi nhanh chóng"),
      t('service_feature_3', "Trang thiết bị hiện đại, công nghệ tiên tiến"),
      t('service_feature_4', "Cam kết chất lượng và bảo hành dài hạn")
    ]
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-primary/90 py-16 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full -ml-48 -mb-48 blur-3xl opacity-50" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6 animate-in slide-in-from-left duration-700">{heroSection.title}</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-in slide-in-from-left duration-700 delay-100">
              {heroSection.description}
            </p>
            <div className="flex flex-wrap gap-4 animate-in slide-in-from-left duration-700 delay-200">
              <Link to={heroSection.primaryButtonLink || "/contact"} className="btn-accent">
                {heroSection.primaryButtonLabel || t('service_consulting')}
              </Link>
              <Link to={heroSection.secondaryButtonLink || "/service-support"} className="btn-white">
                {heroSection.secondaryButtonLabel || t('technical_support')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="mb-6 text-3xl md:text-4xl font-bold">{overviewSection.title}</h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                {overviewSection.content}
              </p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {(overviewSection.features || []).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start bg-gray-50 p-3 rounded-lg border border-transparent hover:border-primary/20 transition-colors">
                    <CheckCircle size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-lg -z-10" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10" />
              <img
                src={overviewSection.image || "/assets/images/service-overview.jpg"}
                alt={overviewSection.title}
                className="rounded-xl shadow-2xl w-full object-cover aspect-[4/3]"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section with Filtering */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold">{t('service_cat_title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t('service_cat_desc', "Chúng tôi cung cấp đầy đủ các dịch vụ điện lạnh công nghiệp và dân dụng, từ tư vấn thiết kế đến lắp đặt, bảo trì và sửa chữa.")}
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                <Button 
                    variant={selectedCategoryId === null ? "default" : "outline"}
                    onClick={() => setSelectedCategoryId(null)}
                    className="rounded-full px-6"
                >
                    {t('all')}
                </Button>
                {categories.map((cat) => (
                    <Button 
                        key={cat.id}
                        variant={selectedCategoryId === cat.id ? "default" : "outline"}
                        onClick={() => setSelectedCategoryId(cat.id)}
                        className="rounded-full px-6"
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-white rounded-xl animate-pulse shadow-sm" />
              ))
            ) : filteredServices.length > 0 ? (
              filteredServices.map((service, index) => {
                const Icon = getIcon(service.icon);
                return (
                  <Card key={service.id} className="group transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col border-none shadow-sm overflow-hidden">
                    <div className="h-2 w-0 bg-primary group-hover:w-full transition-all duration-300" />
                    <CardHeader className="pb-4">
                      <div className="bg-primary/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pt-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description || "Xem chi tiết để biết thêm thông tin."}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0 border-t border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider">
                            {service.service_categories?.name || t('services')}
                        </span>
                      <Link
                        to={`/services/${service.slug}`}
                        className="text-primary font-semibold hover:text-accent flex items-center gap-1 group/link"
                      >
                        {t('view_details')}
                        <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-inner border border-dashed">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground text-lg italic">{t('no_services', 'Hiện chưa có dịch vụ nào trong danh mục này.')}</p>
                <Button variant="link" onClick={() => setSelectedCategoryId(null)}>{t('view_all_services', 'Xem tất cả dịch vụ')}</Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-accent text-white border-none px-4 py-1">{t('free_consultation', 'Tư vấn miễn phí')}</Badge>
            <h2 className="mb-6 text-white text-3xl md:text-5xl font-bold">{t('cta_services_title', 'Bắt đầu với dịch vụ của chúng tôi')}</h2>
            <p className="text-white/80 mb-10 text-lg md:text-xl">
              {t('cta_services_desc', 'Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn và báo giá các dịch vụ điện lạnh phù hợp với nhu cầu của bạn. Đội ngũ kỹ thuật của VVC luôn sẵn sàng hỗ trợ.')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-accent/40">
                {t('contact_now', 'Liên hệ ngay')}
              </Link>
              <Link to="/service-support" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-bold transition-all backdrop-blur-sm">
                {t('find_out_more')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;