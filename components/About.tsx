export default function About({ isDark }: { isDark?: boolean }) {
  return (
    <div
      className={`p-4 rounded shadow ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2
        className={`text-2xl font-semibold ${
          isDark ? "text-gray-200" : "text-gray-800"
        }`}
      >
        About Me
      </h2>
      <p className={isDark ? "text-gray-400" : "text-gray-600"}>
        Informatics engineer turned Next.js god
      </p>
    </div>
  );
}
