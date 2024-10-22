import bcrypt from "bcrypt";

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
