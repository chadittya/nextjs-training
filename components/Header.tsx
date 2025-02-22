export default function Header(props: { name: string; isDark?: boolean }) {
  return (
    <header
      className={`text-3xl font-bold mb-6 ${
        props.isDark ? "text-white" : "text-gray-900"
      }`}
    >
      Welcome, {props.name}!
    </header>
  );
}
