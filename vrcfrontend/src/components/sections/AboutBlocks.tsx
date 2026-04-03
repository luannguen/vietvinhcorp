import React from 'react';
import { EditableElement } from '../admin/EditableElement';

// --- About Hero Block ---
interface AboutHeroBlockProps {
  title: string;
  description: string;
  sectionId?: string;
}

export const AboutHeroBlock = ({ 
  title = "Giới thiệu", 
  description = "Tổng công ty Kỹ thuật lạnh Việt Nam (VVC) - Đơn vị tiên phong...",
  sectionId
}: AboutHeroBlockProps) => (
  <div className="bg-gradient-to-b from-primary/10 to-transparent py-12 md:py-20">
    <div className="container-custom">
      <EditableElement 
        tagName="h1" 
        fieldKey="title" 
        sectionId={sectionId}
        defaultContent={title} 
        className="text-3xl md:text-5xl font-bold text-primary mb-6" 
      />
      <EditableElement 
        tagName="p" 
        fieldKey="description" 
        sectionId={sectionId}
        defaultContent={description} 
        className="text-lg text-muted-foreground max-w-3xl" 
      />
    </div>
  </div>
);

// --- History Block ---
interface HistoryBlockProps {
  title: string;
  p1: string;
  p2: string;
  p3: string;
  image: string;
  expYears: string;
  expText: string;
  sectionId?: string;
}

