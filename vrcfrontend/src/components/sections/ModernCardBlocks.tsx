import React from 'react';
import { useTranslation } from 'react-i18next';
import { EditableElement } from '../admin/EditableElement';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Zap,
  Clock,
  ChevronRight
} from 'lucide-react';

// Helpers for dimensions & layout
export const getContainerWidthClass = (width?: string) => {
  switch (width) {
    case 'narrow': return 'max-w-4xl mx-auto px-4 sm:px-6';
    case 'wide': return 'max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-8';
    case 'full': return 'w-full px-4 sm:px-8 lg:px-12';
    case 'normal':
    default:
      return 'container-custom';
  }
};

export const getMinHeightClass = (height?: string) => {
  switch (height) {
    case 'small': return 'min-h-[350px]';
    case 'medium': return 'min-h-[500px]';
    case 'large': return 'min-h-[650px]';
    case 'screen': return 'min-h-screen';
    case 'auto':
    default:
      return '';
  }
};

export const getPaddingYClass = (padding?: string) => {
  switch (padding) {
    case 'none': return 'py-0';
    case 'small': return 'py-8 md:py-12';
    case 'large': return 'py-20 md:py-28';
    case 'xlarge': return 'py-24 md:py-36';
    case 'medium':
    default:
      return 'py-14 md:py-20';
  }
};

export const getTextAlignClass = (align?: string) => {
  switch (align) {
    case 'center': return 'text-center';
    case 'right': return 'text-right';
    case 'justify': return 'text-justify';
    case 'left':
    default:
      return 'text-left';
  }
};

export const getImageAspectClass = (aspect?: string) => {
  switch (aspect) {
    case '16:9': return 'aspect-video';
    case '4:3': return 'aspect-[4/3]';
    case '1:1': return 'aspect-square';
    case 'auto':
    default:
      return 'aspect-auto';
  }
};

export const getImageRadiusClass = (radius?: string) => {
  switch (radius) {
    case 'none': return 'rounded-none';
    case 'md': return 'rounded-xl';
    case '3xl': return 'rounded-[2rem]';
    case 'full': return 'rounded-full';
    case 'xl':
    default:
      return 'rounded-2xl';
  }
};

export const getImageShadowClass = (shadow?: string) => {
  switch (shadow) {
    case 'none': return 'shadow-none';
    case 'sm': return 'shadow-sm';
    case 'xl': return 'shadow-2xl';
    case 'md':
    default:
      return 'shadow-xl';
  }
};

// ==========================================
// 1. INTRO CARD PRO BLOCK (Card Giới Thiệu Chuyên Nghiệp)
// ==========================================
interface IntroCardProProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  highlight1?: string;
  highlight2?: string;
  highlight3?: string;
  highlight4?: string;
  image?: string;
  layout?: 'text-only' | 'image-right' | 'image-left' | 'boxed-card';
  cardStyle?: 'modern' | 'glass' | 'tech-dark' | 'tech-gradient' | 'bordered';
  containerWidth?: 'narrow' | 'normal' | 'wide' | 'full';
  minHeight?: 'auto' | 'small' | 'medium' | 'large' | 'screen';
  textAlign?: 'left' | 'center' | 'justify';
  paddingY?: 'none' | 'small' | 'medium' | 'large' | 'xlarge';
  buttonText?: string;
  buttonLink?: string;
  sectionId?: string;
}

