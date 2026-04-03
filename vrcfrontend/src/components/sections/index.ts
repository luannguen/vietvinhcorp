import { registerBlock } from '../admin/builder/SectionRegistry';
import { HeroBlock } from './HeroBlock';
import { RichTextBlock } from './RichTextBlock';
import { GridBlock } from './GridBlock';
import { CardBlock } from './CardBlock';
import { FeatureListBlock } from './FeatureListBlock';
import { ImageBlock } from './ImageBlock';
import { 
  AboutHeroBlock, 
  HistoryBlock, 
  VisionMissionBlock, 
  CoreValuesBlock, 
  LeadershipBlock, 
  AchievementsBlock 
} from './AboutBlocks';

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
      items: [
        { id: '1', title: 'Feature One', description: 'Description of feature one.' },
        { id: '2', title: 'Feature Two', description: 'Description of feature two.' },
        { id: '3', title: 'Feature Three', description: 'Description of feature three.' }
      ]
    },
    fields: [
      { id: 'title', label: 'Tiêu đề lưới card', type: 'text' },
      { id: 'columns', label: 'Số cột hiển thị', type: 'number' }
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
      { id: 'subtitle', label: 'Tiêu đề phụ', type: 'textarea' }
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

  // --- About Page Blocks ---
  registerBlock({
    type: 'about_hero',
    name: 'About: Hero',
    component: AboutHeroBlock,
    defaultProps: { title: 'Giới thiệu', description: 'Tổng công ty Kỹ thuật lạnh Việt Nam (VVC)...' },
    fields: [
      { id: 'title', label: 'Tiêu đề', type: 'text' },
      { id: 'description', label: 'Mô tả', type: 'textarea' }
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
    type: 'about_leadership',
    name: 'About: Lãnh đạo',
    component: LeadershipBlock,
    defaultProps: { title: 'Đội ngũ lãnh đạo' },
    fields: [{ id: 'title', label: 'Tiêu đề', type: 'text' }]
  });

  registerBlock({
    type: 'about_achievements',
    name: 'About: Thành tựu',
    component: AchievementsBlock,
    defaultProps: { title: 'Thành tựu nổi bật' },
    fields: [{ id: 'title', label: 'Tiêu đề', type: 'text' }]
  });
};

export { 
  HeroBlock, 
  RichTextBlock, 
  GridBlock, 
  CardBlock, 
  FeatureListBlock,
  ImageBlock,
  AboutHeroBlock,
  HistoryBlock,
  VisionMissionBlock,
  CoreValuesBlock,
  LeadershipBlock,
  AchievementsBlock
};
