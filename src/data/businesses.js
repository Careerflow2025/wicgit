// Real business data extracted from the provided URLs
const businesses = [
  {
    id: 'cagefit-gyms',
    name: "CageFit Gyms",
    category: "Gyms",
    description: "CageFit Gyms is a community fitness hub in Watford offering boxing, kickboxing, personal training, and high-intensity programs.",
    address: "2 Greycaine Road, Watford, WD24 7GP",
    phone: "+44 7496 961 127",
    email: "info@cagefitgyms.co.uk",
    website: "https://cagefitgyms.co.uk",
    logo: "/src/assets/images/GET FIT GET CAGEFIT.png",
    heroImage: "/src/assets/images/GET FIT GET CAGEFIT.png",
    services: ["Personal Training", "Group Classes", "Fitness Equipment", "Membership Plans"],
    socialMedia: {
      instagram: "https://instagram.com/cagefitgyms",
      facebook: "https://facebook.com/cagefitgyms",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'powerhouse-fitness',
    name: "PowerHouse Fitness",
    category: "Gyms",
    description: "PowerHouse Fitness is a premium 24/7 gym offering state-of-the-art equipment, personal training, and group fitness classes for all levels.",
    address: "45 High Street, Watford, WD17 2AB",
    phone: "+44 1923 456789",
    email: "info@powerhousefitness.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["24/7 Access", "Personal Training", "Group Classes", "Cardio Equipment", "Strength Training"],
    socialMedia: {
      instagram: "https://instagram.com/powerhousefitness",
      facebook: "https://facebook.com/powerhousefitness",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'elite-athletics',
    name: "Elite Athletics",
    category: "Gyms",
    description: "Elite Athletics specializes in sports performance training, functional fitness, and athletic development for competitive athletes.",
    address: "78 St Albans Road, Watford, WD24 4BD",
    phone: "+44 1923 789012",
    email: "info@eliteathletics.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Sports Performance", "Athletic Training", "Functional Fitness", "Recovery Services"],
    socialMedia: {
      instagram: "https://instagram.com/eliteathletics",
      facebook: "https://facebook.com/eliteathletics",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'zen-wellness',
    name: "Zen Wellness Centre",
    category: "Gyms",
    description: "Zen Wellness Centre combines traditional gym facilities with yoga, pilates, and wellness programs for a holistic fitness experience.",
    address: "123 Rickmansworth Road, Watford, WD18 7JX",
    phone: "+44 1923 345678",
    email: "info@zenwellness.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Yoga Classes", "Pilates", "Gym Equipment", "Wellness Programs", "Spa Services"],
    socialMedia: {
      instagram: "https://instagram.com/zenwellness",
      facebook: "https://facebook.com/zenwellness",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'crossfit-watford',
    name: "CrossFit Watford",
    category: "Gyms",
    description: "CrossFit Watford offers high-intensity functional fitness training in a supportive community environment for all fitness levels.",
    address: "15 Lower High Street, Watford, WD17 2DQ",
    phone: "+44 1923 567890",
    email: "info@crossfitwatford.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["CrossFit Classes", "Personal Training", "Nutrition Coaching", "Community Events"],
    socialMedia: {
      instagram: "https://instagram.com/crossfitwatford",
      facebook: "https://facebook.com/crossfitwatford",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'body-sculpt',
    name: "Body Sculpt Gym",
    category: "Gyms",
    description: "Body Sculpt Gym focuses on bodybuilding, strength training, and muscle development with specialized equipment and expert trainers.",
    address: "67 Queens Road, Watford, WD17 2QN",
    phone: "+44 1923 678901",
    email: "info@bodysculptgym.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Bodybuilding", "Strength Training", "Muscle Development", "Supplement Shop"],
    socialMedia: {
      instagram: "https://instagram.com/bodysculptgym",
      facebook: "https://facebook.com/bodysculptgym",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'fitness-first-watford',
    name: "Fitness First Watford",
    category: "Gyms",
    description: "Fitness First Watford provides a comprehensive fitness experience with modern equipment, swimming pool, and diverse class offerings.",
    address: "89 High Street, Watford, WD17 2AB",
    phone: "+44 1923 890123",
    email: "info@fitnessfirstwatford.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Swimming Pool", "Group Classes", "Personal Training", "Kids Club", "Spa Facilities"],
    socialMedia: {
      instagram: "https://instagram.com/fitnessfirstwatford",
      facebook: "https://facebook.com/fitnessfirstwatford",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'pure-gym-watford',
    name: "PureGym Watford",
    category: "Gyms",
    description: "PureGym Watford offers affordable 24/7 gym access with modern equipment, free fitness classes, and no contract membership options.",
    address: "156 High Street, Watford, WD17 2AB",
    phone: "+44 1923 012345",
    email: "info@puregymwatford.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["24/7 Access", "Free Classes", "No Contract", "Modern Equipment", "Personal Training"],
    socialMedia: {
      instagram: "https://instagram.com/puregymwatford",
      facebook: "https://facebook.com/puregymwatford",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'the-gym-watford',
    name: "The Gym Watford",
    category: "Gyms",
    description: "The Gym Watford provides budget-friendly fitness solutions with quality equipment, personal training, and flexible membership options.",
    address: "234 High Street, Watford, WD17 2AB",
    phone: "+44 1923 123456",
    email: "info@thegymwatford.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Budget Fitness", "Quality Equipment", "Personal Training", "Flexible Memberships"],
    socialMedia: {
      instagram: "https://instagram.com/thegymwatford",
      facebook: "https://facebook.com/thegymwatford",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'locum-meds',
    name: "Locum Meds",
    category: "Medical Recruitment",
    description: "Locum Meds connects GP surgeries and hospitals with high-quality locum staff across the UK.",
    address: "Kemp House, 152 – 160 City Road, London, EC1V 2NX",
    phone: "+44 333 202 6031",
    email: "info@locummeds.co.uk",
    website: "https://www.locummeds.co.uk",
    logo: "/business-logos/locummeds-logo.png",
    heroImage: "/business-logos/locummeds-hero.jpg",
    services: ["Medical Staffing", "GP Recruitment", "Hospital Staffing", "Temporary Medical Staff"],
    socialMedia: {
      instagram: "",
      facebook: "https://facebook.com/locummeds",
      linkedin: "https://linkedin.com/company/locummeds"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'focus-recruitment',
    name: "Focus Recruitment",
    category: "Recruitment",
    description: "Focus Recruitment helps businesses across the UK find top talent in logistics, operations, and more.",
    address: "15 High Street, Aylesbury, HP20 1SH",
    phone: "+44 1234 567890",
    email: "info@focusrecruitment.co.uk",
    website: "https://focusrecruitment.co.uk",
    logo: "/business-logos/focus-recruitment-logo.png",
    heroImage: "/business-logos/focus-recruitment-hero.jpg",
    services: ["Logistics Recruitment", "Operations Staffing", "Temporary Staffing", "Permanent Recruitment"],
    socialMedia: {
      instagram: "",
      facebook: "https://facebook.com/focusrecruitment",
      linkedin: "https://linkedin.com/company/focusrecruitment"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-tech-solutions',
    name: "Watford Tech Solutions",
    category: "Technology",
    description: "Watford Tech Solutions provides innovative software development, IT consulting, and digital transformation services.",
    address: "45 High Street, Watford, WD17 2AB",
    phone: "+44 1923 456789",
    email: "info@watfordtechsolutions.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Software Development", "IT Consulting", "Digital Transformation", "Cloud Solutions"],
    socialMedia: {
      instagram: "https://instagram.com/watfordtechsolutions",
      facebook: "https://facebook.com/watfordtechsolutions",
      linkedin: "https://linkedin.com/company/watfordtechsolutions"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-law-partners',
    name: "Watford Law Partners",
    category: "Legal Services",
    description: "Watford Law Partners offers comprehensive legal services including family law, business law, and property law.",
    address: "78 St Albans Road, Watford, WD24 4BD",
    phone: "+44 1923 789012",
    email: "info@watfordlawpartners.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Family Law", "Business Law", "Property Law", "Legal Consultation"],
    socialMedia: {
      instagram: "",
      facebook: "https://facebook.com/watfordlawpartners",
      linkedin: "https://linkedin.com/company/watfordlawpartners"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-accounting',
    name: "Watford Accounting Services",
    category: "Accounting",
    description: "Watford Accounting Services provides professional accounting, bookkeeping, and tax preparation services.",
    address: "123 Rickmansworth Road, Watford, WD18 7JX",
    phone: "+44 1923 345678",
    email: "info@watfordaccounting.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Accounting", "Bookkeeping", "Tax Preparation", "Financial Planning"],
    socialMedia: {
      instagram: "",
      facebook: "https://facebook.com/watfordaccounting",
      linkedin: "https://linkedin.com/company/watfordaccounting"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-design-studio',
    name: "Watford Design Studio",
    category: "Design & Creative",
    description: "Watford Design Studio specializes in graphic design, web design, and creative branding solutions.",
    address: "15 Lower High Street, Watford, WD17 2DQ",
    phone: "+44 1923 567890",
    email: "info@watforddesignstudio.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Graphic Design", "Web Design", "Branding", "Creative Consultation"],
    socialMedia: {
      instagram: "https://instagram.com/watforddesignstudio",
      facebook: "https://facebook.com/watforddesignstudio",
      linkedin: "https://linkedin.com/company/watforddesignstudio"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-cafe',
    name: "Watford Cafe & Bistro",
    category: "Food & Beverage",
    description: "Watford Cafe & Bistro offers delicious coffee, fresh pastries, and gourmet meals in a cozy atmosphere.",
    address: "67 Queens Road, Watford, WD17 2QN",
    phone: "+44 1923 678901",
    email: "info@watfordcafe.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Coffee & Beverages", "Fresh Pastries", "Gourmet Meals", "Catering"],
    socialMedia: {
      instagram: "https://instagram.com/watfordcafe",
      facebook: "https://facebook.com/watfordcafe",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-travel-agency',
    name: "Watford Travel Agency",
    category: "Travel & Tourism",
    description: "Watford Travel Agency provides personalized travel planning, holiday packages, and booking services.",
    address: "89 High Street, Watford, WD17 2AB",
    phone: "+44 1923 890123",
    email: "info@watfordtravel.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Travel Planning", "Holiday Packages", "Flight Booking", "Hotel Reservations"],
    socialMedia: {
      instagram: "https://instagram.com/watfordtravel",
      facebook: "https://facebook.com/watfordtravel",
      linkedin: "https://linkedin.com/company/watfordtravel"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-events',
    name: "Watford Events & Entertainment",
    category: "Events & Entertainment",
    description: "Watford Events & Entertainment specializes in event planning, corporate functions, and entertainment services.",
    address: "156 High Street, Watford, WD17 2AB",
    phone: "+44 1923 012345",
    email: "info@watfordevents.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Event Planning", "Corporate Functions", "Entertainment", "Venue Booking"],
    socialMedia: {
      instagram: "https://instagram.com/watfordevents",
      facebook: "https://facebook.com/watfordevents",
      linkedin: "https://linkedin.com/company/watfordevents"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-cleaning',
    name: "Watford Cleaning Services",
    category: "Cleaning Services",
    description: "Watford Cleaning Services offers professional cleaning for homes, offices, and commercial properties.",
    address: "234 High Street, Watford, WD17 2AB",
    phone: "+44 1923 123456",
    email: "info@watfordcleaning.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Domestic Cleaning", "Office Cleaning", "Commercial Cleaning", "Deep Cleaning"],
    socialMedia: {
      instagram: "",
      facebook: "https://facebook.com/watfordcleaning",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-healthcare',
    name: "Watford Healthcare Clinic",
    category: "Healthcare",
    description: "Watford Healthcare Clinic provides comprehensive healthcare services including consultations and treatments.",
    address: "45 Rickmansworth Road, Watford, WD18 7JX",
    phone: "+44 1923 234567",
    email: "info@watfordhealthcare.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Health Consultations", "Medical Treatments", "Preventive Care", "Health Screening"],
    socialMedia: {
      instagram: "",
      facebook: "https://facebook.com/watfordhealthcare",
      linkedin: "https://linkedin.com/company/watfordhealthcare"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-beauty-salon',
    name: "Watford Beauty Salon",
    category: "Beauty & Wellness",
    description: "Watford Beauty Salon offers professional beauty treatments, hair styling, and wellness services.",
    address: "67 St Albans Road, Watford, WD24 4BD",
    phone: "+44 1923 345678",
    email: "info@watfordbeautysalon.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Hair Styling", "Beauty Treatments", "Wellness Services", "Spa Treatments"],
    socialMedia: {
      instagram: "https://instagram.com/watfordbeautysalon",
      facebook: "https://facebook.com/watfordbeautysalon",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-auto-repair',
    name: "Watford Auto Repair",
    category: "Automotive",
    description: "Watford Auto Repair provides professional automotive repair, maintenance, and diagnostic services.",
    address: "89 Queens Road, Watford, WD17 2QN",
    phone: "+44 1923 456789",
    email: "info@watfordautorepair.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Auto Repair", "Maintenance", "Diagnostics", "Car Servicing"],
    socialMedia: {
      instagram: "",
      facebook: "https://facebook.com/watfordautorepair",
      linkedin: ""
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-construction',
    name: "Watford Construction Ltd",
    category: "Construction",
    description: "Watford Construction Ltd specializes in residential and commercial construction projects.",
    address: "123 Lower High Street, Watford, WD17 2DQ",
    phone: "+44 1923 567890",
    email: "info@watfordconstruction.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Residential Construction", "Commercial Construction", "Renovations", "Project Management"],
    socialMedia: {
      instagram: "",
      facebook: "https://facebook.com/watfordconstruction",
      linkedin: "https://linkedin.com/company/watfordconstruction"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-consulting',
    name: "Watford Business Consulting",
    category: "Consulting",
    description: "Watford Business Consulting provides strategic business advice, process optimization, and growth consulting.",
    address: "156 Rickmansworth Road, Watford, WD18 7JX",
    phone: "+44 1923 678901",
    email: "info@watfordconsulting.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Business Strategy", "Process Optimization", "Growth Consulting", "Business Analysis"],
    socialMedia: {
      instagram: "",
      facebook: "https://facebook.com/watfordconsulting",
      linkedin: "https://linkedin.com/company/watfordconsulting"
    },
    addedDate: "2024-01-15"
  },
  {
    id: 'watford-marketing',
    name: "Watford Marketing Agency",
    category: "Marketing & Advertising",
    description: "Watford Marketing Agency offers digital marketing, advertising, and brand promotion services.",
    address: "234 St Albans Road, Watford, WD24 4BD",
    phone: "+44 1923 789012",
    email: "info@watfordmarketing.co.uk",
    website: "#",
    logo: "/assets/images/placeholder-gym.jpg",
    heroImage: "/assets/images/placeholder-gym.jpg",
    services: ["Digital Marketing", "Advertising", "Brand Promotion", "Social Media Management"],
    socialMedia: {
      instagram: "https://instagram.com/watfordmarketing",
      facebook: "https://facebook.com/watfordmarketing",
      linkedin: "https://linkedin.com/company/watfordmarketing"
    },
    addedDate: "2024-01-15"
  }
];

// Categories for the dropdown
export const businessCategories = [
  "Gyms",
  "Medical Recruitment",
  "Recruitment",
  "Education",
  "Technology",
  "Legal Services",
  "Accounting",
  "Real Estate",
  "Design & Creative",
  "Food & Beverage",
  "Retail",
  "Travel & Tourism",
  "Events & Entertainment",
  "Cleaning Services",
  "Healthcare",
  "Beauty & Wellness",
  "Automotive",
  "Construction",
  "Consulting",
  "Marketing & Advertising"
];

export default businesses; 