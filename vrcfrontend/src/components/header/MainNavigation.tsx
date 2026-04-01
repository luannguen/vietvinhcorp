import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navigationService } from '@/services/navigationService';
import { NavigationItem } from '@/components/data/types';

interface MainNavigationProps {
  isMobile?: boolean;
}

const MainNavigation = ({ isMobile = false }: MainNavigationProps) => {
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const fetchNav = async () => {
      setIsLoading(true);
      const result = await navigationService.getNavigationItems();
      if (result.success && result.data.length > 0) {
        const headerItems = result.data.filter(item => item.position === 'header' || !item.position);
        setNavItems(headerItems);
      }
      setIsLoading(false);
    };

    fetchNav();
  }, []);

  const getTranslatedLabel = (item: NavigationItem) => {
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
    };

    if (item.path && pathToKeyMap[item.path]) {
      return t(pathToKeyMap[item.path]);
    }

    return item.label;
  };

  /** Check if a nav item matches the current route */
  const isActive = (item: NavigationItem): boolean => {
    const currentPath = location.pathname;
    
    // Exact match for home
    if (item.path === '/') {
      return currentPath === '/';
    }
    
    // Prefix match for other routes (e.g. /products matches /products/industrial)
    if (item.path) {
      return currentPath === item.path || currentPath.startsWith(item.path + '/');
    }

    // Check children
    if (item.children && item.children.length > 0) {
      return item.children.some(child => 
        currentPath === child.path || currentPath.startsWith(child.path + '/')
      );
    }
    
    return false;
  };

  if (isLoading) {
    return null;
  }

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <div key={item.id}>
            <Link
              to={item.path}
              className={`navbar-link text-lg block py-1 ${
                isActive(item) ? 'text-secondary font-bold border-b-2 border-secondary' : ''
              }`}
            >
              {getTranslatedLabel(item)}
            </Link>
            {item.children && item.children.length > 0 && (
              <div className="pl-4 space-y-2 mt-2 border-l border-gray-200">
                {item.children.map(child => (
                  <Link
                    key={child.id}
                    to={child.path}
                    className={`hover:text-primary block text-base ${
                      isActive(child) ? 'text-primary font-semibold' : 'text-muted-foreground'
                    }`}
                  >
                    {getTranslatedLabel(child)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <div key={item.id} className="relative group">
          {item.children && item.children.length > 0 ? (
            <>
              <button
                className={`navbar-link text-base font-medium flex items-center relative pb-1 ${
                  isActive(item) ? 'text-secondary' : ''
                }`}
              >
                <span>{getTranslatedLabel(item)}</span>
                <ChevronDown size={16} className="ml-1" />
                {isActive(item) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary rounded-full" />
                )}
              </button>
              <div className="absolute hidden group-hover:block bg-white/95 backdrop-blur-sm shadow-lg p-4 rounded min-w-48 right-0 top-full z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex flex-col space-y-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.id}
                      to={child.path}
                      className={`hover:text-primary transition-colors text-sm font-medium py-1 ${
                        isActive(child) ? 'text-primary font-bold' : 'text-gray-600'
                      }`}
                    >
                      {getTranslatedLabel(child)}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Link
              to={item.path}
              className={`navbar-link text-base font-medium relative pb-1 ${
                isActive(item) ? 'text-secondary' : ''
              }`}
            >
              {getTranslatedLabel(item)}
              {isActive(item) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary rounded-full" />
              )}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default MainNavigation;