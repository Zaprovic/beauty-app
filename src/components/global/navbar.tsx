import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="hidden items-center space-x-8 text-sm md:flex md:text-base">
      <Link href="/skincare" className="header-link -tracking-wider">
        Skincare
      </Link>
      <Link href="/makeup" className="header-link -tracking-wider">
        Makeup
      </Link>
      <Link href="/hair" className="header-link -tracking-wider">
        Hair
      </Link>
      <Link href="/body" className="header-link -tracking-wider">
        Body
      </Link>
      <Link href={"/products"} className="header-link -tracking-wider">
        Products
      </Link>
    </nav>
  );
};

export default Navbar;
