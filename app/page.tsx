import { Project } from "@/types";
import ClientHome from "./ClientHome";

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const data = await response.json();
  return data;
}

export default async function Home() {
  const projects = await fetchProjects();
  return <ClientHome projects={projects} />;
}
