import {
  randomBytes,
  createHash,
  createCipheriv,
  createDecipheriv,
} from 'crypto'
import { config } from './config'

// set OPENSSL_CONF to /dev/null
// export OPENSSL_CONF=/dev/null

process.env['OPENSSL_CONF'] = '/dev/null'

const iv = randomBytes(16).toString('hex').slice(0, 16)
const key = createHash('sha256').update(String(config.appKey)).digest('base64')

export const encrypt = (text: string): string => {
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(key, 'base64'), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString()}:${encrypted.toString('hex')}`
}

export const hashWithAppKey = (text: string): string => {
  return createHash('sha256')
    .update(String(text + config.appKey))
    .digest('hex')
}

export const decrypt = (text: string): string => {
  const textParts = text.split(':')
  const iv = textParts.shift()
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = createDecipheriv(
    'aes-256-cbc',
    Buffer.from(key, 'base64'),
    iv
  )
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
