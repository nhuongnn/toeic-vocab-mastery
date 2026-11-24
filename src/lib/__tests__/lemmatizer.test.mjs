import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  lemmatizeWord,
  lemmatizePhrase,
  toBaseForm,
  isBaseForm,
  getBaseFormInfo,
  cleanWordForOxford,
} from '../lemmatizer.ts';
import { getOxfordUrl, getCambridgeUrl, getDictionaryUrl } from '../dictionary.ts';

describe('English Lemmatizer (toBaseForm)', () => {
  it('correctly converts irregular verbs to base form', () => {
    assert.strictEqual(lemmatizeWord('went'), 'go');
    assert.strictEqual(lemmatizeWord('gone'), 'go');
    assert.strictEqual(lemmatizeWord('written'), 'write');
    assert.strictEqual(lemmatizeWord('wrote'), 'write');
    assert.strictEqual(lemmatizeWord('was'), 'be');
    assert.strictEqual(lemmatizeWord('were'), 'be');
    assert.strictEqual(lemmatizeWord('been'), 'be');
    assert.strictEqual(lemmatizeWord('taken'), 'take');
    assert.strictEqual(lemmatizeWord('took'), 'take');
    assert.strictEqual(lemmatizeWord('bought'), 'buy');
    assert.strictEqual(lemmatizeWord('sold'), 'sell');
    assert.strictEqual(lemmatizeWord('ran'), 'run');
    assert.strictEqual(lemmatizeWord('chosen'), 'choose');
    assert.strictEqual(lemmatizeWord('chose'), 'choose');
    assert.strictEqual(lemmatizeWord('did'), 'do');
    assert.strictEqual(lemmatizeWord('done'), 'do');
    assert.strictEqual(lemmatizeWord('had'), 'have');
    assert.strictEqual(lemmatizeWord('has'), 'have');
    assert.strictEqual(lemmatizeWord('met'), 'meet');
    assert.strictEqual(lemmatizeWord('felt'), 'feel');
    assert.strictEqual(lemmatizeWord('found'), 'find');
    assert.strictEqual(lemmatizeWord('built'), 'build');
    assert.strictEqual(lemmatizeWord('taught'), 'teach');
    assert.strictEqual(lemmatizeWord('thought'), 'think');
    assert.strictEqual(lemmatizeWord('understood'), 'understand');
  });

  it('correctly converts irregular nouns to singular base form', () => {
    assert.strictEqual(lemmatizeWord('children'), 'child');
    assert.strictEqual(lemmatizeWord('people'), 'person');
    assert.strictEqual(lemmatizeWord('men'), 'man');
    assert.strictEqual(lemmatizeWord('women'), 'woman');
    assert.strictEqual(lemmatizeWord('feet'), 'foot');
    assert.strictEqual(lemmatizeWord('teeth'), 'tooth');
    assert.strictEqual(lemmatizeWord('mice'), 'mouse');
    assert.strictEqual(lemmatizeWord('criteria'), 'criterion');
    assert.strictEqual(lemmatizeWord('phenomena'), 'phenomenon');
    assert.strictEqual(lemmatizeWord('analyses'), 'analysis');
    assert.strictEqual(lemmatizeWord('crises'), 'crisis');
    assert.strictEqual(lemmatizeWord('theses'), 'thesis');
    assert.strictEqual(lemmatizeWord('indices'), 'index');
    assert.strictEqual(lemmatizeWord('knives'), 'knife');
    assert.strictEqual(lemmatizeWord('wives'), 'wife');
    assert.strictEqual(lemmatizeWord('leaves'), 'leaf');
    assert.strictEqual(lemmatizeWord('shelves'), 'shelf');
    assert.strictEqual(lemmatizeWord('halves'), 'half');
    assert.strictEqual(lemmatizeWord('thieves'), 'thief');
  });

  it('correctly converts irregular adjectives and adverbs to base degree', () => {
    assert.strictEqual(lemmatizeWord('better'), 'good');
    assert.strictEqual(lemmatizeWord('best'), 'good');
    assert.strictEqual(lemmatizeWord('worse'), 'bad');
    assert.strictEqual(lemmatizeWord('worst'), 'bad');
    assert.strictEqual(lemmatizeWord('further'), 'far');
    assert.strictEqual(lemmatizeWord('farther'), 'far');
    assert.strictEqual(lemmatizeWord('less'), 'little');
    assert.strictEqual(lemmatizeWord('least'), 'little');
  });

  it('correctly lemmatizes regular verbs ending in -ing', () => {
    // doubled consonant un-doubling
    assert.strictEqual(lemmatizeWord('running'), 'run');
    assert.strictEqual(lemmatizeWord('stopping'), 'stop');
    assert.strictEqual(lemmatizeWord('planning'), 'plan');
    assert.strictEqual(lemmatizeWord('referring'), 'refer');
    assert.strictEqual(lemmatizeWord('submitting'), 'submit');
    assert.strictEqual(lemmatizeWord('beginning'), 'begin');
    assert.strictEqual(lemmatizeWord('swimming'), 'swim');
    assert.strictEqual(lemmatizeWord('dropping'), 'drop');

    // silent -e restoration
    assert.strictEqual(lemmatizeWord('negotiating'), 'negotiate');
    assert.strictEqual(lemmatizeWord('creating'), 'create');
    assert.strictEqual(lemmatizeWord('deciding'), 'decide');
    assert.strictEqual(lemmatizeWord('managing'), 'manage');
    assert.strictEqual(lemmatizeWord('living'), 'live');
    assert.strictEqual(lemmatizeWord('moving'), 'move');
    assert.strictEqual(lemmatizeWord('writing'), 'write');
    assert.strictEqual(lemmatizeWord('driving'), 'drive');
    assert.strictEqual(lemmatizeWord('taking'), 'take');
    assert.strictEqual(lemmatizeWord('making'), 'make');
    assert.strictEqual(lemmatizeWord('giving'), 'give');
    assert.strictEqual(lemmatizeWord('reducing'), 'reduce');
    assert.strictEqual(lemmatizeWord('producing'), 'produce');
    assert.strictEqual(lemmatizeWord('issuing'), 'issue');
    assert.strictEqual(lemmatizeWord('continuing'), 'continue');
    assert.strictEqual(lemmatizeWord('handling'), 'handle');
    assert.strictEqual(lemmatizeWord('agreeing'), 'agree');

    // -ying -> -ie or -y
    assert.strictEqual(lemmatizeWord('tying'), 'tie');
    assert.strictEqual(lemmatizeWord('lying'), 'lie');
    assert.strictEqual(lemmatizeWord('dying'), 'die');
    assert.strictEqual(lemmatizeWord('studying'), 'study');
    assert.strictEqual(lemmatizeWord('carrying'), 'carry');
    assert.strictEqual(lemmatizeWord('applying'), 'apply');

    // standard -ing
    assert.strictEqual(lemmatizeWord('working'), 'work');
    assert.strictEqual(lemmatizeWord('looking'), 'look');
    assert.strictEqual(lemmatizeWord('talking'), 'talk');
    assert.strictEqual(lemmatizeWord('asking'), 'ask');
    assert.strictEqual(lemmatizeWord('helping'), 'help');
  });

  it('correctly lemmatizes regular verbs ending in -ed', () => {
    // -ied -> -y
    assert.strictEqual(lemmatizeWord('studied'), 'study');
    assert.strictEqual(lemmatizeWord('applied'), 'apply');
    assert.strictEqual(lemmatizeWord('carried'), 'carry');
    assert.strictEqual(lemmatizeWord('identified'), 'identify');
    assert.strictEqual(lemmatizeWord('replied'), 'reply');

    // doubled consonant un-doubling
    assert.strictEqual(lemmatizeWord('stopped'), 'stop');
    assert.strictEqual(lemmatizeWord('planned'), 'plan');
    assert.strictEqual(lemmatizeWord('referred'), 'refer');
    assert.strictEqual(lemmatizeWord('submitted'), 'submit');
    assert.strictEqual(lemmatizeWord('occurred'), 'occur');

    // silent -e restoration
    assert.strictEqual(lemmatizeWord('negotiated'), 'negotiate');
    assert.strictEqual(lemmatizeWord('decided'), 'decide');
    assert.strictEqual(lemmatizeWord('created'), 'create');
    assert.strictEqual(lemmatizeWord('managed'), 'manage');
    assert.strictEqual(lemmatizeWord('lived'), 'live');
    assert.strictEqual(lemmatizeWord('moved'), 'move');
    assert.strictEqual(lemmatizeWord('approved'), 'approve');
    assert.strictEqual(lemmatizeWord('improved'), 'improve');
    assert.strictEqual(lemmatizeWord('promoted'), 'promote');
    assert.strictEqual(lemmatizeWord('received'), 'receive');
    assert.strictEqual(lemmatizeWord('produced'), 'produce');
    assert.strictEqual(lemmatizeWord('reduced'), 'reduce');
    assert.strictEqual(lemmatizeWord('issued'), 'issue');
    assert.strictEqual(lemmatizeWord('continued'), 'continue');
    assert.strictEqual(lemmatizeWord('pursued'), 'pursue');
    assert.strictEqual(lemmatizeWord('handled'), 'handle');
    assert.strictEqual(lemmatizeWord('agreed'), 'agree');
    assert.strictEqual(lemmatizeWord('guaranteed'), 'guarantee');

    // standard -ed
    assert.strictEqual(lemmatizeWord('worked'), 'work');
    assert.strictEqual(lemmatizeWord('walked'), 'walk');
    assert.strictEqual(lemmatizeWord('asked'), 'ask');
    assert.strictEqual(lemmatizeWord('helped'), 'help');
    assert.strictEqual(lemmatizeWord('delivered'), 'deliver');
    assert.strictEqual(lemmatizeWord('offered'), 'offer');
    assert.strictEqual(lemmatizeWord('ordered'), 'order');
    assert.strictEqual(lemmatizeWord('delayed'), 'delay');
    assert.strictEqual(lemmatizeWord('played'), 'play');
    assert.strictEqual(lemmatizeWord('stayed'), 'stay');
  });

  it('correctly lemmatizes regular nouns & 3rd person verbs with -s, -es, -ies', () => {
    // -ies -> -y
    assert.strictEqual(lemmatizeWord('companies'), 'company');
    assert.strictEqual(lemmatizeWord('categories'), 'category');
    assert.strictEqual(lemmatizeWord('strategies'), 'strategy');
    assert.strictEqual(lemmatizeWord('policies'), 'policy');
    assert.strictEqual(lemmatizeWord('supplies'), 'supply');
    assert.strictEqual(lemmatizeWord('studies'), 'study');
    assert.strictEqual(lemmatizeWord('applies'), 'apply');

    // -es after sibilants
    assert.strictEqual(lemmatizeWord('processes'), 'process');
    assert.strictEqual(lemmatizeWord('businesses'), 'business');
    assert.strictEqual(lemmatizeWord('addresses'), 'address');
    assert.strictEqual(lemmatizeWord('boxes'), 'box');
    assert.strictEqual(lemmatizeWord('taxes'), 'tax');
    assert.strictEqual(lemmatizeWord('fixes'), 'fix');
    assert.strictEqual(lemmatizeWord('watches'), 'watch');
    assert.strictEqual(lemmatizeWord('matches'), 'match');
    assert.strictEqual(lemmatizeWord('wishes'), 'wish');
    assert.strictEqual(lemmatizeWord('crashes'), 'crash');
    assert.strictEqual(lemmatizeWord('buzzes'), 'buzz');
    assert.strictEqual(lemmatizeWord('quizzes'), 'quiz');
    assert.strictEqual(lemmatizeWord('tomatoes'), 'tomato');
    assert.strictEqual(lemmatizeWord('heroes'), 'hero');
    assert.strictEqual(lemmatizeWord('buses'), 'bus');

    // standard -s
    assert.strictEqual(lemmatizeWord('employees'), 'employee');
    assert.strictEqual(lemmatizeWord('products'), 'product');
    assert.strictEqual(lemmatizeWord('works'), 'work');
    assert.strictEqual(lemmatizeWord('requirements'), 'requirement');
    assert.strictEqual(lemmatizeWord('agreements'), 'agreement');
    assert.strictEqual(lemmatizeWord('commitments'), 'commitment');
    assert.strictEqual(lemmatizeWord('customers'), 'customer');
    assert.strictEqual(lemmatizeWord('documents'), 'document');
    assert.strictEqual(lemmatizeWord('issues'), 'issue');
  });

  it('correctly lemmatizes regular comparatives and superlatives', () => {
    assert.strictEqual(lemmatizeWord('faster'), 'fast');
    assert.strictEqual(lemmatizeWord('fastest'), 'fast');
    assert.strictEqual(lemmatizeWord('easier'), 'easy');
    assert.strictEqual(lemmatizeWord('easiest'), 'easy');
    assert.strictEqual(lemmatizeWord('bigger'), 'big');
    assert.strictEqual(lemmatizeWord('biggest'), 'big');
    assert.strictEqual(lemmatizeWord('larger'), 'large');
    assert.strictEqual(lemmatizeWord('largest'), 'large');
    assert.strictEqual(lemmatizeWord('simpler'), 'simple');
    assert.strictEqual(lemmatizeWord('simplest'), 'simple');
    assert.strictEqual(lemmatizeWord('higher'), 'high');
    assert.strictEqual(lemmatizeWord('highest'), 'high');
  });

  it('strictly preserves uninflected base words without modification', () => {
    // Words ending in -ss
    assert.strictEqual(lemmatizeWord('business'), 'business');
    assert.strictEqual(lemmatizeWord('address'), 'address');
    assert.strictEqual(lemmatizeWord('process'), 'process');
    assert.strictEqual(lemmatizeWord('access'), 'access');
    assert.strictEqual(lemmatizeWord('success'), 'success');
    assert.strictEqual(lemmatizeWord('express'), 'express');
    assert.strictEqual(lemmatizeWord('progress'), 'progress');
    assert.strictEqual(lemmatizeWord('witness'), 'witness');
    assert.strictEqual(lemmatizeWord('fitness'), 'fitness');

    // Words ending in -us, -is, -os, -as
    assert.strictEqual(lemmatizeWord('status'), 'status');
    assert.strictEqual(lemmatizeWord('focus'), 'focus');
    assert.strictEqual(lemmatizeWord('bonus'), 'bonus');
    assert.strictEqual(lemmatizeWord('crisis'), 'crisis');
    assert.strictEqual(lemmatizeWord('analysis'), 'analysis');
    assert.strictEqual(lemmatizeWord('basis'), 'basis');
    assert.strictEqual(lemmatizeWord('thesis'), 'thesis');
    assert.strictEqual(lemmatizeWord('gas'), 'gas');
    assert.strictEqual(lemmatizeWord('chaos'), 'chaos');

    // Nouns ending in s
    assert.strictEqual(lemmatizeWord('news'), 'news');
    assert.strictEqual(lemmatizeWord('lens'), 'lens');
    assert.strictEqual(lemmatizeWord('series'), 'series');
    assert.strictEqual(lemmatizeWord('species'), 'species');

    // Verbs ending in -eed / words ending in -ed
    assert.strictEqual(lemmatizeWord('proceed'), 'proceed');
    assert.strictEqual(lemmatizeWord('succeed'), 'succeed');
    assert.strictEqual(lemmatizeWord('exceed'), 'exceed');
    assert.strictEqual(lemmatizeWord('feed'), 'feed');
    assert.strictEqual(lemmatizeWord('need'), 'need');
    assert.strictEqual(lemmatizeWord('speed'), 'speed');
    assert.strictEqual(lemmatizeWord('bed'), 'bed');
    assert.strictEqual(lemmatizeWord('red'), 'red');
    assert.strictEqual(lemmatizeWord('shed'), 'shed');

    // Words ending in -ing
    assert.strictEqual(lemmatizeWord('ring'), 'ring');
    assert.strictEqual(lemmatizeWord('bring'), 'bring');
    assert.strictEqual(lemmatizeWord('sing'), 'sing');
    assert.strictEqual(lemmatizeWord('morning'), 'morning');
    assert.strictEqual(lemmatizeWord('evening'), 'evening');
    assert.strictEqual(lemmatizeWord('ceiling'), 'ceiling');

    // Common base nouns ending in -er
    assert.strictEqual(lemmatizeWord('water'), 'water');
    assert.strictEqual(lemmatizeWord('paper'), 'paper');
    assert.strictEqual(lemmatizeWord('computer'), 'computer');
    assert.strictEqual(lemmatizeWord('manager'), 'manager');
    assert.strictEqual(lemmatizeWord('offer'), 'offer');
    assert.strictEqual(lemmatizeWord('order'), 'order');
    assert.strictEqual(lemmatizeWord('weather'), 'weather');
    assert.strictEqual(lemmatizeWord('deliver'), 'deliver');
    assert.strictEqual(lemmatizeWord('consider'), 'consider');
  });

  it('sanitizes punctuation and strips possessives', () => {
    assert.strictEqual(lemmatizeWord("company's"), 'company');
    assert.strictEqual(lemmatizeWord('employees’'), 'employee');
    assert.strictEqual(lemmatizeWord('"working"'), 'work');
    assert.strictEqual(lemmatizeWord('(negotiated)'), 'negotiate');
    assert.strictEqual(lemmatizeWord('criteria,'), 'criterion');
  });

  it('does NOT convert to base form when selecting multiple words or an entire passage', () => {
    // Whole passage / sentence / multiple words should NOT be converted to base form
    assert.strictEqual(
      toBaseForm('The company reported higher earnings.'),
      'The company reported higher earnings.'
    );
    assert.strictEqual(toBaseForm('looking for'), 'looking for');
    assert.strictEqual(toBaseForm('taking care of'), 'taking care of');
    assert.strictEqual(toBaseForm('worked out'), 'worked out');
    assert.strictEqual(toBaseForm('employees and managers'), 'employees and managers');

    // getBaseFormInfo should indicate isSingleWord = false, isConverted = false
    const passageInfo = getBaseFormInfo('The board approved the plan.');
    assert.strictEqual(passageInfo.isSingleWord, false);
    assert.strictEqual(passageInfo.isConverted, false);
    assert.strictEqual(passageInfo.baseForm, 'The board approved the plan.');

    const phraseInfo = getBaseFormInfo('looking for');
    assert.strictEqual(phraseInfo.isSingleWord, false);
    assert.strictEqual(phraseInfo.isConverted, false);
    assert.strictEqual(phraseInfo.baseForm, 'looking for');
  });

  it('correctly provides getBaseFormInfo metadata for single words', () => {
    const info1 = getBaseFormInfo('negotiating');
    assert.strictEqual(info1.original, 'negotiating');
    assert.strictEqual(info1.baseForm, 'negotiate');
    assert.strictEqual(info1.isConverted, true);
    assert.strictEqual(info1.isSingleWord, true);

    const info2 = getBaseFormInfo('business');
    assert.strictEqual(info2.original, 'business');
    assert.strictEqual(info2.baseForm, 'business');
    assert.strictEqual(info2.isConverted, false);
    assert.strictEqual(info2.isSingleWord, true);

    assert.strictEqual(isBaseForm('negotiating'), false);
    assert.strictEqual(isBaseForm('negotiate'), true);
    assert.strictEqual(isBaseForm('business'), true);
    assert.strictEqual(isBaseForm('The company reported higher earnings.'), true);
  });
});

