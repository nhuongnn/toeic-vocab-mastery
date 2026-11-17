import { VocabularyWord } from '../src/types/vocabulary';
import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/dining_233_235.json', 'utf8'));

const words: VocabularyWord[] = data.words;
console.log(`Successfully typed ${words.length} vocabulary words!`);

