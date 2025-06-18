import React, { useState, useEffect } from "react";
import capLogo from "../../assets/images/cap-logo.png";
import capLogoW from "../../assets/images/capLogo-white.webp";
import loginImage from "../../assets/images/loyalty.png";
import {
  AiOutlineMail,
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineUser,
  AiOutlinePhone,
} from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { registerUser } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";

const PainterRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
    password: "",
    password_confirmation: "",
    address: "",
    gender: "",
    referral_code: "", // optional
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      if (!value) {
        setPasswordError("");
      } else if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else if (value.length > 12) {
        setPasswordError("Password must not exceed 12 characters");
      } else {
        setPasswordError("");
      }

      if (
        formData.password_confirmation &&
        value !== formData.password_confirmation
      ) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (name === "password_confirmation") {
      if (value !== formData.password) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (auth.registerStatus === "success") {
      setLoading(false);
      navigate("/");
    }

    if (auth.registerStatus === "rejected") {
      setLoading(false);
      const message =
        typeof auth.registerError === "string"
          ? auth.registerError
          : auth.registerError?.error || "Registration failed.";
      toast.error(message);
    }
  }, [auth.registerStatus, auth.registerError, navigate]);

  const {
    firstName,
    lastName,
    email,
    phoneNum,
    password,
    password_confirmation,
    address,
    gender,
    referral_code,
  } = formData;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-white">
      <div className="min-h-screen flex">
        <div className="fixed top-0 left-0 w-1/2 h-full">
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

          <div className="hidden md:block">
            <div className="text-center">
              <img
                src={loginImage}
                alt="illustration"
                className="w-[37rem] h-screen object-center"
              />
            </div>
          </div>
          {/* <div className="hidden md:flex md:w-1/2 h-[100vh]">
                      <div className="text-center">
                        <img
                          src={loginImage}
                          alt="illustration"
                          className="w-[37rem] h-full object-cover"
                        />
                      </div>
                    </div> */}
        </div>

        {/* Form Section */}
        <div className="w-full md:ml-[50%] flex items-center justify-center md:py-9">
          <div className="w-full max-w-lg px-8 py-10 md:px-14 md:py-12 md:border border-gray-400 md:shadow-sm">
            <img
              src={capLogo}
              alt="CAP Logo"
              className="md:hidden w-40 mx-auto pb-4"
            />
            <h2 className="text-2xl font-semibold text-center">
              Painters Registration
            </h2>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Please fill the form with the necessary details
            </p>

            <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="relative">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent text-black text-sm focus:outline-none focus:border-[#FC7B00]"
                  placeholder="First Name"
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-0 ${
                    firstName
                      ? "top-0 text-sm text-black font-semibold"
                      : "top-7 text-sm text-gray-500"
                  } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:font-semibold`}
                >
                  First Name
                </label>
                <div className="absolute right-0 bottom-2 text-gray-500">
                  <AiOutlineUser />
                </div>
              </div>

              {/* Last Name */}
              <div className="relative">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent text-black text-sm focus:outline-none focus:border-[#FC7B00]"
                  placeholder="Last Name"
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-0 ${
                    lastName
                      ? "top-0 text-sm text-black font-semibold"
                      : "top-7 text-sm text-gray-500"
                  } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:font-semibold`}
                >
                  Last Name
                </label>
                <div className="absolute right-0 bottom-2 text-gray-500">
                  <AiOutlineUser />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent text-black text-sm focus:outline-none focus:border-[#FC7B00]"
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
                <div className="absolute right-0 bottom-2 text-gray-500">
                  <AiOutlineMail />
                </div>
              </div>

              {/* Phone Number */}
              <div className="relative">
                <input
                  id="phoneNum"
                  name="phoneNum"
                  type="tel"
                  value={phoneNum}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent text-black text-sm focus:outline-none focus:border-[#FC7B00]"
                  placeholder="Phone Number"
                />
                <label
                  htmlFor="phoneNum"
                  className={`absolute left-0 ${
                    phoneNum
                      ? "top-0 text-sm text-black font-semibold"
                      : "top-7 text-sm text-gray-500"
                  } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:font-semibold`}
                >
                  Phone Number
                </label>
                <div className="absolute right-0 bottom-2 text-gray-500">
                  <AiOutlinePhone />
                </div>
              </div>

              {/* Address */}
              <div className="relative">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent text-black text-sm focus:outline-none focus:border-[#FC7B00]"
                  placeholder="Address"
                />
                <label
                  htmlFor="address"
                  className={`absolute left-0 ${
                    address
                      ? "top-0 text-sm text-black font-semibold"
                      : "top-7 text-sm text-gray-500"
                  } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:font-semibold`}
                >
                  Address
                </label>
              </div>

              {/* Gender */}
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  required
                  className="w-full border-b-2 border-gray-300 pt-4 pb-2 text-sm bg-transparent text-black focus:outline-none focus:border-[#FC7B00]"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent text-sm focus:outline-none focus:border-[#FC7B00]"
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
                {passwordError && (
                  <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showPassword2 ? "text" : "password"}
                  value={password_confirmation}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 placeholder-transparent text-sm focus:outline-none focus:border-[#FC7B00]"
                  placeholder="Confirm Password"
                />
                <label
                  htmlFor="password_confirmation"
                  className={`absolute left-0 ${
                    password_confirmation
                      ? "top-0 text-sm text-black font-semibold"
                      : "top-7 text-sm text-gray-500"
                  } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:font-semibold`}
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword2((prev) => !prev)}
                  className="absolute right-0 top-7 text-gray-500 hover:text-gray-700"
                >
                  {showPassword2 ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
                {confirmPasswordError && (
                  <p className="text-xs text-red-500 mt-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  id="referral_code"
                  name="referral_code"
                  type="text"
                  value={referral_code}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-gray-300 bg-transparent pt-6 pb-2 mb-6 placeholder-transparent text-black text-sm focus:outline-none focus:border-[#FC7B00]"
                  placeholder="Referral Code (Optional)"
                />
                <label
                  htmlFor="referral_code"
                  className={`absolute left-0 ${
                    referral_code
                      ? "top-0 text-sm text-black font-semibold"
                      : "top-7 text-sm text-gray-500"
                  } transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-black peer-focus:font-semibold`}
                >
                  Referral Code (Optional)
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-[#FC7B00] text-white text-sm rounded-lg hover:bg-orange-600 transition-all"
              >
                {auth.registerStatus === "pending" ? (
                  <ClipLoader size={20} color="#fff" />
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <p className="my-2 text-sm text-center">
              Already have an account?{" "}
              <Link className="text-[#E46E26]" to="/">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainterRegister;
