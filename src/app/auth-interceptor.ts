import { DeviceInfo } from '@capacitor/core';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { retry, mergeMap, catchError, finalize, retryWhen, take, tap, delay, map, switchMap } from 'rxjs/operators';
import { throwError, Observable, pipe, from, EMPTY } from 'rxjs';
import { StorageService } from './services/storage.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { UserDataResolver } from './resolvers/user-data-resolver';
import { ToastService } from './services/toast.service';




@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor {

    
    constructor( 
        private toast: ToastService, 
        private storage: StorageService, 
        private lodingCtrl: LoadingController, 
        private userD: UserDataResolver ,
        private alertCnt: AlertController,
        ) {  }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.lodingCtrl.getTop().then(hasLoading => {
        //     if(!hasLoading) {
        //         this.lodingCtrl.create({
        //             spinner: 'circular',
        //             translucent: true,
        //         }).then(loading => loading.present());
        //     }
        // });

        
        const cloneReq = this.addToken(req, this.storage.token);
        return next.handle(cloneReq).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>err).status){
                        case 401:
                            return this.refresh401(cloneReq, next);
                        default:
                            return throwError(err);
                    }
                }else{
                    return throwError(err);
                }
            }),
            retryWhen(err => {
                let ret = 1;
                return err.pipe(
                    delay(2000),
                    tap(() => {
                        this.showRetries(ret)
                    }),
                    map(error => {
                        if (ret++ === 3) {
                            throw error;
                        }
                        return error;
                    })
                )
            }),
            catchError(err => {
                this.showAlert(err);
                return EMPTY;
            }),
            finalize(() => {
                this.lodingCtrl.getTop().then(hasLoading => {    
                    if(hasLoading) {
                        this.lodingCtrl.dismiss();
                    }
                });
            })
        );    
        

    }

    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `token ${token}`
                }
            });
            return clone
        }
        return request
    }
    private refresh401(request: HttpRequest<any>, nextone: HttpHandler){
        const token = this.storage.token;
        request = request.clone({
            setParams: {
                token 
            }
        });
        return nextone.handle(request);
    }
    

    async showRetries(counter) {
        this.toast.presentToast("Retry: "+counter+"/3")
    }
    async showAlert(msg) {
        const alert = await this.alertCnt.create({
            header: "Oops something went wrong",
            message: msg,
            buttons: ['OK']
        });
        await alert.present()
    }


}
