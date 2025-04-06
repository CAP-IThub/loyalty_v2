import React, { useEffect, useState } from "react";
import capLogo from "../assets/images/cap-logo.png";
import loginImage from "../assets/images/loginImage.png";
import { FaUserTie, FaUserLock, FaUserCheck, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/authSlice";

const WelcomePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Partner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        user_type: activeTab.toLowerCase(),
        email,
        password,
      })
    );
  };

  const renderForm = () => {
    return (
      <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent text-black focus:outline-none focus:border-[#FC7B00]`}
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className={`absolute left-0 ${
              email
                ? "top-0 text-sm text-black"
                : "top-3.5 text-base text-gray-400"
            } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black`}
          >
            Email address
          </label>
        </div>

        <div className="relative">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent focus:outline-none focus:border-[#FC7B00]  ${
              password ? "text-black" : ""
            }`}
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className={`absolute left-0 ${
              password
                ? "top-0 text-sm text-black"
                : "top-3.5 text-base text-gray-400"
            } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black`}
          >
            Password
          </label>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-black">
            <input type="checkbox" className="accent-[#FC7B00]" /> Remember for
            30 days
          </label>
          <a href="#" className="text-black hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#FC7B00] text-white text-sm rounded-lg hover:bg-orange-600 transition-all"
        >
          Login
        </button>
      </form>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-white">
      {loading ? (
        <div className="w-full h-[100vh] md:h-screen flex items-center justify-center">
          <div className="fixed w-full mb-16 md:mb-0 lg:py-9 z-50">
            <div className="w-[300px] xs:w-[350px] lg:w-[400px] max-w-[800px] mx-auto bg-transparent">
              <div className="flex items-center justify-center">
                <img src={capLogo} alt="/" width={200} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex">
          {/* Left Image/Graphic Section */}
          <div className="hidden md:flex w-[50%] h-[100vh]">
            <div className="text-center">
              <img
                src={loginImage}
                alt="illustration"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Login Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md border border-gray-800 rounded-sm px-14 py-16 shadow-sm">
              <h2 className="text-2xl font-semibold text-center">
                Log in to your account
              </h2>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Welcome! Please enter your details
              </p>

              <div className="flex mt-6 border-b border-gray-200">
                {["Partner", "Representative", "Painter"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all duration-200 ${
                      activeTab === type
                        ? "border-[#FC7B00] text-[#FC7B00]"
                        : "border-gray-200 text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {renderForm()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
