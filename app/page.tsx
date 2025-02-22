import { Project } from "@/types";
import ClientHome from "./ClientHome";

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(
    "http://localhost:3000/api/projects",
    { next: { revalidate: 3600 } } // revalidate every hour
  );
  const data = await response.json();
  return data;
}

export default async function Home() {
  const projects = await fetchProjects();
  return <ClientHome projects={projects} />;
}
