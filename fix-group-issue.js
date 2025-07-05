// Comprehensive fix for group popup issue
// This script will clear conflicting data and set up approved businesses and groups properly

console.log('🔧 Starting comprehensive group fix...');

// Step 1: Clear all existing data to avoid conflicts
console.log('🧹 Clearing existing data...');
localStorage.removeItem('submittedBusinesses');
localStorage.removeItem('approvedBusinesses');
localStorage.removeItem('businessGroups');
localStorage.removeItem('approvedBusinessGroups');

// Step 2: Create the Shabazz group (approved)
const shabazzGroupId = 'shabazz-group-approved';
const shabazzGroup = {
  id: shabazzGroupId,
  owner: {
    name: 'Shabaz Khaliq',
    email: 'shabaz@locummeds.com',
    phone: '0682066215',
    bio: 'Owner of multiple businesses in the Shabazz group',
    photo: null
  },
  businesses: ['cagefit gyms', 'Locummeds', 'mosque zawaj', 'Reda test'],
  createdDate: new Date().toISOString().split('T')[0]
};

console.log('✅ Creating approved Shabazz business group...');

// Step 3: Create approved businesses with proper group linking
const approvedBusinesses = [
  {
    id: 'business-cagefit-approved',
    name: 'cagefit gyms',
    category: 'GYM',
    description: 'Professional fitness center with modern equipment and personal training services',
    address: 'Roudani edas',
    phone: '0682066215',
    email: 'cagefit@example.com',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    logo: null,
    heroImage: null,
    services: [],
    addedDate: new Date().toISOString().split('T')[0],
    isGroupMember: true,
    groupId: shabazzGroupId
  },
  {
    id: 'business-locummeds-approved',
    name: 'Locummeds',
    category: 'RECRUITMENT AGENCY',
    description: 'Medical recruitment and staffing solutions for healthcare professionals',
    address: 'Roudani',
    phone: '0682066215', 
    email: 'shabaz@locummeds.com',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    logo: null,
    heroImage: null,
    services: [],
    addedDate: new Date().toISOString().split('T')[0],
    isGroupMember: true,
    groupId: shabazzGroupId
  },
  {
    id: 'business-mosque-approved',
    name: 'mosque zawaj',
    category: 'ISLAMIC WEDDING SERVICES',
    description: 'Islamic wedding and marriage services for the Muslim community',
    address: 'Roudani',
    phone: '0682066215',
    email: 'mosque@example.com',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    logo: null,
    heroImage: null,
    services: [],
    addedDate: new Date().toISOString().split('T')[0],
    isGroupMember: true,
    groupId: shabazzGroupId
  },
  {
    id: 'business-reda-approved',
    name: 'Reda test',
    category: 'ACCOUNTING FIRM',
    description: 'Professional accounting and financial services for businesses',
    address: 'Roudani',
    phone: '0682066215',
    email: 'ridaapm@gmail.com',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    logo: null,
    heroImage: null,
    services: [],
    addedDate: new Date().toISOString().split('T')[0],
    isGroupMember: true,
    groupId: shabazzGroupId
  },
  {
    id: 'business-coach-approved',
    name: 'test bussiness',
    category: 'COACH',
    description: 'Professional coaching services',
    address: 'Hey Roudari 15',
    phone: '+212584147485',
    email: 'ridaDCZorra@gmail.com',
    website: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    logo: null,
    heroImage: null,
    services: [],
    addedDate: new Date().toISOString().split('T')[0],
    isGroupMember: false,
    groupId: null
  }
];

// Step 4: Save the approved data
console.log('💾 Saving approved businesses and groups...');
localStorage.setItem('approvedBusinesses', JSON.stringify(approvedBusinesses));
localStorage.setItem('approvedBusinessGroups', JSON.stringify([shabazzGroup]));

// Step 5: Initialize empty arrays for submitted data
localStorage.setItem('submittedBusinesses', JSON.stringify([]));
localStorage.setItem('businessGroups', JSON.stringify([]));

console.log('🎉 Fix completed successfully!');
console.log('📊 Final state:');
console.log('- Approved businesses:', approvedBusinesses.length);
console.log('- Approved groups:', 1);
console.log('- Group businesses:', shabazzGroup.businesses.length);

console.log('');
console.log('✨ All businesses are now properly approved and linked to the group!');
console.log('🔄 Please refresh the page to see the working group icons');
console.log('');
console.log('🎯 Group ID:', shabazzGroupId);
console.log('📋 Group businesses:', shabazzGroup.businesses.join(', '));

// Return success status
return {
  success: true,
  groupId: shabazzGroupId,
  businessCount: approvedBusinesses.length,
  groupBusinessCount: shabazzGroup.businesses.length
}; 