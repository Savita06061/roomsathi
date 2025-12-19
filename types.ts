
export enum RoomType {
  GIRLS = 'Girls Room',
  SINGLE = 'Single Room',
  FAMILY = 'Family Room',
  BACHELOR = 'Bachelor Room',
}

export type Language = 'EN' | 'HI';

export type ListingStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Listing {
  id: string;
  type: RoomType;
  rentPrice: number;
  locality: string;
  address: string;
  amenities: string[];
  contactPerson: string;
  contactNumber: string;
  imageUrl: string;
  isVerified: boolean;
  status: ListingStatus; // New field for approval workflow
  ownerId?: string;
}

export interface Booking {
  id: string;
  listingId: string;
  customerName: string;
  customerPhone: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
  listingDetails?: Listing;
}

export interface FilterState {
  maxPrice: number;
  roomType: RoomType | 'ALL';
  locality: string | 'ALL';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export type ViewState = 'LANDING' | 'ADMIN' | 'CUSTOMER' | 'OWNER';
