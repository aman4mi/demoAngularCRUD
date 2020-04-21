import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authenticate().pipe(
      map(
        (res:any) => {
          debugger
          // return active['status'] == 'success';
          if(res['status'] == 'failed to complete'){
            return true;
          }
          else
            return false;
        }
      )
    );
  }
}
