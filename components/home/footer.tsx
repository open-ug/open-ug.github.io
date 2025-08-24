import React from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  ArrowRight,
  Code,
  Users,
  Calendar,
  Globe,
  Heart,
  Coffee,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        {
          name: "Project Acceleration",
          href: "#acceleration",
          icon: <Code className="w-4 h-4" />,
        },
        {
          name: "Infrastructure Support",
          href: "#infrastructure",
          icon: <Globe className="w-4 h-4" />,
        },
        {
          name: "Mentorship Programs",
          href: "#mentorship",
          icon: <Users className="w-4 h-4" />,
        },
        {
          name: "Community Building",
          href: "#community",
          icon: <MessageCircle className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Projects",
      links: [
        { name: "Sandbox Projects", href: "#sandbox" },
        { name: "Incubation Stage", href: "#incubation" },
        { name: "Graduated Projects", href: "#graduated" },
        { name: "Submit Your Project", href: "#submit" },
        { name: "Project Guidelines", href: "#guidelines" },
      ],
    },
    {
      title: "Community",
      links: [
        {
          name: "Events & Meetups",
          href: "#events",
          icon: <Calendar className="w-4 h-4" />,
        },
        { name: "Discord Community", href: "#discord", external: true },
        { name: "Mentorship Program", href: "#mentorship" },
        { name: "Summer of Code", href: "#summer-of-code" },
        { name: "University Partners", href: "#universities" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#docs" },
        { name: "Templates & Tools", href: "#templates" },
        { name: "Governance Guide", href: "#governance" },
        { name: "Foundation Pathway", href: "#foundations" },
        { name: "Blog & Updates", href: "#blog" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      href: "#github",
      followers: "2.5K",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      href: "#twitter",
      followers: "1.8K",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      href: "#linkedin",
      followers: "950",
    },
    {
      name: "Discord",
      icon: <MessageCircle className="w-6 h-6" />,
      href: "#discord",
      followers: "500+",
    },
  ];

  const partnerFoundations = [
    "Cloud Native Computing Foundation",
    "Apache Software Foundation",
    "Linux Foundation",
    "Eclipse Foundation",
    "OpenJS Foundation",
  ];

  const quickStats = [
    { label: "Active Projects", value: "25+" },
    { label: "Developers", value: "150+" },
    { label: "Events This Year", value: "45+" },
    { label: "Mentorship Sessions", value: "200+" },
  ];

  return (
    <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 45%, rgba(239, 68, 68, 0.1) 45%, rgba(239, 68, 68, 0.1) 55%, transparent 55%),
              linear-gradient(-45deg, transparent 45%, rgba(239, 68, 68, 0.1) 45%, rgba(239, 68, 68, 0.1) 55%, transparent 55%)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-800 to-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">UG</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    Open UG Labs
                  </div>
                  <div className="text-gray-400 text-sm">
                    Open Source Accelerator
                  </div>
                </div>
              </div>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Accelerating Uganda{"'"}s open source future by bridging local
                innovation with global foundations. From sandbox to graduation,
                we support developers in building software that serves both
                local and international communities.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {quickStats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-3 bg-gray-900 border border-gray-800"
                  >
                    <div className="text-lg font-bold text-red-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <div className="text-white font-medium mb-4">
                  Follow Our Journey
                </div>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="flex items-center justify-between p-3 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      {social.icon}
                      <span className="font-medium">{social.name}</span>
                    </div>
                    <div className="text-sm text-gray-600 group-hover:text-gray-400">
                      {social.followers}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-white font-bold mb-6">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="flex items-center text-gray-400 hover:text-white transition-colors group text-sm"
                          >
                            {link.icon && (
                              <span className="mr-2 text-red-600">
                                {link.icon}
                              </span>
                            )}
                            <span>{link.name}</span>
                            {link.external && (
                              <ExternalLink className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" />
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-12 border-t border-gray-800">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get monthly updates on new projects, events, and opportunities in
              Uganda{"'"}s open source ecosystem.
            </p>
          </div>

          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-gray-900 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
            />
            <button className="bg-red-800 text-white px-6 py-3 hover:bg-red-700 transition-colors flex items-center">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Foundation Partners */}
        <div className="py-12 border-t border-gray-800">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-white mb-4">
              Foundation Pathways
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              We prepare projects for adoption by these leading open source
              foundations
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {partnerFoundations.map((foundation, index) => (
              <div
                key={index}
                className="px-4 py-2 border border-gray-800 text-gray-500 text-sm hover:border-gray-700 hover:text-gray-400 transition-colors"
              >
                {foundation}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-12 border-t border-gray-800">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 bg-red-800 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Email</div>
                <div className="text-gray-400 text-sm">hello@openug.org</div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 bg-red-800 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Location</div>
                <div className="text-gray-400 text-sm">Kampala, Uganda</div>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 bg-red-800 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-medium">Office Hours</div>
                <div className="text-gray-400 text-sm">Sat 2-4 PM EAT</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              © {currentYear} Open UG Labs. Open source accelerator for East
              Africa.
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#privacy"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Terms of Use
              </a>
              <a
                href="#code-of-conduct"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Code of Conduct
              </a>
            </div>

            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-600" />
              <span>in Uganda</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
