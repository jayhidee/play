import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AuthConstants } from '../config/auth-constants';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  token;
  username;

  constructor() { 
    this.gt(AuthConstants.AUTH);
    this.getUsername(AuthConstants.AUTH);
   }
  // Store the value
  async store(storageKey: string, value: any) {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({
      key: storageKey,
      value: encryptedValue
    });
  }
  
  // Get the value
  async get(storageKey: string) {
    const ret = await Storage.get({ key: storageKey });
    return JSON.parse(unescape(atob(ret.value)));
  }

  // Get the value
  async gt(storageKey: string) {
    let ret = await Storage.get({ key: storageKey });
    let token = JSON.parse(unescape(atob(ret.value)));
    this.token = token.token
  }

  // Get the value
  async getUsername(storageKey: string) {
    let ret = await Storage.get({ key: storageKey });
    let user = JSON.parse(unescape(atob(ret.value)));
    this.username = user.username
  }
   

  async removeStorageItem(storageKey: string) {
    await Storage.remove({ key: storageKey });
  }
  
  // Clear storage
  async clear() {
    await Storage.clear();
  }
}
