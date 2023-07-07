import crypto from 'node:crypto'

export function generateString(length: number) {
  const salt = crypto.randomBytes(length)
  return salt.toString('hex').slice(0, length)
}

export function generateHashedPassword(password: string, salt: string) {
  const saltedPassword = password + salt
  const hashedPassword = crypto
    .createHash('md5')
    .update(saltedPassword)
    .digest('hex')
  return hashedPassword
}
