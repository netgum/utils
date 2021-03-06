import { sha3 } from './crypto';
import { verifyAddress, convertAddress, ZERO_ADDRESS, computeCreate2Address } from './address';

describe('address', () => {

  const address = '0x26f4138c2474ecc5595e315500a15ed6fb2acde4';
  const addressWithChecksum = '0x26F4138C2474Ecc5595E315500A15ed6Fb2ACdE4';

  describe('verifyAddress()', () => {
    it('expect return true when address is valid', () => {
      expect(verifyAddress(address, false))
        .toBeTruthy();
      expect(verifyAddress(addressWithChecksum, true))
        .toBeTruthy();
    });

    it('expect return false when address is invalid', () => {
      expect(verifyAddress(ZERO_ADDRESS))
        .toBeFalsy();
      expect(verifyAddress(address, true))
        .toBeFalsy();
    });
  });

  describe('convertAddress()', () => {
    it('should convert address', () => {
      expect(convertAddress(address))
        .toBe(addressWithChecksum);
    });
  });

  describe('computeCreate2Address()', () => {
    // see: http://eips.ethereum.org/EIPS/eip-1014 (Example 5)
    const deployer = '0x00000000000000000000000000000000deadbeef';
    const salt = '0x00000000000000000000000000000000000000000000000000000000cafebabe';
    const byteCode = '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef';
    const address = '0x1d8bfDC5D46DC4f61D6b6115972536eBE6A8854C';

    it('expect to compute correct address with byteCode', () => {
      expect(computeCreate2Address(
        deployer,
        salt,
        byteCode,
      )).toBe(address);
    });

    it('expect to compute correct address with byteCode hash', () => {
      expect(computeCreate2Address(
        deployer,
        salt,
        sha3(byteCode),
      )).toBe(address);
    });
  });
});
