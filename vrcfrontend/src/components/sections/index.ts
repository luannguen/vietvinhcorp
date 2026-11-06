import { registerBlock } from '../admin/builder/SectionRegistry';
import { HeroBlock } from './HeroBlock';
import { RichTextBlock } from './RichTextBlock';
import { GridBlock } from './GridBlock';
import { CardBlock } from './CardBlock';
import { FeatureListBlock } from './FeatureListBlock';
import { ImageBlock } from './ImageBlock';
import { MediaSectionBlock } from './MediaSectionBlock';
import { 
  AboutHeroBlock, 
  HistoryBlock, 
  VisionMissionBlock, 
  CoreValuesBlock, 
  AchievementsBlock,
  ProductionFacilitiesBlock,
  QualityPrinciplesBlock,
  PartnersBlock
} from './AboutBlocks';
import { TeamHeroBlock, TeamGridBlock } from './TeamBlocks';
import { 
  RefrigerationBlock, 
  MEBlock, 
  DataCenterBlock, 
  ServiceLifecycleBlock, 
  ColdStorageCatalogBlock,
  IndustrialExpertiseBlock,
  AdvancedTechShowcaseBlock,
  TechnicalDetailBlock,
  ContactFormBlock 
} from './IndustryBlocks';
import { NewsEventsBlock, ProjectsBlock, ProductsBlock } from './HomeSections';
import { HomeBannerSlider } from './HomeBannerSlider';
import { CapabilityProfileBlock } from './CapabilityProfileBlock';
import { ServiceHeroBlock } from './ServiceHeroBlock';
import { ServiceGridBlock } from './ServiceGridBlock';
import { CTASectionBlock } from './CTASectionBlock';
import { JobsListBlock } from './JobsListBlock';
import { ProjectHeroBlock, ProjectOverviewBlock, ProjectShowcaseBlock } from './ProjectBlocks';
import { 
  IntroCardProBlock, 
  ModernCardGridBlock, 
  StatsCounterCardBlock, 
  SplitMediaCardBlock, 
  CTABannerCardBlock 
} from './ModernCardBlocks';

