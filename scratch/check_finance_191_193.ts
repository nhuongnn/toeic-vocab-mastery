import { VocabularyWord } from '../src/types/vocabulary';
import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/finance_191_193.json', 'utf8'));
const words: VocabularyWord[] = data.words;
console.log('Valid words count:', words.length);
