import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--color-background) / <alpha-value>)",
        foreground: "oklch(var(--color-foreground) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--color-card) / <alpha-value>)",
          foreground: "oklch(var(--color-card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--color-popover) / <alpha-value>)",
          foreground: "oklch(var(--color-popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--color-primary) / <alpha-value>)",
          foreground: "oklch(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--color-secondary) / <alpha-value>)",
          foreground:
            "oklch(var(--color-secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--color-muted) / <alpha-value>)",
          foreground: "oklch(var(--color-muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--color-accent) / <alpha-value>)",
          foreground: "oklch(var(--color-accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--color-destructive) / <alpha-value>)",
          foreground:
            "oklch(var(--color-destructive-foreground) / <alpha-value>)",
        },
        border: "oklch(var(--color-border) / <alpha-value>)",
        input: "oklch(var(--color-input) / <alpha-value>)",
        ring: "oklch(var(--color-ring) / <alpha-value>)",
        chart: {
          "1": "oklch(var(--color-chart-1) / <alpha-value>)",
          "2": "oklch(var(--color-chart-2) / <alpha-value>)",
          "3": "oklch(var(--color-chart-3) / <alpha-value>)",
          "4": "oklch(var(--color-chart-4) / <alpha-value>)",
          "5": "oklch(var(--color-chart-5) / <alpha-value>)",
        },
        neon: {
          DEFAULT: "oklch(var(--color-secondary) / <alpha-value>)",
          light: "oklch(var(--color-neon-glow-light) / <alpha-value>)",
          strong: "oklch(var(--color-neon-glow-strong) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "oklch(var(--color-sidebar) / <alpha-value>)",
          foreground: "oklch(var(--color-sidebar-foreground) / <alpha-value>)",
          primary: "oklch(var(--color-sidebar-primary) / <alpha-value>)",
          "primary-foreground":
            "oklch(var(--color-sidebar-primary-foreground) / <alpha-value>)",
          accent: "oklch(var(--color-sidebar-accent) / <alpha-value>)",
          "accent-foreground":
            "oklch(var(--color-sidebar-accent-foreground) / <alpha-value>)",
          border: "oklch(var(--color-sidebar-border) / <alpha-value>)",
          ring: "oklch(var(--color-sidebar-ring) / <alpha-value>)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          "0%, 100%": {
            boxShadow:
              "0 0 5px oklch(var(--color-neon-glow) / 0.5), 0 0 10px oklch(var(--color-neon-glow) / 0.3)",
          },
          "50%": {
            boxShadow:
              "0 0 15px oklch(var(--color-neon-glow) / 0.8), 0 0 20px oklch(var(--color-neon-glow) / 0.5)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neon-glow": "glow 2s ease-in-out infinite",
      },
      boxShadow: {
        neon: "0 0 5px oklch(var(--color-neon-glow) / 0.5), 0 0 10px oklch(var(--color-neon-glow) / 0.3)",
        "neon-strong":
          "0 0 7px oklch(var(--color-neon-glow) / 0.7), 0 0 15px oklch(var(--color-neon-glow) / 0.5), 0 0 25px oklch(var(--color-neon-glow) / 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
