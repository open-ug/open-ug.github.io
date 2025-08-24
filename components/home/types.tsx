/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Heart,
  Building,
  Users,
  Globe,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  MapPin,
  Zap,
  Shield,
  Smartphone,
  Wifi,
  GraduationCap,
  Stethoscope,
  Sprout,
  Car,
  Factory,
  Target,
} from "lucide-react";

const ProjectTypesSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const projectCategories = [
    {
      id: 0,
      title: "Community Impact",
      icon: <Heart className="w-8 h-8" />,
      description:
        "Solutions that directly address local challenges and improve daily life in African communities",
      color: "red",
      examples: [
        {
          name: "Healthcare Access",
          icon: <Stethoscope className="w-6 h-6" />,
          description:
            "Telemedicine platforms, health record systems, and diagnostic tools for remote areas",
          impact: "Serving 50K+ patients in rural Uganda",
        },
        {
          name: "Agricultural Innovation",
          icon: <Sprout className="w-6 h-6" />,
          description:
            "Crop monitoring, weather prediction, and market access platforms for smallholder farmers",
          impact: "Increased crop yields by 30% for 10K farmers",
        },
        {
          name: "Education Technology",
          icon: <GraduationCap className="w-6 h-6" />,
          description:
            "Offline learning platforms, local language content, and skills training systems",
          impact: "Reaching students in 200+ schools",
        },
        {
          name: "Transportation Solutions",
          icon: <Car className="w-6 h-6" />,
          description:
            "Public transport optimization, ride-sharing for rural areas, logistics platforms",
          impact: "Reducing commute times by 40% in Kampala",
        },
      ],
    },
    {
      id: 1,
      title: "Underserved Technology",
      icon: <Wifi className="w-8 h-8" />,
      description:
        "Bridging the digital divide with solutions for areas lacking technological infrastructure",
      color: "blue",
      examples: [
        {
          name: "Offline-First Applications",
          icon: <Smartphone className="w-6 h-6" />,
          description:
            "Apps that work without internet, sync when connected, designed for intermittent connectivity",
          impact: "Functioning in areas with <10% connectivity",
        },
        {
          name: "Low-Resource Computing",
          icon: <Zap className="w-6 h-6" />,
          description:
            "Lightweight software optimized for older devices and limited hardware resources",
          impact: "Running on devices 5+ years old",
        },
        {
          name: "Local Language Processing",
          icon: <Globe className="w-6 h-6" />,
          description:
            "NLP tools, translation systems, and voice interfaces for African languages",
          impact: "Supporting 15+ local languages",
        },
        {
          name: "Alternative Connectivity",
          icon: <Wifi className="w-6 h-6" />,
          description:
            "Mesh networks, SMS-based systems, and satellite communication tools",
          impact: "Connecting remote communities",
        },
      ],
    },
    {
      id: 2,
      title: "Commercial Open Source",
      icon: <Building className="w-8 h-8" />,
      description:
        "Sustainable business models built on open source foundations with clear commercial viability",
      color: "green",
      examples: [
        {
          name: "SaaS Platforms",
          icon: <Factory className="w-6 h-6" />,
          description:
            "Open core software with premium hosted services and enterprise features",
          impact: "Growing revenue while staying open",
        },
        {
          name: "API-First Products",
          icon: <Target className="w-6 h-6" />,
          description:
            "Open source tools with commercial API services, support, and integrations",
          impact: "Freemium model serving 1000+ developers",
        },
        {
          name: "Developer Tools",
          icon: <Lightbulb className="w-6 h-6" />,
          description:
            "Open source productivity tools with commercial licensing and enterprise support",
          impact: "Adopted by 50+ African companies",
        },
        {
          name: "Infrastructure Software",
          icon: <Shield className="w-6 h-6" />,
          description:
            "Open source infrastructure with managed services and professional support",
          impact: "Processing 1M+ transactions daily",
        },
      ],
    },
    {
      id: 3,
      title: "Foundation Track",
      icon: <Users className="w-8 h-8" />,
      description:
        "Projects with potential for adoption by major open source foundations and global communities",
      color: "purple",
      examples: [
        {
          name: "Developer Frameworks",
          icon: <Factory className="w-6 h-6" />,
          description:
            "Reusable libraries, frameworks, and tools that solve common development challenges",
          impact: "Used by 500+ developers globally",
        },
        {
          name: "Infrastructure Tools",
          icon: <Shield className="w-6 h-6" />,
          description:
            "Cloud-native tools, monitoring systems, and DevOps automation platforms",
          impact: "Deployed in 100+ production environments",
        },
        {
          name: "Data & Analytics",
          icon: <Target className="w-6 h-6" />,
          description:
            "Open source analytics, machine learning, and data processing platforms",
          impact: "Processing 10TB+ data monthly",
        },
        {
          name: "Security & Privacy",
          icon: <Shield className="w-6 h-6" />,
          description:
            "Privacy tools, security frameworks, and cryptographic solutions",
          impact: "Protecting 50K+ users globally",
        },
      ],
    },
  ];

  const supportCriteria = [
    {
      title: "Open Source First",
      description:
        "Core functionality must be open source with transparent development",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Local Impact",
      description:
        "Addresses real challenges faced by African communities or global underserved populations",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: "Technical Excellence",
      description:
        "Well-architected code, proper documentation, and sustainable development practices",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: "Community Potential",
      description:
        "Ability to attract contributors and build sustainable community around the project",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Scalable Vision",
      description:
        "Clear roadmap for growth, whether commercial success or foundation adoption",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      title: "Ugandan Connection",
      description:
        "Founded by Ugandan developers or addressing East African challenges",
      icon: <MapPin className="w-6 h-6" />,
    },
  ];

  const getColorClasses = (color: any, active = false) => {
    const colors = {
      red: active
        ? "border-red-600 bg-red-900/20 text-red-400"
        : "border-red-600/30 text-red-400/70",
      blue: active
        ? "border-blue-600 bg-blue-900/20 text-blue-400"
        : "border-blue-600/30 text-blue-400/70",
      green: active
        ? "border-green-600 bg-green-900/20 text-green-400"
        : "border-green-600/30 text-green-400/70",
      purple: active
        ? "border-purple-600 bg-purple-900/20 text-purple-400"
        : "border-purple-600/30 text-purple-400/70",
    };
    // @ts-ignore
    return colors[color] || colors.red;
  };

  const activeProject = projectCategories[activeCategory];

  return (
    <section className="bg-gray-950 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2 text-red-600" />
            Project Categories
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Types of Projects
            <span className="text-red-600 block">We Support</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            From community-focused solutions to commercial open source ventures,
            we accelerate projects that create meaningful impact for African
            communities and address the needs of technologically underserved
            populations worldwide.
          </p>
        </div>

        {/* Project Categories */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Category Selector */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6">
              Project Categories
            </h3>
            {projectCategories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`border-2 p-6 cursor-pointer transition-all duration-300 ${
                  activeCategory === index
                    ? getColorClasses(category.color, true) +
                      " transform scale-105"
                    : "border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 ${
                      activeCategory === index ? "bg-current/20" : "bg-gray-800"
                    }`}
                  >
                    <div
                      className={
                        activeCategory === index
                          ? "text-current"
                          : "text-gray-400"
                      }
                    >
                      {category.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4
                      className={`text-xl font-bold mb-2 ${
                        activeCategory === index
                          ? "text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {category.title}
                    </h4>
                    <p
                      className={`text-sm ${
                        activeCategory === index
                          ? "text-gray-200"
                          : "text-gray-400"
                      }`}
                    >
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Examples Display */}
          <div className="bg-black border border-gray-800 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div
                className={`p-2 ${getColorClasses(activeProject.color, true)}`}
              >
                {activeProject.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">
                {activeProject.title}
              </h3>
            </div>

            <p className="text-gray-400 mb-8">{activeProject.description}</p>

            <div className="space-y-6">
              {activeProject.examples.map((example, index) => (
                <div
                  key={index}
                  className="border border-gray-800 p-6 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-2 bg-gray-900 text-gray-400">
                      {example.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">
                        {example.name}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">
                        {example.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500"></div>
                        <span className="text-green-400 text-xs font-medium">
                          {example.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Criteria */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            What We Look For
          </h3>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Our acceptance criteria ensures we support projects with the
            greatest potential for sustainable growth and meaningful community
            impact.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCriteria.map((criteria, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 p-6 hover:border-red-600 transition-colors duration-300"
              >
                <div className="text-red-600 mb-4">{criteria.icon}</div>
                <h4 className="text-lg font-bold text-white mb-3">
                  {criteria.title}
                </h4>
                <p className="text-gray-400 text-sm">{criteria.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Path Forward */}
        <div className="bg-black border border-gray-800 p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Submit Your Project?
          </h3>
          <p className="text-gray-400 mb-8 max-w-3xl mx-auto">
            Whether you{"'"}re building the next breakthrough in agricultural
            technology, creating solutions for offline environments, or
            developing commercial open source products, we want to hear from
            you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-red-800 text-white px-8 py-4 font-medium hover:bg-red-700 transition-colors inline-flex items-center group">
              Submit Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-gray-700 text-white px-8 py-4 font-medium hover:bg-gray-900 transition-colors">
              View Application Guidelines
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 pt-8 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-2">48hrs</div>
              <div className="text-gray-500 text-sm">Initial Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">
                1-2 weeks
              </div>
              <div className="text-gray-500 text-sm">Technical Assessment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">
                30 days
              </div>
              <div className="text-gray-500 text-sm">Community Integration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                3+ months
              </div>
              <div className="text-gray-500 text-sm">Active Acceleration</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectTypesSection;
