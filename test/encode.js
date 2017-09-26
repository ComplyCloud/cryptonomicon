import { expect } from 'chai';

import { Encode } from '../src';

const ENCODINGS = [
  {
    raw: 'a',
    base64: 'YQ==',
  },
  {
    raw: 'aa',
    base64: 'YWE=',
  },
  {
    raw: 'If all the salmon caught in Canada in one year were laid end to end across the Sahara Desert, the smell would be absolutely awful.',
    base64: 'SWYgYWxsIHRoZSBzYWxtb24gY2F1Z2h0IGluIENhbmFkYSBpbiBvbmUgeWVhciB3ZXJlIGxhaWQgZW5kIHRvIGVuZCBhY3Jvc3MgdGhlIFNhaGFyYSBEZXNlcnQsIHRoZSBzbWVsbCB3b3VsZCBiZSBhYnNvbHV0ZWx5IGF3ZnVsLg==',
  },
];

describe('Random', function () {

  describe('base64', function () {

    ENCODINGS.forEach((encoding) => {
      it(`encodes the string "${encoding.raw}"`, function () {
        expect(Encode.base64(encoding.raw)).to.equal(encoding.base64);
      });
    });

  });

});
