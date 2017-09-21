import { Errors } from '.';

async function bytesBrowser(length) {
  const nativeArr = new Uint8Array(length);
  const crypto = window.crypto || window.msCrypto;
  crypto.getRandomValues(nativeArr);
  return [].slice.call(nativeArr);
}

async function bytesNode(length) {
  const { randomBytes } = require('crypto'); // eslint-disable-line global-require
  const { promisify } = require('util'); // eslint-disable-line global-require
  const randomBytesAsync = promisify(randomBytes);
  return randomBytesAsync(length);
}

export async function bytes(length) {
  if (typeof process !== 'undefined' && typeof process.pid === 'number') {
    return bytesNode(length);
  }
  return bytesBrowser(length);
}

export async function string(length, chars) {
  if (!chars) {
    throw new Errors.IllegalParameters('argument \'chars\' is undefined');
  }

  if (chars.length > 256) {
    const errMsg = 'argument \'chars\' must be <=256 characters, otherwise unpredictability will be broken';
    throw new Errors.InsecureParameters(errMsg);
  }

  const randomBytes = await bytes(length);
  const result = new Array(length);

  let cursor = 0;
  for (let i = 0; i < length; i += 1) {
    cursor += randomBytes[i];
    result[i] = chars[cursor % chars.length];
  }

  return result.join('');
}

export async function alphaString(length) {
  return string(length, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

export async function alphaNumericString(length) {
  return string(length, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
}

export async function numericString(length) {
  return string(length, '0123456789');
}
