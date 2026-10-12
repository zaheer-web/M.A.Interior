import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";

const ADMIN_PASSWORD = "Aslam@123";

const AdminGate = ({ children }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("admin_access") === "true"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_access", "true");
      setAuthenticated(true);
      return;
    }

    setError("Incorrect password. Please try again.");
    setPassword("");
  };

  // Already authenticated
  if (authenticated) {
    return children;
  }

  return (
    <div className="min-h-screen bg-[#f5f2ec] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo / Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#171717] shadow-xl">
            <ShieldCheck
              size={38}
              strokeWidth={1.6}
              className="text-[#c7a36a]"
            />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-black/10 bg-white p-7 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.12)]">

          <div className="text-center mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a27b43]">
              Restricted Area
            </p>

            <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
              Admin Access
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Please enter your password to access the administration panel.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Password */}
            <label className="mb-2 block text-sm font-medium text-[#171717]">
              Admin Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                autoComplete="current-password"
                className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm outline-none transition focus:border-[#a27b43] focus:bg-white focus:ring-4 focus:ring-[#a27b43]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#171717]"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {/* Error */}
            {error && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-[#171717] text-sm font-semibold text-white transition duration-300 hover:bg-[#a27b43] hover:shadow-lg active:scale-[0.99]"
            >
              Continue to Admin
            </button>

          </form>

          <p className="mt-6 text-center text-[11px] uppercase tracking-[0.2em] text-gray-400">
            Authorized access only
          </p>

        </div>

      </div>
    </div>
  );
};

export default AdminGate;