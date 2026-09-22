import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getOrganizers,
  deleteOrganizer,
} from "../../services/organizer.service";

import type { IOrganizer } from "../../types/organizer";

const ManageOrganizers = () => {
  const navigate = useNavigate();

  const [organizers, setOrganizers] = useState<IOrganizer[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrganizers = async () => {
    try {
      const data = await getOrganizers();
      setOrganizers(data);
    } catch (error) {
      console.error("Failed to load organizers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganizers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this organizer?"
    );

    if (!confirmed) return;

    try {
      await deleteOrganizer(id);

      setOrganizers((prev) =>
        prev.filter((organizer) => organizer._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete organizer:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#090a0d] p-10 text-white">
        Loading organizers...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090a0d] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase">
              Manage Organizers
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Update or delete existing organizers
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="border cursor-pointer border-white/10 px-4 py-3 text-sm font-bold uppercase text-white/70 hover:text-white"
            >
              ← Dashboard
            </button>

            <button
              onClick={() => navigate("/admin/organizers/create")}
              className="bg-white cursor-pointer px-4 py-3 text-sm font-bold uppercase text-black"
            >
              + Create
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {organizers.map((organizer) => (
            <div
              key={organizer._id}
              className="flex flex-col gap-4 border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-bold">
                  {organizer.name}
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  {organizer.whatsappNumber}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(
                      `/admin/organizers/${organizer._id}/edit`
                    )
                  }
                  className="border cursor-pointer border-white/10 px-4 py-2 text-xs font-bold uppercase"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(organizer._id)}
                  className="border cursor-pointer border-red-500/30 px-4 py-2 text-xs font-bold uppercase text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {organizers.length === 0 && (
            <p className="py-10 text-center text-sm text-white/30">
              No organizers found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ManageOrganizers;