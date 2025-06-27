import Image from "next/image";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Header from './components/Header';
export default function Home() {
  return (
  <div className="min-h-screen"> 
    <Header />
    <Hero />
    <Footer />
  </div>
  );
}
