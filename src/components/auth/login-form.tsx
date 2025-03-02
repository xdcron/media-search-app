"use client";

import Link from "next/link";
import { FormInput } from "./form-input";
import { FormData } from "@/types/types";
import SubmitButton from "./submit-button";
import { useAuthForm } from "@/hooks/use-auth-form";

export function LoginForm() {
  const { formData, isSubmitting, handleInputChange, handleSubmit } =
    useAuthForm<FormData>({
      initialState: {
        email: "",
        password: "",
      },
      authAction: "login",
    });

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          placeholder="Enter your email"
          required
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange("password")}
          placeholder="Enter your password"
          required
        />
        <SubmitButton isSubmitting={isSubmitting}>
          {isSubmitting ? "Logging In..." : "Log In"}
        </SubmitButton>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
