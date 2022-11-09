
import { ExecutionContext, Injectable } from '@nestjs/common'; 
import { AuthGuard} from '@nestjs/passport'; 
import { ContextIdFactory, Reflector} from '@nestjs/core'; 
import {IS_PUBLIC_KEY} from '../decorators/public.decorators'; 

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { 
  constructor(private reflector: Reflector) { 
    super(); 
  }


canActivate(context: ExecutionContext) { 
  const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler()); 
  if (isPublic) {
    return true;
    
  }
  return super.canActivate(context);

}
}