export const HistoryBlock = ({
  title = "Lịch sử phát triển",
  p1 = "Được thành lập vào năm 2003...",
  p2 = "Từ một đơn vị chuyên về lắp đặt...",
  p3 = "Ngày nay, VVC tự hào là đối tác...",
  image = "/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png",
  expYears = "20+",
  expText = "Năm kinh nghiệm",
  sectionId
}: HistoryBlockProps) => (
  <section className="py-12 md:py-16">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <EditableElement 
            tagName="h2" 
            fieldKey="title" 
            sectionId={sectionId}
            defaultContent={title} 
            className="text-2xl md:text-3xl font-bold text-primary mb-4" 
          />
          <EditableElement tagName="p" fieldKey="p1" sectionId={sectionId} defaultContent={p1} className="mb-4" />
          <EditableElement tagName="p" fieldKey="p2" sectionId={sectionId} defaultContent={p2} className="mb-4" />
          <EditableElement tagName="p" fieldKey="p3" sectionId={sectionId} defaultContent={p3} />
        </div>
        <div className="relative">
          <EditableElement
            type="image"
            fieldKey="image"
            sectionId={sectionId}
            defaultContent={image}
            className="rounded-lg shadow-lg"
          >
            <img alt={title} className="w-full h-auto" />
          </EditableElement>
          <div className="absolute -bottom-6 -left-6 bg-secondary p-4 rounded-lg shadow-lg">
            <EditableElement tagName="p" fieldKey="expYears" sectionId={sectionId} defaultContent={expYears} className="text-xl font-bold" />
            <EditableElement tagName="p" fieldKey="expText" sectionId={sectionId} defaultContent={expText} className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Vision & Mission Block ---
interface VisionMissionBlockProps {
  visionTitle: string;
  visionDesc1: string;
  visionDesc2: string;
  missionTitle: string;
  missionDesc1: string;
  missionDesc2: string;
  sectionId?: string;
}

export const VisionMissionBlock = ({
  visionTitle = "Tầm nhìn",
  visionDesc1 = "Trở thành đơn vị hàng đầu...",
  visionDesc2 = "Chúng tôi không ngừng đổi mới...",
  missionTitle = "Sứ mệnh",
  missionDesc1 = "Cung cấp các giải pháp điện lạnh...",
  missionDesc2 = "Mang đến những không gian sống...",
  sectionId,
  ...props
}: any) => (
  <section className="py-12 md:py-16 bg-muted">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <EditableElement fieldKey="visionTitle" sectionId={sectionId} defaultContent={props.visionTitle || visionTitle} />
          </h2>
          <EditableElement tagName="p" fieldKey="visionDesc1" sectionId={sectionId} defaultContent={props.visionDesc1 || visionDesc1} className="mb-4" />
          <EditableElement tagName="p" fieldKey="visionDesc2" sectionId={sectionId} defaultContent={props.visionDesc2 || visionDesc2} />
        </div>
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
            <EditableElement fieldKey="missionTitle" sectionId={sectionId} defaultContent={props.missionTitle || missionTitle} />
          </h2>
          <EditableElement tagName="p" fieldKey="missionDesc1" sectionId={sectionId} defaultContent={props.missionDesc1 || missionDesc1} className="mb-4" />
          <EditableElement tagName="p" fieldKey="missionDesc2" sectionId={sectionId} defaultContent={props.missionDesc2 || missionDesc2} />
        </div>
      </div>
    </div>
  </section>
);

// --- Core Values Block ---
export const CoreValuesBlock = ({ title = "Giá trị cốt lõi", sectionId, ...props }: any) => {
  const values = [
    { key: 'v1', icon: 'M3 7h18 M3 11h18 M3 15h14 M3 19h4', title: props.v1_title || 'Chất lượng hàng đầu', desc: props.v1_desc || 'Chúng tôi cam kết...' },
    { key: 'v2', icon: 'M12 2v20 m17 5-5-3-5 3 m17 19-5 3-5-3 M2 12h20 m5 7-3 5 3 5 m19 7 3 5-3 5', title: props.v2_title || 'Đổi mới sáng tạo', desc: props.v2_desc || 'Không ngừng cải tiến...' },
    { key: 'v3', icon: 'M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z', title: props.v3_title || 'Khách hàng là trọng tâm', desc: props.v3_desc || 'Luôn đặt nhu cầu...' }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container-custom">
        <EditableElement 
          tagName="h2" 
          fieldKey="title" 
          sectionId={sectionId}
          defaultContent={title} 
          className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center" 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(val => (
            <div key={val.key} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={val.icon}></path></svg>
              </div>
              <EditableElement tagName="h3" fieldKey={`${val.key}_title`} sectionId={sectionId} defaultContent={val.title} className="text-xl font-semibold mb-2" />
              <EditableElement tagName="p" fieldKey={`${val.key}_desc`} sectionId={sectionId} defaultContent={val.desc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Leadership Block ---
interface Leader {
  name: string;
  position: string;
  photo: string;
  keyPrefix: string;
}

export const LeadershipBlock = ({ title = "Đội ngũ lãnh đạo", sectionId, ...props }: any) => {
  const leaders: Leader[] = [
    { name: props.l1_name || "Nguyễn Văn A", position: props.l1_pos || "Chủ tịch Hội đồng Quản trị", photo: props.l1_image || "https://i.pravatar.cc/300?img=1", keyPrefix: "l1" },
    { name: props.l2_name || "Trần Thị B", position: props.l2_pos || "Tổng Giám đốc", photo: props.l2_image || "https://i.pravatar.cc/300?img=5", keyPrefix: "l2" },
    { name: props.l3_name || "Lê Văn C", position: props.l3_pos || "Phó Tổng Giám đốc", photo: props.l3_image || "https://i.pravatar.cc/300?img=3", keyPrefix: "l3" },
    { name: props.l4_name || "Phạm Thị D", position: props.l4_pos || "Giám đốc Tài chính", photo: props.l4_image || "https://i.pravatar.cc/300?img=4", keyPrefix: "l4" }
  ];

  return (
    <section className="py-12 md:py-16 bg-muted">
      <div className="container-custom">
        <EditableElement 
          tagName="h2" 
          fieldKey="title" 
          sectionId={sectionId}
          defaultContent={title} 
          className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center" 
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <div key={leader.keyPrefix} className="bg-white rounded-lg overflow-hidden shadow-md">
              <EditableElement
                type="image"
                fieldKey={`${leader.keyPrefix}_image`}
                sectionId={sectionId}
                defaultContent={leader.photo}
                className="w-full h-64"
              >
                <img alt={leader.name} className="w-full h-full object-cover object-center" />
              </EditableElement>
              <div className="p-4">
                <EditableElement tagName="h3" fieldKey={`${leader.keyPrefix}_name`} sectionId={sectionId} defaultContent={leader.name} className="text-xl font-semibold text-primary" />
                <EditableElement tagName="p" fieldKey={`${leader.keyPrefix}_pos`} sectionId={sectionId} defaultContent={leader.position} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Achievements Block ---
export const AchievementsBlock = ({ title = "Thành tựu nổi bật", sectionId }: { title?: string; sectionId?: string }) => (
  <section className="py-12 md:py-16">
    <div className="container-custom">
      <EditableElement 
        tagName="h2" 
        fieldKey="title" 
        sectionId={sectionId}
        defaultContent={title} 
        className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center" 
      />
      <div className="bg-primary/5 p-8 rounded-2xl text-center">
        <p className="text-lg text-primary font-medium italic">"Chặng đường 20 năm khẳng định vị thế và niềm tin của khách hàng."</p>
      </div>
    </div>
  </section>
);

// --- Production Facilities Block ---
export const ProductionFacilitiesBlock = ({ 
  title = "Cơ sở hạ tầng & Trung tâm sản xuất",
  description = "VVC đầu tư mạnh mẽ vào hệ thống nhà xưởng hiện đại, kho bãi quy mô lớn và trung tâm điều chuyển hàng hóa tại các địa bàn trọng điểm.",
  image1 = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
  image2 = "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&q=80",
  sectionId,
  ...props
}: any) => (
  <section className="py-12 md:py-16 bg-white">
    <div className="container-custom">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <EditableElement 
          tagName="h2" 
          fieldKey="title" 
          sectionId={sectionId}
          defaultContent={title} 
          className="text-2xl md:text-4xl font-bold text-primary mb-4" 
        />
        <EditableElement 
          tagName="p" 
          fieldKey="description" 
          sectionId={sectionId}
          defaultContent={description} 
          className="text-lg text-muted-foreground" 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <EditableElement
            type="image"
            fieldKey="image1"
            sectionId={sectionId}
            defaultContent={image1}
            className="rounded-xl shadow-lg overflow-hidden h-[300px]"
          >
            <img alt="Facility 1" className="w-full h-full object-cover" />
          </EditableElement>
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
            <h3 className="font-bold text-lg mb-2 text-primary">Năng lực lưu kho</h3>
            <p className="text-sm">Hệ thống kho bảo quản gas lạnh và vật tư thiết bị đạt chuẩn quốc tế, đảm bảo nguồn cung liên tục cho các dự án lớn.</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-4 order-2 md:order-1">
            <h3 className="font-bold text-lg mb-2 text-primary">Trung tâm kỹ thuật</h3>
            <p className="text-sm">Sở hữu phòng LAB và xưởng lắp ráp với máy móc CNC hiện đại, cho phép sản xuất các cấu kiện cơ khí lạnh chính xác cao.</p>
          </div>
          <EditableElement
            type="image"
            fieldKey="image2"
            sectionId={sectionId}
            defaultContent={image2}
            className="rounded-xl shadow-lg overflow-hidden h-[300px] order-1 md:order-2"
          >
            <img alt="Facility 2" className="w-full h-full object-cover" />
          </EditableElement>
        </div>
      </div>
    </div>
  </section>
);

// --- Quality Principles Block ---
export const QualityPrinciplesBlock = ({
  title = "Nguyên tắc chất lượng của VVC",
  sectionId,
  ...props
}: any) => {
  const principles = [
    { key: 'q1', title: props.q1_title || 'Chất lượng là sống còn', desc: props.q1_desc || 'Mọi sản phẩm và giải pháp đều phải trải qua quy trình kiểm soát 3 lớp nghiêm ngặt.' },
    { key: 'q2', title: props.q2_title || 'Sáng tạo & Đổi mới', desc: props.q2_desc || 'Không ngừng cập nhật công nghệ làm mát tiên tiến nhất từ Nhật Bản và Châu Âu.' },
    { key: 'q3', title: props.q3_title || 'Trách nhiệm cộng đồng', desc: props.q3_desc || 'Cam kết sử dụng môi chất lạnh thân thiện với môi trường, góp phần giảm hiệu ứng nhà kính.' },
    { key: 'q4', title: props.q4_title || 'Đối tác tin cậy', desc: props.q4_desc || 'Xây dựng mối quan hệ dựa trên sự trung thực, minh bạch và hiệu quả kinh tế bền vững.' }
  ];

  return (
    <section className="py-12 md:py-20 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="container-custom relative z-10">
        <EditableElement 
          tagName="h2" 
          fieldKey="title" 
          sectionId={sectionId}
          defaultContent={title} 
          className="text-3xl md:text-4xl font-bold mb-12 text-center" 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map(p => (
            <div key={p.key} className="border-l-2 border-primary pl-6 py-2 hover:bg-white/5 transition-colors duration-300">
              <EditableElement tagName="h3" fieldKey={`${p.key}_title`} sectionId={sectionId} defaultContent={p.title} className="text-xl font-bold mb-3 text-primary-light" />
              <EditableElement tagName="p" fieldKey={`${p.key}_desc`} sectionId={sectionId} defaultContent={p.desc} className="text-slate-400 text-sm leading-relaxed" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
