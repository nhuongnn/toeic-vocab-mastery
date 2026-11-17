import { VocabularyWord } from "../src/types/vocabulary";
import * as fs from "fs";

const data = JSON.parse(fs.readFileSync("scratch/finance_288_290.json", "utf8"));
const words: VocabularyWord[] = data.result.words;

console.log(`Successfully validated ${words.length} vocabulary words against VocabularyWord interface!`);
for (const w of words) {
  console.log(`- ${w.id}: ${w.word} (${w.category}, ${w.level}, freq: ${w.toeicFrequency})`);
}
