// Debug script to check current admin dashboard data
console.log('=== DEBUGGING ADMIN DASHBOARD ===');
console.log('Current localStorage data:');
console.log('submittedBusinesses:', JSON.parse(localStorage.getItem('submittedBusinesses') || '[]'));
console.log('businessGroups:', JSON.parse(localStorage.getItem('businessGroups') || '[]'));
console.log('approvedBusinesses:', JSON.parse(localStorage.getItem('approvedBusinesses') || '[]'));
console.log('approvedBusinessGroups:', JSON.parse(localStorage.getItem('approvedBusinessGroups') || '[]'));
console.log('');

// Test approve function
window.debugApprove = function(businessId) {
  console.log('Testing approve for business ID:', businessId);
  const businesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
  const business = businesses.find(b => b.id === businessId);
  console.log('Found business:', business);
  
  if (business) {
    // Move to approved
    const approved = JSON.parse(localStorage.getItem('approvedBusinesses') || '[]');
    approved.push(business);
    localStorage.setItem('approvedBusinesses', JSON.stringify(approved));
    
    // Remove from pending
    const updated = businesses.filter(b => b.id !== businessId);
    localStorage.setItem('submittedBusinesses', JSON.stringify(updated));
    
    console.log('Business approved and moved!');
    window.location.reload();
  }
};

// Test deny function  
window.debugDeny = function(businessId) {
  console.log('Testing deny for business ID:', businessId);
  const businesses = JSON.parse(localStorage.getItem('submittedBusinesses') || '[]');
  const business = businesses.find(b => b.id === businessId);
  console.log('Found business:', business);
  
  if (business) {
    // Remove from pending
    const updated = businesses.filter(b => b.id !== businessId);
    localStorage.setItem('submittedBusinesses', JSON.stringify(updated));
    
    console.log('Business denied and removed!');
    window.location.reload();
  }
};

console.log('Debug functions available: debugApprove(businessId), debugDeny(businessId)');
console.log('Example: debugApprove(\
some-business-id\)');