export const IntroCardProBlock = ({
  badge = 'VỀ CHÚNG TÔI • VIETVINH INDUSTRIES',
  title = 'GIỚI THIỆU TỔNG CÔNG TY',
  subtitle = 'Giải pháp kỹ thuật toàn diện cho công nghiệp hiện đại',
  description = 'VIETVINH INDUSTRIES CORPORATION cung cấp giải pháp Engineering – Procurement – Construction (EPC) cho hệ thống lạnh công nghiệp, phòng sạch, hệ thống cơ điện, hạ tầng tự động hóa và trung tâm dữ liệu. Chúng tôi hướng đến những giải pháp đồng bộ, an toàn, hiệu quả năng lượng và bền vững.',
  highlight1 = '20+ năm kinh nghiệm kỹ thuật lạnh công nghiệp',
  highlight2 = 'Tổng thầu EPC trọn gói chìa khóa trao tay',
  highlight3 = 'Kiểm soát nhiệt độ & độ ẩm chuẩn xác',
  highlight4 = 'Dịch vụ vận hành & bảo trì khẩn cấp 24/7',
  image = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
  layout = 'image-right',
  cardStyle = 'modern',
  containerWidth = 'normal',
  minHeight = 'auto',
  textAlign = 'left',
  paddingY = 'medium',
  buttonText = 'Tìm hiểu năng lực',
  buttonLink = '/about',
  sectionId
}: IntroCardProProps) => {
  const { t } = useTranslation();

  const widthClass = getContainerWidthClass(containerWidth);
  const heightClass = getMinHeightClass(minHeight);
  const paddingClass = getPaddingYClass(paddingY);
  const alignClass = getTextAlignClass(textAlign);

  // Background & card styling
  let containerBg = 'bg-white';
  let cardInnerBg = 'bg-white border border-slate-100 shadow-sm';
  let titleColor = 'text-primary';
  let descColor = 'text-slate-600';
  let badgeColor = 'bg-primary/10 text-primary border-primary/20';

  if (cardStyle === 'glass') {
    containerBg = 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100';
    cardInnerBg = 'bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-blue-500/5';
    badgeColor = 'bg-blue-600/10 text-blue-700 border-blue-200';
  } else if (cardStyle === 'tech-dark') {
    containerBg = 'bg-slate-950 text-white';
    cardInnerBg = 'bg-slate-900/90 border border-slate-800 shadow-2xl';
    titleColor = 'text-white';
    descColor = 'text-slate-300';
    badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  } else if (cardStyle === 'tech-gradient') {
    containerBg = 'bg-gradient-to-br from-primary via-primary-dark to-slate-900 text-white';
    cardInnerBg = 'bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl';
    titleColor = 'text-white';
    descColor = 'text-blue-100';
    badgeColor = 'bg-white/20 text-white border-white/30';
  } else if (cardStyle === 'bordered') {
    containerBg = 'bg-slate-50/50';
    cardInnerBg = 'bg-white border-2 border-primary/20 hover:border-primary/40 transition-colors shadow-sm';
  }

  const highlights = [highlight1, highlight2, highlight3, highlight4].filter(Boolean);

  return (
    <section className={`relative overflow-hidden transition-all duration-300 ${containerBg} ${paddingClass} ${heightClass} flex items-center`}>
      <div className={`w-full ${widthClass}`}>
        <div className={`rounded-3xl p-6 sm:p-10 md:p-14 ${cardInnerBg} transition-all`}>
          <div className={`grid gap-8 lg:gap-14 items-center ${
            layout === 'text-only' ? 'grid-cols-1' :
            layout === 'image-left' ? 'grid-cols-1 lg:grid-cols-12' :
            'grid-cols-1 lg:grid-cols-12'
          }`}>
            
            {/* Image Col (if image-left) */}
            {layout === 'image-left' && (
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl border-4 border-white/60 aspect-[4/3] lg:aspect-[5/4]">
                  <EditableElement
                    type="image"
                    fieldKey="image"
                    sectionId={sectionId}
                    defaultContent={image}
                    className="w-full h-full"
                  >
                    <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </EditableElement>
                </div>
              </div>
            )}

            {/* Text Content Col */}
            <div className={`space-y-6 ${
              layout === 'text-only' ? 'max-w-4xl mx-auto' :
              layout === 'boxed-card' ? 'lg:col-span-12' :
              'lg:col-span-7 order-1 lg:order-1'
            } ${alignClass}`}>
              
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${badgeColor}`}>
                <Sparkles className="w-3.5 h-3.5" />
                <EditableElement
                  tagName="span"
                  fieldKey="badge"
                  sectionId={sectionId}
                  defaultContent={badge}
                  className="font-bold"
                />
              </div>

              {/* Title */}
              <EditableElement
                tagName="h2"
                fieldKey="title"
                sectionId={sectionId}
                defaultContent={title}
                className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${titleColor}`}
              />

              {/* Subtitle */}
              {subtitle && (
                <EditableElement
                  tagName="p"
                  fieldKey="subtitle"
                  sectionId={sectionId}
                  defaultContent={subtitle}
                  className={`text-base sm:text-xl font-semibold opacity-90 leading-snug ${titleColor}`}
                />
              )}

              {/* Description */}
              <div className={`prose max-w-none text-sm sm:text-base md:text-lg leading-relaxed ${descColor}`}>
                <EditableElement
                  tagName="p"
                  fieldKey="description"
                  sectionId={sectionId}
                  defaultContent={description}
                  className="whitespace-pre-line"
                />
              </div>

              {/* Highlights checklist */}
              {highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-500/5 border border-slate-200/40">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <EditableElement
                        tagName="span"
                        fieldKey={`highlight${idx + 1}`}
                        sectionId={sectionId}
                        defaultContent={item}
                        className="text-xs sm:text-sm font-medium leading-snug"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button */}
              {buttonText && (
                <div className="pt-4">
                  <a
                    href={buttonLink || '#'}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:gap-3 group"
                  >
                    <span>{buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>

            {/* Image Col (if image-right or boxed) */}
            {layout === 'image-right' && (
              <div className="lg:col-span-5 order-2">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl border-4 border-white/60 aspect-[4/3] lg:aspect-[5/4]">
                  <EditableElement
                    type="image"
                    fieldKey="image"
                    sectionId={sectionId}
                    defaultContent={image}
                    className="w-full h-full"
                  >
                    <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </EditableElement>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};


// ==========================================
// 2. MODERN CARD GRID BLOCK (Lưới Card Đa Phong Cách)
// ==========================================
interface CardGridItem {
  id?: string;
  badge?: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  linkText?: string;
}

interface ModernCardGridProps {
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  cardStyle?: 'elevated' | 'bordered' | 'glass' | 'tech-gradient' | 'flat';
  cardHeight?: 'auto' | 'equal-sm' | 'equal-md' | 'equal-lg';
  imageAspect?: '16:9' | '4:3' | '1:1' | 'none';
  imageRounded?: 'none' | 'md' | 'xl' | 'full';
  textAlign?: 'left' | 'center';
  containerWidth?: 'normal' | 'wide' | 'full';
  paddingY?: 'small' | 'medium' | 'large';
  items?: CardGridItem[];
  sectionId?: string;
}

export const ModernCardGridBlock = ({
  title = 'Giải Pháp & Dịch Vụ Tiêu Biểu',
  subtitle = 'Công nghệ kỹ thuật tiên tiến được thiết kế theo chuẩn công nghiệp quốc tế',
  columns = 3,
  cardStyle = 'elevated',
  cardHeight = 'auto',
  imageAspect = '16:9',
  imageRounded = 'xl',
  textAlign = 'left',
  containerWidth = 'normal',
  paddingY = 'medium',
  items = [
    {
      badge: 'Công nghệ CA',
      title: 'Hệ Thống Khí Quyển Kiểm Soát (CA)',
      description: 'Bảo quản trái cây và nông sản tươi ngon gấp 3-5 lần bằng việc tối ưu hóa tỷ lệ oxy và carbon dioxide.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
      link: '/contact',
      linkText: 'Xem giải pháp'
    },
    {
      badge: 'Cấp đông IQF',
      title: 'Hệ Thống Cấp Đông Nhanh IQF',
      description: 'Công nghệ cấp đông từng cá thể siêu tốc, giữ nguyên cấu trúc tế bào, chất lượng dinh dưỡng và trọng lượng sản phẩm.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
      link: '/contact',
      linkText: 'Xem giải pháp'
    },
    {
      badge: 'Cleanroom & HVAC',
      title: 'Phòng Sạch & Hệ Thống Cơ Điện (MEP)',
      description: 'Thi công phòng sạch chuẩn GMP/ISO cho dược phẩm, điện tử và chế biến thực phẩm với độ tin cậy tuyệt đối.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
      link: '/contact',
      linkText: 'Xem giải pháp'
    }
  ],
  sectionId
}: ModernCardGridProps) => {
  const widthClass = getContainerWidthClass(containerWidth);
  const paddingClass = getPaddingYClass(paddingY);
  const alignClass = getTextAlignClass(textAlign);
  const aspectClass = getImageAspectClass(imageAspect);
  const radiusClass = getImageRadiusClass(imageRounded);

  const gridColsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }[columns] || 'grid-cols-1 md:grid-cols-3';

  const heightClasses = {
    auto: '',
    'equal-sm': 'min-h-[340px]',
    'equal-md': 'min-h-[440px]',
    'equal-lg': 'min-h-[540px]'
  }[cardHeight];

  const cardStyleClasses = {
    elevated: 'bg-white border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300',
    bordered: 'bg-white border-2 border-slate-200 hover:border-primary transition-all duration-300 hover:shadow-lg',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all',
    'tech-gradient': 'bg-gradient-to-br from-slate-900 to-primary-dark text-white border border-slate-800 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all',
    flat: 'bg-slate-50 hover:bg-slate-100 transition-colors border border-transparent'
  }[cardStyle];

  const isDark = cardStyle === 'tech-gradient';

  return (
    <section className={`py-12 md:py-20 bg-slate-50/60 ${paddingClass}`}>
      <div className={widthClass}>
        {/* Header */}
        {(title || subtitle) && (
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
            {title && (
              <EditableElement
                tagName="h2"
                fieldKey="title"
                sectionId={sectionId}
                defaultContent={title}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight"
              />
            )}
            {subtitle && (
              <EditableElement
                tagName="p"
                fieldKey="subtitle"
                sectionId={sectionId}
                defaultContent={subtitle}
                className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed"
              />
            )}
          </div>
        )}

        {/* Cards Grid */}
        <div className={`grid ${gridColsClass} gap-6 sm:gap-8`}>
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`rounded-2xl overflow-hidden flex flex-col justify-between ${cardStyleClasses} ${heightClasses}`}
            >
              <div>
                {/* Image */}
                {imageAspect !== 'none' && item.image && (
                  <div className={`overflow-hidden p-2 sm:p-3`}>
                    <div className={`w-full overflow-hidden ${aspectClass} ${radiusClass}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className={`p-5 sm:p-6 ${alignClass}`}>
                  {item.badge && (
                    <span className={`inline-block px-2.5 py-1 mb-3 text-[11px] font-bold uppercase rounded-md tracking-wider ${
                      isDark ? 'bg-primary/20 text-blue-300' : 'bg-primary/10 text-primary'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <h3 className={`text-lg sm:text-xl font-bold mb-2.5 leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Link / Button */}
              {item.linkText && (
                <div className="p-5 sm:p-6 pt-0">
                  <a
                    href={item.link || '#'}
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all hover:gap-2.5 ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-primary hover:text-primary-dark'
                    }`}
                  >
                    <span>{item.linkText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// ==========================================
// 3. STATS COUNTER CARD BLOCK (Card Thống Kê & Số Liệu)
// ==========================================
interface StatsCounterCardProps {
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  cardStyle?: 'white-card' | 'glass-card' | 'tech-dark-card' | 'accent-border';
  num1?: string;
  label1?: string;
  desc1?: string;
  num2?: string;
  label2?: string;
  desc2?: string;
  num3?: string;
  label3?: string;
  desc3?: string;
  num4?: string;
  label4?: string;
  desc4?: string;
  containerWidth?: 'normal' | 'wide' | 'full';
  paddingY?: 'small' | 'medium' | 'large';
  sectionId?: string;
}

export const StatsCounterCardBlock = ({
  title = 'Năng Lực & Dấu Ấn Đột Phá',
  subtitle = 'Những con số minh chứng cho cam kết chất lượng và uy tín hơn hai thập kỷ của Vietvinh Corp',
  columns = 4,
  cardStyle = 'white-card',
  num1 = '20+',
  label1 = 'NĂM KINH NGHIỆM',
  desc1 = 'Tiên phong thiết kế & thi công lạnh công nghiệp',
  num2 = '500+',
  label2 = 'DỰ ÁN BÀN GIAO',
  desc2 = 'Khách hàng FDI, tập đoàn thực phẩm & dược phẩm',
  num3 = '99.9%',
  label3 = 'ĐỘ TIN CẬY NHIỆT',
  desc3 = 'Hệ thống vận hành liên tục, kiểm soát tối ưu',
  num4 = '24/7',
  label4 = 'HỖ TRỢ KỸ THUẬT',
  desc4 = 'Ứng cứu sự cố & bảo dưỡng định kỳ trên toàn quốc',
  containerWidth = 'normal',
  paddingY = 'medium',
  sectionId
}: StatsCounterCardProps) => {
  const widthClass = getContainerWidthClass(containerWidth);
  const paddingClass = getPaddingYClass(paddingY);

  const stats = [
    { num: num1, label: label1, desc: desc1, keyNum: 'num1', keyLabel: 'label1', keyDesc: 'desc1', icon: Award },
    { num: num2, label: label2, desc: desc2, keyNum: 'num2', keyLabel: 'label2', keyDesc: 'desc2', icon: Layers },
    { num: num3, label: label3, desc: desc3, keyNum: 'num3', keyLabel: 'label3', keyDesc: 'desc3', icon: ShieldCheck },
    { num: num4, label: label4, desc: desc4, keyNum: 'num4', keyLabel: 'label4', keyDesc: 'desc4', icon: Clock }
  ];

  const gridColsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  const cardStyleClass = {
    'white-card': 'bg-white border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1',
    'glass-card': 'bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl hover:shadow-2xl hover:-translate-y-1',
    'tech-dark-card': 'bg-slate-900 border border-slate-800 text-white shadow-xl hover:shadow-2xl hover:border-blue-500/50',
    'accent-border': 'bg-white border-t-4 border-t-primary border-slate-100 shadow-lg hover:shadow-xl'
  }[cardStyle];

  const isDark = cardStyle === 'tech-dark-card';

  return (
    <section className={`py-12 md:py-20 bg-slate-50/50 ${paddingClass}`}>
      <div className={widthClass}>
        {(title || subtitle) && (
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
            {title && (
              <EditableElement
                tagName="h2"
                fieldKey="title"
                sectionId={sectionId}
                defaultContent={title}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight"
              />
            )}
            {subtitle && (
              <EditableElement
                tagName="p"
                fieldKey="subtitle"
                sectionId={sectionId}
                defaultContent={subtitle}
                className="text-sm sm:text-base text-slate-600 leading-relaxed"
              />
            )}
          </div>
        )}

        <div className={`grid ${gridColsClass} gap-6`}>
          {stats.slice(0, columns).map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between ${cardStyleClass}`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-primary/10 text-primary'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <EditableElement
                    tagName="div"
                    fieldKey={st.keyNum}
                    sectionId={sectionId}
                    defaultContent={st.num}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tight"
                  />
                  <EditableElement
                    tagName="h4"
                    fieldKey={st.keyLabel}
                    sectionId={sectionId}
                    defaultContent={st.label}
                    className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  />
                  <EditableElement
                    tagName="p"
                    fieldKey={st.keyDesc}
                    sectionId={sectionId}
                    defaultContent={st.desc}
                    className={`text-xs leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


// ==========================================
// 4. SPLIT MEDIA CARD BLOCK (Card Hai Cột Media & Nội Dung)
// ==========================================
interface SplitMediaCardProps {
  badge?: string;
  title?: string;
  description?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
  image?: string;
  layout?: 'image-left' | 'image-right';
  imageAspect?: '16:9' | '4:3' | '1:1';
  imageRounded?: 'none' | 'md' | 'xl' | '3xl';
  buttonText?: string;
  buttonLink?: string;
  containerWidth?: 'narrow' | 'normal' | 'wide' | 'full';
  minHeight?: 'auto' | 'small' | 'medium' | 'large';
  bgStyle?: 'white' | 'slate' | 'gradient-light' | 'tech-dark';
  paddingY?: 'small' | 'medium' | 'large';
  sectionId?: string;
}

export const SplitMediaCardBlock = ({
  badge = 'CÔNG NGHỆ CHÍNH XÁC',
  title = 'Giải Pháp Tự Động Hóa & Quản Lý Tập Trung',
  description = 'Tích hợp cảm biến SCADA/IoT theo dõi nhiệt độ, áp suất, điện năng tiêu thụ theo thời gian thực. Báo động tự động và điều chỉnh công suất máy nén tối ưu chi phí vận hành.',
  feature1 = 'Giám sát từ xa qua Cloud 24/7',
  feature2 = 'Tiết kiệm 15-25% điện năng tiêu thụ',
  feature3 = 'Đạt chứng nhận an toàn chuẩn HACCP/FDA',
  image = 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=1000',
  layout = 'image-right',
  imageAspect = '4:3',
  imageRounded = 'xl',
  buttonText = 'Nhận tư vấn kỹ thuật',
  buttonLink = '/contact',
  containerWidth = 'normal',
  minHeight = 'auto',
  bgStyle = 'slate',
  paddingY = 'medium',
  sectionId
}: SplitMediaCardProps) => {
  const widthClass = getContainerWidthClass(containerWidth);
  const heightClass = getMinHeightClass(minHeight);
  const paddingClass = getPaddingYClass(paddingY);
  const aspectClass = getImageAspectClass(imageAspect);
  const radiusClass = getImageRadiusClass(imageRounded);

  const bgClass = {
    white: 'bg-white',
    slate: 'bg-slate-50',
    'gradient-light': 'bg-gradient-to-br from-blue-50/50 via-white to-slate-50',
    'tech-dark': 'bg-slate-950 text-white'
  }[bgStyle];

  const isDark = bgStyle === 'tech-dark';

  const features = [feature1, feature2, feature3].filter(Boolean);

  return (
    <section className={`py-12 md:py-20 ${bgClass} ${paddingClass} ${heightClass} flex items-center`}>
      <div className={widthClass}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Media Col */}
          <div className={`lg:col-span-6 ${layout === 'image-right' ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
            <div className={`overflow-hidden shadow-2xl border-4 border-white/80 ${aspectClass} ${radiusClass}`}>
              <EditableElement
                type="image"
                fieldKey="image"
                sectionId={sectionId}
                defaultContent={image}
                className="w-full h-full"
              >
                <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </EditableElement>
            </div>
          </div>

          {/* Text Col */}
          <div className={`lg:col-span-6 space-y-6 ${layout === 'image-right' ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
            {badge && (
              <span className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded-md tracking-wider ${
                isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-primary/10 text-primary'
              }`}>
                {badge}
              </span>
            )}

            <EditableElement
              tagName="h2"
              fieldKey="title"
              sectionId={sectionId}
              defaultContent={title}
              className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-primary'
              }`}
            />

            <EditableElement
              tagName="p"
              fieldKey="description"
              sectionId={sectionId}
              defaultContent={description}
              className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            />

            {features.length > 0 && (
              <div className="space-y-3 pt-2">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <EditableElement
                      tagName="span"
                      fieldKey={`feature${idx + 1}`}
                      sectionId={sectionId}
                      defaultContent={feat}
                      className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {buttonText && (
              <div className="pt-4">
                <a
                  href={buttonLink || '#'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary-dark transition-all shadow-md hover:gap-3 group"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};


// ==========================================
// 5. CTA BANNER CARD BLOCK (Card Banner Kêu Gọi Hành Động)
// ==========================================
interface CTABannerCardProps {
  badge?: string;
  title?: string;
  description?: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
  bgStyle?: 'primary-gradient' | 'dark-tech' | 'mesh-blue' | 'light-boxed';
  textAlign?: 'center' | 'left';
  containerWidth?: 'normal' | 'narrow' | 'wide' | 'full';
  paddingY?: 'small' | 'medium' | 'large';
  sectionId?: string;
}

export const CTABannerCardBlock = ({
  badge = 'BẮT ĐẦU DỰ ÁN CÙNG VIETVINH',
  title = 'Bạn Đang Tìm Kiếm Giải Pháp Kỹ Thuật Lạnh Chuyên Nghiệp?',
  description = 'Đội ngũ chuyên gia và kỹ sư giàu kinh nghiệm của chúng tôi luôn sẵn sàng đồng hành, tư vấn giải pháp tối ưu và cung cấp báo giá chi tiết trong vòng 24 giờ.',
  button1Text = 'Yêu cầu báo giá kỹ thuật',
  button1Link = '/contact',
  button2Text = 'Gọi hotline 0912 555 888',
  button2Link = 'tel:0912555888',
  bgStyle = 'primary-gradient',
  textAlign = 'center',
  containerWidth = 'normal',
  paddingY = 'medium',
  sectionId
}: CTABannerCardProps) => {
  const widthClass = getContainerWidthClass(containerWidth);
  const paddingClass = getPaddingYClass(paddingY);
  const alignClass = getTextAlignClass(textAlign);

  const styleClasses = {
    'primary-gradient': 'bg-gradient-to-r from-primary via-blue-800 to-primary-dark text-white shadow-2xl',
    'dark-tech': 'bg-slate-950 border border-slate-800 text-white shadow-2xl',
    'mesh-blue': 'bg-gradient-to-br from-blue-900 via-primary to-slate-900 text-white shadow-2xl',
    'light-boxed': 'bg-white border-2 border-primary/20 text-slate-900 shadow-xl'
  }[bgStyle];

  const isLight = bgStyle === 'light-boxed';

  return (
    <section className={`py-12 md:py-20 ${paddingClass}`}>
      <div className={widthClass}>
        <div className={`rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden ${styleClasses}`}>
          
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className={`relative z-10 max-w-3xl ${textAlign === 'center' ? 'mx-auto' : ''} ${alignClass} space-y-6`}>
            {badge && (
              <span className={`inline-block px-3.5 py-1.5 text-xs font-bold uppercase rounded-full tracking-wider ${
                isLight ? 'bg-primary/10 text-primary' : 'bg-white/15 text-white backdrop-blur-sm'
              }`}>
                {badge}
              </span>
            )}

            <EditableElement
              tagName="h2"
              fieldKey="title"
              sectionId={sectionId}
              defaultContent={title}
              className={`text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight ${
                isLight ? 'text-primary' : 'text-white'
              }`}
            />

            <EditableElement
              tagName="p"
              fieldKey="description"
              sectionId={sectionId}
              defaultContent={description}
              className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-blue-100'
              }`}
            />

            <div className={`pt-4 flex flex-wrap gap-4 ${textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
              {button1Text && (
                <a
                  href={button1Link || '#'}
                  className="px-7 py-3.5 rounded-xl font-bold text-sm bg-white text-primary hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  {button1Text}
                </a>
              )}
              {button2Text && (
                <a
                  href={button2Link || '#'}
                  className={`px-7 py-3.5 rounded-xl font-bold text-sm border transition-all ${
                    isLight 
                      ? 'border-primary text-primary hover:bg-primary/5' 
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  {button2Text}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
