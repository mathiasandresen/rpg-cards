export const uuid4 = (): string => {
  const ho = (n, p) => n.toString(16).padStart(p, 0); /// Return the hexadecimal text representation of number `n`, padded with zeroes to be of length `p`
  const data = crypto.getRandomValues(new Uint8Array(16)); /// Fill the buffer with random data
  data[6] = (data[6] & 0xf) | 0x40; /// Patch the 6th byte to reflect a version 4 UUID
  data[8] = (data[8] & 0x3f) | 0x80; /// Patch the 8th byte to reflect a variant 1 UUID (version 4 UUIDs are)
  const view = new DataView(data.buffer); /// Create a view backed by a 16-byte buffer
  return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}-${ho(
    view.getUint16(8),
    4
  )}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`; /// Compile the canonical textual form from the array data
};
