import { VocabularyWord } from '../src/types/vocabulary';
import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('./scratch/test_batch_finance_200_202.json', 'utf8'));

for (const word of data.words) {
  console.log(`Checking ${word.id} - ${word.word}...`);
  if (!word.id || !word.word || !word.partOfSpeech || !word.category || !word.level || !word.toeicFrequency) {
    throw new Error(`Missing basic fields in ${word.id}`);
  }
  if (!word.pronunciation.ipa || !word.pronunciation.syllableBreakdown || !word.pronunciation.stressPattern || !word.pronunciation.commonMistakes) {
    throw new Error(`Missing pronunciation fields in ${word.id}`);
  }
  if (!word.etymology.origin || !word.etymology.rootWord || !word.etymology.rootMeaning || !word.etymology.evolution || !word.etymology.relatedLanguages || !word.etymology.firstRecordedUse) {
    throw new Error(`Missing etymology fields in ${word.id}`);
  }
  if (!word.deepMeaning.coreConcept || !word.deepMeaning.spatialContext || !word.deepMeaning.temporalContext || !word.deepMeaning.emotionalTone || !word.deepMeaning.formalityLevel || !word.deepMeaning.connotation) {
    throw new Error(`Missing deepMeaning fields in ${word.id}`);
  }
  if (!word.nativeMindset.howNativesThink || !word.nativeMindset.mentalImage || !word.nativeMindset.whenToUse || !word.nativeMindset.whenNotToUse || !word.nativeMindset.culturalContext) {
    throw new Error(`Missing nativeMindset fields in ${word.id}`);
  }
  if (!word.examples.daily || word.examples.daily.length < 3) {
    throw new Error(`Daily examples < 3 in ${word.id}`);
  }
  if (!word.examples.business || word.examples.business.length < 3) {
    throw new Error(`Business examples < 3 in ${word.id}`);
  }
  if (!word.examples.conversation || word.examples.conversation.length < 2) {
    throw new Error(`Conversation examples < 2 in ${word.id}`);
  }
  if (!word.examples.collocations || word.examples.collocations.length < 5) {
    throw new Error(`Collocations < 5 in ${word.id}`);
  }
  if (!word.visual.imageKeyword || !word.visual.imageDescription || !word.visual.mnemonic) {
    throw new Error(`Missing visual fields in ${word.id}`);
  }
  if (!word.video || !word.video.description) {
    throw new Error(`Missing video description in ${word.id}`);
  }
  if (!word.toeicContext.commonParts || !word.toeicContext.exampleQuestion || !word.toeicContext.tips) {
    throw new Error(`Missing toeicContext fields in ${word.id}`);
  }
  if (!word.synonyms || word.synonyms.length < 4) {
    throw new Error(`Synonyms < 4 in ${word.id}`);
  }
  if (!word.relatedWords || word.relatedWords.length < 5) {
    throw new Error(`RelatedWords < 5 in ${word.id}`);
  }
}
console.log('All words passed validation!');
