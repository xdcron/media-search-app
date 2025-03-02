import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type InputType = "text" | "email" | "password" | "number";

export interface FormInputProps {
  id: string;
  label: string;
  type?: InputType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,

  className = "",
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = type === "password";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={isPasswordInput && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
          className={`${className} `}
        />
        {isPasswordInput && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
