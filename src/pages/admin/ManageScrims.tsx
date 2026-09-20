import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getScrims, deleteScrim } from "../../services/scrim.service";
import type { IScrim } from "../../types/scrim";

const ManageScrims = () => {
  const navigate = useNavigate();

  const [scrims, setScrims] = useState<IScrim[]>([]);
  const [loading, setLoading] = useState(true);

  const loadScrims = async () => {
    try {
      const data = await getScrims();
      setScrims(data);
    } catch (error) {
      console.error("Failed to load scrims:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScrims();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this scrim?"
    );

    if (!confirmed) return;

    try {
      await deleteScrim(id);
      setScrims((prev) => prev.filter((scrim) => scrim._id !== id));
    } catch (error) {
      console.error("Failed to delete scrim:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#090a0d] p-10 text-white">
        Loading scrims...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090a0d] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-wrap items-center justify-between gap-4">
  <div>
    <h1 className="text-3xl font-black uppercase">
      Manage Scrims
    </h1>

    <p className="mt-2 text-sm text-white/40">
      Update or delete existing scrims
    </p>
  </div>

  <div className="flex gap-2">
    <button
      onClick={() => navigate("/admin/dashboard")}
      className="border border-white/10 px-4 py-3 text-sm font-bold uppercase text-white/70 hover:text-white"
    >
      ← Dashboard
    </button>

    <button
      onClick={() => navigate("/admin/scrims/create")}
      className="bg-white px-4 py-3 text-sm font-bold uppercase text-black"
    >
      + Create
    </button>
  </div>
</div>

        <div className="mt-8 space-y-3">
          {scrims.map((scrim) => (
            <div
              key={scrim._id}
              className="flex flex-col gap-4 border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-bold">
                  {scrim.name}
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  {scrim.date} • {scrim.time}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(`/admin/scrims/${scrim._id}/edit`)
                  }
                  className="border border-white/10 px-4 py-2 text-xs font-bold uppercase"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(scrim._id)}
                  className="border border-red-500/30 px-4 py-2 text-xs font-bold uppercase text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {scrims.length === 0 && (
            <p className="py-10 text-center text-sm text-white/30">
              No scrims found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ManageScrims;