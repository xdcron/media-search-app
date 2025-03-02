"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./logo";
import SearchBar from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { Menu, LogIn, UserPlus, LogOut, User } from "lucide-react";
import MediaTypeToggle from "./media-toggle";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        p-4
        bg-background/95 dark:bg-background/95
        ${scrolled ? "backdrop-blur-md" : ""}
      `}
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center relative">
        <div
          className={`
            transition-opacity duration-300 relative z-[100]
            ${scrolled ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"}
          `}
        >
          <Logo />
        </div>
        <div
          className={`
            transition-all duration-300 py-1 relative z-[100]
            ${
              scrolled
                ? "flex-1 max-w-md md:max-w-xl mx-auto"
                : "w-1/2 md:w-1/3"
            }
          `}
        >
          <SearchBar />
        </div>
        <div className="hidden md:flex items-center space-x-4 relative z-[100]">
          {currentUser ? (
            <>
              <div className="flex items-center gap-1 text-sm">
                <User size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground max-w-[150px] truncate">
                  {currentUser.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex cursor-pointer hover:text-neon-glow-strong items-center gap-1 text-sm text-muted-foreground transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex cursor-pointer hover:text-neon-glow-strong items-center gap-1 text-sm text-muted-foreground transition-colors"
              >
                <LogIn size={16} />
                Login
              </Link>
              <Link
                href="/signup"
                className="flex cursor-pointer hover:text-neon-glow-strong items-center gap-1 text-sm text-muted-foreground transition-colors"
              >
                <UserPlus size={16} />
                Sign Up
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
        <div className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              {currentUser && (
                <DropdownMenuLabel className="font-normal text-xs truncate">
                  {currentUser.email}
                </DropdownMenuLabel>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {currentUser ? (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/login"
                        className="w-full flex items-center gap-2"
                      >
                        <LogIn size={16} />
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/signup"
                        className="w-full flex items-center gap-2"
                      >
                        <UserPlus size={16} />
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent">
                  <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-transparent">
                  <MediaTypeToggle className="w-fit" />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
