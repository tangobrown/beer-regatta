import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import Welcome from "@/components/home/Welcome";
import Facts from "@/components/home/Facts";
import WhatsOn from "@/components/home/WhatsOn";
import Gallery from "@/components/home/Gallery";
import BeerVillage from "@/components/home/BeerVillage";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Welcome />
        <Facts />
        <WhatsOn />
        <Gallery />
        <BeerVillage />
        <Contact />
      </main>
    </div>
  );
}
