import React from 'react';
import { FileText, Wrench, Activity, Cog, CheckCircle, Zap, Shield, Settings, Server, ArrowRight } from 'lucide-react';
import { EditableElement } from '../admin/EditableElement';
import ContactForm from '../ContactForm';

// --- HỆ THỐNG LẠNH ---
export const RefrigerationBlock = ({ 
  title = "Hệ Thống Lạnh Công Nghiệp", 
  description = "VVC cung cấp các giải pháp làm lạnh chuyên sâu, từ kho lạnh bảo quản đến hệ thống điều hòa trung tâm công suất lớn, đảm bảo hiệu suất tối ưu và tiết kiệm năng lượng.",
  image = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
  features = [
    { title: "Kho lạnh công nghiệp", desc: "Bảo quản thực phẩm, dược phẩm tiêu chuẩn ISO" },
    { title: "Hệ thống Chiller", desc: "Làm lạnh nước công suất lớn cho nhà máy, tòa nhà" },
    { title: "Điều hòa VRV/VRF", desc: "Giải pháp đa kết nối hiện đại, tiết kiệm 40% điện năng" }
  ],
  sectionId 
}: any) => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <EditableElement tagName="h2" fieldKey="title" sectionId={sectionId} defaultContent={title} className="text-3xl md:text-4xl font-bold mb-6 text-primary" />
            <EditableElement tagName="p" fieldKey="description" sectionId={sectionId} defaultContent={description} className="text-lg text-muted-foreground mb-8 leading-relaxed" />
            
            <div className="space-y-6">
              {features.map((f: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{f.title}</h4>
                    <p className="text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <a href="/products/industrial" className="btn-primary inline-flex items-center">
                Tìm hiểu thêm <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-2xl transform rotate-3" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <EditableElement type="image" fieldKey="image" sectionId={sectionId} defaultContent={image}>
                <img src={image} alt={title} className="w-full h-full object-cover min-h-[400px]" />
              </EditableElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- HỆ THỐNG CƠ ĐIỆN ---
export const MEBlock = ({
  title = "Tổng Thầu Cơ Điện (M&E)",
  description = "Giải pháp cơ điện toàn diện cho các công trình dân dụng và công nghiệp, đáp ứng các tiêu chuẩn kỹ thuật khắt khe nhất của Việt Nam và Quốc tế.",
  image = "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=1200",
  sectionId
}: any) => {
  const categories = [
    { icon: Zap, label: "Hệ thống điện", sub: "Trạm biến áp, chiếu sáng, tủ bảng điện" },
    { icon: Cog, label: "Hệ thống HVAC", sub: "Thông gió, điều hòa không khí trung tâm" },
    { icon: Shield, label: "Hệ thống PCCC", sub: "Báo cháy, chữa cháy tự động tiêu chuẩn" },
    { icon: Settings, label: "Cấp thoát nước", sub: "Xử lý nước thải, cung cấp nước sạch" }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <EditableElement tagName="h2" fieldKey="title" sectionId={sectionId} defaultContent={title} className="text-3xl md:text-4xl font-extrabold mb-6" />
          <EditableElement tagName="p" fieldKey="description" sectionId={sectionId} defaultContent={description} className="text-lg text-muted-foreground" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 group">
              <div className="w-14 h-14 bg-primary text-white rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <cat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{cat.label}</h3>
              <p className="text-muted-foreground text-sm">{cat.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 relative rounded-2xl overflow-hidden aspect-[21/9]">
           <EditableElement type="image" fieldKey="image" sectionId={sectionId} defaultContent={image}>
             <img src={image} alt="M&E Infrastructure" className="w-full h-full object-cover" />
           </EditableElement>
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12">
             <div className="text-white">
                <p className="text-xl md:text-2x font-medium">Đối tác tin cậy cho mọi công trình quy mô lớn</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- TRUNG TÂM DỮ LIỆU & QUẢN LÝ ---
export const DataCenterBlock = ({
  title = "Trung Tâm Dữ Liệu & Quản Lý Tập Trung",
  description = "Tư vấn và triển khai hạ tầng trung tâm dữ liệu tiêu chuẩn TIER III, kết hợp hệ thống giám sát và quản lý tòa nhà BMS hiện đại.",
  image = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
  sectionId
}: any) => {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">
              High-Tech Infrastructure
            </div>
            <EditableElement tagName="h2" fieldKey="title" sectionId={sectionId} defaultContent={title} className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-white" />
            <EditableElement tagName="p" fieldKey="description" sectionId={sectionId} defaultContent={description} className="text-lg opacity-80 mb-10 leading-relaxed" />
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <Server className="w-10 h-10 text-secondary flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xl mb-2 text-white">Precision Cooling</h4>
                  <p className="text-sm opacity-70">Làm mát chính xác, độ tin cậy 99.982% cho máy chủ.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Activity className="w-10 h-10 text-secondary flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-xl mb-2 text-white">Tối ưu PUE</h4>
                  <p className="text-sm opacity-70">Giảm 30% năng lượng tiêu thụ với giải pháp quản lý thông minh.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <a href="/projects/specialized" className="px-8 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary/90 transition-all inline-block shadow-lg">
                Xem các dự án Data Center
              </a>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-3xl group-hover:bg-secondary/30 transition-all opacity-50" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video">
              <EditableElement type="image" fieldKey="image" sectionId={sectionId} defaultContent={image}>
                <img src={image} alt="Data Center Visualization" className="w-full h-full object-cover" />
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
  title = "Vòng Đời Dịch Vụ Toàn Diện",
  description = "Chúng tôi đồng hành cùng khách hàng từ khâu lên ý tưởng đến khi hệ thống đi vào vận hành ổn định và bảo trì lâu dài.",
  sectionId
}: any) => {
  const steps = [
    { icon: FileText, title: "Tư vấn & Thiết kế", desc: "Khảo sát và đề xuất giải pháp kỹ thuật tối ưu nhất." },
    { icon: Wrench, title: "Thi công & Lắp đặt", desc: "Quy trình thực hiện chuyên nghiệp, đúng tiến độ cam kết." },
    { icon: Activity, title: "Vận hành & Hỗ trợ", desc: "Đảm bảo hệ thống hoạt động ổn định và tin cậy 24/7." },
    { icon: Cog, title: "Bảo trì & Sửa chữa", desc: "Dịch vụ sau bán hàng tận tâm, chuyên nghiệp, chính xác." }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <EditableElement tagName="h2" fieldKey="title" sectionId={sectionId} defaultContent={title} className="text-3xl md:text-4xl font-bold mb-6" />
          <EditableElement tagName="p" fieldKey="description" sectionId={sectionId} defaultContent={description} className="text-lg text-muted-foreground" />
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
           <a href="/services" className="btn-outline">Khám phá chi tiết dịch vụ</a>
        </div>
      </div>
    </section>
  );
};

// --- CONTACT FORM BLOCK ---
export const ContactFormBlock = () => {
  return <ContactForm />;
};
