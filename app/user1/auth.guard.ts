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
    debugger
    return this.authService.authenticate().pipe(
      map(
        active => {
          debugger
          return active['status'] == 'success';
          // return active['status'] == 'failed to complete';

        }
      )
    );
  }
}
