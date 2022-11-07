function isURL(value: string) {
  return /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(value);
}

function isHEX(value: string) {
  return value.includes('#') && value.length === 7 && /^#[0-9|A-Z|a-z]{6,6}$/.test(value);
}

const validator = {
  isURL,
  isHEX,
}

export default validator;
