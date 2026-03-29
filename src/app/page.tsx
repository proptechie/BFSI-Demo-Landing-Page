"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import UseCasesSection from "@/components/UseCasesSection";
import OptInModal from "@/components/OptInModal";
import CallGallerySection from "@/components/CallGallerySection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar />

      <main>
        <Hero onGetStarted={() => setModalOpen(true)} />
        <TrustedBy />
        <UseCasesSection onGetStarted={() => setModalOpen(true)} />
        <CallGallerySection />
        <FinalCTA />
      </main>

      <Footer />

      <OptInModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
