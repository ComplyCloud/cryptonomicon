import { expect } from 'chai';

import { Random } from '../src';

describe('Random', () => {
  describe('bytes', () => {
    it('should return one random byte', async () => {
      const randomByte1 = await Random.bytes(1);
      const randomByte2 = await Random.bytes(1);
      const randomByte3 = await Random.bytes(1);
      expect(randomByte1.length).to.equal(1);
      expect(randomByte2.length).to.equal(1);
      expect(randomByte3.length).to.equal(1);
      expect(randomByte1 !== randomByte2 || randomByte2 !== randomByte3).to.equal(true);
    });

    it('should return 1024 random bytes', async () => {
      const randomBytes1 = await Random.bytes(1024);
      const randomBytes2 = await Random.bytes(1024);
      const randomBytes3 = await Random.bytes(1024);
      expect(randomBytes1.length).to.equal(1024);
      expect(randomBytes2.length).to.equal(1024);
      expect(randomBytes3.length).to.equal(1024);
      expect(randomBytes1 !== randomBytes2 || randomBytes2 !== randomBytes3).to.equal(true);
    });
  });

  describe('string', () => {
    it('should return one random char', async () => {
      const chars = ['a', 'e', 'i', 'o', 'u', 'y'];
      const randomString1 = await Random.string(1, chars);
      const randomString2 = await Random.string(1, chars);
      const randomString3 = await Random.string(1, chars);
      expect(randomString1).to.match(/^[aeiouy]{1}$/);
      expect(randomString2).to.match(/^[aeiouy]{1}$/);
      expect(randomString3).to.match(/^[aeiouy]{1}$/);
      expect(randomString1 !== randomString2 || randomString2 !== randomString3).to.equal(true);
    });

    it('should return 1024 random chars', async () => {
      const chars = ['a', 'e', 'i', 'o', 'u', 'y'];
      const randomString1 = await Random.string(1024, chars);
      const randomString2 = await Random.string(1024, chars);
      const randomString3 = await Random.string(1024, chars);
      expect(randomString1).to.match(/^[aeiouy]{1024}$/);
      expect(randomString2).to.match(/^[aeiouy]{1024}$/);
      expect(randomString3).to.match(/^[aeiouy]{1024}$/);
      expect(randomString1 !== randomString2 || randomString2 !== randomString3).to.equal(true);
    });

    it('should return one random numeral', async () => {
      const randomString1 = await Random.numericString(1);
      const randomString2 = await Random.numericString(1);
      const randomString3 = await Random.numericString(1);
      expect(randomString1).to.match(/^[0-9]{1}$/);
      expect(randomString2).to.match(/^[0-9]{1}$/);
      expect(randomString3).to.match(/^[0-9]{1}$/);
      expect(randomString1 !== randomString2 || randomString2 !== randomString3).to.equal(true);
    });

    it('should return 1024 random numerals', async () => {
      const randomString1 = await Random.numericString(1024);
      const randomString2 = await Random.numericString(1024);
      const randomString3 = await Random.numericString(1024);
      expect(randomString1).to.match(/^[0-9]{1024}$/);
      expect(randomString2).to.match(/^[0-9]{1024}$/);
      expect(randomString3).to.match(/^[0-9]{1024}$/);
      expect(randomString1 !== randomString2 || randomString2 !== randomString3).to.equal(true);
    });

    it('should return one random alpha char', async () => {
      const randomString1 = await Random.alphaString(1);
      const randomString2 = await Random.alphaString(1);
      const randomString3 = await Random.alphaString(1);
      expect(randomString1).to.match(/^[a-zA-Z]{1}$/);
      expect(randomString2).to.match(/^[a-zA-Z]{1}$/);
      expect(randomString3).to.match(/^[a-zA-Z]{1}$/);
      expect(randomString1 !== randomString2 || randomString2 !== randomString3).to.equal(true);
    });

    it('should return 1024 random alpha chars', async () => {
      const randomString1 = await Random.alphaString(1024);
      const randomString2 = await Random.alphaString(1024);
      const randomString3 = await Random.alphaString(1024);
      expect(randomString1).to.match(/^[a-zA-Z]{1024}$/);
      expect(randomString2).to.match(/^[a-zA-Z]{1024}$/);
      expect(randomString3).to.match(/^[a-zA-Z]{1024}$/);
      expect(randomString1 !== randomString2 || randomString2 !== randomString3).to.equal(true);
    });

    it('should return one random alpha-numeric char', async () => {
      const randomString1 = await Random.alphaNumericString(1);
      const randomString2 = await Random.alphaNumericString(1);
      const randomString3 = await Random.alphaNumericString(1);
      expect(randomString1).to.match(/^[a-zA-Z0-9]{1}$/);
      expect(randomString2).to.match(/^[a-zA-Z0-9]{1}$/);
      expect(randomString3).to.match(/^[a-zA-Z0-9]{1}$/);
      expect(randomString1 !== randomString2 || randomString2 !== randomString3).to.equal(true);
    });

    it('should return 1024 random alpha-numeric chars', async () => {
      const randomString1 = await Random.alphaNumericString(1024);
      const randomString2 = await Random.alphaNumericString(1024);
      const randomString3 = await Random.alphaNumericString(1024);
      expect(randomString1).to.match(/^[a-zA-Z0-9]{1024}$/);
      expect(randomString2).to.match(/^[a-zA-Z0-9]{1024}$/);
      expect(randomString3).to.match(/^[a-zA-Z0-9]{1024}$/);
      expect(randomString1 !== randomString2 || randomString2 !== randomString3).to.equal(true);
    });
  });
});
