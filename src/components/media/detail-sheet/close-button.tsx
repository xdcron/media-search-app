import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CloseButtonProps {
  onClose: () => void;
}

export function CloseButton({ onClose }: CloseButtonProps): React.ReactElement {
  return (
    <div className="absolute top-4 right-4 z-10">
      <Button
        onClick={onClose}
        className="bg-black/40 hover:bg-black/60 text-white cursor-pointer p-2 rounded-full transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </Button>
    </div>
  );
}
