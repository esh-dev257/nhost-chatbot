import { useState } from "react";
import {
  useAuthenticationStatus,
  useSignInEmailPassword,
  useSignUpEmailPassword,
  useUserEmail,
} from "@nhost/react";
import type { AuthMode } from "../../types";
import "./Auth.css";

export function Auth() {
  const { isAuthenticated } = useAuthenticationStatus();
  const email = useUserEmail();
  const {
    signInEmailPassword,
    isLoading: signingIn,
    error: signInError,
  } = useSignInEmailPassword();
  const {
    signUpEmailPassword,
    isLoading: signingUp,
    error: signUpError,
  } = useSignUpEmailPassword();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [form, setForm] = useState({ email: "", password: "" });

  if (isAuthenticated) {
    return (
      <div className="auth-success">
        <div className="auth-success-content">
          <h2>Welcome back!</h2>
          <p>Signed in as {email}</p>
        </div>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signin") {
      await signInEmailPassword(form.email, form.password);
    } else {
      await signUpEmailPassword(form.email, form.password);
    }
  };

  const error = signInError || signUpError;
  const isLoading = signingIn || signingUp;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>ChatBot AI</h1>
          <h2>{mode === "signin" ? "Welcome back" : "Create account"}</h2>
          <p className="auth-subtitle">
            {mode === "signin"
              ? "Sign in to continue your conversations"
              : "Join to start chatting with AI"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error.message}</div>}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <span className="loading-spinner">
                <span></span>
                {mode === "signin" ? "Signing in..." : "Creating account..."}
              </span>
            ) : mode === "signin" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {mode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              className="link-button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              disabled={isLoading}
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
