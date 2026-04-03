import React from 'react';
import { EditableElement } from '../admin/EditableElement';

// --- About Hero Block ---
interface AboutHeroBlockProps {
  title: string;
  description: string;
}

export const AboutHeroBlock = ({ 
  title = "Giới thiệu", 
  description = "Tổng công ty Kỹ thuật lạnh Việt Nam (VVC) - Đơn vị tiên phong..." 
}: AboutHeroBlockProps) => (
  <div className="bg-gradient-to-b from-primary/10 to-transparent py-12 md:py-20">
    <div className="container-custom">
      <EditableElement 
        tagName="h1" 
        fieldKey="title" 
        defaultContent={title} 
        className="text-3xl md:text-5xl font-bold text-primary mb-6" 
      />
      <EditableElement 
        tagName="p" 
        fieldKey="description" 
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
}

export const HistoryBlock = ({
  title = "Lịch sử phát triển",
  p1 = "Được thành lập vào năm 2003...",
  p2 = "Từ một đơn vị chuyên về lắp đặt...",
  p3 = "Ngày nay, VVC tự hào là đối tác...",
  image = "/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png",
  expYears = "20+",
  expText = "Năm kinh nghiệm"
}: HistoryBlockProps) => (
  <section className="py-12 md:py-16">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <EditableElement 
            tagName="h2" 
            fieldKey="title" 
            defaultContent={title} 
            className="text-2xl md:text-3xl font-bold text-primary mb-4" 
          />
          <EditableElement tagName="p" fieldKey="p1" defaultContent={p1} className="mb-4" />
          <EditableElement tagName="p" fieldKey="p2" defaultContent={p2} className="mb-4" />
          <EditableElement tagName="p" fieldKey="p3" defaultContent={p3} />
        </div>
        <div className="relative">
          <EditableElement
            type="image"
            fieldKey="image"
            defaultContent={image}
            className="rounded-lg shadow-lg"
          >
            <img alt={title} className="w-full h-auto" />
          </EditableElement>
          <div className="absolute -bottom-6 -left-6 bg-secondary p-4 rounded-lg shadow-lg">
            <EditableElement tagName="p" fieldKey="expYears" defaultContent={expYears} className="text-xl font-bold" />
            <EditableElement tagName="p" fieldKey="expText" defaultContent={expText} className="text-sm" />
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
}

export const VisionMissionBlock = ({
  visionTitle = "Tầm nhìn",
  visionDesc1 = "Trở thành đơn vị hàng đầu...",
  visionDesc2 = "Chúng tôi không ngừng đổi mới...",
  missionTitle = "Sứ mệnh",
  missionDesc1 = "Cung cấp các giải pháp điện lạnh...",
  missionDesc2 = "Mang đến những không gian sống..."
}: VisionMissionBlockProps) => (
  <section className="py-12 md:py-16 bg-muted">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <EditableElement fieldKey="visionTitle" defaultContent={visionTitle} />
          </h2>
          <EditableElement tagName="p" fieldKey="visionDesc1" defaultContent={visionDesc1} className="mb-4" />
          <EditableElement tagName="p" fieldKey="visionDesc2" defaultContent={visionDesc2} />
        </div>
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
            <EditableElement fieldKey="missionTitle" defaultContent={missionTitle} />
          </h2>
          <EditableElement tagName="p" fieldKey="missionDesc1" defaultContent={missionDesc1} className="mb-4" />
          <EditableElement tagName="p" fieldKey="missionDesc2" defaultContent={missionDesc2} />
        </div>
      </div>
    </div>
  </section>
);

// --- Core Values Block ---
export const CoreValuesBlock = ({ title = "Giá trị cốt lõi" }) => (
  <section className="py-12 md:py-16">
    <div className="container-custom">
      <EditableElement 
        tagName="h2" 
        fieldKey="title" 
        defaultContent={title} 
        className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center" 
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { key: 'v1', icon: 'M3 7h18 M3 11h18 M3 15h14 M3 19h4', title: 'Chất lượng hàng đầu', desc: 'Chúng tôi cam kết...' },
          { key: 'v2', icon: 'M12 2v20 m17 5-5-3-5 3 m17 19-5 3-5-3 M2 12h20 m5 7-3 5 3 5 m19 7 3 5-3 5', title: 'Đổi mới sáng tạo', desc: 'Không ngừng cải tiến...' },
          { key: 'v3', icon: 'M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z', title: 'Khách hàng là trọng tâm', desc: 'Luôn đặt nhu cầu...' }
        ].map(val => (
          <div key={val.key} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
            <div className="mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={val.icon}></path></svg>
            </div>
            <EditableElement tagName="h3" fieldKey={`${val.key}_title`} defaultContent={val.title} className="text-xl font-semibold mb-2" />
            <EditableElement tagName="p" fieldKey={`${val.key}_desc`} defaultContent={val.desc} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Leadership Block ---
interface Leader {
  name: string;
  position: string;
  photo: string;
  keyPrefix: string;
}

export const LeadershipBlock = ({ title = "Đội ngũ lãnh đạo" }) => {
  const leaders: Leader[] = [
    { name: "Nguyễn Văn A", position: "Chủ tịch Hội đồng Quản trị", photo: "https://i.pravatar.cc/300?img=1", keyPrefix: "l1" },
    { name: "Trần Thị B", position: "Tổng Giám đốc", photo: "https://i.pravatar.cc/300?img=5", keyPrefix: "l2" },
    { name: "Lê Văn C", position: "Phó Tổng Giám đốc", photo: "https://i.pravatar.cc/300?img=3", keyPrefix: "l3" },
    { name: "Phạm Thị D", position: "Giám đốc Tài chính", photo: "https://i.pravatar.cc/300?img=4", keyPrefix: "l4" }
  ];

  return (
    <section className="py-12 md:py-16 bg-muted">
      <div className="container-custom">
        <EditableElement 
          tagName="h2" 
          fieldKey="title" 
          defaultContent={title} 
          className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center" 
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <div key={leader.keyPrefix} className="bg-white rounded-lg overflow-hidden shadow-md">
              <EditableElement
                type="image"
                fieldKey={`${leader.keyPrefix}_image`}
                defaultContent={leader.photo}
                className="w-full h-64"
              >
                <img alt={leader.name} className="w-full h-full object-cover object-center" />
              </EditableElement>
              <div className="p-4">
                <EditableElement tagName="h3" fieldKey={`${leader.keyPrefix}_name`} defaultContent={leader.name} className="text-xl font-semibold text-primary" />
                <EditableElement tagName="p" fieldKey={`${leader.keyPrefix}_pos`} defaultContent={leader.position} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Achievements Block ---
export const AchievementsBlock = ({ title = "Thành tựu nổi bật" }) => (
  <section className="py-12 md:py-16">
    <div className="container-custom">
      <EditableElement 
        tagName="h2" 
        fieldKey="title" 
        defaultContent={title} 
        className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center" 
      />
      {/* ... keeping it simple for now, can expand later ... */}
      <div className="bg-primary/5 p-8 rounded-2xl text-center">
        <p className="text-lg text-primary font-medium italic">"Chặng đường 20 năm khẳng định vị thế và niềm tin của khách hàng."</p>
      </div>
    </div>
  </section>
);
