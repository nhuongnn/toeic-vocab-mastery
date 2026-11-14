import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateSM2, createNewCard, calculateEstimatedScore } from '../srs.js';

describe('SM-2 Spaced Repetition Algorithm', () => {
  it('creates a new card with default initial parameters', () => {
    const card = createNewCard('collaborate');
    assert.strictEqual(card.wordId, 'collaborate');
    assert.strictEqual(card.repetitions, 0);
    assert.strictEqual(card.interval, 0);
    assert.strictEqual(card.easinessFactor, 2.5);
    assert.deepStrictEqual(card.history, []);
  });

  it('schedules 1 day interval on first successful recall (repetition 0 -> 1)', () => {
    const card = createNewCard('collaborate');
    const reviewed = calculateSM2(card, 5);

    assert.strictEqual(reviewed.repetitions, 1);
    assert.strictEqual(reviewed.interval, 1);
    assert.ok(reviewed.easinessFactor >= 2.5);
    assert.strictEqual(reviewed.history?.length, 1);
    assert.strictEqual(reviewed.history?.[0].quality, 5);
  });

  it('schedules 6 days interval on second consecutive successful recall (repetition 1 -> 2)', () => {
    const card = createNewCard('collaborate');
    const firstReview = calculateSM2(card, 5);
    const secondReview = calculateSM2(firstReview, 4);

    assert.strictEqual(secondReview.repetitions, 2);
    assert.strictEqual(secondReview.interval, 6);
    assert.strictEqual(secondReview.history?.length, 2);
  });

  it('scales interval by Easiness Factor on third successful recall', () => {
    const card = createNewCard('collaborate');
    const r1 = calculateSM2(card, 5);
    const r2 = calculateSM2(r1, 5);
    const r3 = calculateSM2(r2, 5);

    assert.strictEqual(r3.repetitions, 3);
    assert.strictEqual(r3.interval, Math.round(6 * r3.easinessFactor));
  });

  it('resets repetitions and interval to 1 upon failed recall (quality < 3)', () => {
    const card = createNewCard('collaborate');
    const r1 = calculateSM2(card, 5);
    const r2 = calculateSM2(r1, 5);
    assert.strictEqual(r2.repetitions, 2);

    const failed = calculateSM2(r2, 1);
    assert.strictEqual(failed.repetitions, 0);
    assert.strictEqual(failed.interval, 1);
  });

  it('never allows Easiness Factor to drop below 1.3 minimum threshold', () => {
    let card = createNewCard('collaborate');
    for (let i = 0; i < 10; i++) {
      card = calculateSM2(card, 0);
    }
    assert.strictEqual(card.easinessFactor, 1.3);
  });

  it('correctly calculates dynamic TOEIC estimated score', () => {
    const scoreZero = calculateEstimatedScore(0, 0);
    assert.strictEqual(scoreZero, 400);

    const scoreMid = calculateEstimatedScore(100, 0.5);
    assert.strictEqual(scoreMid, 520);

    const scoreHigh = calculateEstimatedScore(500, 0.9);
    assert.ok(scoreHigh >= 750);
  });
});
