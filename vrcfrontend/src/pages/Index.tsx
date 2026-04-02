import { VisualEditorProvider, useVisualEditor } from '../context/VisualEditorContext';
import { VisualPageRenderer } from '../components/admin/builder/VisualPageRenderer';
import HeroSection from "@/components/HeroSection";
import FeaturedTopics from "@/components/FeaturedTopics";
import LatestPublications from "@/components/LatestPublications";
import { DataResources } from "@/components/DataResources";
import ContactForm from "@/components/ContactForm";

const IndexContent = () => {
  const { contentData } = useVisualEditor();
  
  // If we have builder sections, use the renderer
  if (contentData?.sections && contentData.sections.length > 0) {
    return <VisualPageRenderer />;
  }

  return (
    <>
      <HeroSection />
      <FeaturedTopics />
      <LatestPublications />
      <DataResources />
      <ContactForm />
    </>
  );
};

const Index = () => {
  return (
    <VisualEditorProvider slug="home">
      <IndexContent />
    </VisualEditorProvider>
  );
};

export default Index;
