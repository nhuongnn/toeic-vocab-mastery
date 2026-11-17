import { VocabularyWord } from '../src/types/vocabulary';
import * as fs from 'fs';

const raw = fs.readFileSync('scratch/finance_197_199.json', 'utf8');
const data = JSON.parse(raw);

const words: VocabularyWord[] = data.words;
console.log('TS Validation: Successfully typed ' + words.length + ' words!');