// Function to register all blocks
export const registerAllBlocks = () => {
  registerBlock({
    type: 'hero',
    name: 'Hero Banner',
    component: HeroBlock,
    defaultProps: {
      title: 'New Page Hero',
      description: 'Engage your visitors with a powerful hero section.',
      alignment: 'center'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' },
      { id: 'backgroundImage', label: 'Ảnh nền', type: 'image' },
      { id: 'buttonText', label: 'Chữ trên nút 1', type: 'text' },
      { id: 'buttonLink', label: 'Liên kết nút 1', type: 'text' },
      { id: 'button2Text', label: 'Chữ trên nút 2', type: 'text' },
      { id: 'button2Link', label: 'Liên kết nút 2', type: 'text' },
      { id: 'badge', label: 'Badge/Tagline', type: 'text' },
      { id: 'alignment', label: 'Căn lề', type: 'select', options: [
        { label: 'Trái', value: 'left' },
        { label: 'Giữa', value: 'center' },
        { label: 'Phải', value: 'right' }
      ]}
    ]
  });

  registerBlock({
    type: 'rich_text',
    name: 'Rich Text',
    component: RichTextBlock,
    defaultProps: {
      content: '<h2>Heading</h2><p>Start writing your content here...</p>'
    },
    fields: [
      { id: 'content', label: 'Nội dung', type: 'rich-text' }
    ]
  });

  registerBlock({
    type: 'grid',
    name: 'Layout Grid',
    component: GridBlock,
    defaultProps: {
      columns: 2,
      gap: 8,
      padding: 'medium'
    },
    fields: [
      { id: 'columns', label: 'Số cột', type: 'number' },
      { id: 'gap', label: 'Khoảng cách', type: 'number' },
      { id: 'padding', label: 'Lề (Padding)', type: 'select', options: [
        { label: 'Nhỏ', value: 'small' },
        { label: 'Vừa', value: 'medium' },
        { label: 'Lớn', value: 'large' }
      ]}
    ]
  });

  registerBlock({
    type: 'cards',
    name: 'Card Collection',
    component: CardBlock,
    defaultProps: {
      title: 'Our Features',
      columns: 3,
      style: 'elevated',
      containerWidth: 'normal',
      cardHeight: 'auto',
      imageAspect: '16:9',
      textAlign: 'left',
      items: [
        { id: '1', title: 'Feature One', description: 'Description of feature one.' },
        { id: '2', title: 'Feature Two', description: 'Description of feature two.' },
        { id: '3', title: 'Feature Three', description: 'Description of feature three.' }
      ]
    },
    fields: [
      { id: 'title', label: 'Tiêu đề lưới card', type: 'text' },
      { id: 'columns', label: 'Số cột hiển thị', type: 'number' },
      { id: 'style', label: 'Kiểu dáng card', type: 'select', options: [
        { label: 'Đổ bóng', value: 'elevated' },
        { label: 'Viền', value: 'bordered' },
        { label: 'Phẳng', value: 'flat' }
      ]},
      { id: 'containerWidth', label: 'Độ rộng khung', type: 'select', options: [
        { label: 'Thu hẹp (896px)', value: 'narrow' },
        { label: 'Tiêu chuẩn (1280px)', value: 'normal' },
        { label: 'Rộng (1536px)', value: 'wide' },
        { label: 'Tràn màn hình (100%)', value: 'full' }
      ]},
      { id: 'cardHeight', label: 'Độ cao card', type: 'select', options: [
        { label: 'Tự động', value: 'auto' },
        { label: 'Nhỏ gọn (300px)', value: 'equal-sm' },
        { label: 'Vừa (400px)', value: 'equal-md' },
        { label: 'Cao (500px)', value: 'equal-lg' }
      ]},
      { id: 'imageAspect', label: 'Tỷ lệ ảnh', type: 'select', options: [
        { label: 'Chuẩn ngang (16:9)', value: '16:9' },
        { label: 'Rộng (4:3)', value: '4:3' },
        { label: 'Vuông (1:1)', value: '1:1' },
        { label: 'Tự do', value: 'auto' }
      ]},
      { id: 'textAlign', label: 'Căn lề chữ', type: 'select', options: [
        { label: 'Trái', value: 'left' },
        { label: 'Giữa', value: 'center' }
      ]}
    ]
  });

  registerBlock({
    type: 'intro_card_pro',
    name: 'Card: Giới thiệu Pro',
    component: IntroCardProBlock,
    defaultProps: {
      badge: 'VỀ CHÚNG TÔI • VIETVINH INDUSTRIES',
      title: 'GIỚI THIỆU TỔNG CÔNG TY',
      subtitle: 'Giải pháp kỹ thuật toàn diện cho công nghiệp hiện đại',
      description: 'VIETVINH INDUSTRIES CORPORATION cung cấp giải pháp Engineering – Procurement – Construction (EPC) cho hệ thống lạnh công nghiệp, phòng sạch, hệ thống cơ điện, hạ tầng tự động hóa và trung tâm dữ liệu. Chúng tôi hướng đến những giải pháp đồng bộ, an toàn, hiệu quả năng lượng và bền vững.',
      highlight1: '20+ năm kinh nghiệm kỹ thuật lạnh công nghiệp',
      highlight2: 'Tổng thầu EPC trọn gói chìa khóa trao tay',
      highlight3: 'Kiểm soát nhiệt độ & độ ẩm chuẩn xác',
      highlight4: 'Dịch vụ vận hành & bảo trì khẩn cấp 24/7',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
      layout: 'image-right',
      cardStyle: 'modern',
      containerWidth: 'normal',
      minHeight: 'auto',
      textAlign: 'left',
      paddingY: 'medium',
      buttonText: 'Tìm hiểu năng lực',
      buttonLink: '/about'
    },
    fields: [
      { id: 'badge', label: 'Nhãn phụ (Badge)', type: 'text' },
      { id: 'title', label: 'Tiêu đề chính', type: 'text' },
      { id: 'subtitle', label: 'Tiêu đề phụ / Slogan', type: 'text' },
      { id: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
      { id: 'highlight1', label: 'Điểm nhấn 1', type: 'text' },
      { id: 'highlight2', label: 'Điểm nhấn 2', type: 'text' },
      { id: 'highlight3', label: 'Điểm nhấn 3', type: 'text' },
      { id: 'highlight4', label: 'Điểm nhấn 4', type: 'text' },
      { id: 'image', label: 'Hình ảnh đại diện', type: 'image' },
      { id: 'layout', label: 'Bố cục Card', type: 'select', options: [
        { label: 'Ảnh bên phải', value: 'image-right' },
        { label: 'Ảnh bên trái', value: 'image-left' },
        { label: 'Chỉ nội dung văn bản', value: 'text-only' },
        { label: 'Card hộp bao quanh', value: 'boxed-card' }
      ]},
      { id: 'cardStyle', label: 'Phong cách Card', type: 'select', options: [
        { label: 'Hiện đại (Trắng bóng)', value: 'modern' },
        { label: 'Kính mờ (Glassmorphism)', value: 'glass' },
        { label: 'Tối kỹ thuật (Tech Dark)', value: 'tech-dark' },
        { label: 'Gradient công nghệ xanh', value: 'tech-gradient' },
        { label: 'Viền mảnh tối giản', value: 'bordered' }
      ]},
      { id: 'containerWidth', label: 'Độ rộng khung chứa', type: 'select', options: [
        { label: 'Thu hẹp (896px)', value: 'narrow' },
        { label: 'Tiêu chuẩn (1280px)', value: 'normal' },
        { label: 'Rộng (1536px)', value: 'wide' },
        { label: 'Tràn màn hình (100%)', value: 'full' }
      ]},
      { id: 'minHeight', label: 'Độ cao tối thiểu', type: 'select', options: [
        { label: 'Tự động', value: 'auto' },
        { label: 'Nhỏ (350px)', value: 'small' },
        { label: 'Vừa (500px)', value: 'medium' },
        { label: 'Lớn (650px)', value: 'large' },
        { label: 'Toàn màn hình (100vh)', value: 'screen' }
      ]},
      { id: 'textAlign', label: 'Căn lề chữ', type: 'select', options: [
        { label: 'Căn trái', value: 'left' },
        { label: 'Căn giữa', value: 'center' },
        { label: 'Căn đều 2 bên', value: 'justify' }
      ]},
      { id: 'paddingY', label: 'Khoảng cách lề (Padding)', type: 'select', options: [
        { label: 'Không lề', value: 'none' },
        { label: 'Nhỏ', value: 'small' },
        { label: 'Vừa', value: 'medium' },
        { label: 'Lớn', value: 'large' },
        { label: 'Cực lớn', value: 'xlarge' }
      ]},
      { id: 'buttonText', label: 'Chữ trên nút CTA', type: 'text' },
      { id: 'buttonLink', label: 'Liên kết nút CTA', type: 'text' }
    ]
  });

  registerBlock({
    type: 'modern_card_grid',
    name: 'Card: Lưới Card Đa Dạng',
    component: ModernCardGridBlock,
    defaultProps: {
      title: 'Giải Pháp & Dịch Vụ Tiêu Biểu',
      subtitle: 'Công nghệ kỹ thuật tiên tiến được thiết kế theo chuẩn công nghiệp quốc tế',
      columns: 3,
      cardStyle: 'elevated',
      cardHeight: 'auto',
      imageAspect: '16:9',
      imageRounded: 'xl',
      textAlign: 'left',
      containerWidth: 'normal',
      paddingY: 'medium'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề lưới', type: 'text' },
      { id: 'subtitle', label: 'Mô tả phụ', type: 'textarea' },
      { id: 'columns', label: 'Số cột hiển thị', type: 'select', options: [
        { label: '2 Cột', value: '2' },
        { label: '3 Cột', value: '3' },
        { label: '4 Cột', value: '4' }
      ]},
      { id: 'cardStyle', label: 'Kiểu dáng Card', type: 'select', options: [
        { label: 'Đổ bóng nổi bật (Elevated)', value: 'elevated' },
        { label: 'Viền tinh tế (Bordered)', value: 'bordered' },
        { label: 'Kính mờ (Glassmorphism)', value: 'glass' },
        { label: 'Gradient công nghệ tối', value: 'tech-gradient' },
        { label: 'Phẳng tối giản (Flat)', value: 'flat' }
      ]},
      { id: 'cardHeight', label: 'Độ cao Card', type: 'select', options: [
        { label: 'Tự động', value: 'auto' },
        { label: 'Nhỏ gọn (340px)', value: 'equal-sm' },
        { label: 'Vừa vặn (440px)', value: 'equal-md' },
        { label: 'Cao (540px)', value: 'equal-lg' }
      ]},
      { id: 'imageAspect', label: 'Tỷ lệ ảnh Card', type: 'select', options: [
        { label: 'Chuẩn ngang (16:9)', value: '16:9' },
        { label: 'Rộng (4:3)', value: '4:3' },
        { label: 'Vuông (1:1)', value: '1:1' },
        { label: 'Ẩn ảnh (Chỉ icon/text)', value: 'none' }
      ]},
      { id: 'imageRounded', label: 'Bo góc ảnh', type: 'select', options: [
        { label: 'Vuông góc', value: 'none' },
        { label: 'Bo nhẹ (12px)', value: 'md' },
        { label: 'Bo tròn đẹp (16px)', value: 'xl' },
        { label: 'Tròn đều (Circle)', value: 'full' }
      ]},
      { id: 'textAlign', label: 'Căn lề chữ', type: 'select', options: [
        { label: 'Căn trái', value: 'left' },
        { label: 'Căn giữa', value: 'center' }
      ]},
      { id: 'containerWidth', label: 'Độ rộng khung chứa', type: 'select', options: [
        { label: 'Tiêu chuẩn (1280px)', value: 'normal' },
        { label: 'Rộng (1536px)', value: 'wide' },
        { label: 'Tràn màn hình (100%)', value: 'full' }
      ]},
      { id: 'paddingY', label: 'Khoảng cách lề (Padding)', type: 'select', options: [
        { label: 'Nhỏ', value: 'small' },
        { label: 'Vừa', value: 'medium' },
        { label: 'Lớn', value: 'large' }
      ]}
    ]
  });

  registerBlock({
    type: 'stats_counter_card',
    name: 'Card: Thống Kê & Số Liệu',
    component: StatsCounterCardBlock,
    defaultProps: {
      title: 'Năng Lực & Dấu Ấn Đột Phá',
      subtitle: 'Những con số minh chứng cho cam kết chất lượng của Vietvinh Corp',
      columns: 4,
      cardStyle: 'white-card',
      num1: '20+',
      label1: 'NĂM KINH NGHIỆM',
      desc1: 'Tiên phong thiết kế & thi công lạnh công nghiệp',
      num2: '500+',
      label2: 'DỰ ÁN BÀN GIAO',
      desc2: 'Khách hàng FDI, tập đoàn thực phẩm & dược phẩm',
      num3: '99.9%',
      label3: 'ĐỘ TIN CẬY NHIỆT',
      desc3: 'Hệ thống vận hành liên tục, kiểm soát tối ưu',
      num4: '24/7',
      label4: 'HỖ TRỢ KỸ THUẬT',
      desc4: 'Ứng cứu sự cố & bảo dưỡng định kỳ trên toàn quốc',
      containerWidth: 'normal',
      paddingY: 'medium'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề chính', type: 'text' },
      { id: 'subtitle', label: 'Mô tả phụ', type: 'textarea' },
      { id: 'columns', label: 'Số cột hiển thị', type: 'select', options: [
        { label: '2 Cột', value: '2' },
        { label: '3 Cột', value: '3' },
        { label: '4 Cột', value: '4' }
      ]},
      { id: 'cardStyle', label: 'Phong cách Card', type: 'select', options: [
        { label: 'Trắng sang trọng (White)', value: 'white-card' },
        { label: 'Kính mờ (Glassmorphism)', value: 'glass-card' },
        { label: 'Tối kỹ thuật (Tech Dark)', value: 'tech-dark-card' },
        { label: 'Viền trên nổi bật (Accent Border)', value: 'accent-border' }
      ]},
      { id: 'num1', label: 'Số 1', type: 'text' },
      { id: 'label1', label: 'Nhãn số 1', type: 'text' },
      { id: 'desc1', label: 'Mô tả số 1', type: 'text' },
      { id: 'num2', label: 'Số 2', type: 'text' },
      { id: 'label2', label: 'Nhãn số 2', type: 'text' },
      { id: 'desc2', label: 'Mô tả số 2', type: 'text' },
      { id: 'num3', label: 'Số 3', type: 'text' },
      { id: 'label3', label: 'Nhãn số 3', type: 'text' },
      { id: 'desc3', label: 'Mô tả số 3', type: 'text' },
      { id: 'num4', label: 'Số 4', type: 'text' },
      { id: 'label4', label: 'Nhãn số 4', type: 'text' },
      { id: 'desc4', label: 'Mô tả số 4', type: 'text' },
      { id: 'containerWidth', label: 'Độ rộng khung chứa', type: 'select', options: [
        { label: 'Tiêu chuẩn (1280px)', value: 'normal' },
        { label: 'Rộng (1536px)', value: 'wide' },
        { label: 'Tràn màn hình (100%)', value: 'full' }
      ]},
      { id: 'paddingY', label: 'Khoảng cách lề (Padding)', type: 'select', options: [
        { label: 'Nhỏ', value: 'small' },
        { label: 'Vừa', value: 'medium' },
        { label: 'Lớn', value: 'large' }
      ]}
    ]
  });

  registerBlock({
    type: 'split_media_card',
    name: 'Card: Hai Cột Media & Nội Dung',
    component: SplitMediaCardBlock,
    defaultProps: {
      badge: 'CÔNG NGHỆ CHÍNH XÁC',
      title: 'Giải Pháp Tự Động Hóa & Quản Lý Tập Trung',
      description: 'Tích hợp cảm biến SCADA/IoT theo dõi nhiệt độ, áp suất, điện năng tiêu thụ theo thời gian thực. Báo động tự động và điều chỉnh công suất máy nén tối ưu chi phí vận hành.',
      feature1: 'Giám sát từ xa qua Cloud 24/7',
      feature2: 'Tiết kiệm 15-25% điện năng tiêu thụ',
      feature3: 'Đạt chứng nhận an toàn chuẩn HACCP/FDA',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=1000',
      layout: 'image-right',
      imageAspect: '4:3',
      imageRounded: 'xl',
      buttonText: 'Nhận tư vấn kỹ thuật',
      buttonLink: '/contact',
      containerWidth: 'normal',
      minHeight: 'auto',
      bgStyle: 'slate',
      paddingY: 'medium'
    },
    fields: [
      { id: 'badge', label: 'Nhãn phụ (Badge)', type: 'text' },
      { id: 'title', label: 'Tiêu đề chính', type: 'text' },
      { id: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
      { id: 'feature1', label: 'Điểm nổi bật 1', type: 'text' },
      { id: 'feature2', label: 'Điểm nổi bật 2', type: 'text' },
      { id: 'feature3', label: 'Điểm nổi bật 3', type: 'text' },
      { id: 'image', label: 'Hình ảnh chính', type: 'image' },
      { id: 'layout', label: 'Vị trí hình ảnh', type: 'select', options: [
        { label: 'Ảnh bên phải', value: 'image-right' },
        { label: 'Ảnh bên trái', value: 'image-left' }
      ]},
      { id: 'imageAspect', label: 'Tỷ lệ ảnh', type: 'select', options: [
        { label: 'Chuẩn ngang (16:9)', value: '16:9' },
        { label: 'Rộng (4:3)', value: '4:3' },
        { label: 'Vuông (1:1)', value: '1:1' }
      ]},
      { id: 'imageRounded', label: 'Bo góc ảnh', type: 'select', options: [
        { label: 'Vuông vức', value: 'none' },
        { label: 'Bo nhẹ (12px)', value: 'md' },
        { label: 'Bo tròn đẹp (16px)', value: 'xl' },
        { label: 'Bo cong lớn (24px)', value: '3xl' }
      ]},
      { id: 'buttonText', label: 'Chữ trên nút CTA', type: 'text' },
      { id: 'buttonLink', label: 'Liên kết nút CTA', type: 'text' },
      { id: 'bgStyle', label: 'Phong cách nền', type: 'select', options: [
        { label: 'Xám hiện đại (Slate)', value: 'slate' },
        { label: 'Trắng tinh khôi (White)', value: 'white' },
        { label: 'Gradient sáng nhẹ', value: 'gradient-light' },
        { label: 'Tối kỹ thuật (Tech Dark)', value: 'tech-dark' }
      ]},
      { id: 'containerWidth', label: 'Độ rộng khung chứa', type: 'select', options: [
        { label: 'Thu hẹp (896px)', value: 'narrow' },
        { label: 'Tiêu chuẩn (1280px)', value: 'normal' },
        { label: 'Rộng (1536px)', value: 'wide' },
        { label: 'Tràn màn hình (100%)', value: 'full' }
      ]},
      { id: 'minHeight', label: 'Độ cao tối thiểu', type: 'select', options: [
        { label: 'Tự động', value: 'auto' },
        { label: 'Nhỏ (400px)', value: 'small' },
        { label: 'Vừa (520px)', value: 'medium' },
        { label: 'Lớn (650px)', value: 'large' }
      ]},
      { id: 'paddingY', label: 'Khoảng cách lề (Padding)', type: 'select', options: [
        { label: 'Nhỏ', value: 'small' },
        { label: 'Vừa', value: 'medium' },
        { label: 'Lớn', value: 'large' }
      ]}
    ]
  });

  registerBlock({
    type: 'cta_banner_card',
    name: 'Card: Banner Kêu Gọi (CTA)',
    component: CTABannerCardBlock,
    defaultProps: {
      badge: 'BẮT ĐẦU DỰ ÁN CÙNG VIETVINH',
      title: 'Bạn Đang Tìm Kiếm Giải Pháp Kỹ Thuật Lạnh Chuyên Nghiệp?',
      description: 'Đội ngũ chuyên gia và kỹ sư giàu kinh nghiệm của chúng tôi luôn sẵn sàng đồng hành, tư vấn giải pháp tối ưu và cung cấp báo giá chi tiết trong vòng 24 giờ.',
      button1Text: 'Yêu cầu báo giá kỹ thuật',
      button1Link: '/contact',
      button2Text: 'Gọi hotline 0912 555 888',
      button2Link: 'tel:0912555888',
      bgStyle: 'primary-gradient',
      textAlign: 'center',
      containerWidth: 'normal',
      paddingY: 'medium'
    },
    fields: [
      { id: 'badge', label: 'Nhãn phụ (Badge)', type: 'text' },
      { id: 'title', label: 'Tiêu đề chính', type: 'text' },
      { id: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
      { id: 'button1Text', label: 'Chữ trên Nút 1 (Chính)', type: 'text' },
      { id: 'button1Link', label: 'Liên kết Nút 1', type: 'text' },
      { id: 'button2Text', label: 'Chữ trên Nút 2 (Phụ)', type: 'text' },
      { id: 'button2Link', label: 'Liên kết Nút 2', type: 'text' },
      { id: 'bgStyle', label: 'Phong cách Card Banner', type: 'select', options: [
        { label: 'Gradient xanh Vietvinh', value: 'primary-gradient' },
        { label: 'Tối kỹ thuật công nghệ', value: 'dark-tech' },
        { label: 'Mesh Blue hiện đại', value: 'mesh-blue' },
        { label: 'Hộp trắng viền xanh', value: 'light-boxed' }
      ]},
      { id: 'textAlign', label: 'Căn lề nội dung', type: 'select', options: [
        { label: 'Căn giữa', value: 'center' },
        { label: 'Căn trái', value: 'left' }
      ]},
      { id: 'containerWidth', label: 'Độ rộng khung chứa', type: 'select', options: [
        { label: 'Tiêu chuẩn (Hộp 1280px)', value: 'normal' },
        { label: 'Thu hẹp (Hộp 896px)', value: 'narrow' },
        { label: 'Rộng (1536px)', value: 'wide' },
        { label: 'Tràn màn hình (100%)', value: 'full' }
      ]},
      { id: 'paddingY', label: 'Khoảng cách lề (Padding)', type: 'select', options: [
        { label: 'Nhỏ', value: 'small' },
        { label: 'Vừa', value: 'medium' },
        { label: 'Lớn', value: 'large' }
      ]}
    ]
  });

  registerBlock({
    type: 'features',
    name: 'Feature List',
    component: FeatureListBlock,
    defaultProps: {
      title: 'Why Choose Us',
      subtitle: 'We provide top-notch services for all your cooling needs.',
      items: [
        { id: '1', title: 'Experience', description: '20+ years in the industry.' },
        { id: '2', title: 'Technology', description: 'Advanced cooling solutions.' },
        { id: '3', title: 'Support', description: '24/7 dedicated support team.' }
      ]
    },
    fields: [
      { id: 'title', label: 'Tiêu đề chính', type: 'text' },
      { id: 'subtitle', label: 'Tiêu đề phụ', type: 'textarea' },
      { id: 'columns', label: 'Số cột', type: 'number' }
    ]
  });

  registerBlock({
    type: 'image',
    name: 'Image Content',
    component: ImageBlock,
    defaultProps: {
      url: 'https://via.placeholder.com/800x450',
      alt: 'Project Image',
      caption: '',
      width: 100
    },
    fields: [
      { id: 'url', label: 'Hình ảnh', type: 'image' },
      { id: 'alt', label: 'Mô tả (Alt)', type: 'text' },
      { id: 'caption', label: 'Chú thích', type: 'text' },
      { id: 'width', label: 'Độ rộng (%)', type: 'number' }
    ]
  });
  
  registerBlock({
    type: 'media_section',
    name: 'Media & Content',
    component: MediaSectionBlock,
    defaultProps: {
      title: 'Media Section Title',
      description: '<p>Edit your content here...</p>',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
      layout: 'image-right',
      imageWidth: 50,
      bgColor: 'white'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Nội dung', type: 'rich-text' },
      { id: 'image', label: 'Hình ảnh', type: 'image' },
      { id: 'layout', label: 'Bố cục', type: 'select', options: [
        { label: 'Ảnh bên trái', value: 'image-left' },
        { label: 'Ảnh bên phải', value: 'image-right' },
        { label: 'Ảnh ở trên', value: 'image-top' },
        { label: 'Ảnh ở dưới', value: 'image-bottom' }
      ]},
      { id: 'imageWidth', label: 'Độ rộng ảnh (%)', type: 'number' },
      { id: 'bgColor', label: 'Màu nền', type: 'select', options: [
        { label: 'Trắng', value: 'white' },
        { label: 'Muted', value: 'muted' },
        { label: 'Xanh nhạt', value: 'primary-light' }
      ]}
    ]
  });

  // --- About Page Blocks ---
  registerBlock({
    type: 'about_hero',
    name: 'About: Hero',
    component: AboutHeroBlock,
    defaultProps: { 
      badge: 'VỀ CHÚNG TÔI • VIETVINH INDUSTRIES',
      title: 'Giới thiệu', 
      description: 'Tổng công ty Kỹ thuật lạnh Việt Nam (VVC) - Đơn vị tiên phong trong giải pháp nhiệt lạnh công nghiệp.',
      textAlign: 'left',
      textSize: 'lg',
      containerWidth: 'normal',
      minHeight: 'auto',
      bgStyle: 'gradient-light',
      paddingY: 'medium'
    },
    fields: [
      { id: 'badge', label: 'Nhãn phụ (Badge)', type: 'text' },
      { id: 'title', label: 'Tiêu đề chính', type: 'text' },
      { id: 'highlight', label: 'Dòng điểm nhấn / Trích dẫn', type: 'text' },
      { id: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
      { id: 'textAlign', label: 'Căn lề chữ', type: 'select', options: [
        { label: 'Căn trái', value: 'left' },
        { label: 'Căn giữa', value: 'center' },
        { label: 'Căn đều 2 bên', value: 'justify' }
      ]},
      { id: 'textSize', label: 'Cỡ chữ mô tả', type: 'select', options: [
        { label: 'Vừa (16px)', value: 'base' },
        { label: 'Lớn (18px)', value: 'lg' },
        { label: 'Rất lớn (20px)', value: 'xl' }
      ]},
      { id: 'containerWidth', label: 'Độ rộng khung', type: 'select', options: [
        { label: 'Thu hẹp (Dễ đọc ~896px)', value: 'narrow' },
        { label: 'Tiêu chuẩn (1280px)', value: 'normal' },
        { label: 'Rộng (1536px)', value: 'wide' },
        { label: 'Tràn màn hình (100%)', value: 'full' }
      ]},
      { id: 'minHeight', label: 'Độ cao tối thiểu', type: 'select', options: [
        { label: 'Tự động theo nội dung', value: 'auto' },
        { label: 'Nhỏ (300px)', value: 'small' },
        { label: 'Vừa (460px)', value: 'medium' },
        { label: 'Lớn (600px)', value: 'large' }
      ]},
      { id: 'paddingY', label: 'Khoảng cách lề (Padding)', type: 'select', options: [
        { label: 'Không lề', value: 'none' },
        { label: 'Nhỏ', value: 'small' },
        { label: 'Vừa', value: 'medium' },
        { label: 'Lớn', value: 'large' }
      ]},
      { id: 'bgStyle', label: 'Phong cách nền', type: 'select', options: [
        { label: 'Gradient sáng nhẹ', value: 'gradient-light' },
        { label: 'Trắng tinh khôi', value: 'white' },
        { label: 'Xám hiện đại', value: 'slate' },
        { label: 'Xanh nhạt thanh lịch', value: 'primary-subtle' },
        { label: 'Tối kỹ thuật công nghệ', value: 'tech-dark' }
      ]}
    ]
  });

  registerBlock({
    type: 'about_history',
    name: 'About: Lịch sử',
    component: HistoryBlock,
    defaultProps: {
      title: 'Lịch sử phát triển',
      p1: 'Được thành lập vào năm 2003...',
      p2: 'Từ một đơn vị chuyên về lắp đặt...',
      image: '/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png',
      expYears: '20+',
      expText: 'Năm kinh nghiệm'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'p1', label: 'Đoạn văn 1', type: 'textarea' },
      { id: 'p2', label: 'Đoạn văn 2', type: 'textarea' },
      { id: 'image', label: 'Hình ảnh', type: 'image' },
      { id: 'expYears', label: 'Số năm KN', type: 'text' },
      { id: 'expText', label: 'Text kinh nghiệm', type: 'text' }
    ]
  });

  registerBlock({
    type: 'about_vision',
    name: 'About: Tầm nhìn & Sứ mệnh',
    component: VisionMissionBlock,
    defaultProps: {
      visionTitle: 'Tầm nhìn',
      missionTitle: 'Sứ mệnh'
    },
    fields: [
      { id: 'visionTitle', label: 'Tiêu đề Tầm nhìn', type: 'text' },
      { id: 'missionTitle', label: 'Tiêu đề Sứ mệnh', type: 'text' }
    ]
  });

  registerBlock({
    type: 'about_values',
    name: 'About: Giá trị cốt lõi',
    component: CoreValuesBlock,
    defaultProps: { title: 'Giá trị cốt lõi' },
    fields: [{ id: 'title', label: 'Tiêu đề', type: 'text' }]
  });

  registerBlock({
    type: 'about_partners',
    name: 'About: Đối tác & Khách hàng',
    component: PartnersBlock,
    defaultProps: { title: 'Đối tác & Khách hàng' },
    fields: [{ id: 'title', label: 'Tiêu đề', type: 'text' }]
  });

  registerBlock({
    type: 'about_achievements',
    name: 'About: Thành tựu',
    component: AchievementsBlock,
    defaultProps: { title: 'Thành tựu nổi bật' },
    fields: [{ id: 'title', label: 'Tiêu đề', type: 'text' }]
  });

  registerBlock({
    type: 'about_facilities',
    name: 'About: Năng lực sản xuất',
    component: ProductionFacilitiesBlock,
    defaultProps: { 
      title: 'Cơ sở hạ tầng & Trung tâm sản xuất',
      description: 'VVC đầu tư mạnh mẽ vào hệ thống nhà xưởng hiện đại...' 
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' },
      { id: 'image1', label: 'Hình ảnh 1', type: 'image' },
      { id: 'image2', label: 'Hình ảnh 2', type: 'image' }
    ]
  });

  registerBlock({
    type: 'about_quality',
    name: 'About: Nguyên tắc chất lượng',
    component: QualityPrinciplesBlock,
    defaultProps: { title: 'Nguyên tắc chất lượng của VVC' },
    fields: [{ id: 'title', label: 'Tiêu đề', type: 'text' }]
  });

  // --- Team Page Blocks ---
  registerBlock({
    type: 'team_hero',
    name: 'Team: Hero',
    component: TeamHeroBlock,
    defaultProps: { 
      title: 'Đội ngũ chuyên gia', 
      description: 'Hội tụ những tinh hoa trong ngành kỹ thuật lạnh...' 
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' }
    ]
  });

  registerBlock({
    type: 'team_grid',
    name: 'Team: Danh sách',
    component: TeamGridBlock,
    defaultProps: { 
      title: 'Gặp gỡ đội ngũ của chúng tôi', 
      description: 'Đội ngũ kỹ sư và chuyên viên dày dặn kinh nghiệm...' 
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' }
    ]
  });

  // --- Industry Blocks ---
  registerBlock({
    type: 'refrigeration',
    name: 'Industry: Hệ thống lạnh',
    component: RefrigerationBlock,
    defaultProps: {
      title: 'Hệ Thống Lạnh Công Nghiệp',
      description: 'VVC cung cấp các giải pháp làm lạnh chuyên sâu...',
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' },
      { id: 'image', label: 'Hình ảnh', type: 'image' }
    ]
  });

  registerBlock({
    type: 'cold_storage_catalog',
    name: 'Industry: Phân loại kho lạnh',
    component: ColdStorageCatalogBlock,
    defaultProps: {},
    fields: []
  });

  registerBlock({
    type: 'industrial_expertise',
    name: 'Industry: Chuyên gia công nghiệp',
    component: IndustrialExpertiseBlock,
    defaultProps: {},
    fields: []
  });

  registerBlock({
    type: 'me_systems',
    name: 'Industry: Cơ điện (M&E)',
    component: MEBlock,
    defaultProps: {
      title: 'Tổng Thầu Cơ Điện (M&E)',
      description: 'Giải pháp cơ điện toàn diện cho các công trình...',
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' },
      { id: 'image', label: 'Hình ảnh', type: 'image' }
    ]
  });

  registerBlock({
    type: 'data_center',
    name: 'Industry: Trung tâm dữ liệu',
    component: DataCenterBlock,
    defaultProps: {
      title: 'Trung Tâm Dữ Liệu & Quản Lý Tập Trung',
      description: 'Tư vấn và triển khai hạ tầng trung tâm dữ liệu...',
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' },
      { id: 'image', label: 'Hình ảnh', type: 'image' }
    ]
  });

  registerBlock({
    type: 'service_lifecycle',
    name: 'Industry: Vòng đời dịch vụ',
    component: ServiceLifecycleBlock,
    defaultProps: {
      title: 'Vòng Đời Dịch Vụ Toàn Diện',
      description: 'Chúng tôi đồng hành cùng khách hàng từ khâu lên ý tưởng...',
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' }
    ]
  });

  registerBlock({
    type: 'advanced_tech_showcase',
    component: AdvancedTechShowcaseBlock,
    name: 'Advanced tech showcase',
    defaultProps: {
      title: 'Công Nghệ Bảo Quản & Cấp Đông Chuyên Sâu',
      subtitle: 'VIETVINH tiên phong ứng dụng các giải pháp bảo quản tiên tiến nhất thế giới.',
      badge: 'Specialized Solutions'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'subtitle', label: 'Mô tả phụ', type: 'textarea' },
      { id: 'badge', label: 'Badge/Nhãn', type: 'text' }
    ]
  });

  registerBlock({
    type: 'technical_detail',
    component: TechnicalDetailBlock,
    name: 'Technical detail page',
    defaultProps: {
      techType: 'ca',
      accent: 'blue',
      title: 'Công nghệ bảo quản tiên tiến',
      description: 'Giải pháp tối ưu cho chuỗi cung ứng nông sản và thực phẩm sạch.',
      feature1: 'Tiết kiệm năng lượng',
      feature2: 'Bảo quản vượt trội',
      feature3: 'Vận hành tự động',
      feature4: 'Thân thiện môi trường'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề trang', type: 'text' },
      { id: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
      { id: 'image', label: 'Hình ảnh chính', type: 'image' },
      { id: 'accent', label: 'Màu nhấn', type: 'select', options: [
        { label: 'Xanh dương', value: 'blue' },
        { label: 'Xanh lục', value: 'green' },
        { label: 'Xanh ngọc', value: 'cyan' },
        { label: 'Vàng hổ phách', value: 'amber' },
        { label: 'Tím Indigo', value: 'indigo' }
      ]},
      { id: 'techType', label: 'Loại công nghệ (Fallback)', type: 'select', options: [
        { label: 'CA (Khí quyển)', value: 'ca' },
        { label: 'IQF (Cấp đông nhanh)', value: 'iqf' },
        { label: 'Chín chuối', value: 'ripening' },
        { label: 'Hầm đông gió', value: 'blast' }
      ]},
      { id: 'feature1', label: 'Điểm nhấn 1', type: 'text' },
      { id: 'feature2', label: 'Điểm nhấn 2', type: 'text' },
      { id: 'feature3', label: 'Điểm nhấn 3', type: 'text' },
      { id: 'feature4', label: 'Điểm nhấn 4', type: 'text' }
    ]
  });

  registerBlock({
    type: 'contact_form',
    name: 'General: Contact Form',
    component: ContactFormBlock,
    defaultProps: {},
    fields: []
  });

  registerBlock({
    type: 'news_events',
    name: 'Home: Tin tức & Sự kiện',
    component: NewsEventsBlock,
    defaultProps: {
      title: 'Tin tức & Sự kiện',
      subtitle: 'Cập nhật những hoạt động mới nhất từ VietVinhCorp.'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'subtitle', label: 'Mô tả', type: 'textarea' }
    ]
  });

  registerBlock({
    type: 'featured_projects',
    name: 'Home: Dự án tiêu biểu',
    component: ProjectsBlock,
    defaultProps: {
      title: 'Dự Án Tiêu Biểu',
      subtitle: 'Những công trình thực tế khẳng định năng lực VietVinhCorp.'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'subtitle', label: 'Mô tả', type: 'textarea' }
    ]
  });

  registerBlock({
    type: 'product_categories',
    name: 'Home: Sản phẩm phân phối',
    component: ProductsBlock,
    defaultProps: {
      title: 'Sản Phẩm Phân Phối',
      subtitle: 'Đảm bảo hệ thống vật tư tiêu chuẩn quốc tế.'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'subtitle', label: 'Mô tả', type: 'textarea' }
    ]
  });

  registerBlock({
    type: 'home_banner_slider',
    name: 'Home: Banner Slider',
    component: HomeBannerSlider,
    defaultProps: {},
    fields: [
      { id: 'info', label: 'Thông tin', type: 'text' }
    ]
  });

  registerBlock({
    type: 'capability_profile',
    name: 'Hồ sơ năng lực',
    component: CapabilityProfileBlock,
    defaultProps: {
      title: 'Hồ sơ năng lực Viet Vinh Corp',
      description: 'Tài liệu chi tiết về năng lực thiết kế, thi công và vận hành các hệ thống điện lạnh công nghiệp tiêu chuẩn quốc tế của VVC.',
      previewImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      pdfUrl: '#',
      downloadText: 'Tải xuống Hồ sơ năng lực (PDF)',
      pdfFileName: '',
      pdfFileSize: ''
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' },
      { id: 'previewImage', label: 'Ảnh xem trước', type: 'image' },
      { id: 'pdfUrl', label: 'Link file PDF', type: 'text' },
      { id: 'downloadText', label: 'Chữ trên nút tải', type: 'text' },
      { id: 'pdfFileName', label: 'Tên file', type: 'text' },
      { id: 'pdfFileSize', label: 'Dung lượng', type: 'text' }
    ]
  });

  registerBlock({
    type: 'jobs_list',
    name: 'Tuyển dụng: Danh sách công việc',
    component: JobsListBlock,
    defaultProps: {
      title: 'Cơ hội nghề nghiệp tại Viet Vinh Corp',
      subtitle: 'Chúng tôi luôn tìm kiếm những tài năng đồng hành cùng sứ mệnh phát triển bền vững.'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'subtitle', label: 'Mô tả phụ', type: 'textarea' }
    ]
  });

  registerBlock({
    type: 'service_hero',
    name: 'Dịch vụ: Hero',
    component: ServiceHeroBlock,
    defaultProps: {
      title: 'Dịch vụ chuyên nghiệp',
      description: 'Cung cấp đầy đủ các giải pháp dịch vụ kỹ thuật điện lạnh chất lượng cao.'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' },
      { id: 'primaryButtonLabel', label: 'Nút chính', type: 'text' },
      { id: 'primaryButtonLink', label: 'Link nút chính', type: 'text' },
      { id: 'secondaryButtonLabel', label: 'Nút phụ', type: 'text' },
      { id: 'secondaryButtonLink', label: 'Link nút phụ', type: 'text' }
    ]
  });

  registerBlock({
    type: 'service_grid',
    name: 'Dịch vụ: Danh sách & Lọc',
    component: ServiceGridBlock,
    defaultProps: {
      title: 'Danh mục dịch vụ',
      description: 'Chúng tôi cung cấp đầy đủ các dịch vụ điện lạnh công nghiệp và dân dụng.'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' }
    ]
  });

  registerBlock({
    type: 'cta_section',
    name: 'Chung: CTA Section',
    component: CTASectionBlock,
    defaultProps: {
      title: 'Bắt đầu với dịch vụ của chúng tôi',
      description: 'Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn và báo giáo.'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' },
      { id: 'badge', label: 'Badge (Nhãn)', type: 'text' },
      { id: 'primaryButtonLabel', label: 'Nút chính', type: 'text' },
      { id: 'primaryButtonLink', label: 'Link nút chính', type: 'text' },
      { id: 'secondaryButtonLabel', label: 'Nút phụ', type: 'text' },
      { id: 'secondaryButtonLink', label: 'Link nút phụ', type: 'text' }
    ]
  });

  // --- Projects Page Blocks ---
  registerBlock({
    type: 'project_hero',
    name: 'Dự án: Hero Banner',
    component: ProjectHeroBlock,
    defaultProps: {
      badge: 'NĂNG LỰC THI CÔNG • DỰ ÁN TIÊU BIỂU',
      title: 'Dự án tiêu biểu',
      description: 'Những công trình thực tế đã được Việt Vinh Corporation thiết kế, cung cấp thiết bị và thi công lắp đặt trên khắp cả nước.',
      primaryButtonLabel: 'Liên hệ tư vấn',
      primaryButtonLink: '/contact',
      secondaryButtonLabel: 'Xem dịch vụ',
      secondaryButtonLink: '/services'
    },
    fields: [
      { id: 'badge', label: 'Nhãn phụ (Badge)', type: 'text' },
      { id: 'title', label: 'Tiêu đề chính', type: 'text' },
      { id: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
      { id: 'primaryButtonLabel', label: 'Nút chính', type: 'text' },
      { id: 'primaryButtonLink', label: 'Link nút chính', type: 'text' },
      { id: 'secondaryButtonLabel', label: 'Nút phụ', type: 'text' },
      { id: 'secondaryButtonLink', label: 'Link nút phụ', type: 'text' }
    ]
  });

  registerBlock({
    type: 'project_overview',
    name: 'Dự án: Năng lực & Kinh nghiệm',
    component: ProjectOverviewBlock,
    defaultProps: {
      title: 'Năng lực và kinh nghiệm',
      description: 'Với hơn 20 năm kinh nghiệm, Việt Vinh Corporation đã thực hiện hàng trăm dự án lớn nhỏ trong lĩnh vực điện lạnh công nghiệp và dân dụng.',
      image: '/assets/images/projects-overview.jpg'
    },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' },
      { id: 'stat1', label: 'Điểm nhấn 1', type: 'text' },
      { id: 'stat2', label: 'Điểm nhấn 2', type: 'text' },
      { id: 'stat3', label: 'Điểm nhấn 3', type: 'text' },
      { id: 'stat4', label: 'Điểm nhấn 4', type: 'text' },
      { id: 'image', label: 'Hình ảnh minh họa', type: 'image' }
    ]
  });

  registerBlock({
    type: 'project_showcase',
    name: 'Dự án: Danh mục & Danh sách công trình',
    component: ProjectShowcaseBlock,
    defaultProps: {
      catTitle: 'Danh mục dự án',
      catDescription: 'Việt Vinh Corporation tự hào thực hiện các dự án đa dạng với quy mô khác nhau, từ hệ thống điều hòa không khí trung tâm cho tòa nhà thương mại đến các hệ thống làm lạnh công nghiệp phức tạp.',
      listTitle: 'Dự án nổi bật'
    },
    fields: [
      { id: 'catTitle', label: 'Tiêu đề Danh mục', type: 'text' },
      { id: 'catDescription', label: 'Mô tả Danh mục', type: 'textarea' },
      { id: 'listTitle', label: 'Tiêu đề Danh sách Dự án', type: 'text' }
    ]
  });

  // --- Legacy Support Alises ---
  // These map old block types in existing database records to current components
  registerBlock({
    type: 'HeroBlock',
    name: 'Hero (Legacy)',
    component: ServiceHeroBlock,
    defaultProps: {},
    fields: []
  });

  registerBlock({
    type: 'ContentBlock',
    name: 'Content (Legacy)',
    component: MediaSectionBlock,
    defaultProps: {},
    fields: []
  });
};


export { 
  HeroBlock, 
  RichTextBlock, 
  GridBlock, 
  CardBlock, 
  FeatureListBlock,
  ImageBlock,
  MediaSectionBlock,
  AboutHeroBlock,
  HistoryBlock,
  VisionMissionBlock,
  CoreValuesBlock,
  AchievementsBlock,
  ProductionFacilitiesBlock,
  QualityPrinciplesBlock,
  PartnersBlock,
  TeamHeroBlock,
  TeamGridBlock,
  RefrigerationBlock,
  MEBlock,
  DataCenterBlock, 
  ServiceLifecycleBlock,
  ColdStorageCatalogBlock,
  IndustrialExpertiseBlock,
  NewsEventsBlock, 
  ProjectsBlock, 
  ProductsBlock, 
  ContactFormBlock, 
  HomeBannerSlider, 
  CapabilityProfileBlock,
  JobsListBlock
};
