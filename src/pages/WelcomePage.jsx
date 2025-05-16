import React, { useEffect, useState } from "react";
import capLogo from "../assets/images/cap-logo.png";
import capLogoW from "../assets/images/capLogo-white.webp";
import loginImage from "../assets/images/loginImage.png";
import { AiOutlineMail, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/authSlice";
import { ClipLoader } from "react-spinners";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";

const WelcomePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Partner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

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

  useEffect(() => {
    if (auth.loginStatus === "rejected") {
      toast.error(`${auth.loginError}`);
    }
  }, [auth.loginStatus, auth.loginError]);

  useEffect(() => {
    if (auth._id && auth.first_name && auth.user_type) {
      navigate(`/${auth.user_type}`);
      toast.success(`Welcome, ${auth.first_name}`);
    }
  }, [auth._id, auth.first_name, auth.user_type, navigate]);

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
            className={`peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent text-black text-sm focus:outline-none focus:border-[#FC7B00]`}
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className={`absolute left-0 ${
              email
                ? "top-0 text-sm text-black font-semibold"
                : "top-7 text-sm text-gray-500"
            } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:font-semibold`}
          >
            Email Address
          </label>
          <div className="absolute right-0 bottom-2 text-gray-500 hover:text-gray-700">
            <AiOutlineMail />
          </div>
        </div>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent focus:outline-none focus:border-[#FC7B00] text-sm  ${
              password ? "text-black" : ""
            }`}
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className={`absolute left-0 ${
              password
                ? "top-0 text-sm text-black font-semibold"
                : "top-7 text-sm text-gray-500"
            } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:font-semibold`}
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 bottom-2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm pb-4">
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
          {auth.loginStatus === "pending" ? (
            <ClipLoader size={20} color={"#fff"} />
          ) : (
            "Login"
          )}
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
        <div className="min-h-screen md:flex">
          <div>
            <img
              src={capLogoW}
              alt="CAP Logo"
              className="hidden md:block absolute top-4 left-4 w-24 h-auto z-50"
            />

            <img
              src={capLogo}
              alt="CAP Logo"
              className="md:hidden w-40 z-50 py-5"
            />
          </div>

          {/* Left Image/Graphic Section */}
          <div className="hidden md:flex w-[50%] h-[100vh]">
            <div className="text-center">
              <img
                src={loginImage}
                alt="illustration"
                className="w-full h-full object-center"
              />
            </div>
          </div>

          {/* Right Login Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md md:border border-gray-400 rounded-md px-8 py-8 md:px-14 md:py-16 md:shadow-sm">
              <h2 className="text-2xl font-semibold text-center">
                Log in to your account
              </h2>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Welcome! Please enter your details
              </p>

              <div className="flex mt-6 border-b border-gray-200">
                {["Partner", "Rep"].map((type) => (
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
