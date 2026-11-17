import { VocabularyWord } from "../src/types/vocabulary";
import * as fs from "fs";

const raw = fs.readFileSync("scratch/finance_065_067.json", "utf-8");
const data = JSON.parse(raw);

const words: VocabularyWord[] = data.words;

console.log(`Read ${words.length} words.`);

for (const w of words) {
  if (!w.id || !w.word || !w.category || !w.level || !w.toeicFrequency) {
    throw new Error(`Missing basic field in ${w.id}`);
  }
  if (!w.pronunciation.ipa || !w.pronunciation.syllableBreakdown || !w.pronunciation.stressPattern || !w.pronunciation.commonMistakes) {
    throw new Error(`Missing pronunciation in ${w.id}`);
  }
  if (!w.etymology.origin || !w.etymology.rootWord || !w.etymology.rootMeaning || !w.etymology.evolution || !w.etymology.relatedLanguages || !w.etymology.firstRecordedUse) {
    throw new Error(`Missing etymology in ${w.id}`);
  }
  if (!w.deepMeaning.coreConcept || !w.deepMeaning.spatialContext || !w.deepMeaning.temporalContext || !w.deepMeaning.emotionalTone || !w.deepMeaning.formalityLevel || !w.deepMeaning.connotation) {
    throw new Error(`Missing deepMeaning in ${w.id}`);
  }
  if (!w.nativeMindset.howNativesThink || !w.nativeMindset.mentalImage || !w.nativeMindset.whenToUse || !w.nativeMindset.whenNotToUse || !w.nativeMindset.culturalContext) {
    throw new Error(`Missing nativeMindset in ${w.id}`);
  }
  if (w.examples.daily.length < 3 || w.examples.business.length < 3 || w.examples.conversation.length < 2 || w.examples.collocations.length < 5) {
    throw new Error(`Examples count insufficient in ${w.id}`);
  }
  if (!w.visual.imageKeyword || !w.visual.imageDescription || !w.visual.mnemonic) {
    throw new Error(`Missing visual in ${w.id}`);
  }
  if (!w.video || !w.video.description) {
    throw new Error(`Missing video in ${w.id}`);
  }
  if (!w.toeicContext.commonParts.length || !w.toeicContext.exampleQuestion || !w.toeicContext.tips) {
    throw new Error(`Missing toeicContext in ${w.id}`);
  }
  if (w.synonyms.length < 4) {
    throw new Error(`Synonyms count < 4 in ${w.id}`);
  }
  if (w.relatedWords.length < 5) {
    throw new Error(`RelatedWords count < 5 in ${w.id}`);
  }

  // Check strict linguistic rules: NO boilerplate phrases
  const text = JSON.stringify(w);
  const banned = ["... factor", "manage the...", "documentation for... is ready for the board meeting", "actuary factor", "adjustment factor", "allocation factor", "actuary management", "adjustment management", "allocation management"];
  for (const b of banned) {
    if (text.includes(b)) {
      throw new Error(`Found banned text '${b}' in ${w.id}`);
    }
  }
  console.log(`Validation passed for ${w.id} (${w.word})`);
}
