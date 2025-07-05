// Migration script to approve existing businesses and groups
// Paste this into your browser console to migrate old data to new structure

console.log('🔄 Starting business migration...');

// Step 1: Check current data
const submittedBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
const approvedBusinesses = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
const businessGroups = JSON.parse(localStorage.getItem('businessGroups') || '[]');
const approvedGroups = JSON.parse(localStorage.getItem('approvedBusinessGroups') || '[]');

console.log('📊 Current data:');
console.log('- Submitted businesses:', submittedBusinesses.length);
console.log('- Approved businesses:', approvedBusinesses.length);
console.log('- Submitted groups:', businessGroups.length);
console.log('- Approved groups:', approvedGroups.length);

// Step 2: Create Shabazz group if it doesn't exist
const shabazzGroupId = 'shabazz-group-' + Date.now();
const shabazzGroup = {
  id: shabazzGroupId,
  owner: {
    name: 'Shabazz Owner',
    email: 'shabazz@example.com',
    phone: '0682066215',
    bio: 'Owner of multiple businesses in the Shabazz group',
    photo: null
  },
  businesses: ['cagefit gyms', 'Locummeds', 'mosque zawaj', 'Reda test'],
  createdDate: new Date().toISOString().split('T')[0]
};

// Step 3: Create/migrate the visible businesses to approved status
const businessesToApprove = [
  {
    id: 'business-cagefit-' + Date.now(),
    name: 'cagefit gyms',
    category: 'GYM',
    description: 'Professional fitness center with modern equipment',
    address: 'Roudani edas',
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
    id: 'business-locummeds-' + Date.now(),
    name: 'Locummeds',
    category: 'RECRUITMENT AGENCY',
    description: 'Medical recruitment and staffing solutions',
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
    id: 'business-mosque-' + Date.now(),
    name: 'mosque zawaj',
    category: 'ISLAMIC WEDDING SERVICES',
    description: 'Islamic wedding and marriage services',
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
    id: 'business-reda-' + Date.now(),
    name: 'Reda test',
    category: 'ACCOUNTING FIRM',
    description: 'Professional accounting and financial services',
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
  }
];

// Step 4: Migrate data
console.log('✅ Creating Shabazz business group...');

// Add group to approved groups
const updatedApprovedGroups = [...approvedGroups, shabazzGroup];
localStorage.setItem('approvedBusinessGroups', JSON.stringify(updatedApprovedGroups));

console.log('✅ Approving Shabazz businesses...');

// Add businesses to approved businesses
const updatedApprovedBusinesses = [...approvedBusinesses, ...businessesToApprove];
localStorage.setItem('approvedBusinesses', JSON.stringify(updatedApprovedBusinesses));

console.log('🎉 Migration completed!');
console.log('📊 New data:');
console.log('- Approved businesses:', updatedApprovedBusinesses.length);
console.log('- Approved groups:', updatedApprovedGroups.length);
console.log('');
console.log('✨ The Shabazz group businesses are now approved and should appear in the directory with working group icons!');
console.log('🔄 Please refresh the page to see the changes');
console.log('');
console.log('🎯 Group ID for testing:', shabazzGroupId);

// Return group data for testing
window.shabazzGroupData = shabazzGroup;
window.shabazzBusinesses = businessesToApprove;

console.log('📝 You can also test the group popup by running: testGroupPopup()');

return {
  groupId: shabazzGroupId,
  group: shabazzGroup,
  businesses: businessesToApprove
}; 