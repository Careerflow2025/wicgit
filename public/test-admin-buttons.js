// Test script for admin dashboard functionality
console.log('🧪 ADMIN DASHBOARD TEST SCRIPT LOADED');

// Function to check current localStorage state
window.checkAdminData = function() {
  console.log('\n=== CURRENT ADMIN DATA ===');
  console.log('submittedBusinesses:', JSON.parse(localStorage.getItem('submittedBusinesses') || '[]'));
  console.log('businessGroups:', JSON.parse(localStorage.getItem('businessGroups') || '[]'));
  console.log('approvedBusinesses:', JSON.parse(localStorage.getItem('approvedBusinesses') || '[]'));
  console.log('approvedBusinessGroups:', JSON.parse(localStorage.getItem('approvedBusinessGroups') || '[]'));
  console.log('============================\n');
};

// Function to create test individual business
window.createTestBusiness = function() {
  const testBusiness = {
    id: 'test-individual-' + Date.now(),
    name: 'Test Individual Business',
    category: 'Food & Dining',
    email: 'test@business.com',
    phone: '1234567890',
    address: 'Test Address',
    website: 'https://test.com',
    description: 'This is a test business',
    addedDate: new Date().toISOString(),
    isGroupMember: false
  };
  
  const existing = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
  existing.push(testBusiness);
  localStorage.setItem('submittedBusinesses', JSON.stringify(existing));
  
  console.log('✅ Created test individual business:', testBusiness.id);
  window.location.reload();
};

// Function to create test business group
window.createTestGroup = function() {
  const groupId = 'test-group-' + Date.now();
  
  // Create group
  const testGroup = {
    id: groupId,
    owner: {
      name: 'Test Group Owner',
      email: 'owner@testgroup.com',
      phone: '1234567890',
      bio: 'This is a test group owner'
    },
    submittedAt: new Date().toISOString()
  };
  
  // Create businesses for the group
  const testBusinesses = [
    {
      id: 'test-business-1-' + Date.now(),
      name: 'Test Business 1',
      category: 'Food & Dining',
      address: 'Test Address 1',
      website: 'https://test1.com',
      description: 'First test business in group',
      businessPhone: '1111111111',
      businessEmail: 'business1@test.com',
      addedDate: new Date().toISOString(),
      isGroupMember: true,
      groupId: groupId
    },
    {
      id: 'test-business-2-' + Date.now(),
      name: 'Test Business 2',
      category: 'Services',
      address: 'Test Address 2',
      website: 'https://test2.com',
      description: 'Second test business in group',
      businessPhone: '2222222222',
      businessEmail: 'business2@test.com',
      addedDate: new Date().toISOString(),
      isGroupMember: true,
      groupId: groupId
    }
  ];
  
  // Save group
  const existingGroups = JSON.parse(localStorage.getItem('businessGroups') || '[]');
  existingGroups.push(testGroup);
  localStorage.setItem('businessGroups', JSON.stringify(existingGroups));
  
  // Save businesses
  const existingBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
  existingBusinesses.push(...testBusinesses);
  localStorage.setItem('submittedBusinesses', JSON.stringify(existingBusinesses));
  
  console.log('✅ Created test business group:', groupId);
  console.log('✅ Created test businesses:', testBusinesses.map(b => b.id));
  window.location.reload();
};

// Function to clear all data
window.clearAllData = function() {
  localStorage.removeItem('submittedBusinesses');
  localStorage.removeItem('businessGroups');
  localStorage.removeItem('approvedBusinesses');
  localStorage.removeItem('approvedBusinessGroups');
  console.log('🗑️ All admin data cleared');
  window.location.reload();
};

// Function to test approve individual business
window.testApproveIndividual = function(businessId) {
  if (!businessId) {
    const businesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
    const individual = businesses.find(b => !b.isGroupMember);
    if (individual) {
      businessId = individual.id;
      console.log('Using first individual business:', businessId);
    } else {
      console.log('No individual businesses found. Creating one...');
      createTestBusiness();
      return;
    }
  }
  
  console.log('🧪 Testing approve individual business:', businessId);
  
  // Simulate the approve function
  const businesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
  const business = businesses.find(b => b.id === businessId);
  
  if (business) {
    // Move to approved
    const approved = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
    approved.push(business);
    localStorage.setItem('approvedBusinesses', JSON.stringify(approved));
    
    // Remove from pending
    const updated = businesses.filter(b => b.id !== businessId);
    localStorage.setItem('submittedBusinesses', JSON.stringify(updated));
    
    console.log('✅ Business approved successfully!');
    window.location.reload();
  } else {
    console.log('❌ Business not found!');
  }
};

// Function to test approve business group
window.testApproveGroup = function(groupId) {
  if (!groupId) {
    const groups = JSON.parse(localStorage.getItem('businessGroups') || '[]');
    if (groups.length > 0) {
      groupId = groups[0].id;
      console.log('Using first group:', groupId);
    } else {
      console.log('No groups found. Creating one...');
      createTestGroup();
      return;
    }
  }
  
  console.log('🧪 Testing approve business group:', groupId);
  
  // Get group and its businesses
  const groups = JSON.parse(localStorage.getItem('businessGroups') || '[]');
  const group = groups.find(g => g.id === groupId);
  const businesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
  const groupBusinesses = businesses.filter(b => b.groupId === groupId);
  
  if (group && groupBusinesses.length > 0) {
    // Move businesses to approved
    const approved = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
    approved.push(...groupBusinesses);
    localStorage.setItem('approvedBusinesses', JSON.stringify(approved));
    
    // Move group to approved
    const approvedGroups = JSON.parse(localStorage.getItem('approvedBusinessGroups') || '[]');
    approvedGroups.push(group);
    localStorage.setItem('approvedBusinessGroups', JSON.stringify(approvedGroups));
    
    // Remove from pending
    const updatedBusinesses = businesses.filter(b => b.groupId !== groupId);
    localStorage.setItem('submittedBusinesses', JSON.stringify(updatedBusinesses));
    
    const updatedGroups = groups.filter(g => g.id !== groupId);
    localStorage.setItem('businessGroups', JSON.stringify(updatedGroups));
    
    console.log('✅ Group approved successfully!');
    console.log('✅ Moved', groupBusinesses.length, 'businesses to approved');
    window.location.reload();
  } else {
    console.log('❌ Group or businesses not found!');
  }
};

// Display available functions
console.log('\n🧪 AVAILABLE TEST FUNCTIONS:');
console.log('- checkAdminData() - Check current localStorage state');
console.log('- createTestBusiness() - Create a test individual business');
console.log('- createTestGroup() - Create a test business group');
console.log('- clearAllData() - Clear all admin data');
console.log('- testApproveIndividual(businessId) - Test approving individual business');
console.log('- testApproveGroup(groupId) - Test approving business group');
console.log('\n💡 TIP: Run checkAdminData() first to see current state'); 