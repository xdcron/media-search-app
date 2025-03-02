import { Button } from "../ui/button";
interface SubmitButtonProps {
  isSubmitting: boolean;
  children: React.ReactNode;
}
export default function SubmitButton({
  isSubmitting,
  children,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full bg-neon-glow-strong text-primary hover:bg-neon-glow-light cursor-pointer"
      disabled={isSubmitting}
    >
      {children}
    </Button>
  );
}
