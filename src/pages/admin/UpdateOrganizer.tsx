import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOrganizerById, updateOrganizer } from "../../services/organizer.service";
import type { IOrganizer } from "../../types/organizer";

const UpdateOrganizer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [name, setName] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [orgImg, setOrgImg] = useState("");

    const [email, setEmail] = useState("");
    const [instagram, setInstagram] = useState("");
    const [discord, setDiscord] = useState("");
    const [telegram, setTelegram] = useState("");

    const [description, setDescription] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const [error, setError] = useState("");

    // Fetch organizer
    useEffect(() => {
        const fetchOrganizer = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError("");

                const organizer: IOrganizer = await getOrganizerById(id);

                setName(organizer.name);
                setWhatsappNumber(organizer.whatsappNumber);
                setOrgImg(organizer.orgImg ?? "");

                setEmail(organizer.contactInformation?.email || "");
                setInstagram(organizer.contactInformation?.instagram || "");
                setDiscord(organizer.contactInformation?.discord || "");
                setTelegram(organizer.contactInformation?.telegram || "");

                setDescription(organizer.description || "");
                setIsVerified(organizer.isVerified);
            } catch (err: any) {
                setError(
                    err?.response?.data?.message || "Failed to load organizer"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizer();
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!id) return;

        if (!name.trim()) {
            setError("Organizer name is required");
            return;
        }

        if (!whatsappNumber.trim()) {
            setError("WhatsApp number is required");
            return;
        }

        if (!orgImg.trim()) {
            setError("Organizer image is required");
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const contactInformation = {
                ...(email.trim() && { email: email.trim() }),
                ...(instagram.trim() && { instagram: instagram.trim() }),
                ...(discord.trim() && { discord: discord.trim() }),
                ...(telegram.trim() && { telegram: telegram.trim() }),
            };

            await updateOrganizer(id, {
                name: name.trim(),
                whatsappNumber: whatsappNumber.trim(),
                orgImg: orgImg.trim(),
                contactInformation,
                description: description.trim(),
                isVerified,
            });

            navigate(`/admin/organizers`);
        } catch (err: any) {
            setError(
                err?.response?.data?.message || "Failed to update organizer"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080808] px-6 py-12 text-white">
                <div className="mx-auto max-w-5xl">
                    <p className="text-sm text-white/40">Loading organizer...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080808] px-6 py-12 text-white sm:px-10 lg:px-16">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-10">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/30">
                        Admin
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Update Organizer
                    </h1>

                    <p className="mt-2 text-sm text-white/40">
                        Update organizer information and verification status.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <section className="border border-white/10 bg-white/[0.025] p-6 sm:p-7">
                        <SectionTitle number="01" title="Basic Information" />

                        <div className="grid gap-5 sm:grid-cols-2">
                            <Input
                                label="Organizer Name"
                                value={name}
                                onChange={setName}
                                placeholder="Enter organizer name"
                            />

                            <Input
                                label="WhatsApp Number"
                                value={whatsappNumber}
                                onChange={setWhatsappNumber}
                                placeholder="Enter WhatsApp number"
                            />

                            <Input
                                label="Organizer Image"
                                value={orgImg}
                                onChange={setOrgImg}
                                placeholder="e.g. BrLord.png"
                            />
                        </div>
                    </section>

                    {/* Contact Information */}
                    <section className="border border-white/10 bg-white/[0.025] p-6 sm:p-7">
                        <SectionTitle number="02" title="Contact Information" />

                        <div className="grid gap-5 sm:grid-cols-2">
                            <Input
                                label="Email"
                                value={email}
                                onChange={setEmail}
                                placeholder="organizer@example.com"
                                type="email"
                            />

                            <Input
                                label="Instagram"
                                value={instagram}
                                onChange={setInstagram}
                                placeholder="@username"
                            />

                            <Input
                                label="Discord"
                                value={discord}
                                onChange={setDiscord}
                                placeholder="Discord username / server"
                            />

                            <Input
                                label="Telegram"
                                value={telegram}
                                onChange={setTelegram}
                                placeholder="@username"
                            />
                        </div>
                    </section>

                    {/* Description */}
                    <section className="border border-white/10 bg-white/[0.025] p-6 sm:p-7">
                        <SectionTitle number="03" title="Description" />

                        <Textarea
                            label="Organizer Description"
                            value={description}
                            onChange={setDescription}
                            placeholder="Write a short description about this organizer..."
                            rows={5}
                        />
                    </section>

                    {/* Verification */}
                    <section className="border border-white/10 bg-white/[0.025] p-6 sm:p-7">
                        <SectionTitle number="04" title="Verification" />

                        <div className="flex items-center justify-between border border-white/10 bg-black/30 p-4">
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Verified Organizer
                                </p>

                                <p className="mt-1 text-xs text-white/40">
                                    Mark this organizer as verified.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsVerified((prev) => !prev)
                                }
                                className={`relative h-6 w-11 transition ${isVerified
                                        ? "bg-white"
                                        : "bg-white/10"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 h-4 w-4 transition ${isVerified
                                            ? "left-6 bg-black"
                                            : "left-1 bg-white/40"
                                        }`}
                                />
                            </button>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() =>
                                navigate(`/organizers/${id}`)
                            }
                            className="border border-white/10 px-6 py-3 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting
                                ? "Updating..."
                                : "Update Organizer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateOrganizer;

/* ---------------- Components ---------------- */

const SectionTitle = ({
    number,
    title,
}: {
    number: string;
    title: string;
}) => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3">
                <span className="text-xs tracking-widest text-white/25">
                    {number}
                </span>

                <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
                    {title}
                </h2>
            </div>
        </div>
    );
};

const Input = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
}) => {
    return (
        <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-white/35">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/25"
            />
        </div>
    );
};

const Textarea = ({
    label,
    value,
    onChange,
    placeholder,
    rows = 4,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
}) => {
    return (
        <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-white/35">
                {label}
            </label>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full resize-none border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-white/25"
            />
        </div>
    );
};
