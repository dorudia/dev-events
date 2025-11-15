import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="flex">
          <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />
          <p>DevEvent</p>
        </Link>
        <ul>
          <Link href="/">Home</Link>

          <Link href="/about">Events</Link>

          <Link href="/contact">Create Event</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
