import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import BackToTop from '../BackToTop';
import PageBreadcrumb from '../PageBreadcrumb';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageBreadcrumb />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default MainLayout;