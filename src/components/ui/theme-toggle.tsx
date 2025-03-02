"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-2 transition-all duration-300">
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-secondary" />
      ) : (
        <Sun className="h-4 w-4 text-muted-foreground" />
      )}
      <Switch
        checked={theme === "dark"}
        onCheckedChange={handleThemeChange}
        className="data-[state=checked]:bg-secondary"
        aria-label="Toggle dark mode"
      />
    </div>
  );
};
