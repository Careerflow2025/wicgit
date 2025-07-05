// INSTANT FIX FOR DUPLICATE BUSINESSES - RUN THIS NOW!
console.log('🚀 RUNNING INSTANT DUPLICATE FIX...');

try {
  // Get current data
  const approvedBusinesses = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
  const approvedGroups = JSON.parse(localStorage.getItem('approvedBusinessGroups') || '[]');
  
  console.log('📊 Before fix:');
  console.log('- Approved businesses:', approvedBusinesses.length);
  console.log('- Approved groups:', approvedGroups.length);
  
  // Fix 1: Remove duplicate businesses
  const uniqueBusinesses = [];
  const seenBusinessKeys = new Set();
  let duplicatesRemoved = 0;

  approvedBusinesses.forEach((business, index) => {
    const key = `${business.name.toLowerCase()}-${business.groupId || 'individual'}`;
    
    if (!seenBusinessKeys.has(key)) {
      seenBusinessKeys.add(key);
      
      // Ensure unique ID
      if (!business.id || business.id === '') {
        business.id = `business-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
      }
      
      uniqueBusinesses.push(business);
    } else {
      console.log('🗑️ Removing duplicate:', business.name, '(groupId:', business.groupId, ')');
      duplicatesRemoved++;
    }
  });

  // Fix 2: Update group business counts to match reality
  const fixedGroups = approvedGroups.map(group => {
    const actualBusinesses = uniqueBusinesses.filter(b => b.groupId === group.id);
    const originalCount = group.businesses ? group.businesses.length : 0;
    
    if (originalCount !== actualBusinesses.length) {
      console.log(`🔧 Fixing group "${group.owner.name}": ${originalCount} → ${actualBusinesses.length} businesses`);
    }
    
    return {
      ...group,
      businesses: actualBusinesses.map(b => b.name)
    };
  });

  // Fix 3: Remove orphaned businesses (businesses that reference non-existent groups)
  const validGroupIds = new Set(fixedGroups.map(g => g.id));
  const cleanBusinesses = uniqueBusinesses.filter(business => {
    if (business.isGroupMember && business.groupId) {
      if (!validGroupIds.has(business.groupId)) {
        console.log(`🧹 Removing orphaned business: ${business.name} (invalid groupId: ${business.groupId})`);
        return false;
      }
    }
    return true;
  });

  // Save the fixed data
  localStorage.setItem('approvedBusinesses', JSON.stringify(cleanBusinesses));
  localStorage.setItem('approvedBusinessGroups', JSON.stringify(fixedGroups));

  console.log('📊 After fix:');
  console.log('- Approved businesses:', cleanBusinesses.length);
  console.log('- Approved groups:', fixedGroups.length);
  console.log('- Duplicates removed:', duplicatesRemoved);
  console.log('- Orphaned businesses removed:', uniqueBusinesses.length - cleanBusinesses.length);
  
  // Verification: Show each group's actual business count
  console.log('\n📁 GROUP VERIFICATION:');
  fixedGroups.forEach(group => {
    const groupBusinesses = cleanBusinesses.filter(b => b.groupId === group.id);
    console.log(`${group.owner.name}: ${groupBusinesses.length} businesses`);
    groupBusinesses.forEach(b => console.log(`  • ${b.name}`));
  });

  console.log('\n✅ INSTANT FIX COMPLETED SUCCESSFULLY!');
  console.log('🔄 Refresh the page to see the changes...');
  
  // Auto-refresh after 2 seconds
  setTimeout(() => {
    window.location.reload();
  }, 2000);
  
} catch (error) {
  console.error('❌ Error during instant fix:', error);
  alert('Fix failed: ' + error.message);
} 