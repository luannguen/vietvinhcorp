import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { pageService, StaticPage as IStaticPage } from '@/services/pageService';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NotFound from './NotFound';
import { VisualSectionRenderer } from '@/components/visual-editor/VisualSectionRenderer';
import { VisualEditorProvider } from '@/context/VisualEditorContext';
import { VisualPageRenderer } from '@/components/admin/builder/VisualPageRenderer';

interface StaticPageProps {
    slug?: string;
}

const StaticPage: React.FC<StaticPageProps> = ({ slug: propSlug }) => {
    const { slug: paramSlug } = useParams<{ slug: string }>();
    const [searchParams] = useSearchParams();
    const { i18n } = useTranslation();
    const slug = propSlug || paramSlug;
    const isEditMode = searchParams.get('edit_mode') === 'true';

    const [page, setPage] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [editableData, setEditableData] = useState<any>(null);

    // Specialized layouts for core pages to ensure branding & technical consistency
    const CORE_PAGE_LAYOUTS: Record<string, any[]> = {
        'he-thong-lanh': [
            { id: 'refrig_hero', type: 'refrigeration', props: {} },
            { id: 'refrig_catalog', type: 'cold_storage_catalog', props: {} },
            { id: 'refrig_expertise', type: 'industrial_expertise', props: {} },
            { id: 'refrig_contact', type: 'contact_form', props: {} }
        ],
        'he-thong-co-dien': [
            { id: 'me_hero', type: 'me_systems', props: {} },
            { id: 'me_lifecycle', type: 'service_lifecycle', props: {} },
            { id: 'me_contact', type: 'contact_form', props: {} }
        ],
        'he-thong-dc-management': [
            { id: 'dc_hero', type: 'data_center', props: {} },
            { id: 'dc_contact', type: 'contact_form', props: {} }
        ]
    };

    // Initial fetch
    useEffect(() => {
        const fetchPage = async () => {
            if (!slug) {
                setLoading(false);
                setError(true);
                return;
            }

            try {
                setLoading(true);
                const data = await pageService.getPageBySlug(slug);
                if (data) {
                    setPage(data);
                    // If page has structured JSON content, parse it
                    if (data.content && data.content.startsWith('{')) {
                        try {
                            setEditableData(JSON.parse(data.content));
                        } catch (e) {
                            console.error("Failed to parse page JSON content");
                        }
                    }
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch page", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [slug]);

    // Handle hash scrolling
    useEffect(() => {
        if (!loading && window.location.hash) {
            const id = window.location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500); // Give it a moment to render
        }
    }, [loading, window.location.hash]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !page) {
        return <NotFound />;
    }

    // Locale-aware title and excerpt
    const currentLang = i18n.language || 'vi';
    const isDefaultLang = currentLang === 'vi';
    
    // Support title_en, title_de, etc. If not found, fallback to default title
    const displayTitle = isDefaultLang ? page.title : (page[`title_${currentLang}`] || page.title);
    const displayExcerpt = isDefaultLang ? page.excerpt : (page[`excerpt_${currentLang}`] || page.excerpt);

    // Render Visual Editor mode if enabled and we have sections
    const hasOverride = slug && CORE_PAGE_LAYOUTS[slug];
    const displaySections = hasOverride ? CORE_PAGE_LAYOUTS[slug] : (editableData?.sections || []);

    if (isEditMode || (displaySections && displaySections.length > 0)) {
        return (
            <VisualEditorProvider slug={slug || ''}>
                <main className="flex-grow">
                    {isEditMode ? (
                        <VisualPageRenderer customSections={hasOverride ? displaySections : undefined} />
                    ) : (
                        <VisualSectionRenderer 
                            sections={displaySections} 
                            isEditMode={false} 
                        />
                    )}
                </main>
            </VisualEditorProvider>
        );
    }

    return (
        <main className="flex-grow">
            {/* Standard static HTML fallback */}
            <div className="bg-gradient-to-b from-primary/10 to-transparent py-12 md:py-20">
                <div className="container-custom">
                    <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">{displayTitle}</h1>
                    {displayExcerpt && (
                        <p className="text-lg text-muted-foreground max-w-3xl">
                            {displayExcerpt}
                        </p>
                    )}
                </div>
            </div>

            <section className="py-12 md:py-16">
                <div className="container-custom">
                    <div
                        className="prose prose-lg max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: page.content || '' }}
                    />
                </div>
            </section>
        </main>
    );
};

export default StaticPage;
