import createDebug from 'debug';

const debug = createDebug('complycloud:cryptonomicon:decode');

export function base64(o, format) {
  let result = Buffer.from(o, 'base64');
  if (format) result = result.toString(format);
  debug('base64url decoded %o as %o', o, result);
  return result;
}

export function base64url(o) {
  let string = o.toString();
  const segmentLength = 4;
  const stringLength = string.length;
  const diff = stringLength % segmentLength;
  if (diff) {
    let position = stringLength;
    let padLength = segmentLength - diff;
    let paddedStringLength = stringLength + padLength;
    let buffer = new Buffer(paddedStringLength);
    buffer.write(string);
    while (padLength--) {
        buffer.write("=", position++);
    }
    string = buffer.toString();
  }
  const result = base64(string.replace(/\-/g, "+").replace(/_/g, "/"));
  debug('base64url decoded %o as %o', o, result);
  return result;
}
