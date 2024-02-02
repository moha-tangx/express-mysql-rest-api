import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

export function hash(password) {
  const salt = randomBytes(16).toString("hex"),
    hashedPassword = scryptSync(password, salt, 64).toString("hex"),
    passWord = `${salt}:${hashedPassword}`;
  return passWord;
}

export function compare(hashed, password) {
  const [salt, key] = hashed.split(":"),
    hashedBuffer = scryptSync(password, salt, 64),
    keyBuffer = Buffer.from(key, "hex"),
    match = timingSafeEqual(hashedBuffer, keyBuffer);
  return match;
}
