import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { async } from 'rxjs/internal/scheduler/async';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http:HttpClient, private storage:StorageService) { }
  
  //post methos without header 
  post(serviceName: string, data: any) {
    const url = environment.apiUrl + serviceName;    
    return this.http.post(url, data);
  }
  //post methos without header 
  getHeader(serviceName: string) {
    const url = environment.apiUrl + serviceName;
    return this.http.get(url);
  }

}
