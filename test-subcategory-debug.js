console.log('Testing subcategory functionality...');

// Import the data
import { businessCategories, categorySubcategories } from './src/data/businesses.js';

console.log('Business categories:', businessCategories);
console.log('Category subcategories:', categorySubcategories);
console.log('Consulting subcategories:', categorySubcategories['Consulting']);

// Test if Consulting category exists
const hasConsulting = businessCategories.includes('Consulting');
console.log('Has Consulting category:', hasConsulting);

// Test if Consulting has subcategories
const consultingSubcategories = categorySubcategories['Consulting'];
console.log('Consulting subcategories exist:', !!consultingSubcategories);
console.log('Consulting subcategories:', consultingSubcategories);

// Test the condition used in the form
function testSubcategoryCondition(category) {
  console.log('Testing condition for category:', category);
  console.log('category && categorySubcategories[category]:', category && categorySubcategories[category]);
  console.log('Result:', !!(category && categorySubcategories[category]));
}

testSubcategoryCondition('Consulting');
testSubcategoryCondition('Restaurant');
testSubcategoryCondition('Butcher'); 