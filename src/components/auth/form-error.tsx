interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className = "" }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={`bg-destructive/10 text-destructive p-3 rounded-md ${className}`}
    >
      {message}
    </div>
  );
}
