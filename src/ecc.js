import { createSign, createVerify } from 'crypto';
import createDebug from 'debug';

const debug = createDebug('complycloud:cryptonomicon:ecc');

function ingestPrivateKeyPEM(str) {
  return {
    privateKey: {
      PEM: str,
    },
  };
}

function ingestPublicKeyPEM(str) {
  return {
    publicKey: {
      PEM: str,
    },
  };
}

export function ingest(o) {
  if (typeof o === 'string') {
    if (o.startsWith('-----BEGIN EC PRIVATE KEY-----')) return ingestPrivateKeyPEM(o);
    if (o.startsWith('-----BEGIN PUBLIC KEY-----')) return ingestPublicKeyPEM(o);
  }
}

export function sign({ algorithm = 'SHA256', from, payload }) {
  const sign = createSign(algorithm);
  sign.update(payload);
  return sign.sign(from.privateKey.PEM);
}

export function verify({ algorithm = 'SHA256', from, payload, signature }) {
  debug('verifiying signature %o on %o', signature, payload);
  const verify = createVerify(algorithm);
  verify.update(payload);
  return verify.verify(from.publicKey.PEM, signature);
}
