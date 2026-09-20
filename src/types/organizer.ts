export interface IContactInformation {
    email?: string;
    instagram?: string;
    discord?: string;
    telegram?: string;
}

export interface IOrganizer {
    _id: string;
    name: string;
    whatsappNumber: string;
    orgImg: string;
    contactInformation?: IContactInformation;
    description?: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}