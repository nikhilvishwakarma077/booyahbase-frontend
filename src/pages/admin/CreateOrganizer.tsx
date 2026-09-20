import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { createOrganizer } from "../../services/organizer.service";

const CreateOrganizer = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    whatsappNumber: "",
    orgImg: "",
    email: "",
    instagram: "",
    discord: "",
    telegram: "",
    description: "",
    isVerified: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createOrganizer({
        name: form.name,
        whatsappNumber: form.whatsappNumber,
        orgImg: form.orgImg,
        contactInformation: {
          email: form.email,
          instagram: form.instagram,
          discord: form.discord,
          telegram: form.telegram,
        },
        description: form.description,
        isVerified: form.isVerified,
      });

      navigate("/organizers");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to create organizer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090a0d] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40">
            Admin
          </p>

          <h1 className="mt-2 text-3xl font-black">
            Create Organizer
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Add a new scrim organizer to BooyahBase.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
              Basic Information
            </h2>

            <div className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Organizer name"
                required
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
              />

              <input
                name="whatsappNumber"
                value={form.whatsappNumber}
                onChange={handleChange}
                placeholder="WhatsApp number"
                required
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
              />

              <input
                name="orgImg"
                value={form.orgImg}
                onChange={handleChange}
                placeholder="Organizer image (e.g. BrLord.png)"
                required
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
              />
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
              Contact Information
            </h2>

            <div className="space-y-4">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
              />

              <input
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                placeholder="Instagram"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
              />

              <input
                name="discord"
                value={form.discord}
                onChange={handleChange}
                placeholder="Discord"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
              />

              <input
                name="telegram"
                value={form.telegram}
                onChange={handleChange}
                placeholder="Telegram"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
              />
            </div>
          </section>

          {/* Verification */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="isVerified"
              checked={form.isVerified}
              onChange={handleChange}
              className="h-4 w-4"
            />

            <span className="text-sm text-white/70">
              Mark organizer as verified
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => navigate("/organizers")}
              className="rounded-xl border border-white/10 px-5 py-3 text-xs font-black uppercase text-white/70 transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white px-5 py-3 text-xs font-black uppercase text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Organizer"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateOrganizer;
