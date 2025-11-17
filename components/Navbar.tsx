import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="flex">
          <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />
          <p className="hidden md:inline">DevEvent</p>
        </Link>
        <ul>
          <Link href="/">Home</Link>

          <Link href="/events">Events</Link>

          <Link href="/event/create">Create Event</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
