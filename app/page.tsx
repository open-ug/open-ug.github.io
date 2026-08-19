"use client";
import AboutSection from "@/app/about";
import Hero from "@/app/hero";
import Metrics from "./metrics";
import Community from "./community";
import { CTASection } from "./cta";
import Mesh from "./mesh";
import ProjectsSection from "./showcase";

const page = () => {
  return (
    <>
      <Hero />
      <Mesh />
      <AboutSection />
      <ProjectsSection />
      <Metrics />
      <Community />
      <CTASection />
    </>
  );
};

export default page;
