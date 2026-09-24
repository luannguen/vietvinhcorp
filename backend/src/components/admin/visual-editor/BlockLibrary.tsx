import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

export const BLOCK_LIBRARY = [
    { 
        type: 'hero', 
        name: 'Hero Banner', 
        icon: '🎨',
        category: 'Basic',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'description', label: 'Mô tả', type: 'textarea' },
            { id: 'image_url', label: 'Hình ảnh nền', type: 'image' },
            { id: 'alignment', label: 'Căn lề', type: 'select', options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
            ]}
        ]
    },
    { 
        type: 'image', 
        name: 'Hình ảnh đơn', 
        icon: '🖼️',
        category: 'Basic',
        fields: [
            { id: 'url', label: 'Đường dẫn ảnh', type: 'image' },
            { id: 'alt', label: 'Mô tả ảnh (Alt)', type: 'text' },
            { id: 'caption', label: 'Chú thích', type: 'text' },
            { id: 'width', label: 'Độ rộng (%)', type: 'number' }
        ]
    },
    {
        type: 'rich_text',
        name: 'Nội dung văn bản',
        icon: '📝',
        category: 'Basic',
        fields: [
            { id: 'content', label: 'Nội dung', type: 'rich-text' }
        ]
    },
    { 
        type: 'grid', 
        name: 'Lưới Layout', 
        icon: '⊞',
        category: 'Basic',
        fields: [
            { id: 'columns', label: 'Số cột', type: 'number' },
            { id: 'gap', label: 'Khoảng cách', type: 'number' },
            { id: 'padding', label: 'Lề (Padding)', type: 'select', options: [
                { label: 'Nhỏ', value: 'small' },
                { label: 'Vừa', value: 'medium' },
                { label: 'Lớn', value: 'large' }
            ]}
        ]
    },
    { 
        type: 'cards', 
        name: 'Danh sách Card Cơ bản', 
        icon: '🎴',
        category: 'Cards & Showcases',
        fields: [
            { id: 'title', label: 'Tiêu đề lưới card', type: 'text' },
            { id: 'columns', label: 'Số cột hiển thị', type: 'number' },
            { id: 'style', label: 'Kiểu dáng card', type: 'select', options: [
                { label: 'Đổ bóng nổi bật', value: 'elevated' },
                { label: 'Viền tinh tế', value: 'bordered' },
                { label: 'Phẳng tối giản', value: 'flat' }
            ]},
            { id: 'containerWidth', label: 'Độ rộng khung chứa', type: 'select', options: [
                { label: 'Thu hẹp (896px)', value: 'narrow' },
                { label: 'Tiêu chuẩn (1280px)', value: 'normal' },
                { label: 'Rộng (1536px)', value: 'wide' },
                { label: 'Tràn màn hình (100%)', value: 'full' }
            ]},
            { id: 'cardHeight', label: 'Độ cao card', type: 'select', options: [
                { label: 'Tự động', value: 'auto' },
                { label: 'Nhỏ gọn (300px)', value: 'equal-sm' },
                { label: 'Vừa vặn (400px)', value: 'equal-md' },
                { label: 'Cao (500px)', value: 'equal-lg' }
            ]},
            { id: 'imageAspect', label: 'Tỷ lệ ảnh card', type: 'select', options: [
                { label: 'Chuẩn ngang (16:9)', value: '16:9' },
                { label: 'Rộng (4:3)', value: '4:3' },
                { label: 'Vuông (1:1)', value: '1:1' },
                { label: 'Tự do', value: 'auto' }
            ]},
            { id: 'textAlign', label: 'Căn lề chữ', type: 'select', options: [
                { label: 'Căn trái', value: 'left' },
                { label: 'Căn giữa', value: 'center' }
            ]}
        ]
    },
    {
        type: 'intro_card_pro',
        name: 'Card: Giới thiệu Pro',
        icon: '📇',
        category: 'Cards & Showcases',
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
    },
    {
        type: 'modern_card_grid',
        name: 'Card: Lưới Đa Năng',
        icon: '💎',
        category: 'Cards & Showcases',
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
    },
    {
        type: 'stats_counter_card',
        name: 'Card: Thống Kê Số Liệu',
        icon: '📊',
        category: 'Cards & Showcases',
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
    },
    {
        type: 'split_media_card',
        name: 'Card: Media Hai Cột',
        icon: '🖼️',
        category: 'Cards & Showcases',
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
    },
    {
        type: 'cta_banner_card',
        name: 'Card: Banner Kêu Gọi',
        icon: '📢',
        category: 'Cards & Showcases',
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
    },
    { 
        type: 'features', 
        name: 'Tính năng', 
        icon: '✨',
        category: 'Basic',
        fields: [
            { id: 'title', label: 'Tiêu đề chính', type: 'text' },
            { id: 'subtitle', label: 'Tiêu đề phụ', type: 'textarea' },
            { id: 'icon_image', label: 'Icon/Ảnh minh họa', type: 'image' }
        ]
    },
    {
        type: 'media_section',
        name: 'Media & Content',
        icon: '🖼️',
        category: 'Basic',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'layout', label: 'Bố cục', type: 'select', options: [
                { label: 'Ảnh bên Trái', value: 'image-left' },
                { label: 'Ảnh bên Phải', value: 'image-right' },
                { label: 'Ảnh trên Đầu', value: 'image-top' },
                { label: 'Ảnh dưới Cùng', value: 'image-bottom' }
            ]},
            { id: 'image', label: 'Hình ảnh', type: 'image' },
            { id: 'imageWidth', label: 'Độ rộng ảnh (%)', type: 'number' },
            { id: 'description', label: 'Mô tả', type: 'textarea' }
        ]
    },
    {
        type: 'refrigeration',
        name: 'Hệ thống lạnh',
        icon: '❄️',
        category: 'Industry & Tech',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'description', label: 'Mô tả', type: 'textarea' },
            { id: 'image', label: 'Hình ảnh', type: 'image' },
            { id: 'feature1_title', label: 'Tính năng 1: Tiêu đề', type: 'text' },
            { id: 'feature1_desc', label: 'Tính năng 1: Mô tả', type: 'text' },
            { id: 'feature2_title', label: 'Tính năng 2: Tiêu đề', type: 'text' },
            { id: 'feature2_desc', label: 'Tính năng 2: Mô tả', type: 'text' },
            { id: 'feature3_title', label: 'Tính năng 3: Tiêu đề', type: 'text' },
            { id: 'feature3_desc', label: 'Tính năng 3: Mô tả', type: 'text' }
        ]
    },
    {
        type: 'cold_storage_catalog',
        name: 'Phân loại kho lạnh',
        icon: '🏢',
        category: 'Industry & Tech',
        fields: [
            { id: 'title', label: 'Tiêu đề lưới', type: 'text' },
            { id: 'subtitle', label: 'Mô tả lưới', type: 'textarea' },
            { id: 'item1_name', label: 'Loại 1: Tên', type: 'text' },
            { id: 'item1_range', label: 'Loại 1: Dải nhiệt', type: 'text' },
            { id: 'item2_name', label: 'Loại 2: Tên', type: 'text' },
            { id: 'item2_range', label: 'Loại 2: Dải nhiệt', type: 'text' },
            { id: 'item3_name', label: 'Loại 3: Tên', type: 'text' },
            { id: 'item3_range', label: 'Loại 3: Dải nhiệt', type: 'text' },
            { id: 'item4_name', label: 'Loại 4: Tên', type: 'text' },
            { id: 'item4_range', label: 'Loại 4: Dải nhiệt', type: 'text' },
            { id: 'item5_name', label: 'Loại 5: Tên', type: 'text' },
            { id: 'item5_range', label: 'Loại 5: Dải nhiệt', type: 'text' },
            { id: 'item6_name', label: 'Loại 6: Tên', type: 'text' },
            { id: 'item6_range', label: 'Loại 6: Dải nhiệt', type: 'text' }
        ]
    },
    {
        type: 'industrial_expertise',
        name: 'Chuyên gia công nghiệp',
        icon: '👷',
        category: 'Industry & Tech',
        fields: [
            { id: 'diff_title', label: 'Khác biệt: Tiêu đề', type: 'text' },
            { id: 'diff_desc', label: 'Khác biệt: Mô tả', type: 'textarea' },
            { id: 'diff_feat1_title', label: 'K.Biệt 1: Tiêu đề', type: 'text' },
            { id: 'diff_feat1_desc', label: 'K.Biệt 1: Mô tả', type: 'text' },
            { id: 'diff_feat2_title', label: 'K.Biệt 2: Tiêu đề', type: 'text' },
            { id: 'diff_feat2_desc', label: 'K.Biệt 2: Mô tả', type: 'text' },
            { id: 'diff_feat3_title', label: 'K.Biệt 3: Tiêu đề', type: 'text' },
            { id: 'diff_feat3_desc', label: 'K.Biệt 3: Mô tả', type: 'text' },
            { id: 'refrig_title', label: 'Môi chất: Tiêu đề', type: 'text' },
            { id: 'refrig1_title', label: 'Môi chất 1: Tiêu đề', type: 'text' },
            { id: 'refrig1_desc', label: 'Môi chất 1: Mô tả', type: 'text' },
            { id: 'refrig2_title', label: 'Môi chất 2: Tiêu đề', type: 'text' },
            { id: 'refrig2_desc', label: 'Môi chất 2: Mô tả', type: 'text' }
        ]
    },
    {
        type: 'advanced_tech_showcase',
        name: 'Công nghệ chuyên sâu',
        icon: '🚀',
        category: 'Industry & Tech',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'subtitle', label: 'Mô tả phụ', type: 'textarea' },
            { id: 'badge', label: 'Nhãn (Badge)', type: 'text' },
            { id: 'item1_title', label: 'CN 1: Tiêu đề', type: 'text' },
            { id: 'item1_desc', label: 'CN 1: Mô tả', type: 'textarea' },
            { id: 'item2_title', label: 'CN 2: Tiêu đề', type: 'text' },
            { id: 'item2_desc', label: 'CN 2: Mô tả', type: 'textarea' },
            { id: 'item3_title', label: 'CN 3: Tiêu đề', type: 'text' },
            { id: 'item3_desc', label: 'CN 3: Mô tả', type: 'textarea' },
            { id: 'item4_title', label: 'CN 4: Tiêu đề', type: 'text' },
            { id: 'item4_desc', label: 'CN 4: Mô tả', type: 'textarea' }
        ]
    },
    {
        type: 'technical_detail',
        name: 'Trang chi tiết kỹ thuật',
        icon: '🔬',
        category: 'Industry & Tech',
        fields: [
            { id: 'title', label: 'Tiêu đề trang', type: 'text' },
            { id: 'description', label: 'Mô tả chi tiết', type: 'textarea' },
            { id: 'image', label: 'Hình ảnh chính', type: 'image' },
            { id: 'feature1', label: 'Điểm nhấn 1', type: 'text' },
            { id: 'feature2', label: 'Điểm nhấn 2', type: 'text' },
            { id: 'feature3', label: 'Điểm nhấn 3', type: 'text' },
            { id: 'feature4', label: 'Điểm nhấn 4', type: 'text' }
        ]
    },
    {
        type: 'me_systems',
        name: 'Cơ điện (M&E)',
        icon: '⚡',
        category: 'Industry & Tech',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'description', label: 'Mô tả', type: 'textarea' },
            { id: 'image', label: 'Hình ảnh banner', type: 'image' },
            { id: 'cat1_label', label: 'HT 1: Tên', type: 'text' },
            { id: 'cat1_sub', label: 'HT 1: Mô tả', type: 'text' },
            { id: 'cat1_link', label: 'HT 1: Link', type: 'text' },
            { id: 'cat2_label', label: 'HT 2: Tên', type: 'text' },
            { id: 'cat2_sub', label: 'HT 2: Mô tả', type: 'text' },
            { id: 'cat2_link', label: 'HT 2: Link', type: 'text' },
            { id: 'cat3_label', label: 'HT 3: Tên', type: 'text' },
            { id: 'cat3_sub', label: 'HT 3: Mô tả', type: 'text' },
            { id: 'cat3_link', label: 'HT 3: Link', type: 'text' },
            { id: 'cat4_label', label: 'HT 4: Tên', type: 'text' },
            { id: 'cat4_sub', label: 'HT 4: Mô tả', type: 'text' },
            { id: 'cat4_link', label: 'HT 4: Link', type: 'text' },
            { id: 'cat5_label', label: 'HT 5: Tên', type: 'text' },
            { id: 'cat5_sub', label: 'HT 5: Mô tả', type: 'text' },
            { id: 'cat5_link', label: 'HT 5: Link', type: 'text' },
            { id: 'cat6_label', label: 'HT 6: Tên', type: 'text' },
            { id: 'cat6_sub', label: 'HT 6: Mô tả', type: 'text' },
            { id: 'cat6_link', label: 'HT 6: Link', type: 'text' }
        ]
    },
    {
        type: 'data_center',
        name: 'Data Center (DC)',
        icon: '🖥️',
        category: 'Industry & Tech',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'description', label: 'Mô tả', type: 'textarea' },
            { id: 'image', label: 'Hình ảnh', type: 'image' },
            { id: 'dc_feat1_title', label: 'DC 1: Tiêu đề', type: 'text' },
            { id: 'dc_feat1_desc', label: 'DC 1: Mô tả', type: 'text' },
            { id: 'dc_feat2_title', label: 'DC 2: Tiêu đề', type: 'text' },
            { id: 'dc_feat2_desc', label: 'DC 2: Mô tả', type: 'text' }
        ]
    },
    {
        type: 'service_lifecycle',
        name: 'Vòng đời dịch vụ',
        icon: '🔄',
        category: 'Industry & Tech',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'description', label: 'Mô tả', type: 'textarea' },
            { id: 'step1_title', label: 'Bước 1: Tiêu đề', type: 'text' },
            { id: 'step1_desc', label: 'Bước 1: Mô tả', type: 'text' },
            { id: 'step2_title', label: 'Bước 2: Tiêu đề', type: 'text' },
            { id: 'step2_desc', label: 'Bước 2: Mô tả', type: 'text' },
            { id: 'step3_title', label: 'Bước 3: Tiêu đề', type: 'text' },
            { id: 'step3_desc', label: 'Bước 3: Mô tả', type: 'text' },
            { id: 'step4_title', label: 'Bước 4: Tiêu đề', type: 'text' },
            { id: 'step4_desc', label: 'Bước 4: Mô tả', type: 'text' }
        ]
    },
    {
        type: 'about_hero',
        name: 'About: Hero',
        icon: 'ℹ️',
        category: 'About Us',
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
            { id: 'containerWidth', label: 'Độ rộng khung chứa', type: 'select', options: [
                { label: 'Thu hẹp (896px)', value: 'narrow' },
                { label: 'Tiêu chuẩn (1280px)', value: 'normal' },
                { label: 'Rộng (1536px)', value: 'wide' },
                { label: 'Tràn màn hình (100%)', value: 'full' }
            ]},
            { id: 'minHeight', label: 'Độ cao tối thiểu', type: 'select', options: [
                { label: 'Tự động', value: 'auto' },
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
    },
    {
        type: 'about_history',
        name: 'About: Lịch sử',
        icon: '📜',
        category: 'About Us',
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
    },
    {
        type: 'about_vision',
        name: 'About: Tầm nhìn & Sứ mệnh',
        icon: '🎯',
        category: 'About Us',
        defaultProps: {
            visionTitle: 'Tầm nhìn',
            missionTitle: 'Sứ mệnh'
        },
        fields: [
            { id: 'visionTitle', label: 'Tiêu đề Tầm nhìn', type: 'text' },
            { id: 'missionTitle', label: 'Tiêu đề Sứ mệnh', type: 'text' }
        ]
    },
    {
        type: 'about_values',
        name: 'About: Giá trị cốt lõi',
        icon: '🛡️',
        category: 'About Us',
        defaultProps: { title: 'Giá trị cốt lõi' },
        fields: [{ id: 'title', label: 'Tiêu đề', type: 'text' }]
    },
    {
        type: 'about_partners',
        name: 'About: Đối tác & Khách hàng',
        icon: '🤝',
        category: 'About Us',
        defaultProps: { title: 'Đối tác & Khách hàng' },
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { 
                id: 'mgmt_info', 
                label: 'Quản lý Logo', 
                type: 'info',
                description: 'Dữ liệu logo đối tác được lấy tự động từ danh sách quản lý tập trung. Bạn có thể thêm, sửa hoặc xóa logo tại trang Quản lý Đối tác.',
                action: {
                    label: 'Đi tới Quản lý Đối tác',
                    url: '/admin/partners'
                }
            }
        ]
    },
    {
        type: 'team_hero',
        name: 'Team: Hero',
        icon: '👥',
        category: 'Corporate',
        defaultProps: { title: 'Đội ngũ', subtitle: 'Chúng tôi là một tập thể...' },
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'subtitle', label: 'Mô tả', type: 'textarea' }
        ]
    },
    {
        type: 'team_grid',
        name: 'Team: Lưới thành viên',
        icon: '⊞',
        category: 'Corporate',
        defaultProps: { title: 'Đội ngũ nhân sự', description: 'Gặp gỡ những chuyên gia của chúng tôi' },
        fields: [
            { id: 'title', label: 'Tiêu đề lưới', type: 'text' },
            { id: 'description', label: 'Mô tả lưới', type: 'textarea' }
        ]
    },
    {
        type: 'capability_profile',
        name: 'Hồ sơ năng lực',
        icon: '📄',
        category: 'Corporate',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'description', label: 'Mô tả', type: 'textarea' },
            { id: 'pdfUrl', label: 'Link file PDF', type: 'text' }
        ]
    },
    {
        type: 'jobs_list',
        name: 'Danh sách tuyển dụng',
        icon: '💼',
        category: 'Corporate',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'subtitle', label: 'Mô tả phụ', type: 'textarea' }
        ]
    },
    {
        type: 'contact_form',
        name: 'Form liên hệ',
        icon: '📧',
        category: 'General',
        fields: []
    }
];


