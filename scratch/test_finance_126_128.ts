import { VocabularyWord } from "../src/types/vocabulary";
import { financeWords } from "../src/data/vocabulary/finance";
import * as fs from "fs";

const data = JSON.parse(fs.readFileSync("scratch/finance_126_128.json", "utf8"));
const words: VocabularyWord[] = data.words;

console.log(`Successfully typed ${words.length} words from scratch/finance_126_128.json!`);

// Check that finance-126, finance-127, finance-128 exist in financeWords
const targetIds = ["finance-126", "finance-127", "finance-128"];
for (const id of targetIds) {
  const found = financeWords.find((w) => w.id === id);
  if (!found) {
    throw new Error(`Word ${id} not found in financeWords!`);
  }
  console.log(`Verified ${id} (${found.word}) in financeWords.`);
}

console.log("All TypeScript vocabulary type checks passed!");
