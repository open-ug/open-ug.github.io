"use client";
import HeroSection from "@/components/home/Hero";
import MissionVisionSection from "@/components/home/Mission";
import ProjectsSection from "@/components/home/Projects";
import React from "react";

const page = () => {
  return (
    <>
      <HeroSection />
      <MissionVisionSection />
      <ProjectsSection />
    </>
  );
};

export default page;
