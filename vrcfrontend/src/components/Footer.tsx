import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Loader2 } from 'lucide-react';
import { navigationService } from '@/services/navigationService';
import { useSettings } from '@/hooks/useSettings';
import { NavigationItem } from '@/components/data/types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizePath, isExternalLink } from '@/utils/urlUtils';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [footerMenus, setFooterMenus] = useState<NavigationItem[]>([]);
  const { settings, loading } = useSettings();

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const navResult = await navigationService.getNavigationItems();
        if (navResult.success && navResult.data) {
          // 1. Build the tree for all footer items
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

          // 2. Sort roots and all children recursively
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

    // 1. If language is Vietnamese, priority 100% to the label from database (Admin)
    if (currentLang.startsWith('vi') && item.label) {
      // Special override for "Về VVC" to "Về Việt Vinh" as requested
      if (item.label.toLowerCase().trim() === 'về vvc') return 'Về Việt Vinh';
      return item.label;
    }

    // 2. Try translating the label directly for other languages (EN, etc.)
    if (item.label) {
      // Try direct label (case-sensitive)
      const translated = t(item.label);
      if (translated && translated !== item.label) {
        return translated;
      }
      
      // Try lowercase label (case-insensitive)
      const lowerTranslated = t(item.label.toLowerCase());
      if (lowerTranslated && lowerTranslated !== item.label.toLowerCase()) {
        return lowerTranslated;
      }
    }

    // 3. Map paths to keys (fallback)
    const pathToKeyMap: Record<string, string> = {
      '/': 'home',
      '/about': 'about',
      '/about-us': 'about',
      '/products': 'products',
      '/news': 'news',
      '/contact': 'contact',
      '/services': 'services',
      '/projects': 'projects',
      '/team': 'team',
      '/recruitment': 'recruitment',
      '/publications': 'publications',
      '/technologies': 'technologies',
      '/he-thong-tich-hop': 'integrated_systems',
      '/ho-so-nang-luc': 'capability_experience',
    };

    // 4. Map common semantic labels to keys (backup fallback)
    const labelToKeyMap: Record<string, string> = {
      'trang chủ': 'home',
      'về chúng tôi': 'about',
      'về vvc': 'about',
      'về việt vinh': 'about',
      'giới thiệu': 'about',
      'sản phẩm': 'products',
      'tin tức': 'news',
      'liên hệ': 'contact',
      'dịch vụ': 'services',
      'dự án': 'projects',
      'nguồn lực': 'team',
      'đội ngũ': 'team',
      'tuyển dụng': 'recruitment',
      'tài liệu': 'publications',
      'ấn phẩm': 'publications',
      'công nghệ': 'technologies',
      'khám phá': 'explore',
      'liên kết nhanh': 'quick_links',
      'quick links': 'quick_links',
      'hệ thống lạnh': 'industry_refrigeration_title',
      'hệ thống lạnh công nghiệp': 'industry_refrigeration_title',
      'tổng thầu cơ điện': 'industry_me_title',
      'cơ điện': 'industry_me_title',
      'trung tâm dữ liệu & quản lý tập trung': 'industry_dc_title',
      'hệ thống tích hợp': 'integrated_systems',
      'vòng đời dịch vụ': 'industry_lifecycle_title',
      'hồ sơ năng lực': 'capability_experience',
      'chính sách bảo mật': 'privacy_policy',
      'điều khoản sử dụng': 'terms_of_use',
      'chính sách cookie': 'cookie_policy',
      'sơ đồ trang': 'sitemap',
      'tư vấn kỹ thuật': 'technical_support',
      'bảo trì & sửa chữa': 'industry_lifecycle_title',
    };

    // Try path next
    if (item.path && pathToKeyMap[item.path]) {
      const key = pathToKeyMap[item.path];
      const translated = t(key);
      if (translated && translated !== key) return translated;
    }

    // Try normalized label map last
    const normalizedLabel = item.label?.toLowerCase().trim() || '';
    if (normalizedLabel && labelToKeyMap[normalizedLabel]) {
      const key = labelToKeyMap[normalizedLabel];
      const translated = t(key);
      if (translated && translated !== key) return translated;
    }

    return item.label;
  };

  const currentLang = i18n.language || 'vi';
  const isVi = currentLang.startsWith('vi');

  const getLocalizedSetting = (baseKey: string) => {
    if (isVi) return settings[baseKey];
    return settings[`${baseKey}_${currentLang}`] || settings[baseKey];
  };

  const copyrightText = getLocalizedSetting('copyright_text') || t('copyright');
  const contactEmail = settings['contact_email'] || 'info@VVC.com.vn';
  const contactAddress = getLocalizedSetting('contact_address') || t('contact_address_fallback');
  const siteDescription = getLocalizedSetting('site_description') || t('site_description_fallback');
  const siteLogo = settings['footer_logo'] || settings['site_logo'] || '/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png';

  if (loading) return <footer className="bg-primary text-white py-12"><div className="flex justify-center"><Loader2 className="animate-spin" /></div></footer>;

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Info & Socials */}
          <div>
            <div className="mb-4">
              <img
                src={siteLogo}
                alt="VVC Logo"
                className="h-16 object-contain"
              />
            </div>
            <p className="text-gray-300 mb-6">
              {siteDescription}
            </p>
            <div className="flex space-x-4">
              {settings['social_facebook'] && (
                <a href={settings['social_facebook']} className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} />
                </a>
              )}
              {settings['social_twitter'] && (
                <a href={settings['social_twitter']} className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                </a>
              )}
              {settings['social_linkedin'] && (
                <a href={settings['social_linkedin']} className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
              )}
              {settings['social_youtube'] && (
                <a href={settings['social_youtube']} className="text-gray-300 hover:text-white transition-colors" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Dynamic Columns from Menu Manager */}
          {footerMenus.map((menu) => (
            <div key={menu.id}>
              <h4 className="text-white font-semibold mb-4">{getTranslatedLabel(menu)}</h4>
              {menu.children && menu.children.length > 0 && (
                <ul className="space-y-2">
                  {menu.children.map((child) => (
                    <li key={child.id}>
                      {!isExternalLink(child.path) ? (
                        <Link to={normalizePath(child.path)} className="text-gray-300 hover:text-white transition-colors footer-link">
                          {getTranslatedLabel(child)}
                        </Link>
                      ) : (
                        <a href={child.path} className="text-gray-300 hover:text-white transition-colors footer-link" target="_blank" rel="noopener noreferrer">
                          {getTranslatedLabel(child)}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Fallback Static Columns if no footer menus exist (to prevent empty footer during migration) */}
          {footerMenus.length === 0 && (
            <>
              <div>
                <h4 className="text-white font-semibold mb-4">{t('quick_links')}</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="footer-link">{t('about')}</Link></li>
                  <li><Link to="/products" className="footer-link">{t('products')}</Link></li>
                  <li><Link to="/contact" className="footer-link">{t('contact')}</Link></li>
                </ul>
              </div>
            </>
          )}

          {/* Column 4: Contact Info (Always present) */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('contact')}</h4>
            <address className="not-italic text-gray-300 mb-4 space-y-2 whitespace-pre-line">
              {contactAddress}
            </address>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Mail size={16} className="mr-2" />
              {contactEmail}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            {copyrightText}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            {/* Dynamic legal links could be here, for now mapping standard legal pages */}
            <Link to="/legal/privacy" className="text-gray-300 hover:text-white footer-link">{t('privacy_policy')}</Link>
            <Link to="/legal/terms" className="text-gray-300 hover:text-white footer-link">{t('terms_of_use')}</Link>
            <Link to="/legal/cookies" className="text-gray-300 hover:text-white footer-link">{t('cookie_policy')}</Link>
            <Link to="/legal/sitemap" className="text-gray-300 hover:text-white footer-link">{t('sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
