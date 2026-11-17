import { VocabularyWord } from "../src/types/vocabulary";
import * as fs from "fs";

const data = JSON.parse(fs.readFileSync("scratch/finance_234_236.json", "utf8"));

const words: VocabularyWord[] = data.result.words;
console.log(`Successfully typed ${words.length} vocabulary words!`);
for (const w of words) {
  console.log(`- ${w.id}: ${w.word} (${w.category}, ${w.level}, freq: ${w.toeicFrequency})`);
}
