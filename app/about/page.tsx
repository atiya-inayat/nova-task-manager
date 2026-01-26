import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg p-8 space-y-10">
        {/* Hero */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Nova</h1>
          <p className="text-gray-600 text-lg">
            Simple task management for focused work
          </p>
        </section>

        {/* Why Nova */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Why Nova?</h2>
          <p className="text-gray-600">
            Many task managers are overloaded with features and distractions.
            Nova is built to keep things simple — so you can focus on what
            actually matters.
          </p>
        </section>

        {/* Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What you can do with Nova</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Create and manage projects</li>
            <li>Add tasks and organize them clearly</li>
            <li>Track progress with Todo, In Progress, and Done</li>
            <li>See project status at a glance</li>
            <li>Work in a clean, distraction-free interface</li>
          </ul>
        </section>

        {/* How it works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>Create a project</li>
            <li>Add tasks to your project</li>
            <li>Update task status as you work</li>
          </ol>
        </section>

        {/* Built by */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Built with care</h2>
          <p className="text-gray-600">
            Nova is built by a developer who wanted a clean, simple, and
            practical way to manage daily work — without unnecessary complexity.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center pt-6 border-t">
          <p className="text-gray-600 mb-4">Ready to organize your work?</p>
          <Link
            href="/dashboard"
            className="inline-block bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Go to Dashboard
          </Link>
        </section>
      </div>
    </div>
  );
}
