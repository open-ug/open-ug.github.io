import React, { useState, useEffect, useRef } from "react";
import {
  Rocket,
  Users,
  Code,
  Globe,
  ArrowRight,
  CheckCircle,
  GitBranch,
  Shield,
  Zap,
  Target,
} from "lucide-react";

const AboutSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const services = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Project Acceleration",
      description:
        "Technical and community readiness assessments with roadmaps to reach foundation standards.",
      details: [
        "Code quality evaluation",
        "Security posture review",
        "Contributor process setup",
        "Release automation",
      ],
      color: "red",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Infrastructure Support",
      description:
        "Lightweight hosting, CI/CD runners, container registry access, and documentation hosting.",
      details: [
        "GitHub organization hosting",
        "Shared CI/CD resources",
        "Static website hosting",
        "Container registry access",
      ],
      color: "blue",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Mentorship & Growth",
      description:
        "Pairing maintainers with experienced mentors and contributor onboarding programs.",
      details: [
        "Monthly office hours",
        "Code review sessions",
        "OSS bootcamps",
        "Student intern programs",
      ],
      color: "green",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Foundation Pathway",
      description:
        "Gap analysis and application preparation for global foundations like CNCF, Apache, and Linux Foundation.",
      details: [
        "Requirements gap analysis",
        "Application documentation",
        "Foundation introductions",
        "Advocacy support",
      ],
      color: "purple",
    },
  ];

  const stats = [
    { number: "3", label: "Stage Process", subtitle: "Sandbox to Graduation" },
    { number: "∞", label: "Open Source", subtitle: "Always Free & Open" },
    { number: "🇺🇬", label: "Uganda First", subtitle: "Global Reach" },
    { number: "24/7", label: "Community", subtitle: "Support & Mentorship" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      red: "border-red-600 bg-red-900/20 text-red-400",
      blue: "border-blue-600 bg-blue-900/20 text-blue-400",
      green: "border-green-600 bg-green-900/20 text-green-400",
      purple: "border-purple-600 bg-purple-900/20 text-purple-400",
    };
    return colors[color] || colors.red;
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gray-950 py-20 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2 text-red-600" />
            Our Mission
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Bridging Local
            <span className="text-red-600 block">Innovation</span>
            to Global Impact
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            We provide the infrastructure, mentorship, and pathways needed to
            transform promising Ugandan open source projects into globally
            recognized, foundation-ready software that serves both local and
            international communities.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-black border border-gray-800 p-6 text-center transform transition-all duration-1000 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                {stat.number}
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Service Cards */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Zap className="w-8 h-8 text-red-600 mr-3" />
              Core Services
            </h3>

            {services.map((service, index) => (
              <div
                key={index}
                className={`border-2 p-6 cursor-pointer transition-all duration-500 ${
                  activeService === index
                    ? `${getColorClasses(
                        service.color
                      )} shadow-lg transform scale-105`
                    : "border-gray-800 bg-gray-900/20 hover:border-gray-700"
                }`}
                onClick={() => setActiveService(index)}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 ${
                      activeService === index ? "bg-current/20" : "bg-gray-800"
                    }`}
                  >
                    <div
                      className={
                        activeService === index
                          ? "text-current"
                          : "text-gray-400"
                      }
                    >
                      {service.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4
                      className={`text-xl font-bold mb-2 ${
                        activeService === index ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {service.title}
                    </h4>
                    <p
                      className={`mb-4 ${
                        activeService === index
                          ? "text-gray-200"
                          : "text-gray-400"
                      }`}
                    >
                      {service.description}
                    </p>

                    {activeService === index && (
                      <div className="space-y-2 animate-fadeIn">
                        {service.details.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4 text-current" />
                            <span className="text-sm text-gray-300">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeService === index
                        ? "rotate-90 text-current"
                        : "text-gray-600"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Process Visualization */}
          <div className="bg-black border border-gray-800 p-8">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <GitBranch className="w-6 h-6 text-red-600 mr-3" />
              Project Journey
            </h3>

            <div className="space-y-8">
              {/* Stage 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-800 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Sandbox</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Validate idea and initial codebase
                  </p>
                  <div className="text-xs text-gray-500">
                    Prototype • Basic README • 1-2 Contributors
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-px h-8 bg-gray-700"></div>
              </div>

              {/* Stage 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-700 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Incubation
                  </h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Grow contributors & produce regular releases
                  </p>
                  <div className="text-xs text-gray-500">
                    Active Community • CI/CD • Release Cadence
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="w-px h-8 bg-gray-700"></div>
              </div>

              {/* Stage 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Graduation
                  </h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Ready for foundation adoption
                  </p>
                  <div className="text-xs text-gray-500">
                    Governance • Multiple Maintainers • Foundation Ready
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <button className="w-full bg-red-800 text-white py-3 font-medium hover:bg-red-700 transition-colors flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
