
import { Listing, RoomType, Review } from './types';

export const LOCALITIES = [
  'SILICON VALLEY',
  'LONDON HUB',
  'DUBAI CORE',
  'TOKYO REACH'
];

export const APP_PRIMARY_COLOR = 'orange-600';
export const APP_SECONDARY_COLOR = 'orange-100';

const generateListings = (): Listing[] => {
  const listings: Listing[] = [];
  let idCounter = 1;

  const amenitiesOptions = [
    ['24x7 Water', 'Shared Washroom', 'Fan', 'Wi-Fi'],
    ['Wi-Fi', 'Parking', 'RO Water', 'CCTV'],
    ['CCTV', 'Secure Gate', 'Electricity Included', 'Fan'],
    ['Attached Bath', 'Tile Floor', 'Ventilation', 'RO Water'],
    ['Ground Floor', 'Bike Parking', 'Water Tank', '24x7 Water']
  ];

  const typesPattern = [
    RoomType.SINGLE,
    RoomType.GIRLS,
    RoomType.BACHELOR,
    RoomType.FAMILY,
    RoomType.SINGLE 
  ];

  const reviewTemplates = [
    { author: 'Rahul Patel', rating: 5, comment_en: 'Very clean room and nice locality! WiFi speed is amazing.', comment_hi: 'बहुत साफ रूम है और जगह बहुत बढ़िया है! वाईफाई स्पीड भी लाजवाब है।' },
    { author: 'Priyanka Sen', rating: 4, comment_en: 'Safe hostel for girls, CCTV works 24/7. Landlord is decent.', comment_hi: 'लड़कियों के लिए बहुत सुरक्षित जगह है, सीसीटीवी कैमरे हमेशा चालू रहते हैं। मकान मालिक अच्छे हैं।' },
    { author: 'Amit Sharma', rating: 4, comment_en: 'Value for money, water is available all day. Recommended.', comment_hi: 'पैसे वसूल कमरा है, पानी की कोई कमी नहीं है। बिलकुल रेकमेंड करूँगा।' },
    { author: 'Kirti Verma', rating: 5, comment_en: 'Best place for students. Walking distance to market and main road.', comment_hi: 'छात्रों के लिए सबसे बेस्ट जगह है। मुख्य मार्ग और बाजार पास में ही हैं।' },
    { author: 'Anil Yadav', rating: 3, comment_en: 'Room is good but the shared washroom is sometimes crowded.', comment_hi: 'कमरा अच्छा है लेकिन शेयर्ड वाशरूम में कभी-कभी भीड़ हो जाती है।' },
    { author: 'Neha Jaiswal', rating: 5, comment_en: 'Perfect space for small families, fully ventilated and silent zone.', comment_hi: 'छोटे परिवारों के लिए बेहतरीन हवादार कमरा और शांत इलाका है।' }
  ];

  LOCALITIES.forEach((locality) => {
    for (let i = 0; i < 5; i++) {
      // Vary prices to make filtering interactive
      const baseRent = 1800 + (i * 1200) + ((idCounter % 3) * 400);
      
      // Determine reviews for this room
      const numReviews = 2 + (idCounter % 3); // 2 to 4 reviews per listing
      const instanceReviews: Review[] = [];
      let totalRating = 0;
      
      for (let r = 0; r < numReviews; r++) {
        const templateIdx = (idCounter + r) % reviewTemplates.length;
        const temp = reviewTemplates[templateIdx];
        instanceReviews.push({
          id: `rev_${idCounter}_${r}`,
          author: temp.author,
          rating: temp.rating,
          comment: temp.comment_hi, // default to hindi, can display both or check lang
          date: `2026-05-${10 + r}`
        });
        totalRating += temp.rating;
      }
      const avgRating = Number((totalRating / numReviews).toFixed(1));

      listings.push({
        id: String(idCounter),
        type: typesPattern[i],
        rentPrice: baseRent,
        locality: locality,
        address: `${locality}, Lane No. ${i + 1}, House ${10 + i}`,
        amenities: amenitiesOptions[i],
        contactPerson: `Owner Name ${idCounter}`,
        contactNumber: `98271-${10000 + idCounter}`,
        imageUrl: `https://picsum.photos/400/300?random=${idCounter}`,
        isVerified: i % 2 === 0,
        status: 'APPROVED', // Default mock data as approved
        rating: avgRating,
        reviews: instanceReviews
      });
      idCounter++;
    }
  });

  return listings;
};

export const MOCK_LISTINGS: Listing[] = generateListings();
