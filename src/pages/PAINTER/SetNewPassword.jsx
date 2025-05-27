import React, { useState } from "react";
import logo from "../../assets/images/sideLogo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axiosInstance";
import { ClipLoader } from "react-spinners";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutUser } from "../../slices/authSlice";

const SetNewPassword = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminId = auth?.id;

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    passwordLength: "",
    passwordMatch: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    if (password.length === 0) return "";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 12) return "Password must not exceed 12 characters";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "newPassword") {
      const lengthError = validatePassword(value);
      const matchError =
        form.confirmPassword && form.confirmPassword !== value
          ? "Passwords do not match"
          : "";

      setErrors((prev) => ({
        ...prev,
        passwordLength: value ? lengthError : "",
        passwordMatch: matchError,
      }));
    }

    if (name === "confirmPassword") {
      const matchError =
        value && value !== form.newPassword ? "Passwords do not match" : "";

      setErrors((prev) => ({
        ...prev,
        passwordMatch: value ? matchError : "",
      }));
    }
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(form.newPassword);
    const matchError =
      form.newPassword !== form.confirmPassword ? "Passwords do not match" : "";

    setErrors({
      passwordLength: passwordError,
      passwordMatch: matchError,
    });

    if (passwordError || matchError) return;

    try {
      setLoading(true);
      await axios.patch(`/painter/profile-update`, {
        password: form.newPassword,
      });
      dispatch(logoutUser());
      navigate("/")
      toast.success("Password updated successfully");
    } catch (err) {
      console.error("Failed to update password", err);
      const msg = err?.response?.data?.message || "Failed to update password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center px-4 py-16">
      <div className="bg-white w-full max-w-lg rounded-md shadow py-8 px-16">
        <div className="flex flex-col items-center">
          <img src={logo} alt="CAP Logo" className="w-20 h-20 mb-4" />
          <h2 className="text-xl font-semibold mb-1">Set new password</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Your new password must be different to previously used passwords.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border rounded-md px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <span
                onClick={() => toggleVisibility("current")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword.current ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                className="w-full border rounded-md px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <span
                onClick={() => toggleVisibility("new")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword.new ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            {errors.passwordLength && (
              <p className="text-xs text-red-500">{errors.passwordLength}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                className="w-full border rounded-md px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <span
                onClick={() => toggleVisibility("confirm")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword.confirm ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            {errors.passwordMatch && (
              <p className="text-xs text-red-500">{errors.passwordMatch}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold text-sm transition flex items-center justify-center"
          >
            {loading ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              "Change Password"
            )}
          </button>
        </form>

        <div
          className="text-center mt-4"
          onClick={() => {
            navigate(-1);
          }}
        >
          <button className="text-sm text-gray-500 hover:underline">
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;