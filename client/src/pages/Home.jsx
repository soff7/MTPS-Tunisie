import Hero from '../components/Hero';
import Services from './Services';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;