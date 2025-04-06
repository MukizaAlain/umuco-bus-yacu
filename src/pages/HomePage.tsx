
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import PopularRoutes from '@/components/home/PopularRoutes';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Features />
      <PopularRoutes />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
}
