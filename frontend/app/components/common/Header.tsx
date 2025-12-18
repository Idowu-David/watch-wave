import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 md:p-6 flex justify-between items-center z-10 relative">
      <Link
        href="/"
        className="text-2xl font-bold tracking-tight text-red-600 hover:text-red-500 transition"
      >
        WatchWave
      </Link>
      <nav className="space-x-4">
        <Link
          href="../auth/login"
          className="px-4 py-2 text-sm font-medium rounded-full text-neutral-300 hover:text-white transition"
        >
          Log In
        </Link>
        <Link
          href="../components/auth/sign-up"
          className="px-4 py-2 text-sm font-medium rounded-full bg-red-600 text-white hover:bg-red-700 transition"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;
