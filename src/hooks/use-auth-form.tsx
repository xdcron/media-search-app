// hooks/useAuthForm.ts
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { FirebaseError } from "firebase/app";
import { FormData } from "@/types/types";

interface UseAuthFormProps<T extends FormData> {
  initialState: T;
  authAction: "login" | "signup";
  redirectPath?: string;
  validateForm?: (data: T) => string | null;
}

interface UseAuthFormReturn<T extends FormData> {
  formData: T;
  isSubmitting: boolean;
  handleInputChange: (field: keyof T) => (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useAuthForm<T extends FormData>({
  initialState,
  authAction,
  redirectPath = "/",
  validateForm,
}: UseAuthFormProps<T>): UseAuthFormReturn<T> {
  const [formData, setFormData] = useState<T>(initialState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { login, signup } = useAuth();
  const router = useRouter();

  function handleInputChange(field: keyof T) {
    return function (value: string): void {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    // Run form validation if provided
    if (validateForm) {
      const validationError = validateForm(formData);
      if (validationError) {
        toast.error(validationError);
        return;
      }
    }

    try {
      setIsSubmitting(true);

      if (authAction === "login") {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password);
      }

      router.push(redirectPath);
    } catch (error) {
      const err = error as FirebaseError;
      let errorMessage =
        authAction === "login"
          ? "Failed to log in"
          : "Failed to create an account";

      // Handle different error codes
      switch (err.code) {
        // Login errors
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password";
          break;
        case "auth/user-not-found":
          errorMessage = "No account associated with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;

        // Signup errors
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

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
}
