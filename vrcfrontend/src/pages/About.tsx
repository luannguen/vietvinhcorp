import { VisualEditorProvider } from '../context/VisualEditorContext';
import { VisualPageRenderer } from '../components/admin/builder/VisualPageRenderer';

const DEFAULT_ABOUT_SECTIONS = [
  {
    id: 'hero',
    type: 'about_hero',
    props: { 
      title: 'Giới thiệu', 
      description: 'Tổng công ty Kỹ thuật lạnh Việt Nam (VVC) - Đơn vị tiên phong trong lĩnh vực kỹ thuật lạnh với hơn 20 năm kinh nghiệm, cung cấp giải pháp toàn diện trong lĩnh vực điện lạnh cho các công trình dân dụng và công nghiệp.' 
    }
  },
  {
    id: 'history',
    type: 'about_history',
    props: {
      title: 'Lịch sử phát triển',
      p1: 'Được thành lập vào năm 2003, VVC đã trải qua hành trình phát triển dài hơn 20 năm, không ngừng mở rộng quy mô và nâng cao chất lượng dịch vụ.',
      p2: 'Từ một đơn vị chuyên về lắp đặt và bảo dưỡng hệ thống điều hòa không khí, VVC đã phát triển thành Tổng công ty hàng đầu trong lĩnh vực kỹ thuật lạnh tại Việt Nam với nhiều chi nhánh trên toàn quốc.',
      image: '/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png',
      expYears: '20+',
      expText: 'Năm kinh nghiệm'
    }
  },
  {
    id: 'vision_mission',
    type: 'about_vision',
    props: {
      visionTitle: 'Tầm nhìn',
      missionTitle: 'Sứ mệnh'
    }
  },
  {
    id: 'core_values',
    type: 'about_values',
    props: { title: 'Giá trị cốt lõi' }
  },
  {
    id: 'leadership',
    type: 'about_leadership',
    props: { title: 'Đội ngũ lãnh đạo' }
  },
  {
    id: 'achievements',
    type: 'about_achievements',
    props: { title: 'Thành tựu nổi bật' }
  }
];

const AboutContent = () => {
  return (
    <main className="flex-grow">
      <VisualPageRenderer customSections={DEFAULT_ABOUT_SECTIONS} />
    </main>
  );
};

const About = () => {
  return (
    <VisualEditorProvider slug="about-us">
      <AboutContent />
    </VisualEditorProvider>
  );
};

export default About;