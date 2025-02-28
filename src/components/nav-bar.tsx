import Logo from "./ui/logo";
import SearchBar from "./ui/search-bar";
import { ThemeToggle } from "./ui/theme-toggle";

function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-lg bg-white dark:bg-black/[.9] dark:text-white">
      <Logo />
      <SearchBar />
      <ThemeToggle />
    </nav>
  );
}

export default NavBar;
