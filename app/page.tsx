"use client";
import AboutSection from "@/app/about";
import Hero from "@/app/hero";
import ProjectsSection from "@/app/showcase";
import React from "react";
import RoadmapSection from "./conveyotstack";

const page = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <RoadmapSection />
    </>
  );
};

export default page;
