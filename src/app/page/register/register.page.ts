import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private storage: StorageService, private auth: AuthService, private toast: ToastService, private screenOrientation: ScreenOrientation) { }
  userDetails = {
    username: '',
    password: '',
    password_two: ''
  };

  

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  register(){
    if(this.passwordCheck(this.userDetails.password, this.userDetails.password_two)){
      this.auth.signup(this.userDetails).subscribe(
        (res: any) => {
          if (res) {
            var user = {
              username: this.userDetails.username,
              token: res.token
            }
            if(res.response){
              this.storage.store(AuthConstants.AUTH, user);
              this.router.navigate(["/dashboard"]);
              this.toast.presentToast(res.response)
            }else{
              if(res.username){
                this.toast.presentToast(res.username);
              }else if(res.response){
                this.toast.presentToast(res.response);
              }else if(res.password){
                this.toast.presentToast(res.password);
              }else{
                this.toast.presentToast("Could not create user")
              }
            }
            
          } else {
            this.toast.presentToast("Plese try again")

          }
        },
        (error: any) => {
          console.log('Network Issue.');
        })
    }
  }

  passwordCheck(pass, passTwo){
    if(pass == passTwo){
      return (this.userDetails.password && this.userDetails.password_two);
    }else{
      return this.toast.presentToast("Password do not match");
    }
  }

}
