"use client";
import AboutSection from "@/app/about";
import Hero from "@/app/hero";
import React from "react";
import RoadmapSection from "./conveyotstack";
import Metrics from "./metrics";
import RecentPapers from "./papers";
import Community from "./community";
import { CTASection } from "./cta";
import PartnersSection from "./partners";
import Mesh from "./mesh";

const page = () => {
  return (
    <>
      <Hero />
      <Mesh />
      <AboutSection />
      <Metrics />
      <RecentPapers />
      <RoadmapSection />
      <Community />
      <PartnersSection />
      <CTASection />
    </>
  );
};

export default page;
