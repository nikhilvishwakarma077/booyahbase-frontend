import type { Organizer } from "../types/organizer";

export const demoOrganizers: Organizer[] = [
  {
    _id: "org-001",
    name: "Booyah Esports",
    whatsappNumber: "+919876543210",
    contactInformation: {
      email: "contact@booyaheSports.com",
      instagram: "@booyaheSports",
      discord: "Booyah Esports",
      telegram: "@booyaheSports",
    },
    description:
      "Free Fire MAX esports organizer hosting regular competitive scrims and tournaments.",
    isVerified: true,
  },
  {
    _id: "org-002",
    name: "Warzone Gaming",
    whatsappNumber: "+919812345678",
    contactInformation: {
      email: "warzonegaming@example.com",
      instagram: "@warzonegaming",
      discord: "Warzone Gaming",
    },
    description:
      "Community-driven Free Fire MAX organizer focused on competitive squad scrims.",
    isVerified: true,
  },
  {
    _id: "org-003",
    name: "Elite Battleground",
    whatsappNumber: "+919998887777",
    contactInformation: {
      instagram: "@elitebattleground",
      telegram: "@elitebattleground",
    },
    description:
      "Competitive gaming organizer conducting premium and elite-level Free Fire MAX matches.",
    isVerified: false,
  },
];