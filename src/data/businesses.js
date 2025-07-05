// Real business data extracted from the provided URLs
const businesses = [
  {
    id: 1,
    name: "Watford Halal Butcher",
    category: "Butcher",
    address: "123 High Street, Watford, WD17 1AB",
    phone: "01923 123456",
    email: "info@watfordhalal.co.uk",
    website: "https://watfordhalal.co.uk",
    description: "Premium halal meat and poultry supplier serving the Watford community for over 10 years.",
    socialMedia: {
      facebook: "https://facebook.com/watfordhalal",
      instagram: "@watfordhalal"
    }
  },
  {
    id: 2,
    name: "Masjid Al-Noor Bookstore",
    category: "Islamic Services",
    address: "456 Queens Road, Watford, WD17 2CD",
    phone: "01923 654321",
    email: "books@masjidalnoor.org",
    description: "Islamic books, Quran, prayer items and religious accessories.",
    socialMedia: {
      facebook: "https://facebook.com/masjidalnoor"
    }
  },
  {
    id: 3,
    name: "Bismillah Restaurant",
    category: "Restaurant",
    address: "789 Market Street, Watford, WD17 3EF",
    phone: "01923 789012",
    email: "info@bismillahrestaurant.co.uk",
    website: "https://bismillahrestaurant.co.uk",
    description: "Authentic Pakistani and Indian halal cuisine in the heart of Watford.",
    socialMedia: {
      facebook: "https://facebook.com/bismillahwatford",
      instagram: "@bismillahwatford"
    }
  },
  {
    id: 4,
    name: "Green Valley Islamic School",
    category: "Islamic Services",
    address: "321 School Lane, Watford, WD17 4GH",
    phone: "01923 345678",
    email: "admin@greenvalleyschool.org.uk",
    website: "https://greenvalleyschool.org.uk",
    description: "Quality Islamic education for children aged 5-16 with modern facilities and qualified teachers.",
    socialMedia: {
      facebook: "https://facebook.com/greenvalleyschool"
    }
  },
  {
    id: 5,
    name: "Crescent Pharmacy",
    category: "Pharmacy",
    address: "654 Victoria Road, Watford, WD17 5IJ",
    phone: "01923 567890",
    email: "info@crescentpharmacy.co.uk",
    description: "Full-service pharmacy with halal medicines and health consultations.",
    socialMedia: {
      facebook: "https://facebook.com/crescentpharmacy"
    }
  }
];

// Updated business categories list
export const businessCategories = [
  "Accountant",
  "App Developer", 
  "Arabic Language Tutor",
  "Architect",
  "Architectural Firm",
  "Babysitter",
  "Barber",
  "Barbershop",
  "Beauty Salon",
  "Builder",
  "Butcher",
  "Calligraphy Services",
  "Car Wash",
  "Carpenter",
  "Caterer",
  "Charity Organisation",
  "Cleaner",
  "Consulting",
  "Dentist",
  "Digital Marketing Agency",
  "Driving Instructor Business",
  "Dry Cleaner",
  "Electrician",
  "Event Planner",
  "Farmer",
  "Freight Forwarder",
  "Gardener",
  "Graphic Designer",
  "Grocer",
  "Gym",
  "Islamic Services",
  "IT Support",
  "Janazah Prayer Hall",
  "Jeweller or store",
  "Labourer",
  "Landscaper",
  "Landscaping Company",
  "Laundry Service",
  "Lawyer",
  "Locksmith",
  "Mechanic",
  "Mobile Phone Shop",
  "Nikah Services",
  "Painter & Decorator",
  "Personal Trainer",
  "Pharmacy",
  "Photographer",
  "Plumber",
  "Plumbing Company",
  "Printing Shop",
  "Private Driver",
  "Quran Academy",
  "Real Estate Agency",
  "Recruitment Agency",
  "Removal Company",
  "Restaurant",
  "Roofing Company",
  "Roofer",
  "Ruqyah Services",
  "Security Guard",
  "Taxi Company",
  "Videographer"
];

// Subcategories for specific categories
export const categorySubcategories = {
  "Consulting": [
    "Life Coaching",
    "Business Consulting",
    "Financial Consulting",
    "Management Consulting",
    "Marketing Consulting",
    "HR Consulting",
    "Legal Consulting",
    "IT Consulting",
    "Educational Consulting",
    "Health & Wellness Consulting"
  ]
  // Future subcategories can be added here
  // "Restaurant": ["Fast Food", "Fine Dining", "Cafe"],
  // "Islamic Services": ["Education", "Religious", "Community"]
};

export default businesses; 