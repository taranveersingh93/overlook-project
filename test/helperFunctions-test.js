import chai from 'chai';
const assert = chai.assert;

import {
  correctCase,
  formatDate,
  humanizeDate,
  makeBody
} from '../src/helperFunctions';

describe('Check helper functions existence', () => {
  it('should be functions', () => {
    assert.isFunction(correctCase);
    assert.isFunction(formatDate),
    assert.isFunction(humanizeDate),
    assert.isFunction(makeBody)
  });
});

describe('Test helper functions', () => {
  it('should correct case for a single word', () => {
    const newWord = correctCase("word");
    assert.equal(newWord, "Word");
  });

  it('should correct case for multiple words', () => {
    const newWords = correctCase("multiple words");
    assert.equal(newWords, "Multiple Words");
  });

  it('should format string date with hyphens', () => {
    const date = "2023-04-06";
    const usableDate = formatDate(date);
    assert.equal(usableDate, "20230406");
  });

  it('should format string date with slash', () => {
    const date = "2023/04/06";
    const usableDate = formatDate(date);
    assert.equal(usableDate, "20230406");
  });

  it('should humanize date with hyphens', () => {
    const date = "2023-04-06";
    const humanizedDate = humanizeDate(date);
    assert.equal(humanizedDate, "April 06, 2023");
  });

  it('should humanize date with slashes', () => {
    const date = "2023/04/06";
    const humanizedDate = humanizeDate(date);
    assert.equal(humanizedDate, "April 06, 2023");
  });

  it('should make body for POST', () => {
    const body = makeBody("23", "2023-02-21", "10");
    const expectedOutcome = {
      "userID": 23,
      "date": "2023/02/21",
      "roomNumber": 10
    };
    return expectedOutcome;
  });

  it('should make body for POST with date with slash', () => {
    const body = makeBody("23", "2023/02/21", "10");
    const expectedOutcome = {
      "userID": 23,
      "date": "2023/02/21",
      "roomNumber": 10
    };
    return expectedOutcome;
  });
});