"use client";
import AboutSection from "@/components/home/about";
import CommunitySection from "@/components/home/community";
import Footer from "@/components/home/footer";
import HeroSection from "@/components/home/Hero";
import MissionVisionSection from "@/components/home/Mission";
import ProjectsSection from "@/components/home/Projects";
import ProjectsShowcase from "@/components/home/showcase";
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
