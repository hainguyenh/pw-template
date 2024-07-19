/**
 * hex-converter.ts: This class provides two primary functionalities: encoding text to hexadecimal and decoding hexadecimal back to text.
 */

/**
 * Encodes text to a hex string.
 * @param text - any text to be encoded.
 * @returns: the encoded text as string
 */
export function encode(text: string): string {
  let hex = '';
  for (let i = 0; i < text.length; i++) {
    const hexChar = text.charCodeAt(i).toString(16);
    hex += hexChar.padStart(2, '0');
  }
  return hex;
}

/**
 * Decodes a hex string to text.
 * @param hex - The hexadecimal string to be decoded.
 * @returns: The decoded text as string
 */
export function decode(hex: string): string {
  let text = '';
  for (let i = 0; i < hex.length; i += 2) {
    const hexByte = hex.substring(i, 2);
    const byte = parseInt(hexByte, 16);
    text += String.fromCharCode(byte);
  }
  return text;
}
