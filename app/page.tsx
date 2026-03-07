"use client";
import AboutSection from "@/app/about";
import Hero from "@/app/hero";
import React from "react";
import RoadmapSection from "./conveyotstack";
import Metrics from "./metrics";
import RecentPapers from "./papers";
import Community from "./community";
import { CTASection } from "./cta";

const page = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <Metrics />
      <RecentPapers />
      <RoadmapSection />
      <Community />
      <CTASection />
    </>
  );
};

export default page;
