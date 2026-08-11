"use client";
import AboutSection from "@/app/about";
import Hero from "@/app/hero";
import Metrics from "./metrics";
import Community from "./community";
import { CTASection } from "./cta";
import Mesh from "./mesh";

const page = () => {
  return (
    <>
      <Hero />
      <Mesh />
      <AboutSection />
      <Metrics />
      <Community />
      <CTASection />
    </>
  );
};

export default page;
