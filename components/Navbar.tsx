import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`} className="flex">
          <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />
          <p>DevEvent</p>
        </Link>
        <ul>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>Home</Link>

          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/events`}>
            Events
          </Link>

          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/create`}>
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
