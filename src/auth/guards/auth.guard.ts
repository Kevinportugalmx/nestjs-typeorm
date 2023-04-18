import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const bearer = req.headers['authorization']
    const token = bearer ? bearer.replace(/^Bearer\s/, '') : ''
    const user = await this._authService.decodeToken(token)
    req.user = user
    const validateToken = !token
      ? false
      : await this._authService.validateToken(token)

    return !!validateToken
  }
}
