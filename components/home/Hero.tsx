import React, { useState, useEffect } from "react";
import { Github, ArrowRight, Code, Users, Rocket } from "lucide-react";

const HeroSection = () => {
  const [animatedText, setAnimatedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const codeSnippets = [
    "// Building the future of OSS in East Africa",
    "function accelerateProject() {",
    "  return innovation + community + mentorship;",
    "}",
    "",
    "const ugandanDevelopers = await getNextGeneration();",
    "export { talent, creativity, determination };",
    "",
    "# From Kampala to Global Foundations",
    'git commit -m "Empowering local talent"',
    "git push origin uganda-to-world",
  ];

  const floatingElements = [
    { id: 1, symbol: "{", delay: 0, duration: 6000 },
    { id: 2, symbol: "}", delay: 1000, duration: 7000 },
    { id: 3, symbol: "<>", delay: 2000, duration: 8000 },
    { id: 4, symbol: "/>", delay: 3000, duration: 6500 },
    { id: 5, symbol: "[]", delay: 4000, duration: 7500 },
    { id: 6, symbol: "()", delay: 5000, duration: 6800 },
    { id: 7, symbol: "=>", delay: 1500, duration: 7200 },
    { id: 8, symbol: "&&", delay: 3500, duration: 6300 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < codeSnippets.length) {
        const currentSnippet = codeSnippets[currentIndex];
        if (animatedText.length < currentSnippet.length) {
          setAnimatedText(currentSnippet.slice(0, animatedText.length + 1));
        } else {
          setCurrentIndex(currentIndex + 1);
          setAnimatedText("");
        }
      } else {
        setCurrentIndex(0);
        setAnimatedText("");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [animatedText, currentIndex]);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Floating Code Elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute text-red-800 text-2xl font-mono opacity-20 pointer-events-none select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${element.duration}ms ease-in-out infinite ${element.delay}ms`,
            }}
          >
            {element.symbol}
          </div>
        ))}

        {/* Binary Rain Effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-900 text-xs font-mono opacity-10"
              style={{
                left: `${i * 5}%`,
                animation: `binaryRain ${8000 + i * 200}ms linear infinite ${
                  i * 400
                }ms`,
              }}
            >
              {"10110101".split("").map((bit, index) => (
                <div key={index} className="mb-4">
                  {bit}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Animated Code Block */}
      <div className="absolute top-20 right-10 w-96 h-64 bg-gray-900 border border-gray-800 font-mono text-sm text-green-400 p-4 opacity-40 hidden lg:block">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-red-500 mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 bg-green-500 mr-2"></div>
          <span className="text-gray-500 text-xs ml-2">open-ug-labs.js</span>
        </div>
        <div className="whitespace-pre-wrap">
          {codeSnippets.slice(0, currentIndex).join("\n")}
          {animatedText && (
            <span>
              {animatedText}
              <span className="animate-pulse bg-green-400 w-2 h-5 inline-block ml-1"></span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-700 text-gray-300 text-sm font-medium mb-8">
            <Code className="w-4 h-4 mr-2 text-red-600" />
            Open Source • East Africa • Global Impact
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Accelerating
            <span className="block text-red-600">Uganda{"'"}s</span>
            <span className="block">Open Source</span>
            <span className="block text-gray-400 text-3xl md:text-4xl font-normal mt-2">
              Future
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
            From prototype to production, from local innovation to global
            foundations. We bridge the gap between brilliant Ugandan developers
            and the world{"'"}s most prestigious open source ecosystems.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-800 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">3 Stages</div>
                <div className="text-gray-400 text-sm">
                  Sandbox → Incubation → Graduation
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-800 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Community</div>
                <div className="text-gray-400 text-sm">Mentorship & Growth</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="bg-red-800 text-white px-8 py-4 font-medium hover:bg-red-700 transition-colors inline-flex items-center group">
              Submit Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="border border-gray-700 text-white px-8 py-4 font-medium hover:bg-gray-900 transition-colors inline-flex items-center">
              <Github className="w-5 h-5 mr-2" />
              Explore Projects
            </button>
          </div>

          {/* Foundation Logos Placeholder */}
          <div className="text-gray-500 text-sm mb-4">
            Preparing projects for adoption by:
          </div>
          <div className="flex items-center space-x-8 text-gray-600 text-sm font-medium">
            <span className="border border-gray-800 px-4 py-2">CNCF</span>
            <span className="border border-gray-800 px-4 py-2">
              Apache Foundation
            </span>
            <span className="border border-gray-800 px-4 py-2">
              Linux Foundation
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.3;
          }
        }

        @keyframes binaryRain {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
