import { Suspense, lazy, useEffect, useState } from "react";
import Loader from "./components/ui/Loader";
import CustomCursor from "./components/ui/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingButtons from "./components/layout/FloatingButtons";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Projects from "./components/sections/Projects";
import Process from "./components/sections/Process";
import Statistics from "./components/sections/Statistics";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import useLenis from "./hooks/useLenis";

const Testimonials = lazy(() => import("./components/sections/Testimonials"));
const Certifications = lazy(() => import("./components/sections/Certifications"));

function App() {
  const [loading, setLoading] = useState(true);

  useLenis();

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Suspense fallback={null}>
          <Certifications />
        </Suspense>
        <Projects />
        <Process />
        <Statistics />
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default App;
