// Fix business group duplication issue
console.log('🔧 Fixing business group duplicates...');

// Get current data
const submittedBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
const approvedBusinesses = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
const businessGroups = JSON.parse(localStorage.getItem('businessGroups') || '[]');
const approvedGroups = JSON.parse(localStorage.getItem('approvedBusinessGroups') || '[]');

console.log('📊 Current state:');
console.log('- Submitted businesses:', submittedBusinesses.length);
console.log('- Approved businesses:', approvedBusinesses.length);
console.log('- Business groups (pending):', businessGroups.length);
console.log('- Approved groups:', approvedGroups.length);

// Step 1: Identify duplicates by name and groupId
console.log('\n🔍 Analyzing business duplicates...');

// Create a map to track unique businesses by name+groupId combination
const uniqueApprovedBusinesses = [];
const seenBusinesses = new Map();

approvedBusinesses.forEach(business => {
  const key = `${business.name.toLowerCase()}-${business.groupId || 'individual'}`;
  
  if (!seenBusinesses.has(key)) {
    seenBusinesses.set(key, true);
    uniqueApprovedBusinesses.push(business);
  } else {
    console.log('❌ Removing duplicate:', business.name, 'groupId:', business.groupId);
  }
});

console.log(`✅ Removed ${approvedBusinesses.length - uniqueApprovedBusinesses.length} duplicate businesses`);

// Step 2: Fix group business counts
console.log('\n🔧 Fixing group business counts...');

approvedGroups.forEach(group => {
  const actualBusinesses = uniqueApprovedBusinesses.filter(b => b.groupId === group.id);
  console.log(`📁 Group "${group.owner.name}": Expected ${group.businesses ? group.businesses.length : 0}, Found ${actualBusinesses.length}`);
  
  // Update the group's business list to match reality
  group.businesses = actualBusinesses.map(b => b.name);
});

// Step 3: Remove any orphaned group businesses
console.log('\n🧹 Cleaning up orphaned businesses...');
const validGroupIds = new Set(approvedGroups.map(g => g.id));
const cleanedBusinesses = uniqueApprovedBusinesses.filter(business => {
  if (business.isGroupMember && business.groupId) {
    if (!validGroupIds.has(business.groupId)) {
      console.log('❌ Removing orphaned business:', business.name, 'from invalid group:', business.groupId);
      return false;
    }
  }
  return true;
});

console.log(`✅ Cleaned ${uniqueApprovedBusinesses.length - cleanedBusinesses.length} orphaned businesses`);

// Step 4: Ensure each business has a unique ID
console.log('\n🆔 Ensuring unique business IDs...');
const idMap = new Map();
cleanedBusinesses.forEach((business, index) => {
  if (idMap.has(business.id)) {
    console.log('❌ Duplicate ID found:', business.id, 'for business:', business.name);
    business.id = `business-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
    console.log('✅ New ID assigned:', business.id);
  }
  idMap.set(business.id, true);
});

// Step 5: Save the cleaned data
console.log('\n💾 Saving cleaned data...');
try {
  localStorage.setItem('approvedBusinesses', JSON.stringify(cleanedBusinesses));
  localStorage.setItem('approvedBusinessGroups', JSON.stringify(approvedGroups));
  
  console.log('✅ Data saved successfully!');
  console.log('📊 Final counts:');
  console.log('- Cleaned approved businesses:', cleanedBusinesses.length);
  console.log('- Updated approved groups:', approvedGroups.length);
  
  // Verify each group
  approvedGroups.forEach(group => {
    const groupBusinesses = cleanedBusinesses.filter(b => b.groupId === group.id);
    console.log(`📁 Group "${group.owner.name}": ${groupBusinesses.length} businesses`);
  });
  
  console.log('\n🎉 Fix completed! Refresh the page to see the changes.');
  
} catch (error) {
  console.error('❌ Error saving data:', error);
  alert('Storage quota exceeded! Please clear some data first.');
}

// Quick test function
window.testGroupData = function() {
  const groups = JSON.parse(localStorage.getItem('approvedBusinessGroups') || '[]');
  const businesses = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
  
  console.log('📊 Group Test Results:');
  groups.forEach(group => {
    const groupBusinesses = businesses.filter(b => b.groupId === group.id);
    console.log(`Group "${group.owner.name}": ${groupBusinesses.length} businesses`);
    groupBusinesses.forEach(b => console.log(`  - ${b.name}`));
  });
};

console.log('\n📝 To test results, run: testGroupData()'); 