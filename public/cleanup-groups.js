// Business Group Cleanup Script
// Run this in browser console to remove all group-related data

function cleanupBusinessGroups() {
  console.log('🧹 Starting business group cleanup...');
  
  try {
    // Remove all group-related localStorage items
    const keysToRemove = [
      'businessGroups',
      'approvedBusinessGroups',
      'debug_data',
      'temp_data'
    ];
    
    keysToRemove.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
        console.log(`✅ Removed ${key} from localStorage`);
      }
    });
    
    // Clean up businesses - remove group-related fields
    const submittedBusinesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
    const approvedBusinesses = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
    
    // Clean submitted businesses
    const cleanedSubmitted = submittedBusinesses.map(business => {
      const cleaned = { ...business };
      delete cleaned.isGroupMember;
      delete cleaned.groupId;
      delete cleaned.businessPhone;
      delete cleaned.businessEmail;
      return cleaned;
    });
    
    // Clean approved businesses
    const cleanedApproved = approvedBusinesses.map(business => {
      const cleaned = { ...business };
      delete cleaned.isGroupMember;
      delete cleaned.groupId;
      delete cleaned.businessPhone;
      delete cleaned.businessEmail;
      return cleaned;
    });
    
    // Save cleaned data
    localStorage.setItem('submittedBusinesses', JSON.stringify(cleanedSubmitted));
    localStorage.setItem('approvedBusinesses', JSON.stringify(cleanedApproved));
    
    console.log('✅ Cleaned group-related fields from businesses');
    console.log(`📊 Submitted businesses: ${cleanedSubmitted.length}`);
    console.log(`📊 Approved businesses: ${cleanedApproved.length}`);
    
    // Show final storage status
    console.log('\n📋 Final localStorage status:');
    console.log('- businessGroups:', localStorage.getItem('businessGroups') ? 'EXISTS' : 'REMOVED');
    console.log('- approvedBusinessGroups:', localStorage.getItem('approvedBusinessGroups') ? 'EXISTS' : 'REMOVED');
    console.log('- submittedBusinesses:', localStorage.getItem('submittedBusinesses') ? `${JSON.parse(localStorage.getItem('submittedBusinesses')).length} items` : 'EMPTY');
    console.log('- approvedBusinesses:', localStorage.getItem('approvedBusinesses') ? `${JSON.parse(localStorage.getItem('approvedBusinesses')).length} items` : 'EMPTY');
    
    console.log('\n🎉 Group cleanup completed successfully!');
    console.log('💡 Refresh the page to see the changes');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

// Run the cleanup
cleanupBusinessGroups(); 