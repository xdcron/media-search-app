"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { FormInput } from "./form-input";
import { FormData, FormErrors } from "@/types/types";
import { FirebaseError } from "firebase/app";
import { validateLoginForm } from "@/lib/form-validation-utils";
import SubmitButton from "./submit-button";

export function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { login } = useAuth();
  const router = useRouter();

  function handleInputChange(field: keyof FormData) {
    return function (value: string): void {
      setFormData((prev) => ({ ...prev, [field]: value }));

      setErrors((prev) => ({ ...prev, [field]: "" }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setErrors({ email: "", password: "" });
    const { errors: validationErrors, isValid } = validateLoginForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await login(formData.email, formData.password);
      router.push("/");
    } catch (error) {
      const err = error as FirebaseError;
      let errorMessage = "Failed to log in";

      switch (err.code) {
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password";
          break;
        case "auth/user-not-found":
          errorMessage = "No account associated with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <SubmitButton isSubmitting={isSubmitting}>
          {isSubmitting ? "Logging In..." : "Log In"}
        </SubmitButton>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
