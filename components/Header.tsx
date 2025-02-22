import Link from "next/link";

export default function Header(props: { name: string; isDark?: boolean }) {
  return (
    <header
      className={`text-3xl font-bold mb-6 ${
        props.isDark ? "text-white" : "text-gray-900"
      }`}
    >
      <nav className="flex space-x-4">
        <Link href="/" className="hover:underline">
          Welcome, {props.name}!
        </Link>
        <Link href="/projects" className="hover:underline">
          Projects
        </Link>
      </nav>
    </header>
  );
}
