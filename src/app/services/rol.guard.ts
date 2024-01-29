import { CanActivateFn,  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const rolGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let authservice=inject(AuthService)
  let rol=route.data['rol']
  if(authservice.hasRol(rol)){

    return true;
  }else{
    let url = router.createUrlTree([''])
    return url
  }
};
