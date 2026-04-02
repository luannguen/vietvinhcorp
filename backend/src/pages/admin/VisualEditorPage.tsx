import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Save, Laptop, Tablet, Smartphone, Loader2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { pageService } from '@/services/pageService';
import { supabase } from '@/lib/supabase';
import { ImagePickerModal } from '@/components/admin/media/ImagePickerModal';

const VisualEditorPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [pendingData, setPendingData] = useState<any>(null);
    const [pageId, setPageId] = useState<string | null>(null);
    
    // Image Picker State
    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
    const [pickingFieldKey, setPickingFieldKey] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Iframe URL - Points to Frontend
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:8082';
    const iframeSrc = `${frontendUrl}/${slug === 'about-us' ? 'about-us' : 'page/' + slug}?edit_mode=true`;

    useEffect(() => {
        const fetchPageInfo = async () => {
            if (!slug) return;
            try {
                const { data, error } = await supabase
                    .from('static_pages')
                    .select('id')
                    .eq('slug', slug)
                    .single();
                
                if (error) throw error;
                setPageId(data.id);
            } catch (err) {
                console.error('Error fetching page info:', err);
                toast.error('Không tìm thấy thông tin trang');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPageInfo();
    }, [slug]);

    const handleMessage = useCallback((event: MessageEvent) => {
        // Security: In production, verify event.origin matches frontendUrl
        if (event.data?.type === 'VISUAL_EDIT_UPDATE') {
            console.log('Received update from iframe:', event.data.data);
            setPendingData(event.data.data);
        } else if (event.data?.type === 'VISUAL_EDIT_PICK_IMAGE') {
            setPickingFieldKey(event.data.fieldKey);
            setIsImagePickerOpen(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [handleMessage]);

    const handleSave = async () => {
        if (!pageId || !pendingData) {
            toast.info('Không có thay đổi nào để lưu');
            return;
        }

        setIsSaving(true);
        try {
            await pageService.updatePage(pageId, {
                content: JSON.stringify(pendingData)
            });
            toast.success('Đã lưu thay đổi thành công');
            setPendingData(null);
        } catch (err) {
            console.error('Save error:', err);
            toast.error('Lỗi khi lưu dữ liệu');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageSelect = (url: string) => {
        if (!pickingFieldKey) return;
        
        // Notify the iframe that an image was selected
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type: 'VISUAL_EDIT_IMAGE_SELECTED',
                fieldKey: pickingFieldKey,
                imageUrl: url
            }, '*');
        }
        
        setIsImagePickerOpen(false);
        setPickingFieldKey(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] gap-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate('/pages')}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại
                    </Button>
                    <div className="h-6 w-px bg-gray-200 mx-2" />
                    <h1 className="font-semibold text-lg capitalize">
                        Chỉnh sửa trực quan: {slug?.replace(/-/g, ' ')}
                    </h1>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-md">
                    <Button 
                        variant={viewMode === 'desktop' ? 'secondary' : 'ghost'} 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setViewMode('desktop')}
                    >
                        <Laptop className="h-4 w-4" />
                    </Button>
                    <Button 
                        variant={viewMode === 'tablet' ? 'secondary' : 'ghost'} 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setViewMode('tablet')}
                    >
                        <Tablet className="h-4 w-4" />
                    </Button>
                    <Button 
                        variant={viewMode === 'mobile' ? 'secondary' : 'ghost'} 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setViewMode('mobile')}
                    >
                        <Smartphone className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" asChild>
                        <a href={`${frontendUrl}/${slug === 'about-us' ? 'about-us' : 'page/' + slug}`} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Xem thực tế
                        </a>
                    </Button>
                    <Button 
                        size="sm" 
                        onClick={handleSave} 
                        disabled={isSaving || !pendingData}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Lưu thay đổi
                    </Button>
                </div>
            </div>

            {/* Preview Container */}
            <Card className="flex-grow overflow-hidden bg-gray-200 flex items-center justify-center p-4">
                <div 
                    className={`bg-white shadow-2xl transition-all duration-300 h-full ${
                        viewMode === 'desktop' ? 'w-full' : 
                        viewMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                    }`}
                >
                    <iframe 
                        ref={iframeRef}
                        src={iframeSrc} 
                        className="w-full h-full border-none"
                        title="Visual Editor Preview"
                    />
                </div>
            </Card>

            {/* Image Picker Modal */}
            <ImagePickerModal 
                open={isImagePickerOpen}
                onOpenChange={setIsImagePickerOpen}
                onSelect={handleImageSelect}
            />
        </div>
    );
};

export default VisualEditorPage;
