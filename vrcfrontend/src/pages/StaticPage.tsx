import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { pageService, StaticPage as IStaticPage } from '@/services/pageService';
import { Loader2 } from 'lucide-react';
import NotFound from './NotFound';
import { VisualSectionRenderer } from '@/components/visual-editor/VisualSectionRenderer';

interface StaticPageProps {
    slug?: string;
}

const StaticPage: React.FC<StaticPageProps> = ({ slug: propSlug }) => {
    const { slug: paramSlug } = useParams<{ slug: string }>();
    const [searchParams] = useSearchParams();
    const slug = propSlug || paramSlug;
    const isEditMode = searchParams.get('edit_mode') === 'true';

    const [page, setPage] = useState<IStaticPage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [editableData, setEditableData] = useState<any>(null);

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

    // Handle messages from Admin Editor
    useEffect(() => {
        if (!isEditMode) return;

        const handleMessage = (event: MessageEvent) => {
            const { type, ...data } = event.data;

            switch (type) {
                case 'VISUAL_EDIT_UPDATE_DATA':
                    if (data.sections) {
                        setEditableData(data);
                    }
                    break;
                case 'VISUAL_EDIT_ADD_SECTION':
                    // handled by admin mostly, but can be synced back
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('message', handleMessage);
        
        // Signal to parent that we are ready
        window.parent.postMessage({ type: 'VISUAL_EDIT_READY' }, '*');

        return () => window.removeEventListener('message', handleMessage);
    }, [isEditMode]);

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

    // Render Visual Editor mode if enabled and we have sections
    if (isEditMode || (editableData && editableData.sections)) {
        return (
            <main className="flex-grow">
                <VisualSectionRenderer 
                    sections={editableData?.sections || []} 
                    isEditMode={isEditMode} 
                />
            </main>
        );
    }

    return (
        <main className="flex-grow">
            {/* Standard static HTML fallback */}
            <div className="bg-gradient-to-b from-primary/10 to-transparent py-12 md:py-20">
                <div className="container-custom">
                    <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">{page.title}</h1>
                    {page.excerpt && (
                        <p className="text-lg text-muted-foreground max-w-3xl">
                            {page.excerpt}
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
