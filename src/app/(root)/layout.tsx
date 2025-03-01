import NavBar from "@/components/nav-bar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative overflow-y-scroll min-h-screen bg-background">
      <NavBar />
      <div className="w-full min-h-screen text-text-primary">{children}</div>
    </main>
  );
};

export default HomeLayout;
