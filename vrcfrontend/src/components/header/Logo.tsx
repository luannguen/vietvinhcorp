import { Link } from 'react-router-dom';
import { useSettings } from '@/hooks/useSettings';
import { useTranslation } from 'react-i18next';

interface LogoProps {
  isScrolled?: boolean;
}

const Logo = ({ isScrolled = false }: LogoProps) => {
  const { settings, loading } = useSettings();
  const { t } = useTranslation();
  
  if (loading && !settings['site_logo']) {
    return (
      <div className={`flex items-center flex-shrink-0 animate-pulse bg-gray-100 rounded-md ${
        isScrolled ? 'h-9 w-28' : 'h-11 w-36'
      }`}>
      </div>
    );
  }

  const logoSrc = settings['site_logo'] || '/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png';

  return (
    <Link 
      to="/" 
      className="flex items-center flex-shrink-0 relative z-10 transition-transform active:scale-95 py-0.5 overflow-hidden rounded-md"
    >
      <img
        src={logoSrc}
        alt={t('logo_alt_text', 'Viet Vinh Corporation')}
        className={`w-auto object-contain rounded transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'h-8 md:h-10 max-h-10' 
            : 'h-10 md:h-12 max-h-12'
        }`}
      />
    </Link>
  );
};

export default Logo;