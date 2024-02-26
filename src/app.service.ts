import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}

console.log('Usted a sido hackeado por el inhackeable xd')