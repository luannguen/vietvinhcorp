import { Link } from 'react-router-dom';
import { useSettings } from '@/hooks/useSettings';

interface LogoProps {
  isScrolled?: boolean;
}

const Logo = ({ isScrolled = false }: LogoProps) => {
  const { settings } = useSettings();
  const logoSrc = settings['site_logo'] || '/assets/svg/logo.svg';

  return (
    <Link to="/" className="flex items-center gap-2 flex-shrink-0 relative z-10 transition-transform active:scale-95">
      <img
        src={logoSrc}
        alt="VVC - Tổng công ty Kỹ thuật lạnh Việt Nam"
        className={`object-contain transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'h-[40px] md:h-[60px]' 
            : 'h-[50px] md:h-[100px]'
        }`}
      />
    </Link>
  );
};

export default Logo;