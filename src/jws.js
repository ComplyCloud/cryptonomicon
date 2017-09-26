import createDebug from 'debug';

import { Decode, Encode, JWA } from '.';

const debug = createDebug('complycloud:cryptonomicon:jws');

export function decodeJOSE({ payload }) {
  debug('decoding JOSE header for %o', payload);
  const encodedJOSE = payload.substring(0, payload.indexOf('.'));
  debug('extracted JOSE header %o', encodedJOSE);
  const decodedJOSE = Decode.base64url(encodedJOSE, 'utf8');
  debug('decoded JOSE header %o', decodedJOSE);
  return JSON.parse(decodedJOSE);
}

export function encodeJOSE({ algorithm, from, fromUrl, type }) {
  const header = {
    alg: algorithm.id,
    typ: type,
  };
  if (fromUrl) header.jku = fromUrl;
  else header.x5c = from.chain.map(cert => Encode.base64(cert));
  return Encode.base64url(JSON.stringify(header));
}

export function sign({ algorithm = JWA.ES256, from, fromUrl, payload, type = 'JOSE' }) {
  const header = encodeJOSE({
    algorithm,
    from,
    fromUrl,
    type,
  });
  const body = Encode.base64url(JSON.stringify(payload));
  const signingInput = `${header}.${body}`;
  const signature = Encode.base64url(algorithm.sign({ from, payload: signingInput }));
  return `${signingInput}.${signature}`;
}

function getAlgorithm({ payload }) {
  const { alg } = decodeJOSE({ payload });
  return JWA[alg];
}

export function verify({ from, payload }) {
  const algorithm = getAlgorithm({ payload });
  return algorithm.verify({ from, payload });
}
