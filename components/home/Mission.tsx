import {
  FiTarget,
  FiEye,
  FiMapPin,
  FiUsers,
  FiServer,
  FiGlobe,
} from "react-icons/fi";

export default function MissionVisionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
            Our Purpose & Direction
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Building the foundation for Africas digital future through open
            source innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Mission Section */}
          <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-red-600 p-3 rounded-full mr-4">
                  <FiTarget className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black">Our Mission</h3>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                To build and promote foundational open source software that
                empowers developers, supports innovation, and strengthens the
                technology ecosystem across Africa, starting from Uganda. We aim
                to foster collaboration, skill development, and digital
                sovereignty through accessible and community-driven software
                tools.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiServer className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-black">
                      Build Software
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Creating foundational tools
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiUsers className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-black">
                      Empower Developers
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Fostering skill development
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiMapPin className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-black">
                      Local Focus
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Starting from Uganda
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-400 p-3 rounded-full mr-4">
                  <FiEye className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">Our Vision</h3>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                To position Africa as a global leader in open source innovation
                by nurturing a vibrant, self-sustaining community that creates
                impactful software solutions for local and global challenges.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiGlobe className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-black">
                      Global Impact
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Africa-led solutions
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiUsers className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-black">
                      Community-Driven
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Self-sustaining ecosystem
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiServer className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-black">
                      Local Solutions
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Addressing unique challenges
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#join-us"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Join Our Community
          </a>
        </div>
      </div>
    </section>
  );
}
