import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Loader2, MapPin, PhoneCall, Headset, ExternalLink, MessageCircle, ShieldCheck } from 'lucide-react';
import { navigationService } from '@/services/navigationService';
import { useSettings } from '@/hooks/useSettings';
import { NavigationItem } from '@/components/data/types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizePath, isExternalLink } from '@/utils/urlUtils';

const isHexLight = (hex: string): boolean => {
  const clean = (hex || '#0B3B8C').replace('#', '').trim();
  if (clean.length !== 3 && clean.length !== 6) return false;
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const r = parseInt(full.substring(0, 2), 16) || 0;
  const g = parseInt(full.substring(2, 4), 16) || 0;
  const b = parseInt(full.substring(4, 6), 16) || 0;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62;
};

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [footerMenus, setFooterMenus] = useState<NavigationItem[]>([]);
  const { settings, loading } = useSettings();

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const navResult = await navigationService.getNavigationItems();
        if (navResult.success && navResult.data) {
          const allFooterItems = navResult.data.filter(item => item.position === 'footer');
          const itemMap: Record<string, NavigationItem> = {};
          const roots: NavigationItem[] = [];

          allFooterItems.forEach(item => {
            itemMap[item.id] = { ...item, children: [] };
          });

          allFooterItems.forEach(item => {
            const mappedItem = itemMap[item.id];
            if (item.parent_id && itemMap[item.parent_id]) {
              itemMap[item.parent_id].children?.push(mappedItem);
            } else if (!item.parent_id) {
              roots.push(mappedItem);
            }
          });

          const sortItems = (items: NavigationItem[]) => {
            items.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
            items.forEach(item => {
              if (item.children && item.children.length > 0) {
                sortItems(item.children);
              }
            });
          };

          sortItems(roots);
          setFooterMenus(roots);
        }
      } catch (error) {
        console.error("Failed to load footer nav", error);
      }
    };
    fetchNav();
  }, []);

  const getTranslatedLabel = (item: NavigationItem | { label: string, path?: string }) => {
    const currentLang = i18n.language || 'vi';
    if (currentLang.startsWith('vi') && item.label) {
      if (item.label.toLowerCase().trim() === 'về vvc') return 'Về Việt Vinh';
      return item.label;
    }
    if (item.label) {
      const translated = t(item.label);
      if (translated && translated !== item.label) return translated;
      const lowerTranslated = t(item.label.toLowerCase());
      if (lowerTranslated && lowerTranslated !== item.label.toLowerCase()) return lowerTranslated;
    }

    const pathToKeyMap: Record<string, string> = {
      '/': 'home', '/about': 'about', '/about-us': 'about', '/products': 'products',
      '/news': 'news', '/contact': 'contact', '/services': 'services', '/projects': 'projects',
      '/team': 'team', '/recruitment': 'recruitment', '/publications': 'publications',
      '/technologies': 'technologies', '/he-thong-tich-hop': 'integrated_systems',
      '/ho-so-nang-luc': 'capability_experience',
    };

    if (item.path && pathToKeyMap[item.path]) {
      const translated = t(pathToKeyMap[item.path]);
      if (translated && translated !== pathToKeyMap[item.path]) return translated;
    }
    return item.label;
  };

  const currentLang = i18n.language || 'vi';
  const isVi = currentLang.startsWith('vi');

  const getLocalizedSetting = (baseKey: string) => {
    if (isVi) return settings[baseKey];
    const localizedVal = settings[`${baseKey}_${currentLang}`];
    
    if (localizedVal && localizedVal.trim() !== '') {
      if (baseKey === 'contact_address') {
        if (localizedVal.startsWith('[') || localizedVal.startsWith('{')) return localizedVal;
      } else if (baseKey === 'copyright_text') {
        if (!localizedVal.includes('2024')) return localizedVal;
      } else {
        return localizedVal;
      }
    }
    return settings[baseKey];
  };

  const rawLocalizedCopyright = isVi ? settings['copyright_text'] : (settings[`copyright_text_${currentLang}`] || t('copyright'));
  const localizedCopyright = (rawLocalizedCopyright && rawLocalizedCopyright.includes('2024')) ? t('copyright') : rawLocalizedCopyright;
  const copyrightText = localizedCopyright || settings['copyright_text'];
  const contactEmail = settings['contact_email'] || 'contact@vietvinhcorp.com';
  const contactAddress = getLocalizedSetting('contact_address') || t('contact_address_fallback');
  const contactHotline = settings['contact_hotline'] || '+84 981 789 248';
  const siteDescription = getLocalizedSetting('footer_slogan') || getLocalizedSetting('site_description') || settings['company_slogan'] || t('site_description_fallback');
  const siteLogo = settings['footer_logo'] || settings['site_logo'] || '/assets/images/logo4x.png';
  const footerLogoWidth = settings['footer_logo_width'] ? parseInt(settings['footer_logo_width'], 10) : 0;
  const certificationText = settings['footer_certification_text'] ?? 'Certified ISO 9001:2015';

  // Footer Theme & Background Customization Settings
  const footerBgStyle = settings['footer_bg_style'] || 'gradient'; // 'solid' | 'gradient' | 'image'
  const footerBgColor = settings['footer_bg_color'] || '#0B3B8C';
  const footerBgColorEnd = settings['footer_bg_color_end'] || '#062256';
  const footerBgImage = settings['footer_bg_image'] || '';
  const footerBgOverlay = settings['footer_bg_overlay'] ? parseInt(settings['footer_bg_overlay'], 10) / 100 : 0.88;
  const footerPattern = settings['footer_pattern'] || 'none'; // 'none' | 'grid' | 'dots' | 'glow'
  const footerTextMode = settings['footer_text_mode'] || 'auto'; // 'auto' | 'light' | 'dark'

  const isLightFooter =
    footerTextMode === 'dark'
      ? true
      : footerTextMode === 'light'
      ? false
      : isHexLight(footerBgColor);

  const footerAccentColor =
    settings['footer_accent_color'] || (isLightFooter ? '#0B3B8C' : '#FACC15');

  // Resolve Logo Contrast Mode ('auto' uses 'smart-contrast' on dark backgrounds and 'original' on light backgrounds)
  const rawLogoMode = settings['footer_logo_mode'] || 'auto';
  const effectiveLogoMode =
    rawLogoMode === 'auto'
      ? isLightFooter
        ? 'original'
        : 'smart-contrast'
      : rawLogoMode;

  const getLogoInlineStyle = (): React.CSSProperties => {
    const base: React.CSSProperties =
      footerLogoWidth > 0 ? { width: `${footerLogoWidth}px` } : {};

    switch (effectiveLogoMode) {
      case 'smart-contrast':
        return {
          ...base,
          filter: 'url(#vrc-footer-smart-logo) drop-shadow(0 2px 8px rgba(0,0,0,0.18))',
        };
      case 'white-glow':
        return {
          ...base,
          filter:
            'drop-shadow(0 0 1.5px #ffffff) drop-shadow(0 0 2px #ffffff) drop-shadow(0 2px 10px rgba(255,255,255,0.45))',
        };
      case 'monochrome-white':
        return {
          ...base,
          filter: 'brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.18))',
        };
      default:
        return base;
    }
  };

  // Compute main footer background CSS
  const getFooterBackgroundStyle = (): React.CSSProperties => {
    if (footerBgStyle === 'image' && footerBgImage) {
      return {
        backgroundImage: `linear-gradient(135deg, ${footerBgColor}${Math.round(footerBgOverlay * 255)
          .toString(16)
          .padStart(2, '0')}, ${footerBgColorEnd}${Math.round(footerBgOverlay * 255)
          .toString(16)
          .padStart(2, '0')}), url(${footerBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    if (footerBgStyle === 'solid') {
      return { backgroundColor: footerBgColor };
    }
    return {
      background: `linear-gradient(135deg, ${footerBgColor} 0%, ${footerBgColorEnd} 100%)`,
    };
  };

  // Parser for the multi-branch structured data
  const parseOffices = () => {
    if (!contactAddress) return [];
    
    try {
      if (contactAddress.startsWith('[') || contactAddress.startsWith('{')) {
        const data = JSON.parse(contactAddress);
        const branchArray = Array.isArray(data) ? data : [data];
        return branchArray.map(b => ({
          title: b.title,
          details: [
            b.address,
            b.phone ? `${isVi ? 'Điện thoại: ' : 'Phone: '} ${b.phone}` : '',
            b.email ? `Email: ${b.email}` : ''
          ].filter(Boolean),
          mapUrl: b.map_url
        }));
      }
    } catch (e) {
      console.warn("JSON parse failed, falling back to legacy parser", e);
    }

    const blocks = contactAddress.split(/\n\n+/).filter(b => b.trim().length === 0 ? false : true);
    const startIndex = blocks[0] && !blocks[0].includes(':') ? 1 : 0;
    
    return blocks.slice(startIndex).map(block => {
      const lines = block.split('\n').map(l => l.trim());
      const title = lines[0].replace(':', '');
      const details = lines.slice(1);
      return { title, details };
    });
  };

  const offices = parseOffices();

  if (loading) {
    return (
      <footer style={{ backgroundColor: footerBgColor }} className="text-white py-12">
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </footer>
    );
  }

  const headingTextClass = isLightFooter ? 'text-slate-900' : 'text-white';
  const bodyTextClass = isLightFooter ? 'text-slate-600' : 'text-gray-200';
  const mutedTextClass = isLightFooter ? 'text-slate-500' : 'text-gray-300';
  const linkHoverClass = isLightFooter ? 'hover:text-blue-700' : 'hover:text-white';
  const borderClass = isLightFooter ? 'border-slate-200/80' : 'border-white/10';

  return (
    <footer
      style={getFooterBackgroundStyle()}
      className={`relative overflow-hidden ${isLightFooter ? 'text-slate-800 border-t border-slate-200' : 'text-white border-t border-white/10'}`}
    >
      {/* Hidden SVG Filter Definition: Converts Dark-Blue VRC Letters to Pure White while preserving Vivid Brand Red & 100% Transparency */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="vrc-footer-smart-logo" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
                1.30  0.60  2.50  0  0.04
               -0.38  0.60  2.50  0  0.14
               -0.38  0.60  2.50  0  0.14
                0     0     0     1  0"
            />
          </filter>
        </defs>
      </svg>

      {/* Optional Subtle Technical Pattern Overlay */}
      {footerPattern === 'grid' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(to right, ${isLightFooter ? '#0f172a' : '#ffffff'} 1px, transparent 1px), linear-gradient(to bottom, ${isLightFooter ? '#0f172a' : '#ffffff'} 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      )}
      {footerPattern === 'dots' && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(${isLightFooter ? '#0f172a' : '#ffffff'} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
      )}
      {footerPattern === 'glow' && (
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ backgroundColor: footerAccentColor }}
        />
      )}

      {/* Upper Footer: Branding & Navigation */}
      <div className="container-custom pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-3 space-y-5">
            <div className="inline-flex flex-col items-center min-w-[200px] max-w-full space-y-3.5">
              <Link
                to="/"
                className={`block transition-transform hover:scale-[1.02] active:scale-95 ${
                  footerLogoWidth > 0 ? '' : 'w-0 min-w-full'
                } ${
                  effectiveLogoMode === 'soft-light-pad'
                    ? 'bg-white/95 px-4 py-2.5 rounded-2xl shadow-md'
                    : ''
                }`}
              >
                <img 
                  src={siteLogo} 
                  alt="Viet Vinh Logo" 
                  style={getLogoInlineStyle()}
                  className={`${footerLogoWidth > 0 ? '' : 'w-full'} h-auto max-h-24 object-contain block`} 
                />
              </Link>
              <p className={`${bodyTextClass} text-base font-medium leading-relaxed text-center ${
                siteDescription.length <= 45 ? 'sm:whitespace-nowrap' : 'max-w-[280px]'
              }`}>
                {siteDescription}
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-3 pt-1">
              {[
                { icon: Facebook, url: settings['social_facebook'], label: 'Facebook' },
                { icon: MessageCircle, url: settings['social_zalo'], label: 'Zalo' },
                { icon: Linkedin, url: settings['social_linkedin'], label: 'LinkedIn' },
                { icon: Youtube, url: settings['social_youtube'], label: 'YouTube' },
                { icon: Twitter, url: settings['social_twitter'], label: 'Twitter' },
              ].map((social, idx) => social.url && (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isLightFooter
                      ? 'bg-slate-200/80 text-slate-700 hover:bg-blue-600 hover:text-white'
                      : 'bg-white/10 text-gray-200 hover:bg-white hover:text-slate-900'
                  }`}
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns (Menu Manager) */}
          {footerMenus.map((menu) => (
            <div key={menu.id} className="lg:col-span-2">
              <h4 className={`${headingTextClass} font-bold text-base mb-6 relative inline-block tracking-wide`}>
                {getTranslatedLabel(menu)}
                <span
                  style={{ backgroundColor: footerAccentColor }}
                  className="absolute -bottom-1.5 left-0 w-1/2 h-0.5 rounded-full"
                ></span>
              </h4>
              <ul className="space-y-3.5">
                {menu.children?.map((child) => (
                  <li key={child.id}>
                    <Link 
                      to={normalizePath(child.path)} 
                      className={`${bodyTextClass} ${linkHoverClass} hover:translate-x-1 transition-all text-sm font-medium flex items-center group`}
                    >
                      <span
                        style={{ backgroundColor: footerAccentColor }}
                        className="w-0 group-hover:w-2 h-0.5 transition-all duration-300 mr-0 group-hover:mr-2"
                      ></span>
                      {getTranslatedLabel(child)}
                      {isExternalLink(child.path) && <ExternalLink size={12} className="ml-1 opacity-60" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Fast Contact Column */}
          <div className="lg:col-span-3">
            <h4 className={`${headingTextClass} font-bold text-base mb-6 relative inline-block tracking-wide`}>
              {t('contact')}
              <span
                style={{ backgroundColor: footerAccentColor }}
                className="absolute -bottom-1.5 left-0 w-1/2 h-0.5 rounded-full"
              ></span>
            </h4>
            <div className="space-y-5">
              <div className="flex gap-3 items-start">
                <div
                  style={{ color: footerAccentColor }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isLightFooter ? 'bg-blue-50 border border-blue-100' : 'bg-white/10'
                  }`}
                >
                  <Headset size={20} />
                </div>
                <div className="min-w-0">
                  <p className={`text-xs uppercase tracking-wider ${mutedTextClass} font-bold mb-0.5`}>
                    {t('hotline')}
                  </p>
                  <a
                    href={`tel:${contactHotline.replace(/\s/g, '')}`}
                    className={`${headingTextClass} font-semibold hover:opacity-80 transition-opacity block whitespace-nowrap text-sm`}
                  >
                    {contactHotline}
                  </a>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div
                  style={{ color: footerAccentColor }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isLightFooter ? 'bg-blue-50 border border-blue-100' : 'bg-white/10'
                  }`}
                >
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <p className={`text-xs uppercase tracking-wider ${mutedTextClass} font-bold mb-0.5`}>
                    {t('email')}
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className={`${headingTextClass} font-semibold hover:opacity-80 transition-opacity block whitespace-nowrap text-sm`}
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Footer: Office Network Grid */}
      {offices.length > 0 && (
        <div
          className={`py-12 px-4 relative z-10 ${
            isLightFooter
              ? 'bg-slate-900/[0.03] border-t border-slate-200/80'
              : 'bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
          }`}
        >
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h3 className={`text-lg font-bold ${headingTextClass} flex items-center gap-2`}>
                <MapPin style={{ color: footerAccentColor }} size={20} />
                {t('office_network')}
              </h3>
              <div
                className={`h-px flex-grow mx-4 hidden md:block ${
                  isLightFooter ? 'bg-slate-200' : 'bg-white/10'
                }`}
              ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-6 border transition-all duration-300 group flex flex-col h-full shadow-sm ${
                    isLightFooter
                      ? 'bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-md'
                      : 'bg-white/10 border-white/10 hover:border-white/30'
                  }`}
                >
                  <h5 className={`${headingTextClass} font-bold text-base mb-4 flex items-center gap-2`}>
                    <span
                      style={{ backgroundColor: footerAccentColor }}
                      className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
                    ></span>
                    {t(office.title, { defaultValue: office.title })}
                  </h5>
                  <div className="space-y-3 flex-grow">
                    {office.details.map((detail, dIdx) => {
                      const isPhone =
                        detail.toLowerCase().includes('điện thoại') ||
                        detail.toLowerCase().includes('phone');
                      const isEmail = detail.toLowerCase().includes('email');

                      return (
                        <div
                          key={dIdx}
                          className={`flex gap-3 text-sm ${bodyTextClass} leading-relaxed group/line`}
                        >
                          {isPhone ? (
                            <PhoneCall
                              size={15}
                              style={{ color: footerAccentColor }}
                              className="mt-0.5 flex-shrink-0 transition-colors"
                            />
                          ) : isEmail ? (
                            <Mail
                              size={15}
                              style={{ color: footerAccentColor }}
                              className="mt-0.5 flex-shrink-0 transition-colors"
                            />
                          ) : (
                            <MapPin
                              size={15}
                              style={{ color: footerAccentColor }}
                              className="mt-0.5 flex-shrink-0 transition-colors"
                            />
                          )}
                          <span
                            className={
                              isPhone || isEmail
                                ? `${headingTextClass} font-semibold transition-colors`
                                : 'transition-colors'
                            }
                          >
                            {t(detail, { defaultValue: detail })}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {(office as any).mapUrl && (
                    <a
                      href={(office as any).mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: footerAccentColor, borderColor: `${footerAccentColor}55` }}
                      className={`mt-6 inline-flex items-center gap-2 text-xs font-semibold transition-colors border px-3 py-2 rounded-lg self-start ${
                        isLightFooter ? 'bg-slate-50 hover:bg-slate-100' : 'bg-white/5 hover:bg-white/15'
                      }`}
                    >
                      <ExternalLink size={12} />
                      {t('view_on_maps')}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar: Copyright & Legal */}
      <div
        style={{
          backgroundColor:
            footerBgStyle === 'solid'
              ? isLightFooter
                ? 'rgba(15, 23, 42, 0.04)'
                : 'rgba(0, 0, 0, 0.22)'
              : footerBgColorEnd,
        }}
        className={`py-6 border-t ${borderClass} relative z-10`}
      >
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className={`${mutedTextClass} text-xs tracking-wide`}>
              {copyrightText}
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs">
              {[
                { to: '/legal/privacy', label: 'privacy_policy' },
                { to: '/legal/terms', label: 'terms_of_use' },
                { to: '/legal/cookies', label: 'cookie_policy' },
                { to: '/legal/sitemap', label: 'sitemap' },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to}
                  className={`${mutedTextClass} ${linkHoverClass} transition-colors uppercase font-medium`}
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
            {/* Certification Badge */}
            {certificationText && (
              <div className={`hidden lg:flex items-center gap-1.5 ${mutedTextClass} text-xs font-medium italic`}>
                <ShieldCheck size={14} style={{ color: footerAccentColor }} />
                {certificationText}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
