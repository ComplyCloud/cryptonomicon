import createDebug from 'debug';

import { Errors } from '.';

const debug = createDebug('complycloud:cryptonomicon:encode');

function importBuffer(o) {
  switch (typeof o) {
    case 'number':
      throw new Errors.IllegalParameters('importing a buffer from a number is not yet supported');
    default:
      return Buffer.from(o);
  }
}

export function base64(o) {
  const result = importBuffer(o).toString('base64');
  debug('base64 encoded %o as %o', o, result);
  return result;
}

export function base64url(o) {
  const result = base64(o).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  debug('base64url encoded %o as %o', o, result);
  return result;
}