export const BlockLibrary: React.FC = () => {
    // Group blocks by category
    const categories = BLOCK_LIBRARY.reduce((acc, block) => {
        const cat = block.category || 'General';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(block);
        return acc;
    }, {} as Record<string, typeof BLOCK_LIBRARY>);

    // Order categories logically
    const categoryOrder = ['Basic', 'Cards & Showcases', 'About Us', 'Industry & Tech', 'Corporate', 'General'];
    const sortedCategories = Object.keys(categories).sort((a, b) => {
        const idxA = categoryOrder.indexOf(a);
        const idxB = categoryOrder.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
    });

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden">
            <div className="flex-grow overflow-y-auto custom-scrollbar p-3">
                <Droppable droppableId="blocks-palette" isDropDisabled={true}>
                    {(provided) => (
                        <div 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            className="space-y-6"
                        >
                            {sortedCategories.map((catName) => (
                                <div key={catName} className="space-y-2">
                                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                                        {catName}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categories[catName].map((block) => {
                                            // Calculate actual index in the original flat array for DnD
                                            const originalIndex = BLOCK_LIBRARY.findIndex(b => b.type === block.type);
                                            
                                            return (
                                                <Draggable 
                                                    key={`block-${block.type}`} 
                                                    draggableId={`block-${block.type}`} 
                                                    index={originalIndex}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`flex flex-col items-center justify-center p-2.5 text-center bg-white border border-slate-100 rounded-xl hover:border-primary hover:shadow-md transition-all group cursor-grab active:cursor-grabbing ${
                                                                snapshot.isDragging ? 'z-50 shadow-2xl border-primary ring-2 ring-primary/20' : ''
                                                            }`}
                                                            title={block.name}
                                                        >
                                                            <div className="w-10 h-10 flex items-center justify-center text-xl bg-slate-50 rounded-lg mb-1.5 group-hover:bg-primary/5 transition-colors">
                                                                {block.icon}
                                                            </div>
                                                            <span className="text-[10px] font-semibold text-slate-600 truncate w-full px-1">
                                                                {block.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
};
