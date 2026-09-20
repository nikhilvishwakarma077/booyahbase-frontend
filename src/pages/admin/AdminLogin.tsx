import {  useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/admin.service";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await adminLogin({
        email,
        password,
      });

      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("Admin login failed:", error);

      setError(
        error?.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090a0d] px-5 text-white">
      <div className="w-full max-w-md">

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">
            BooyahBase
          </p>

          <h1 className="mt-2 text-4xl font-black uppercase">
            Admin Login
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          {error && (
            <div className="mb-5 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/60">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-white/40">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-white px-5 py-4 text-sm font-black uppercase text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;