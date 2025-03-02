import { FormData, FormErrors } from "@/types/types";

interface SignUpFormData extends FormData {
  confirmPassword?: string;
}

interface SignUpFormErrors extends FormErrors {
  confirmPassword?: string;
}

export function validateLoginForm(formData: FormData): {
  errors: FormErrors;
  isValid: boolean;
} {
  const errors: FormErrors = {
    email: "",
    password: "",
  };
  if (!formData.email) {
    errors.email = "Email is required";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  const isValid = Object.values(errors).every((error) => error === "");
  return { errors, isValid };
}

export function validateSignupForm(formData: SignUpFormData): {
  errors: SignUpFormErrors;
  isValid: boolean;
} {
  const errors: SignUpFormErrors = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!formData.email) {
    errors.email = "Email is required";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  const isValid = Object.values(errors).every((error) => error === "");
  return { errors, isValid };
}
