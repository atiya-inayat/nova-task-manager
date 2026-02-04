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
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black pt-20 pb-10 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          {/* Heading */}
          <h1 className="mb-4 text-center text-4xl font-extrabold text-white">
            Project Detail
          </h1>

          <div className="rounded-xl border border-slate-900 p-4 space-y-6">
            {/* Create Task */}
            <div className="text-center">
              <p className="font-bold text-white">Create Task</p>
              <TaskForm projectId={projectId} />
            </div>

            {/* Task List */}
            <TaskList initialTasks={tasks} projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
