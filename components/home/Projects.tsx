import {
  FiGithub,
  FiCode,
  FiLock,
  FiDollarSign,
  FiLayers,
  FiArrowRight,
  FiBox,
} from "react-icons/fi";

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Conveyor CI",
      description:
        "A software framework for building CI/CD Platforms and Tools",
      icon: <FiLayers className="h-6 w-6" />,
      color: "bg-red-600",
      link: "https://conveyor.open.ug",
    },
    {
      id: 2,
      title: "Orbiton JS",
      description: "A JavaScript library for building Browser User Interfaces",
      icon: <FiCode className="h-6 w-6" />,
      color: "bg-yellow-400",
      textColor: "text-black",
      link: "https://orbiton.js.org",
    },
    {
      id: 3,
      title: "Post Quantum TLS",
      description:
        "A TLS Protocol implementation that provides post quantum security",
      icon: <FiLock className="h-6 w-6" />,
      color: "bg-red-600",
      link: "https://github.com/open-ug",
    },
    {
      id: 4,
      title: "UG Mobile Money",
      description:
        "A Python library for making mobile money transactions in Uganda",
      icon: <FiDollarSign className="h-6 w-6" />,
      color: "bg-yellow-400",
      textColor: "text-black",
      link: "https://github.com/open-ug/ugmobilemoney-py",
    },
  ];

  return (
    <section id="projects" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-red-100 px-4 py-2 rounded-full text-red-600 mb-5">
            <FiBox className="mr-2" />
            <span className="text-sm font-semibold">
              Open Source Innovation
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
            Our Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Foundational open source software that powers Africas tech ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div
                      className={`${project.color} ${
                        project.textColor || "text-white"
                      } p-3 rounded-full mr-4`}
                    >
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-black">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 mb-8">{project.description}</p>
                </div>

                <div className="mt-auto p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      View Project
                      <FiArrowRight className="ml-2 h-4 w-4" />
                    </a>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black"
                    >
                      <FiGithub className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#all-projects"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          >
            View All Projects
            <FiArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
