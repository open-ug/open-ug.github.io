import { FiGithub, FiCode, FiUsers } from "react-icons/fi";

export default function HeroSection() {
  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-100 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-black sm:text-5xl md:text-6xl">
                <span className="block">OPEN UG</span>
                <span className="block text-red-600 mt-2">
                  Open Source for Africa
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Building Foundational Open Source Software to support the Tech
                Ecosystem in Africa.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#projects"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                  >
                    <FiCode className="mr-2" />
                    Our Projects
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="https://github.com/open-ug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 md:py-4 md:text-lg md:px-10"
                  >
                    <FiGithub className="mr-2" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-gray-800 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <div className="text-center px-6">
            <div className="flex justify-center mb-6">
              <div className="bg-red-600 p-4 rounded-full">
                <FiUsers className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-white">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-bold text-xl mb-2">10+</h3>
                <p className="text-sm">Open Source Projects</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-bold text-xl mb-2">200+</h3>
                <p className="text-sm">Contributors</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-bold text-xl mb-2">5+</h3>
                <p className="text-sm">African Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
