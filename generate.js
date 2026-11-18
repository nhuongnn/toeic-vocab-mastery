const fs = require('fs');
const data = require('/home/nhuongnn/.gemini/antigravity-cli/brain/e6dc9892-3950-4fc2-8f8b-e7729274eafc/scratch/result_exact.json');

// Fix antonyms format (array of strings instead of objects) and ensure examples property is correct
data.words.forEach(w => {
  w.antonyms = w.antonyms.map(a => typeof a === 'object' ? a.item : a);
});

fs.writeFileSync('/home/nhuongnn/.gemini/antigravity-cli/brain/e6dc9892-3950-4fc2-8f8b-e7729274eafc/scratch/result_fixed.json', JSON.stringify(data, null, 2));
console.log("Fixed result written");
