import { AuthPoster } from "@/components/auth/auth-poster";
import Logo from "@/components/ui/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen bg-background flex">
      <div className="relative top-4 left-4">
        <Logo />
      </div>
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <AuthPoster />
      </div>
    </main>
  );
};

export default AuthLayout;
