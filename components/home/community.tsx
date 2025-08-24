/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  MapPin,
  Clock,
  User,
  GraduationCap,
  MessageCircle,
  Coffee,
  Award,
  Github,
  Twitter,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CommunitySection = () => {
  const [activeEventTab, setActiveEventTab] = useState("upcoming");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const upcomingEvents = [
    {
      id: 1,
      title: "Open Source Fundamentals Workshop",
      date: "2024-09-15",
      time: "2:00 PM - 6:00 PM",
      location: "Makerere University, Kampala",
      type: "Workshop",
      attendees: 45,
      description: "Learn Git, GitHub, and open source contribution workflows",
      status: "Open Registration",
      image: "workshop",
    },
    {
      id: 2,
      title: "Monthly Maintainers Meetup",
      date: "2024-09-22",
      time: "6:00 PM - 8:00 PM",
      location: "Outbox Hub, Kampala",
      type: "Meetup",
      attendees: 28,
      description: "Project updates, networking, and collaborative discussions",
      status: "RSVP Required",
      image: "meetup",
    },
    {
      id: 3,
      title: "Open UG Summit 2024",
      date: "2024-10-12",
      time: "9:00 AM - 5:00 PM",
      location: "Serena Hotel, Kampala",
      type: "Conference",
      attendees: 200,
      description:
        "Annual showcase of graduated projects and foundation partnerships",
      status: "Early Bird",
      image: "conference",
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Summer of Code Kickoff",
      date: "2024-06-01",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual",
      type: "Launch Event",
      attendees: 85,
      description: "Launched our first Summer of Code program with 20 students",
      image: "virtual",
    },
    {
      id: 5,
      title: "DevFest Kampala 2024",
      date: "2024-05-18",
      time: "9:00 AM - 6:00 PM",
      location: "Innovation Village",
      type: "Conference",
      attendees: 150,
      description: "Open UG Labs track featuring project showcases",
      image: "devfest",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Nakato",
      role: "Maintainer, Kampala Transit",
      avatar: "👩‍💻",
      quote:
        "Open UG Labs transformed my side project into a real solution for our city. The mentorship and infrastructure support were game-changing.",
      project: "Kampala Transit",
    },
    {
      name: "David Mukasa",
      role: "Student Developer",
      avatar: "👨‍🎓",
      quote:
        "The Summer of Code program gave me my first taste of real open source contribution. Now I'm a core contributor to three projects!",
      project: "UG-Pay SDK",
    },
    {
      name: "Grace Namukasa",
      role: "ML Engineer",
      avatar: "👩‍🔬",
      quote:
        "The community here understands the unique challenges of building tech for Uganda. The support has been incredible.",
      project: "LugandaNLP",
    },
    {
      name: "Robert Kiggundu",
      role: "Senior Developer",
      avatar: "👨‍💼",
      quote:
        "From prototype to Apache Foundation pipeline - Open UG Labs made it possible. The pathway to global foundations is real.",
      project: "UgandaGeoAPI",
    },
  ];

  const communityStats = [
    {
      number: "150+",
      label: "Active Developers",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "25+",
      label: "Monthly Events",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      number: "40+",
      label: "Mentors",
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      number: "12",
      label: "University Partners",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const mentorshipPrograms = [
    {
      title: "1-on-1 Mentorship",
      description:
        "Paired with experienced maintainers for monthly guidance sessions",
      duration: "3-6 months",
      icon: <User className="w-8 h-8" />,
      features: [
        "Monthly video calls",
        "Code review sessions",
        "Career guidance",
        "Project planning",
      ],
    },
    {
      title: "Summer of Code",
      description:
        "Intensive 3-month program placing students in real projects",
      duration: "3 months",
      icon: <GraduationCap className="w-8 h-8" />,
      features: [
        "Stipend provided",
        "Real project work",
        "Mentor support",
        "Final presentation",
      ],
    },
    {
      title: "Office Hours",
      description:
        "Weekly open sessions for questions, code reviews, and discussions",
      duration: "Ongoing",
      icon: <Coffee className="w-8 h-8" />,
      features: [
        "Drop-in sessions",
        "Peer learning",
        "Expert guidance",
        "Networking",
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getEventTypeColor = (type: any) => {
    const colors = {
      Workshop: "bg-blue-900/20 text-blue-400 border-blue-600",
      Meetup: "bg-green-900/20 text-green-400 border-green-600",
      Conference: "bg-red-900/20 text-red-400 border-red-600",
      "Launch Event": "bg-purple-900/20 text-purple-400 border-purple-600",
      Virtual: "bg-yellow-900/20 text-yellow-400 border-yellow-600",
    };
    // @ts-ignore
    return colors[type] || "bg-gray-900/20 text-gray-400 border-gray-600";
  };

  const formatEventDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const events = activeEventTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <section className="bg-gray-950 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium mb-6">
            <Users className="w-4 h-4 mr-2 text-red-600" />
            Community & Events
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join Uganda{"'"}s
            <span className="text-red-600 block">Open Source</span>
            Community
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Connect with like-minded developers, attend workshops and meetups,
            find mentors, and be part of the growing open source movement in
            East Africa.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <div
              key={index}
              className="bg-black border border-gray-800 p-6 text-center hover:border-red-600 transition-colors duration-300"
            >
              <div className="flex justify-center mb-3 text-red-600">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Events Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Community Events
          </h3>

          {/* Event Tabs */}
          <div className="flex justify-center mb-8">
            <div className="border border-gray-800 bg-black">
              <button
                onClick={() => setActiveEventTab("upcoming")}
                className={`px-8 py-3 font-medium transition-colors ${
                  activeEventTab === "upcoming"
                    ? "bg-red-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveEventTab("past")}
                className={`px-8 py-3 font-medium transition-colors ${
                  activeEventTab === "past"
                    ? "bg-red-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="bg-black border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`px-3 py-1 border text-xs font-medium ${getEventTypeColor(
                        event.type
                      )}`}
                    >
                      {event.type}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {formatEventDate(event.date)}
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {event.title}
                  </h4>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} attendees
                    </div>
                  </div>

                  {activeEventTab === "upcoming" && (
                    <button className="w-full bg-red-800 text-white py-2 font-medium hover:bg-red-700 transition-colors">
                      {
                        //@ts-ignore
                        event.status
                      }
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship Programs */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Mentorship Programs
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {mentorshipPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 p-8 hover:border-red-600 transition-colors duration-300"
              >
                <div className="text-red-600 mb-4">{program.icon}</div>

                <h4 className="text-xl font-bold text-white mb-3">
                  {program.title}
                </h4>
                <p className="text-gray-400 mb-4">{program.description}</p>

                <div className="text-sm text-gray-500 mb-6">
                  Duration:{" "}
                  <span className="text-red-400 font-medium">
                    {program.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-400"
                    >
                      <div className="w-1 h-1 bg-red-600 mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Community Voices
          </h3>

          <div className="max-w-4xl mx-auto relative">
            <div className="bg-black border border-gray-800 p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <blockquote className="text-xl text-gray-300 mb-6 leading-relaxed">
                  {`"`}
                  {testimonials[currentTestimonial].quote}
                  {`"`}
                </blockquote>
                <div className="text-white font-bold">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-500 text-sm">
                  {testimonials[currentTestimonial].role}
                </div>
                <div className="text-red-400 text-sm mt-1">
                  {testimonials[currentTestimonial].project}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 ${
                      currentTestimonial === index
                        ? "bg-red-600"
                        : "bg-gray-700"
                    } transition-colors`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Join Community CTA */}
        <div className="bg-black border border-gray-800 p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Join Our Community?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you{"'"}re a student, developer, maintainer, or just curious
            about open source, there{"'"}s a place for you in our growing
            community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-800 text-white px-8 py-3 font-medium hover:bg-red-700 transition-colors inline-flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Discord
            </button>
            <button className="border border-gray-700 text-white px-8 py-3 font-medium hover:bg-gray-900 transition-colors inline-flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Attend Next Event
            </button>
          </div>

          <div className="flex justify-center space-x-6 mt-8">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
