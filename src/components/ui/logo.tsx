import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className="md:text-3xl text-xl font-extrabold text-neon-glow-strong"
    >
      M&B
    </Link>
  );
}

export default Logo;
