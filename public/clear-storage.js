// Script to clear localStorage and fix quota issues
console.log('🧹 STORAGE CLEANUP SCRIPT LOADED');

// Function to check current storage usage
window.checkStorageUsage = function() {
  let totalSize = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += localStorage[key].length + key.length;
    }
  }
  
  console.log('📊 Storage Usage:');
  console.log('Total size:', Math.round(totalSize / 1024), 'KB');
  console.log('Estimated limit: ~5-10MB');
  
  // Show size of each item
  const items = [];
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const size = localStorage[key].length + key.length;
      items.push({ key, size: Math.round(size / 1024) });
    }
  }
  
  items.sort((a, b) => b.size - a.size);
  console.table(items);
  
  return { totalSize, items };
};

// Function to clear debug and temporary data
window.clearDebugData = function() {
  const keysToRemove = [
    'debug_data',
    'temp_data', 
    'test_data',
    'console_logs',
    'debug_logs'
  ];
  
  let cleared = 0;
  keysToRemove.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      cleared++;
      console.log('🗑️ Removed:', key);
    }
  });
  
  console.log(`✅ Cleared ${cleared} debug items`);
  return cleared;
};

// Function to clean and optimize business data
window.optimizeBusinessData = function() {
  console.log('🔧 Optimizing business data...');
  
  // Clean submitted businesses
  const submitted = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
  const cleanedSubmitted = submitted.map(business => ({
    id: business.id,
    name: business.name,
    category: business.category,
    email: business.email,
    phone: business.phone,
    address: business.address,
    website: business.website,
    description: business.description,
    addedDate: business.addedDate,
    isGroupMember: business.isGroupMember,
    groupId: business.groupId,
    businessPhone: business.businessPhone,
    businessEmail: business.businessEmail
    // Remove logo to save space if it's large
  }));
  
  // Clean approved businesses - keep only recent 50
  const approved = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
  const recentApproved = approved.slice(-50).map(business => ({
    id: business.id,
    name: business.name,
    category: business.category,
    email: business.email,
    phone: business.phone,
    address: business.address,
    website: business.website,
    description: business.description,
    addedDate: business.addedDate,
    isGroupMember: business.isGroupMember,
    groupId: business.groupId,
    businessPhone: business.businessPhone,
    businessEmail: business.businessEmail
  }));
  
  try {
    localStorage.setItem('submittedBusinesses', JSON.stringify(cleanedSubmitted));
    localStorage.setItem('approvedBusinesses', JSON.stringify(recentApproved));
    
    console.log('✅ Optimized business data');
    console.log('📝 Submitted businesses:', cleanedSubmitted.length);
    console.log('📝 Approved businesses:', recentApproved.length, '(kept recent 50)');
    
    return true;
  } catch (e) {
    console.error('❌ Failed to optimize:', e);
    return false;
  }
};

// Function to completely reset admin data
window.resetAdminData = function() {
  const confirm = prompt('Type "RESET" to completely clear all admin data:');
  if (confirm === 'RESET') {
    localStorage.removeItem('submittedBusinesses');
    localStorage.removeItem('businessGroups');
    localStorage.removeItem('approvedBusinesses');
    localStorage.removeItem('approvedBusinessGroups');
    
    console.log('🔥 All admin data cleared!');
    window.location.reload();
  } else {
    console.log('❌ Reset cancelled');
  }
};

// Function to fix quota exceeded error
window.fixQuotaError = function() {
  console.log('🔧 Fixing quota exceeded error...');
  
  // Step 1: Clear debug data
  clearDebugData();
  
  // Step 2: Optimize business data
  const optimized = optimizeBusinessData();
  
  if (optimized) {
    console.log('✅ Quota error should be fixed!');
    console.log('💡 Try the approve buttons again');
    
    // Check storage usage after cleanup
    checkStorageUsage();
  } else {
    console.log('❌ Still having issues. Try resetAdminData() for complete reset');
  }
};

// Auto-run basic cleanup
console.log('🚀 Running automatic cleanup...');
clearDebugData();

// Display available functions
console.log('\n🛠️ AVAILABLE FUNCTIONS:');
console.log('- checkStorageUsage() - Check current localStorage usage');
console.log('- clearDebugData() - Clear debug and temporary data');
console.log('- optimizeBusinessData() - Clean and optimize business data');
console.log('- fixQuotaError() - Fix quota exceeded error (recommended)');
console.log('- resetAdminData() - Complete reset (last resort)');
console.log('\n💡 TIP: Run fixQuotaError() to fix the approve button issue'); 