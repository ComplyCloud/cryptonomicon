import { expect } from 'chai';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { ECC, JWS } from '../src';

const SIGNER_PVT = ECC.ingest(readFileSync(resolve(__dirname, 'resources/secp256k1-key.pem'), 'utf8'));
const SIGNER_PUB = ECC.ingest(readFileSync(resolve(__dirname, 'resources/secp256k1-pub.pem'), 'utf8'));

describe('JWS', function () {

  describe('sign', function () {

    it('should create a valid signature with secp256k1 ecc', function () {
      const jws = JWS.sign({
        from: SIGNER_PVT,
        fromUrl: 'crn://horus/faux-key',
        payload: { test: 123 },
      });
      expect(JWS.verify({ from: SIGNER_PUB, payload: jws })).to.equal(true);
    });

    it('should reject a valid signature with secp256k1 ecc using a mismatched payload', function () {
      const jws1 = JWS.sign({
        from: SIGNER_PVT,
        fromUrl: 'crn://horus/faux-key',
        payload: { test: 123 },
      });
      const jws2 = JWS.sign({
        from: SIGNER_PVT,
        fromUrl: 'crn://horus/faux-key',
        payload: { test: 321 },
      });
      const hybridJWS = `${jws1.substring(0, jws1.lastIndexOf('.'))}.${jws2.substring(jws2.lastIndexOf('.')+1)}`;
      expect(JWS.verify({ from: SIGNER_PUB, payload: hybridJWS })).to.equal(false);
    });

    it('should reject an invalid signature with secp256k1 ecc', function () {
      const jws = JWS.sign({
        from: SIGNER_PVT,
        fromUrl: 'crn://horus/faux-key',
        payload: { test: 123 },
      });
      const hybridJWS = `${jws.substring(0, jws.lastIndexOf('.'))}.GARBAGE`;
      expect(JWS.verify({ from: SIGNER_PUB, payload: hybridJWS })).to.equal(false);
    });

  });

});
