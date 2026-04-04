import { VisualEditorProvider, useVisualEditor } from '../context/VisualEditorContext';
import { VisualPageRenderer } from '../components/admin/builder/VisualPageRenderer';
import HeroSection from "@/components/HeroSection";
import FeaturedTopics from "@/components/FeaturedTopics";
import LatestPublications from "@/components/LatestPublications";
import { DataResources } from "@/components/DataResources";
import ContactForm from "@/components/ContactForm";
import { 
  RefrigerationBlock, 
  MEBlock, 
  DataCenterBlock, 
  ServiceLifecycleBlock 
} from '../components/sections';

const DEFAULT_HOME_SECTIONS = [
  { id: 'hero', type: 'hero', props: { 
    title: 'TỔNG CÔNG TY KỸ THUẬT LẠNH VIỆT NAM', 
    description: 'Chuyên gia hàng đầu trong lĩnh vực Hệ thống lạnh, Cơ điện và Hạ tầng Trung tâm dữ liệu.',
    backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
    alignment: 'center',
    buttonText: 'Khám phá sản phẩm',
    buttonLink: '/products',
    button2Text: 'Liên hệ tư vấn',
    button2Link: '/contact'
  }},
  { id: 'refrigeration', type: 'refrigeration', props: {} },
  { id: 'me_systems', type: 'me_systems', props: {} },
  { id: 'data_center', type: 'data_center', props: {} },
  { id: 'service_lifecycle', type: 'service_lifecycle', props: {} },
  { id: 'latest_news', type: 'features', props: { title: 'Tin tức & Sự kiện', subtitle: 'Cập nhật các hoạt động và công nghệ mới nhất từ VVC' }},
  { id: 'contact', type: 'contact_form', props: {} }
];

const IndexContent = () => {
  const { contentData } = useVisualEditor();
  
  // If we have builder sections, use the renderer
  if (contentData?.sections && contentData.sections.length > 0) {
    return <VisualPageRenderer />;
  }

  // If no sections in DB, we can still use VisualPageRenderer with defaults 
  // to allow the editor to work immediately with a pre-defined layout
  return <VisualPageRenderer customSections={DEFAULT_HOME_SECTIONS} />;
};

const Index = () => {
  return (
    <VisualEditorProvider slug="home">
      <IndexContent />
    </VisualEditorProvider>
  );
};

export default Index;
