import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { ROUTES } from './lib/routes';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AboutKalarika from './pages/about/AboutKalarika';
import ArtisanCollective from './pages/about/ArtisanCollective';
import SocialImpact from './pages/about/SocialImpact';
import Gallery from './pages/works/Gallery';
import Weddings from './pages/works/Weddings';
import WeddingStory from './pages/works/WeddingStory';
import Services from './pages/services/Services';
import CompletePackage from './pages/services/CompletePackage';
import PlanWedding from './pages/plan/PlanWedding';
import Questionnaire from './pages/plan/Questionnaire';
import PlanResult from './pages/plan/PlanResult';
import Contact from './pages/contact/Contact';
import Blogs from './pages/blogs/Blogs';
import Careers from './pages/careers/Careers';
import CareerDetail from './pages/careers/CareerDetail';
import ArtisanSteps from './pages/careers/ArtisanSteps';
import ArtisanEnroll from './pages/careers/ArtisanEnroll';
import Login from './pages/account/Login';
import Dashboard from './pages/account/Dashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.aboutKalarika} element={<AboutKalarika />} />
        <Route path={ROUTES.artisanCollective} element={<ArtisanCollective />} />
        <Route path={ROUTES.socialImpact} element={<SocialImpact />} />
        <Route path={ROUTES.gallery} element={<Gallery />} />
        <Route path={ROUTES.weddings} element={<Weddings />} />
        <Route path={ROUTES.weddingStory} element={<WeddingStory />} />
        <Route path={ROUTES.services} element={<Services />} />
        <Route path={ROUTES.completePackage} element={<CompletePackage />} />
        <Route path={ROUTES.planWedding} element={<PlanWedding />} />
        <Route path={ROUTES.questionnaire} element={<Questionnaire />} />
        <Route path={ROUTES.planResult} element={<PlanResult />} />
        <Route path={ROUTES.contact} element={<Contact />} />
        <Route path={ROUTES.blogs} element={<Blogs />} />
        <Route path={ROUTES.careers} element={<Careers />} />
        <Route path={ROUTES.careerDetail} element={<CareerDetail />} />
        <Route path={ROUTES.artisanSteps} element={<ArtisanSteps />} />
        <Route path={ROUTES.artisanEnroll} element={<ArtisanEnroll />} />
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.account} element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
