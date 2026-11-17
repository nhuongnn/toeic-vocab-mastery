import { VocabularyWord } from '../src/types/vocabulary';
import * as fs from 'fs';

const raw = fs.readFileSync('scratch/words_194_196.json', 'utf8');
const words: VocabularyWord[] = JSON.parse(raw);
console.log('TS Validation: Successfully typed ' + words.length + ' words!');
for (const w of words) {
  console.log(`Word: ${w.word} (ID: ${w.id}), POS: ${w.partOfSpeech.join(', ')}, Synonyms: ${w.synonyms.length}, Related: ${w.relatedWords.length}`);
}
