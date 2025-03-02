"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { FormInput } from "./form-input";
import { FormData, FormErrors } from "@/types/types";
import { FirebaseError } from "firebase/app";
import { validateSignupForm } from "@/lib/form-validation-utils";
import SubmitButton from "./submit-button";

interface SignUpFormData extends FormData {
  confirmPassword: string;
}

interface SignUpFormErrors extends FormErrors {
  confirmPassword: string;
}

export function SignupForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<SignUpFormErrors>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { signup } = useAuth();
  const router = useRouter();

  function handleInputChange(field: keyof SignUpFormData) {
    return function (value: string): void {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setErrors({ email: "", password: "", confirmPassword: "" });

    const { errors: validationErrors, isValid } = validateSignupForm(formData);

    if (!isValid) {
      setErrors(validationErrors as SignUpFormErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await signup(formData.email, formData.password);
      router.push("/");
    } catch (error) {
      const err = error as FirebaseError;
      let errorMessage = "Failed to create an account";

      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

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
          error={errors.email}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange("password")}
          placeholder="Enter your password"
          required
          error={errors.password}
        />

        <FormInput
          id="confirm-password"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange("confirmPassword")}
          placeholder="Confirm your password"
          required
          error={errors.confirmPassword}
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
