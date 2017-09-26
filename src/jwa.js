import { Decode, ECC } from '.';

function createSign(algorithm) {
  return function sign({ from, payload }) {
    return ECC.sign({ algorithm, from, payload });
  }
}

function createVerify(algorithm) {
  return function verify({ from, payload }) {
    const verifyInput = payload.substring(0, payload.lastIndexOf('.'));
    const signature = Decode.base64url(payload.substring(payload.lastIndexOf('.') + 1));
    return ECC.verify({ algorithm, from, payload: verifyInput, signature });
  }
}

export const ES256 = {
  id: 'ES256',
  description: 'ECDSA using P-256 and SHA-256',
  sign: createSign('SHA256'),
  verify: createVerify('SHA256'),
};
