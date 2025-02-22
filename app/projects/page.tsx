import { Project } from "@/types";

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3",
    { cache: "no-store" } // fresh data every request
  );
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
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
