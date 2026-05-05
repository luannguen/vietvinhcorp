import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import BackToTop from '../BackToTop';

// Loading component for Suspense
const PageLoader = () => {
  const siteAcronym = "VIET VINH";
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-6">
        <div className="text-4xl font-extrabold tracking-tighter text-primary animate-pulse">{siteAcronym}</div>
        <div className="w-10 h-10 border-3 border-primary/10 border-t-primary rounded-full animate-spin"></div>
        <p className="text-sm uppercase tracking-widest text-muted-foreground animate-pulse">Đang tải...</p>
      </div>
    </div>
  );
};

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default MainLayout;