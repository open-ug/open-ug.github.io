import React, { useState, useEffect } from "react";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Users,
  Calendar,
  Code,
  Award,
  Rocket,
  Filter,
  Search,
  ArrowRight,
} from "lucide-react";

const ProjectsShowcase = () => {
  const [activeStage, setActiveStage] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Mock project data
  const projects = [
    {
      id: 1,
      name: "UgandaWeather API",
      description:
        "Real-time weather data API for Uganda with historical data and forecasting capabilities.",
      stage: "graduation",
      language: "Python",
      stars: 89,
      forks: 23,
      contributors: 8,
      lastUpdate: "2024-08-15",
      category: "API",
      maintainer: "John Ssemakula",
      foundation: "In review with Linux Foundation",
      tags: ["API", "Weather", "Data", "Flask"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 2,
      name: "Kampala Transit",
      description:
        "Open source public transport tracking system for Kampala's matatu network.",
      stage: "incubation",
      language: "JavaScript",
      stars: 156,
      forks: 34,
      contributors: 12,
      lastUpdate: "2024-08-20",
      category: "Mobile App",
      maintainer: "Sarah Nakato",
      tags: ["Transport", "Mobile", "React Native", "Maps"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 3,
      name: "UG-Pay SDK",
      description:
        "Payment gateway SDK for Ugandan financial services with mobile money integration.",
      stage: "incubation",
      language: "TypeScript",
      stars: 67,
      forks: 18,
      contributors: 6,
      lastUpdate: "2024-08-18",
      category: "SDK",
      maintainer: "David Mukasa",
      tags: ["Payments", "SDK", "Mobile Money", "FinTech"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 4,
      name: "LugandaNLP",
      description:
        "Natural Language Processing toolkit for Luganda language processing and translation.",
      stage: "sandbox",
      language: "Python",
      stars: 34,
      forks: 8,
      contributors: 3,
      lastUpdate: "2024-08-12",
      category: "ML/AI",
      maintainer: "Grace Namukasa",
      tags: ["NLP", "AI", "Luganda", "Translation"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 5,
      name: "UgandaGeoAPI",
      description:
        "Comprehensive geographical data API covering Uganda's districts, counties, and subcounties.",
      stage: "graduation",
      language: "Go",
      stars: 112,
      forks: 28,
      contributors: 7,
      lastUpdate: "2024-08-22",
      category: "API",
      maintainer: "Robert Kiggundu",
      foundation: "Apache Foundation pipeline",
      tags: ["Geography", "API", "Data", "Government"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 6,
      name: "EduTrack Uganda",
      description:
        "Student management system designed for Ugandan educational institutions.",
      stage: "sandbox",
      language: "PHP",
      stars: 22,
      forks: 5,
      contributors: 2,
      lastUpdate: "2024-08-10",
      category: "Web App",
      maintainer: "Peter Walusimbi",
      tags: ["Education", "Management", "Laravel", "Schools"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ];

  const stages = [
    {
      key: "all",
      label: "All Projects",
      count: projects.length,
      color: "gray",
    },
    {
      key: "sandbox",
      label: "Sandbox",
      count: projects.filter((p) => p.stage === "sandbox").length,
      color: "yellow",
    },
    {
      key: "incubation",
      label: "Incubation",
      count: projects.filter((p) => p.stage === "incubation").length,
      color: "blue",
    },
    {
      key: "graduation",
      label: "Graduation",
      count: projects.filter((p) => p.stage === "graduation").length,
      color: "green",
    },
  ];

  useEffect(() => {
    let filtered = projects;

    if (activeStage !== "all") {
      filtered = filtered.filter((project) => project.stage === activeStage);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredProjects(filtered);
  }, [activeStage, searchTerm]);

  const getStageColor = (stage) => {
    const colors = {
      sandbox: "border-yellow-600 bg-yellow-900/10 text-yellow-400",
      incubation: "border-blue-600 bg-blue-900/10 text-blue-400",
      graduation: "border-green-600 bg-green-900/10 text-green-400",
    };
    return colors[stage] || "border-gray-600 bg-gray-900/10 text-gray-400";
  };

  const getStageIcon = (stage) => {
    const icons = {
      sandbox: <Code className="w-4 h-4" />,
      incubation: <Rocket className="w-4 h-4" />,
      graduation: <Award className="w-4 h-4" />,
    };
    return icons[stage] || <Code className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 30%, rgba(239, 68, 68, 0.1) 30%, rgba(239, 68, 68, 0.1) 70%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(59, 130, 246, 0.1) 30%, rgba(59, 130, 246, 0.1) 70%, transparent 70%)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium mb-6">
            <Github className="w-4 h-4 mr-2 text-red-600" />
            Open Source Projects
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Showcasing
            <span className="text-red-600 block">Uganda's</span>
            Open Source Innovation
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            From early-stage prototypes to foundation-ready projects, discover
            the diverse ecosystem of Ugandan open source software making a
            global impact.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          {/* Stage Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {stages.map((stage) => (
              <button
                key={stage.key}
                onClick={() => setActiveStage(stage.key)}
                className={`px-6 py-3 border-2 font-medium transition-all duration-300 ${
                  activeStage === stage.key
                    ? "border-red-600 bg-red-900/20 text-white"
                    : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>{stage.label}</span>
                  <span className="bg-gray-800 px-2 py-1 text-xs">
                    {stage.count}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects, tags, or languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bg-gray-950 border border-gray-800 hover:border-gray-700 transition-all duration-300 transform hover:scale-105 group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Project Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {project.name}
                  </h3>
                  <div
                    className={`px-3 py-1 border text-xs font-medium flex items-center space-x-1 ${getStageColor(
                      project.stage
                    )}`}
                  >
                    {getStageIcon(project.stage)}
                    <span>{project.stage}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Code className="w-4 h-4" />
                    <span>{project.language}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(project.lastUpdate)}</span>
                  </span>
                </div>
              </div>

              {/* Project Stats */}
              <div className="p-6 border-b border-gray-800">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                      <Star className="w-4 h-4" />
                      <span className="font-bold text-white">
                        {project.stars}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Stars</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                      <GitFork className="w-4 h-4" />
                      <span className="font-bold text-white">
                        {project.forks}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Forks</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="font-bold text-white">
                        {project.contributors}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Contributors</div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Maintained by
                  </div>
                  <div className="text-white font-medium">
                    {project.maintainer}
                  </div>
                </div>

                {project.foundation && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">
                      Foundation Status
                    </div>
                    <div className="text-green-400 text-sm font-medium">
                      {project.foundation}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-800 text-gray-400 text-xs border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={project.githubUrl}
                    className="flex-1 bg-gray-800 text-white py-2 px-4 hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    className="flex-1 bg-red-800 text-white py-2 px-4 hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No projects found</div>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-red-800 text-white px-8 py-4 font-medium hover:bg-red-700 transition-colors inline-flex items-center group">
            Submit Your Project
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsShowcase;
