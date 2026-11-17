import { VocabularyWord } from "../src/types/vocabulary";
import * as fs from "fs";

const raw = fs.readFileSync("scratch/finance_062_064.json", "utf8");
const data = JSON.parse(raw);

const words: VocabularyWord[] = data.words;

console.log(`Validated ${words.length} words against TypeScript VocabularyWord type definition!`);

for (const w of words) {
  console.log(`- ${w.id}: ${w.word} (${w.category}, ${w.level}, freq ${w.toeicFrequency})`);
  if (!w.id || !w.word || !w.partOfSpeech.length || !w.category || !w.level || !w.toeicFrequency) {
    throw new Error(`Word ${w.id} missing basic fields`);
  }
  if (!w.pronunciation.ipa || !w.pronunciation.syllableBreakdown || !w.pronunciation.stressPattern || !w.pronunciation.commonMistakes) {
    throw new Error(`Word ${w.id} missing pronunciation fields`);
  }
  if (!w.etymology.origin || !w.etymology.rootWord || !w.etymology.rootMeaning || !w.etymology.evolution || !w.etymology.relatedLanguages?.length || !w.etymology.firstRecordedUse) {
    throw new Error(`Word ${w.id} missing etymology fields`);
  }
  if (!w.deepMeaning.coreConcept || !w.deepMeaning.spatialContext || !w.deepMeaning.temporalContext || !w.deepMeaning.emotionalTone || !w.deepMeaning.formalityLevel || !w.deepMeaning.connotation) {
    throw new Error(`Word ${w.id} missing deepMeaning fields`);
  }
  if (!w.nativeMindset.howNativesThink || !w.nativeMindset.mentalImage || !w.nativeMindset.whenToUse || !w.nativeMindset.whenNotToUse || !w.nativeMindset.culturalContext) {
    throw new Error(`Word ${w.id} missing nativeMindset fields`);
  }
  if (w.examples.daily.length < 3 || w.examples.business.length < 3 || w.examples.conversation.length < 2 || w.examples.collocations.length < 5) {
    throw new Error(`Word ${w.id} missing examples counts: daily=${w.examples.daily.length}, business=${w.examples.business.length}, conv=${w.examples.conversation.length}, colloc=${w.examples.collocations.length}`);
  }
  if (!w.visual.imageKeyword || !w.visual.imageDescription || !w.visual.mnemonic) {
    throw new Error(`Word ${w.id} missing visual fields`);
  }
  if (!w.video?.description) {
    throw new Error(`Word ${w.id} missing video description`);
  }
  if (!w.toeicContext.commonParts.length || !w.toeicContext.exampleQuestion || !w.toeicContext.tips) {
    throw new Error(`Word ${w.id} missing toeicContext fields`);
  }
  if (w.synonyms.length < 4 || w.relatedWords.length < 5) {
    throw new Error(`Word ${w.id} missing synonyms or relatedWords count: syn=${w.synonyms.length}, rel=${w.relatedWords.length}`);
  }
}
console.log("ALL CHECKS PASSED PERFECTLY!");
