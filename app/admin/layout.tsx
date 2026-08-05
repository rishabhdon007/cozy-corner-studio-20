"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, User, Eye, EyeOff, LogOut, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("nrk_admin_session");
    if (token === "authenticated") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token === "authenticated") {
        localStorage.setItem("nrk_admin_session", "authenticated");
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Invalid username or password credentials");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nrk_admin_session");
    setIsAuthenticated(false);
  };

  // Wait until localStorage check is finished
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          <span className="text-sm font-semibold tracking-wider opacity-60">Initializing Admin Session...</span>
        </div>
      </div>
    );
  }

  // Not authenticated: render a stunning premium login card
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a1120] px-4 py-12">
        {/* Dynamic Abstract Background Glows */}
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
        <div className="absolute -right-1/4 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-indigo-950/20 blur-[150px] pointer-events-none" />

        <div className="relative w-full max-w-[440px] space-y-8">
          <div className="flex flex-col items-center text-center">
            {/* Logo container */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-xl shadow-blue-500/10 border border-white/10">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">NRK Admin Panel</h1>
            <p className="mt-2 text-sm text-gray-400">Please authenticate to manage database catalog & site configuration</p>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-3.5 text-center text-xs font-semibold text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="login-username" className="text-xs font-black uppercase tracking-wider text-gray-300">Username</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="login-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="h-11 pl-10 border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-xs font-black uppercase tracking-wider text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="h-11 pl-10 pr-10 border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-blue-500 focus:bg-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/10 tracking-wide transition-all mt-2"
              >
                {loading ? "Authenticating..." : "Login Admin Session"}
              </Button>
            </form>
          </div>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-white transition-colors">
              &larr; Return to main website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated layout
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-black text-gray-800 tracking-tight">NRK Admin</h2>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5 p-4 justify-between h-[calc(100vh-80px)] md:h-[calc(100vh-90px)]">
          <div className="space-y-1">
            <Link href="/admin/content" className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 rounded-xl hover:bg-gray-50 hover:text-gray-900 font-semibold text-sm transition-all">
              Site Content
            </Link>
            <Link href="/admin/products" className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 rounded-xl hover:bg-gray-50 hover:text-gray-900 font-semibold text-sm transition-all">
              Products & Services
            </Link>
          </div>
          <div className="space-y-1 border-t pt-4">
            <Link href="/" className="flex items-center gap-2 px-4 py-2.5 text-blue-600 rounded-xl hover:bg-blue-50 font-semibold text-sm transition-all">
              &larr; Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-red-600 rounded-xl hover:bg-red-50 font-semibold text-sm transition-all text-left"
            >
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
