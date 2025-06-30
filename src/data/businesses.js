// Real business data extracted from the provided URLs
const businesses = [];

// Categories for the dropdown (expanded, no duplicates, sorted)
const additionalCategories = [
  "Gym", "Recruitment Agency", "Travel Agency", "Daycare Centre", "Pharmacy", "Supermarket", "Mini Market", "Clinic", "Dental Clinic", "Real Estate Agency", "Event Venue", "Event Catering", "Shawarma Shop", "Mobile Phone Shop", "Mobile Repair Shop", "Beauty Salon", "Barbershop", "Car Dealership", "Used Car Dealer", "Mechanic Garage", "Driving School", "Pet Store", "Fish Market", "Tailor Shop", "Dry Cleaner", "Ice Cream Shop", "Juice Bar", "Optical Shop", "Furniture Store", "Electronics Store", "Gift Shop", "Jewellery Store", "Hardware Store", "Building Supplies", "Medical Equipment Supplier", "Printing Shop", "Signage & Banners", "Internet Café", "Software Company", "Digital Marketing Agency", "Cleaning Company", "Construction Company", "Courier Service", "Logistics Company", "Taxi Company", "Car Rental", "Security Company", "Waste Removal", "Laundry Service", "Tutor Centre", "Online Retailer", "Packaging Supplier", "Tea Shop", "Café", "Restaurant", "Burger Shop", "Bookstore", "Stationery Shop", "Accounting Firm", "Legal Firm", "Immigration Consultant", "Insurance Broker", "Garage Door Installer", "Locksmith", "Plumbing Company", "Electrical Contractor", "Roofing Company", "Landscaping Company", "Architectural Firm", "Engineering Firm", "Photography Studio", "Videography Studio", "Media Company", "Charity Organisation", "NGO", "Construction Supplies", "CCTV Installer", "Home Decor Store", "Kitchen Installer", "Bathroom Fitter", "Tiling Company", "Flooring Installer", "Painter & Decorator", "Window Cleaning Service", "Solar Panel Installer", "Event Planner", "Wedding Planner", "Maternity Care Service", "Personal Trainer Business", "Massage Therapy Centre", "Chiropractic Clinic", "Cosmetic Clinic", "Nutritionist Practice", "Mental Health Clinic", "Language School", "Driving Instructor Business", "Consultancy Firm", "Freight Forwarder", "Halal Butcher", "Bakery", "Cake Shop", "Clothing Brand", "Perfume Shop"
];

const baseCategories = [
  "Accountant", "Architect", "Artist", "Auto Mechanic", "Babysitter", "Baker", "Barber", "Builder", "Butcher", "Carpenter", "Caterer", "Cleaner", "Consultant", "Contractor", "Courier", "Decorator", "Dentist", "Designer", "Doctor", "Driver", "Electrician", "Engineer", "Event Planner", "Farmer", "Florist", "Gardener", "Grocer", "Hairdresser", "Handyman", "Home Tutor", "IT Support", "Jeweller", "Labourer", "Landscaper", "Lawyer", "Makeup Artist", "Mechanic", "Mobile Repair", "Mover", "Nutritionist", "Optician", "Painter", "Personal Trainer", "Pharmacist", "Photographer", "Plumber", "Real Estate Agent", "Recruiter", "Reflexologist", "Restaurant", "Security Guard", "Shoe Repair", "Software Developer", "Tailor", "Taxi Service", "Teacher", "Technician", "Therapist", "Tiler", "Translator", "Travel Agent", "Tutor", "Veterinarian", "Videographer", "Waiter", "Web Developer", "Welder", "Writer",
  // Previous expansion
  "Advertising Agency", "App Developer", "Beauty Salon", "Bookkeeper", "Car Dealership", "Car Rental", "Car Wash", "Charity", "Chef", "Chiropractor", "Clothing Store", "Coach", "Dance Instructor", "Data Entry", "Dog Walker", "Driving School", "Dry Cleaner", "Fabric Shop", "Fashion Stylist", "Financial Advisor", "Fisherman", "Freelancer", "Furniture Maker", "Graphic Designer", "Hardware Store", "Health Coach", "HVAC Specialist", "Interior Designer", "Marketing Agency", "Massage Therapist", "Musician", "Nail Technician", "Online Store", "Pet Groomer", "Physiotherapist", "Print Shop", "Private Driver", "Roofer", "Social Media Manager", "Tattoo Artist", "Upholsterer", "Wedding Planner"
];

const allCategoriesSet = new Set(baseCategories.map(c => c.trim().toLowerCase()));
for (const cat of additionalCategories) {
  if (!allCategoriesSet.has(cat.trim().toLowerCase())) {
    baseCategories.push(cat);
    allCategoriesSet.add(cat.trim().toLowerCase());
  }
}

export const businessCategories = baseCategories.sort((a, b) => a.localeCompare(b));

export default businesses; 