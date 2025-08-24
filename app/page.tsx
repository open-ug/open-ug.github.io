"use client";
import AboutSection from "@/components/home/about";
import HeroSection from "@/components/home/Hero";
import ProjectTypesSection from "@/components/home/types";
import React from "react";

const page = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectTypesSection />
      {/*<ProjectsShowcase />
      <CommunitySection />*/}
    </>
  );
};

export default page;
