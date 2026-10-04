import { VisualEditorProvider, useVisualEditor } from '../context/VisualEditorContext';
import { VisualPageRenderer } from '../components/admin/builder/VisualPageRenderer';
import { 
  RefrigerationBlock, 
  MEBlock, 
  DataCenterBlock, 
  ServiceLifecycleBlock 
} from '../components/sections';

const DEFAULT_HOME_SECTIONS = [
  { id: 'banner', type: 'home_banner_slider', props: {} },

  { id: 'refrigeration', type: 'refrigeration', props: {} },
  { id: 'me_systems', type: 'me_systems', props: {} },
  { id: 'data_center', type: 'data_center', props: {} },
  { id: 'products', type: 'product_categories', props: {} },
  { id: 'projects', type: 'featured_projects', props: {} },
  { id: 'service_lifecycle', type: 'service_lifecycle', props: {} },
  { id: 'news_events', type: 'news_events', props: {} },
  { id: 'contact', type: 'contact_form', props: {} }
];

const IndexContent = () => {
  const { contentData, isLoading } = useVisualEditor();
  
  // If we have builder sections (from cache or database), use the renderer immediately
  if (contentData?.sections && contentData.sections.length > 0) {
    return <VisualPageRenderer />;
  }

  // If still loading and no cached sections exist yet, show clean loader instead of flashing default layout
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background/50">
        <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  // If no sections in DB after fetch completes, use VisualPageRenderer with defaults
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
