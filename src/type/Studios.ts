export interface IStudio {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
    location: string;
    imageUrl: string;
    amenities: string[];
    overview: string;
    ownerName: string;
    ownerEmail: string;
    rating: number;
    reviews: number;
    gallery: string[];
    createdAt: string;
    updatedAt: string;
}

