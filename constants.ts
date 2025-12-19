
import { Listing, RoomType } from './types';

export const LOCALITIES = [
  'Ram Nagar',
  'Siksha Colony',
  'Raj Mahal Chowk',
  'Kailash Nagar'
];

export const APP_PRIMARY_COLOR = 'orange-600';
export const APP_SECONDARY_COLOR = 'orange-100';

const generateListings = (): Listing[] => {
  const listings: Listing[] = [];
  let idCounter = 1;

  const amenitiesOptions = [
    ['24x7 Water', 'Shared Washroom', 'Fan'],
    ['Wi-Fi', 'Parking', 'RO Water'],
    ['CCTV', 'Secure Gate', 'Electricity Included'],
    ['Attached Bath', 'Tile Floor', 'Ventilation'],
    ['Ground Floor', 'Bike Parking', 'Water Tank']
  ];

  const typesPattern = [
    RoomType.SINGLE,
    RoomType.GIRLS,
    RoomType.BACHELOR,
    RoomType.FAMILY,
    RoomType.SINGLE 
  ];

  LOCALITIES.forEach((locality) => {
    for (let i = 0; i < 5; i++) {
      listings.push({
        id: String(idCounter),
        type: typesPattern[i],
        rentPrice: 2000,
        locality: locality,
        address: `${locality}, Lane No. ${i + 1}, House ${10 + i}`,
        amenities: amenitiesOptions[i],
        contactPerson: `Owner Name ${idCounter}`,
        contactNumber: `98271-${10000 + idCounter}`,
        imageUrl: `https://picsum.photos/400/300?random=${idCounter}`,
        isVerified: i % 2 === 0,
        status: 'APPROVED' // Default mock data as approved
      });
      idCounter++;
    }
  });

  return listings;
};

export const MOCK_LISTINGS: Listing[] = generateListings();
