import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#090a0d] px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-black uppercase">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Manage scrims and organizers
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* Scrims */}
          <div className="border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-bold uppercase">Scrims</h2>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => navigate("/admin/scrims/create")}
                className="w-full bg-white cursor-pointer px-4 py-3 text-sm font-bold uppercase text-black"
              >
                Create Scrim
              </button>

              <button
                onClick={() => navigate("/admin/scrims")}
                className="w-full border cursor-pointer border-white/10 px-4 py-3 text-sm font-bold uppercase"
              >
                Manage Scrims
              </button>
            </div>
          </div>

          {/* Organizers */}
          <div className="border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-bold uppercase">Organizers</h2>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => navigate("/admin/organizers/create")}
                className="w-full cursor-pointer bg-white px-4 py-3 text-sm font-bold uppercase text-black"
              >
                Create Organizer
              </button>

              <button
                onClick={() => navigate("/admin/organizers")}
                className="w-full cursor-pointer border border-white/10 px-4 py-3 text-sm font-bold uppercase"
              >
                Manage Organizers
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;