describe('Oxford Dictionary URL Integration with Lemmatizer', () => {
  it('automatically converts inflected words to base form in getOxfordUrl for single words', () => {
    assert.strictEqual(
      getOxfordUrl('employees'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/employee'
    );
    assert.strictEqual(
      getOxfordUrl('worked'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/work'
    );
    assert.strictEqual(
      getOxfordUrl('negotiating'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/negotiate'
    );
    assert.strictEqual(
      getOxfordUrl('issued'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/issue'
    );
    assert.strictEqual(
      getOxfordUrl('continued'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/continue'
    );
    assert.strictEqual(
      getOxfordUrl('handled'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/handle'
    );
    assert.strictEqual(
      getOxfordUrl('categories'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/category'
    );
    assert.strictEqual(
      getOxfordUrl('faster'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/fast'
    );
    assert.strictEqual(
      getOxfordUrl('better'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/good'
    );
    assert.strictEqual(
      getOxfordUrl('went'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/go'
    );
    assert.strictEqual(
      getOxfordUrl('criteria'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/criterion'
    );
    assert.strictEqual(
      getOxfordUrl('children'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/child'
    );
    assert.strictEqual(
      getOxfordUrl('analyses'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/analysis'
    );
    assert.strictEqual(
      getOxfordUrl("company's"),
      'https://www.oxfordlearnersdictionaries.com/definition/english/company'
    );
    assert.strictEqual(
      getOxfordUrl("employees'"),
      'https://www.oxfordlearnersdictionaries.com/definition/english/employee'
    );
  });

  it('keeps already-base words unchanged in getOxfordUrl', () => {
    assert.strictEqual(
      getOxfordUrl('business'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/business'
    );
    assert.strictEqual(
      getOxfordUrl('address'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/address'
    );
    assert.strictEqual(
      getOxfordUrl('process'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/process'
    );
    assert.strictEqual(
      getOxfordUrl('well-known'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/well-known'
    );
  });

  it('routes multi-word passages directly to Oxford search URL without modifying text', () => {
    assert.strictEqual(
      getOxfordUrl('looking for'),
      'https://www.oxfordlearnersdictionaries.com/search/english/?q=looking%20for'
    );
    assert.strictEqual(
      getOxfordUrl('taking care of'),
      'https://www.oxfordlearnersdictionaries.com/search/english/?q=taking%20care%20of'
    );
    assert.strictEqual(
      getOxfordUrl('worked out'),
      'https://www.oxfordlearnersdictionaries.com/search/english/?q=worked%20out'
    );
    assert.strictEqual(
      getOxfordUrl('The company reported higher earnings.'),
      'https://www.oxfordlearnersdictionaries.com/search/english/?q=The%20company%20reported%20higher%20earnings.'
    );
  });

  it('verifies getDictionaryUrl delegates to getOxfordUrl when provider is oxford', () => {
    assert.strictEqual(
      getDictionaryUrl('employees', 'oxford'),
      'https://www.oxfordlearnersdictionaries.com/definition/english/employee'
    );
    assert.strictEqual(
      getDictionaryUrl('employees', 'cambridge'),
      'https://dictionary.cambridge.org/dictionary/english/employees'
    );
    assert.strictEqual(
      getDictionaryUrl('looking for', 'oxford'),
      'https://www.oxfordlearnersdictionaries.com/search/english/?q=looking%20for'
    );
  });
});
