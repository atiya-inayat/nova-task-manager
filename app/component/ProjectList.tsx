"use client";

export default function ProjectList({ projects }: { projects: any[] }) {
  if (!projects.length) {
    return <p>No Project yet.</p>;
  }

  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.name}</h3>
          {project.description && <p>{project.description}</p>}
          <p>Owner: {project.owner?.email || "you"}</p>
        </div>
      ))}
    </div>
  );
}
