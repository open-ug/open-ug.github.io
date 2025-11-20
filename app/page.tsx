"use client";
import AboutSection from "@/components/home/about";
import Hero from "@/components/home/Hero";
import ProjectsSection from "@/components/home/showcase";
import WhatWeDoSection from "@/components/home/whatwedo";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <WhatWeDoSection />
      <ProjectsSection />
    </>
  );
};

export default page;
