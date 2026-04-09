import React from 'react';
import { 
  FileText as FileTextIcon, 
  Wrench as WrenchIcon, 
  Activity as ActivityIcon, 
  Cog as CogIcon, 
  CheckCircle as CheckCircleIcon, 
  Zap as ZapIcon, 
  Shield as ShieldIcon, 
  Settings as SettingsIcon, 
  Server as ServerIcon, 
  ArrowRight as ArrowRightIcon,
  ThermometerSnowflake,
  Wind,
  IceCream,
  CircleCheckBig,
  BatteryCharging,
  Cpu,
  Droplets,
  Zap,
  Leaf,
  Layers,
  Flame,
  Snowflake
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { EditableElement } from '../admin/EditableElement';
import ContactForm from '../ContactForm';

// --- HỆ THỐNG LẠNH ---
export const RefrigerationBlock = ({ 
  title, 
  description,
  image,
  features,
  sectionId 
}: any) => {
  const { t } = useTranslation();
  
  const defaultTitle = t('industry_refrigeration_hero_title', "Công Nghệ Làm Lạnh");
  const defaultDesc = t('industry_refrigeration_hero_desc', "Cách thế giới tiêu dùng thực phẩm đã thay đổi toàn diện sau khi Jacob Perkins cấp bằng sáng chế cho chiếc tủ lạnh đầu tiên vào năm 1834. Việc bảo quản thực phẩm trong điều kiện lành mạnh lâu hơn đã trở nên khả thi.");
  const defaultImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200";
  
  const defaultFeatures = [
    { title: t('industry_ref_factor_1_title', "Chất lượng thiết bị"), desc: t('industry_ref_factor_1_desc', "Chất lượng của các thiết bị làm lạnh là nền tảng cho hiệu suất vận hành lâu dài.") },
    { title: t('industry_ref_factor_2_title', "Cấu hình chính xác"), desc: t('industry_ref_factor_2_desc', "Tối ưu hóa dựa trên đặc tính sản phẩm và điều kiện khí hậu thực tế.") },
    { title: t('industry_ref_factor_4_title', "Thuật toán thông minh"), desc: t('industry_ref_factor_4_desc', "Giảm tiêu thụ năng lượng thông qua bộ điều khiển thông minh AI.") }
  ];

  const displayTitle = title || defaultTitle;
  const displayDesc = description || defaultDesc;
  const displayImage = image || defaultImage;
  const displayFeatures = features || defaultFeatures;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <EditableElement tagName="h2" fieldKey="title" sectionId={sectionId} defaultContent={displayTitle} className="text-3xl md:text-4xl font-bold mb-6 text-primary" />
            <EditableElement tagName="p" fieldKey="description" sectionId={sectionId} defaultContent={displayDesc} className="text-lg text-muted-foreground mb-8 leading-relaxed" />
            
            <div className="grid sm:grid-cols-1 gap-8">
              {displayFeatures.map((f: any, i: number) => {
                const Icon = i === 0 ? ThermometerSnowflake : i === 1 ? Wind : CircleCheckBig;
                return (
                  <div key={i} className="flex gap-6 group items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-primary/10">
                      <Icon className="text-primary w-8 h-8 group-hover:text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{f.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-10">
              <a href="/products/industrial" className="btn-primary inline-flex items-center">
                {t('learn_more', 'Tìm hiểu thêm')} <ArrowRightIcon className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-2xl transform rotate-3" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <EditableElement type="image" fieldKey="image" sectionId={sectionId} defaultContent={displayImage}>
                <img src={displayImage} alt={displayTitle} className="w-full h-full object-cover min-h-[400px]" />
              </EditableElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PHÂN LOẠI KHO LẠNH ---
export const ColdStorageCatalogBlock = ({ sectionId }: any) => {
  const { t } = useTranslation();
  
  const types = [
    { id: 1, icon: ThermometerSnowflake, color: "blue" },
    { id: 2, icon: Snowflake, color: "cyan" },
    { id: 3, icon: Droplets, color: "indigo" },
    { id: 4, icon: Zap, color: "sky" },
    { id: 5, icon: Layers, color: "violet" },
    { id: 6, icon: Flame, color: "orange" }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            {t('cold_storage_types_title', 'Phân Loại Kho Lạnh')}
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            {t('cold_storage_types_subtitle', 'Phân loại dựa trên sản phẩm lưu trữ và mục đích sử dụng')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {types.map((type) => (
            <div key={type.id} className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[60px] opacity-20 group-hover:opacity-100 group-hover:bg-primary/5 transition-all" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-inner">
                  <type.icon className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {t(`cs_type_${type.id}_name`)}
                </h3>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-primary font-bold text-sm mb-4 border border-slate-200">
                  <ActivityIcon className="w-4 h-4 mr-2" />
                  {t(`cs_type_${type.id}_range`)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SỰ KHÁC BIỆT VIETVINH & MÔI CHẤT LẠNH ---
export const IndustrialExpertiseBlock = ({ sectionId }: any) => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-slate-900 leading-tight">
                {t('vietvinh_difference_title', 'Sự Khác Biệt Của VIETVINH')}
              </h2>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                {t('vietvinh_difference_desc', 'Với nhận thức kho lạnh là những anh hùng thầm lặng của ngành thực phẩm, VIETVINH nỗ lực bảo quản thực phẩm theo cách tốt nhất thông qua kỹ thuật tập trung R&D.')}
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center border border-green-100 shadow-sm">
                    <BatteryCharging className="text-green-600 w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">71% Energy Savings</h4>
                    <p className="text-muted-foreground text-sm">{t('industry_ref_factor_4_desc', 'Thuật toán thông minh giúp tối ưu điện năng tối đa.')}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm">
                    <Cpu className="text-blue-600 w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">R&D Focused Engineering</h4>
                    <p className="text-muted-foreground text-sm">Design tailored to each specific product and climate conditions.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 shadow-sm">
                    <Leaf className="text-amber-600 w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Eco-friendly Energy</h4>
                    <p className="text-muted-foreground text-sm">Solar and wind integration for A+++ energy efficient systems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-10 flex items-center">
                <Droplets className="mr-4 text-primary w-8 h-8" />
                {t('refrigerants_title', 'Môi Chất Lạnh')}
              </h3>
              
              <div className="space-y-12">
                <div className="group">
                  <h4 className="text-xl font-bold mb-4 text-primary flex items-center">
                    <span className="w-8 h-px bg-primary/40 mr-4 group-hover:w-12 transition-all" />
                    {t('refrigerants_natural_title', 'Môi chất tự nhiên')}
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {t('refrigerant_natural_desc', 'Ammonia, CO2, Glycol, Propane. Thân thiện với môi trường, chi phí vận hành thấp.')}
                  </p>
                </div>
                
                <div className="group">
                  <h4 className="text-xl font-bold mb-4 text-primary flex items-center">
                    <span className="w-8 h-px bg-primary/40 mr-4 group-hover:w-12 transition-all" />
                    {t('refrigerants_freon_title', 'Hệ thống Freon')}
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {t('refrigerant_freon_desc', 'Chi phí đầu tư thấp, phù hợp với mọi tonnage và lĩnh vực.')}
                  </p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-sm italic text-slate-300">
                  "* {t('industry_ref_distinction_desc', 'Mỗi sản phẩm đều cần yêu cầu làm lạnh đặc thù để duy trì độ tươi ngon.')}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- HỆ THỐNG CƠ ĐIỆN ---
export const MEBlock = ({
  title,
  description,
  image,
  sectionId
}: any) => {
  const { t } = useTranslation();
  
  const defaultTitle = t('industry_me_title', "Tổng Thầu Cơ Điện (M&E)");
  const defaultDesc = t('industry_me_desc', "Giải pháp cơ điện toàn diện cho các công trình dân dụng và công nghiệp, đáp ứng các tiêu chuẩn kỹ thuật khắt khe nhất của Việt Nam và Quốc tế.");
  const defaultImage = "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1200";

  const categories = [
    { icon: ZapIcon, label: t('industry_me_c1_title', "Hệ thống điện"), sub: t('industry_me_c1_desc', "Trạm biến áp, chiếu sáng, tủ bảng điện") },
    { icon: CogIcon, label: t('industry_me_c2_title', "Hệ thống HVAC"), sub: t('industry_me_c2_desc', "Thông gió, điều hòa không khí trung tâm") },
    { icon: ShieldIcon, label: t('industry_me_c3_title', "Hệ thống PCCC"), sub: t('industry_me_c3_desc', "Báo cháy, chữa cháy tự động tiêu chuẩn") },
    { icon: SettingsIcon, label: t('industry_me_c4_title', "Cấp thoát nước"), sub: t('industry_me_c4_desc', "Xử lý nước thải, cung cấp nước sạch") }
  ];

  const displayTitle = title || defaultTitle;
  const displayDesc = description || defaultDesc;
  const displayImage = image || defaultImage;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <EditableElement tagName="h2" fieldKey="title" sectionId={sectionId} defaultContent={displayTitle} className="text-3xl md:text-4xl font-extrabold mb-6" />
          <EditableElement tagName="p" fieldKey="description" sectionId={sectionId} defaultContent={displayDesc} className="text-lg text-muted-foreground" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                <cat.icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-extrabold mb-4 group-hover:text-primary transition-colors">{cat.label}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{cat.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 relative rounded-2xl overflow-hidden aspect-[21/9]">
           <EditableElement type="image" fieldKey="image" sectionId={sectionId} defaultContent={displayImage}>
             <img src={displayImage} alt="M&E Infrastructure" className="w-full h-full object-cover" />
           </EditableElement>
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12">
             <div className="text-white">
                <p className="text-xl md:text-2xl font-medium">{t('industry_me_banner_text', 'Đối tác tin cậy cho mọi công trình quy mô lớn')}</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- TRUNG TÂM DỮ LIỆU & QUẢN LÝ ---
export const DataCenterBlock = ({
  title,
  description,
  image,
  sectionId
}: any) => {
  const { t } = useTranslation();
  
  const defaultTitle = t('industry_dc_title', "Trung Tâm Dữ Liệu & Quản Lý Tập Trung");
  const defaultDesc = t('industry_dc_desc', "Tư vấn và triển khai hạ tầng trung tâm dữ liệu tiêu chuẩn TIER III, kết hợp hệ thống giám sát và quản lý tòa nhà BMS hiện đại.");
  const defaultImage = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200";

  const displayTitle = title || defaultTitle;
  const displayDesc = description || defaultDesc;
  const displayImage = image || defaultImage;

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
              {t('high_tech_infrastructure', 'High-Tech Infrastructure')}
            </div>
            <EditableElement tagName="h2" fieldKey="title" sectionId={sectionId} defaultContent={displayTitle} className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-white" />
            <EditableElement tagName="p" fieldKey="description" sectionId={sectionId} defaultContent={displayDesc} className="text-lg opacity-80 mb-10 leading-relaxed" />
            
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="flex items-start gap-6 group">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(var(--secondary),0.4)]">
                  <ServerIcon className="w-10 h-10 text-secondary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-3 text-white group-hover:text-secondary transition-colors">{t('precision_cooling', 'Precision Cooling')}</h4>
                  <p className="text-sm opacity-70 leading-relaxed">{t('precision_cooling_desc', 'Làm mát chính xác, độ tin cậy 99.982% cho máy chủ.')}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(var(--secondary),0.4)]">
                  <ActivityIcon className="w-10 h-10 text-secondary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-3 text-white group-hover:text-secondary transition-colors">{t('optimize_pue', 'Tối ưu PUE')}</h4>
                  <p className="text-sm opacity-70 leading-relaxed">{t('optimize_pue_desc', 'Giảm 30% năng lượng tiêu thụ với giải pháp quản lý thông minh.')}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <a href="/projects/specialized" className="px-8 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-all inline-block shadow-lg">
                {t('view_dc_projects', 'Xem các dự án Data Center')}
              </a>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-3xl group-hover:bg-secondary/30 transition-all opacity-50" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video">
              <EditableElement type="image" fieldKey="image" sectionId={sectionId} defaultContent={displayImage}>
                <img src={displayImage} alt="Data Center Visualization" className="w-full h-full object-cover" />
              </EditableElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- DỊCH VỤ (LIFECYCLE) ---
export const ServiceLifecycleBlock = ({
  title,
  description,
  sectionId
}: any) => {
  const { t } = useTranslation();
  
  const defaultTitle = t('industry_lifecycle_title', "Vòng Đời Dịch Vụ Toàn Diện");
  const defaultDesc = t('industry_lifecycle_desc', "Chúng tôi đồng hành cùng khách hàng từ khâu lên ý tưởng đến khi hệ thống đi vào vận hành ổn định và bảo trì lâu dài.");

  const steps = [
    { icon: FileTextIcon, title: t('lifecycle_s1_title', "Tư vấn & Thiết kế"), desc: t('lifecycle_s1_desc', "Khảo sát và đề xuất giải pháp kỹ thuật tối ưu nhất.") },
    { icon: WrenchIcon, title: t('lifecycle_s2_title', "Thi công & Lắp đặt"), desc: t('lifecycle_s2_desc', "Quy trình thực hiện chuyên nghiệp, đúng tiến độ cam kết.") },
    { icon: ActivityIcon, title: t('lifecycle_s3_title', "Vận hành & Hỗ trợ"), desc: t('lifecycle_s3_desc', "Đảm bảo hệ thống hoạt động ổn định và tin cậy 24/7.") },
    { icon: CogIcon, title: t('lifecycle_s4_title', "Bảo trì & Sửa chữa"), desc: t('lifecycle_s4_desc', "Dịch vụ sau bán hàng tận tâm, chuyên nghiệp, chính xác.") }
  ];

  const displayTitle = title || defaultTitle;
  const displayDesc = description || defaultDesc;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <EditableElement tagName="h2" fieldKey="title" sectionId={sectionId} defaultContent={displayTitle} className="text-3xl md:text-4xl font-bold mb-6" />
          <EditableElement tagName="p" fieldKey="description" sectionId={sectionId} defaultContent={displayDesc} className="text-lg text-muted-foreground" />
        </div>

        <div className="relative">
          {/* Decorative Line (Desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-slate-100" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:border-primary transition-all group-hover:scale-110 bg-white shadow-sm">
                  <step.icon className="w-10 h-10 text-slate-400 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-primary">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
           <a href="/services" className="btn-outline">{t('explore_service_details', 'Khám phá chi tiết dịch vụ')}</a>
        </div>
      </div>
    </section>
  );
};

// --- CONTACT FORM BLOCK ---
export const ContactFormBlock = () => {
  return <ContactForm />;
};
