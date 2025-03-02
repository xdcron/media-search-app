"use client";

import Link from "next/link";
import { FormInput } from "./form-input";
import SubmitButton from "./submit-button";
import { useAuthForm } from "@/hooks/use-auth-form";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm() {
  const { formData, isSubmitting, handleInputChange, handleSubmit } =
    useAuthForm<SignUpFormData>({
      initialState: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      authAction: "signup",
      validateForm: (data) => {
        if (data.password !== data.confirmPassword) {
          return "Passwords do not match";
        }
        if (data.password.length < 6) {
          return "Password must be at least 6 characters long";
        }
        return null;
      },
    });

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-1">Create an Account</h2>

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

        <FormInput
          id="confirm-password"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange("confirmPassword")}
          placeholder="Confirm your password"
          required
        />

        <SubmitButton isSubmitting={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </SubmitButton>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
