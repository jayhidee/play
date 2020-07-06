import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { AuthConstants } from '../config/auth-constants'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
    ) {}
    getUserData() {
      this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userData$.next(res);
      });
    }
    
    login(postData: any): Observable<any> {
      return this.httpService.post('login-user/', postData);
    }
    
    signup(postData: any): Observable<any> {
      return this.httpService.post('register-user/', postData);
    }
    
    logout() {
      this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.userData$.next('');
      this.router.navigate(['/login']);
    });
    }
}
