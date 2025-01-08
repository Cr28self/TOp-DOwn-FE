import { useState } from "react";
const LandingRoute = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-md py-4 relative z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-blue-600">MyBrand</h1>

          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-white/60 backdrop-blur-lg z-40 flex flex-col transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-gray-800 focus:outline-none z-50"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          {/* Navigation */}
          <nav className="w-full text-center text-black text-3xl font-bold mt-16">
            <a
              href="#Features"
              className="inline-block mb-4 no-underline bg-[linear-gradient(rgb(0,0,0),rgb(0,0,0))] bg-[length:0_2px] bg-[0_100%] bg-no-repeat transition-all duration-300 ease-in-out hover:bg-[length:100%_2px]"
            >
              Features
            </a>
            <br />
            <a
              href="#Pricing"
              className="inline-block mb-4 no-underline bg-[linear-gradient(rgb(0,0,0),rgb(0,0,0))] bg-[length:0_2px] bg-[0_100%] bg-no-repeat transition-all duration-300 ease-in-out hover:bg-[length:100%_2px]"
            >
              Pricing
            </a>
            <br />
            <a
              href="#contact"
              className="inline-block no-underline bg-[linear-gradient(rgb(0,0,0),rgb(0,0,0))] bg-[length:0_2px] bg-[0_100%] bg-no-repeat transition-all duration-300 ease-in-out hover:bg-[length:100%_2px]"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* <section
        id="login"
        className="flex justify-center items-center min-h-screen bg-gray-100"
      >
        <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Login
          </h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="#signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </section> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Welcome to MyBrand</h2>
          <p className="text-lg mb-8">
            Simplify your workflow and achieve more with our platform.
          </p>
          <a
            href="#features"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-md rounded-lg text-center"
              >
                <h4 className="text-xl font-semibold mb-4">
                  Feature {index + 1}
                </h4>
                <p className="text-gray-600">
                  Description of feature {index + 1}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h4 className="text-xl font-semibold mb-4">Basic</h4>
              <p className="text-gray-600 mb-4">$10/month</p>
              <a
                href="#contact"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Subscribe
              </a>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h4 className="text-xl font-semibold mb-4">Pro</h4>
              <p className="text-gray-600 mb-4">$20/month</p>
              <a
                href="#contact"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Subscribe
              </a>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h4 className="text-xl font-semibold mb-4">Enterprise</h4>
              <p className="text-gray-600 mb-4">$50/month</p>
              <a
                href="#contact"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Contact Us</h3>
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-600 mb-2">
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2024 MyBrand. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingRoute;
