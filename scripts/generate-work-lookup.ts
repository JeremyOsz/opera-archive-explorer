import { generateWorkLookupTable } from '../app/lib/work-lookup-generator';
import fs from 'fs';
import path from 'path';

/**
 * Generate the work lookup table and save it to a JSON file
 */
function main() {
  console.log('🔄 Generating work lookup table...');
  
  try {
    const lookupTable = generateWorkLookupTable();
    
    console.log(`✅ Generated lookup table:`);
    console.log(`   - Total works: ${lookupTable.totalWorks}`);
    console.log(`   - Total recordings: ${lookupTable.totalRecordings}`);
    console.log(`   - Generated at: ${lookupTable.generatedAt}`);
    
    // Write to file
    const outputPath = path.join(process.cwd(), 'app/data/work-lookup.json');
    fs.writeFileSync(outputPath, JSON.stringify(lookupTable, null, 2));
    
    console.log(`\n✅ Saved to: ${outputPath}`);
    console.log('\n📊 Sample works:');
    
    // Show first 5 works
    const sampleWorks = Object.entries(lookupTable.works).slice(0, 5);
    sampleWorks.forEach(([title, work]) => {
      console.log(`   - ${work.composer}: ${title} (${work.totalRecordings} recordings)`);
    });
    
  } catch (error) {
    console.error('❌ Error generating lookup table:', error);
    process.exit(1);
  }
}

main();
