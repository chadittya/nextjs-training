import { Message } from "@/types";

async function fetchProjects(): Promise<Message[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/projects`, {
    next: { revalidate: 10 }, // Refresh every 10s
  });
  const data = await response.json();
  return data;
}

export default async function Projects() {
  const projects = await fetchProjects();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
      <ul className="mt-4 list-disc pl-5 space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="text-gray-700">
            {project.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
