import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gray-900 min-h-screen pt-16">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-32">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">
              About Our AI-Powered Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Revolutionizing support systems through intelligent ticket assignment and mentor matching technology.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-100 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-8 mb-4">
              We believe that every support ticket deserves to reach the right expert at the right time. Our AI-powered 
              ticket assignment system bridges the gap between users seeking help and mentors with the exact skills needed 
              to provide solutions.
            </p>
            <p className="text-lg text-gray-300 leading-8">
              By leveraging advanced machine learning algorithms and skill-based matching, we ensure faster resolution 
              times, improved user satisfaction, and optimal workload distribution among support staff.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-100 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-lg mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">Smart Analysis</h3>
                <p className="text-gray-300">
                  Our AI analyzes incoming tickets to extract key information, identify required skills, and categorize the issue type.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-lg mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">Intelligent Matching</h3>
                <p className="text-gray-300">
                  The system matches tickets with mentors based on skill compatibility, current workload, and historical performance.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-lg mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">Automated Assignment</h3>
                <p className="text-gray-300">
                  Tickets are automatically assigned to the most suitable mentor, ensuring optimal resource utilization and faster response times.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-100 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-100">Real-time Assignment</h4>
                  <p className="text-gray-300">Instant ticket routing upon creation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-100">Skill-based Matching</h4>
                  <p className="text-gray-300">AI analyzes content and matches expertise</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-100">Load Balancing</h4>
                  <p className="text-gray-300">Prevents mentor overload with smart distribution</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-100">Performance Analytics</h4>
                  <p className="text-gray-300">Comprehensive tracking and reporting</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-100">User Feedback System</h4>
                  <p className="text-gray-300">Continuous improvement through user input</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-100">Multi-role Support</h4>
                  <p className="text-gray-300">Admin, moderator, and user role management</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-100 mb-6">Technology Stack</h2>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-100 mb-2">Frontend</h4>
                  <p className="text-sm text-gray-300">React, Tailwind CSS, Vite</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-100 mb-2">Backend</h4>
                  <p className="text-sm text-gray-300">Node.js, Express, MongoDB</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-100 mb-2">AI/ML</h4>
                  <p className="text-sm text-gray-300">Skill Matching Algorithms</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-100 mb-2">Authentication</h4>
                  <p className="text-sm text-gray-300">JWT, Role-based Access</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-100 mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Join our platform today and experience the future of intelligent ticket management.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/signup"
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up Now
              </Link>
              <Link
                to="/contact"
                className="rounded-md bg-transparent border border-gray-600 px-6 py-3 text-base font-semibold text-gray-100 hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;