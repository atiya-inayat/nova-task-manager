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
    },
  );

  const tasks = await res.json();

  return (
    <div className=" flex justify-center flex-col h-screen items-center">
      <div className="flex justify-center  mb-2 ">
        <h1 className="text-4xl font-extrabold">Project Detail</h1>
      </div>
      <div className="border p-4 border-gray-200   rounded-md">
        {/* <p>Project ID: {projectId}</p> */}
        <div>
          <div className="flex justify-center  ">
            <p>Create Task.</p>
          </div>
          <TaskForm projectId={projectId} />
        </div>
        <div>
          <TaskList initialTasks={tasks} projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
