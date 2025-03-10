
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 px-15 bg-gray-800 text-white">
      <div className="text-2xl font-bold">Malicious URL Prediction</div>
      <div className="flex gap-8">
        <Link href="/" className="hover:text-[#70f7a1]">Home</Link>
        <Link href="/about" className="hover:text-[#70f7a1]">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
