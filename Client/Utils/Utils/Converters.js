export function ToHex(val, digits, no_prefix) {
  var prefix = "0x";
  if (no_prefix) prefix = "";
  return prefix + val.toString(16).toUpperCase().padStart(digits, "0");
}

export function ToBinary(val, bits) {
  if (!bits) bits = 8;
  return val.toString(2).padStart(bits, "0");
}
