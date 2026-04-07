import React from 'react';
import { FlowerCanvas } from './components/marina/FlowerCanvas';
import { Navbar } from './components/marina/Navbar';
import { ScrollExpandMedia } from './components/ui/scroll-expansion-hero';
import { Identity } from './components/marina/Identity';
import { PillarCards } from './components/marina/PillarCards';
import { TeamCarousel } from './components/marina/TeamCarousel';
import { Stats } from './components/marina/Stats';
import { CatalogoCTA } from './components/marina/CatalogoCTA';
import { OrcamentoSection } from './components/marina/OrcamentoSection';
import { GardenExperience } from './components/marina/GardenExperience';
import { Footer } from './components/marina/Footer';
import { ProductGallery } from './components/marina/ProductGallery';
import { CustomCursor } from './components/marina/CustomCursor';
import { FloatingWhatsapp } from './components/marina/FloatingWhatsapp';

export default function App() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#9C1C2B] selection:text-white">
      <CustomCursor />
      <FlowerCanvas />
      <Navbar />
      
      <main>
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc="https://6ccdt6flaq.ufs.sh/f/I5GNsgTLgHnDzITxInaEqaTxYyZ25UnjJoRQDBKvIGgwdkHz"
          bgImageSrc="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=1920"
          title="Flores que contam histórias."
          date="Desde 1990"
          scrollToExpand="Role para descobrir"
          textBlend={true}
        />
        
        <Identity />
        <PillarCards />
        <ProductGallery />
        <TeamCarousel />
        <Stats />
        <CatalogoCTA />
        <OrcamentoSection />
        <GardenExperience />
      </main>
      
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}
