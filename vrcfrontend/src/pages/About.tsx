import { useTranslation } from 'react-i18next';
import { VisualEditorProvider } from '../context/VisualEditorContext';
import { VisualPageRenderer } from '../components/admin/builder/VisualPageRenderer';

const AboutContent = () => {
  const { t } = useTranslation();

  const getLocalizedSections = () => [
    {
      id: 'hero',
      type: 'about_hero',
      props: { 
        title: t('about_hero_title'), 
        description: t('about_hero_desc') 
      }
    },
    {
      id: 'history',
      type: 'about_history',
      props: {
        title: t('history_title'),
        p1: t('about_history_p1', 'Được thành lập vào năm 2003, VVC đã trải qua chặng đường hơn 20 năm phát triển bền vững, không ngừng đổi mới để trở thành Tổng công ty kỹ thuật lạnh hàng đầu Việt Nam.'),
        p2: t('about_history_p2', 'Sự kết hợp giữa đội ngũ kỹ sư chuyên môn cao và quy trình quản trị hiện đại đã giúp VVC khẳng định vị thế trong các lĩnh vực: kho lạnh công nghiệp, hệ thống điều hòa không khí và vật tư kỹ thuật lạnh.'),
        image: '/vvc-hero.png',
        expYears: '20+',
        expText: t('experience_years', 'Năm kinh nghiệm')
      }
    },
    {
      id: 'vision_mission',
      type: 'about_vision',
      props: {
        visionTitle: t('vision_title'),
        visionDesc1: t('vision_desc', 'Trở thành biểu tượng uy tín hàng đầu trong ngành kỹ thuật lạnh tại Việt Nam và vươn tầm khu vực Đông Nam Á.'),
        missionTitle: t('mission_title'),
        missionDesc1: t('mission_desc', 'Cung cấp hệ sinh thái giải pháp kỹ thuật lạnh bền vững, tiết kiệm năng lượng, góp phần nâng cao chất lượng cuộc sống và bảo vệ môi trường.')
      }
    },
    {
      id: 'facilities',
      type: 'about_facilities',
      props: {
        title: t('facilities_title'),
        description: t('facilities_desc', 'VVC sở hữu hệ thống nhà máy sản xuất linh kiện cơ khí lạnh hiện đại, cùng mạng lưới kho bãi quy mô lớn tại các vùng kinh tế trọng điểm, đáp ứng mọi nhu cầu khắt khe của dự án.'),
        image1: '/vvc-factory.png',
        image2: '/vvc-quality.png'
      }
    },
    {
        id: 'quality',
        type: 'about_quality',
        props: {
            title: t('quality_title'),
            q1_title: t('quality_q1_title', 'Chất lượng là sống còn'),
            q1_desc: t('quality_q1_desc', 'Mọi sản phẩm và giải pháp đều phải trải qua quy trình kiểm soát 3 lớp nghiêm ngặt trước khi đến tay khách hàng.'),
            q2_title: t('quality_q2_title', 'Sáng tạo & Đổi mới'),
            q2_desc: t('quality_q2_desc', 'Không ngừng cập nhật công nghệ làm mát tiên tiến nhất từ Nhật Bản và Châu Âu để tối ưu hiệu suất.'),
            q3_title: t('quality_q3_title', 'Trách nhiệm cộng đồng'),
            q3_desc: t('quality_q3_desc', 'Cam kết sử dụng các môi chất lạnh thân thiện với môi trường, giảm thiểu tác động đến tầng Ozone.'),
            q4_title: t('quality_q4_title', 'Đối tác tin cậy'),
            q4_desc: t('quality_q4_desc', 'Xây dựng mối quan hệ dựa trên sự trung thực, chuyên nghiệp và hiệu quả kinh tế bền vững cho mọi khách hàng.')
        }
    },
    {
      id: 'core_values',
      type: 'about_values',
      props: { title: t('core_values') }
    },
    { id: 'about-partners', type: 'about_partners', props: { title: t('partners_clients_title', 'Đối tác & Khách hàng') } }
  ];

  return (
    <main className="flex-grow">
      <VisualPageRenderer customSections={getLocalizedSections()} />
    </main>
  );
};

const About = () => {
  // About Us page always maps to 'about-us' slug in database
  // This ensures the Visual Editor correctly syncs with the static_pages record
  const effectiveSlug = 'about-us';

  return (
    <VisualEditorProvider slug={effectiveSlug}>
      <AboutContent />
    </VisualEditorProvider>
  );
};

export default About;