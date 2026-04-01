import { Link } from 'react-router-dom';
import { useSettings } from '@/hooks/useSettings';

interface LogoProps {
  isScrolled?: boolean;
}

const Logo = ({ isScrolled = false }: LogoProps) => {
  const { settings } = useSettings();
  const logoSrc = settings['site_logo'] || '/assets/svg/logo.svg';

  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={logoSrc}
        alt="VRC - Tổng công ty Kỹ thuật lạnh Việt Nam"
        className={`object-contain transition-all duration-300 ease-in-out ${
          isScrolled ? 'h-[60px]' : 'h-[100px]'
        }`}
      />
    </Link>
  );
};

export default Logo;