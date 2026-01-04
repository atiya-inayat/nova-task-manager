import TaskForm from "@/app/component/tasks/TaskForm";
import TaskList from "@/app/component/tasks/TaskList";

// Notice the 'async' keyword here
interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  // You must await the params before using them
  const { projectId } = await params;

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/projects/${projectId}/tasks`,
    {
      cache: "no-store",
    }
  );

  const tasks = await res.json();

  return (
    <div>
      <h1>Project Detail</h1>
      <p>Project ID: {projectId}</p>
      <TaskForm projectId={projectId} />
      <TaskList initialTasks={tasks} projectId={projectId} />
    </div>
  );
}
