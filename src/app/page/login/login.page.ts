import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userDetails = {
    username: '',
    password: ''
  };
  constructor(private toast: ToastService, private screenOrientation: ScreenOrientation, private authService:AuthService, private storage:StorageService, private router:Router ) { }
  

  validateInputs() {
    let username = this.userDetails.username.trim();
    let password = this.userDetails.password.trim();
    return (
      this.userDetails.username &&
      this.userDetails.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  loginAction() {
    if (this.validateInputs()) {
      this.authService.login(this.userDetails).subscribe(
        (res: any) => {
          if (res) {
            var user = {
              username: this.userDetails.username,
              token: res.token
            }
            if(res.token){
              // Storing the User data.
              this.storage.store(AuthConstants.AUTH, user);
              this.router.navigate(['/dashboard']);
              this.toast.presentToast("Welcome back " + this.userDetails.username)
            }else{
              this.toast.presentToast("Error Logging in.")
            }
          } else {
            console.log('incorrect password.');
          }
        },
        (error: any) => {
          console.log('Network Issue.');
        }
      );
    } else {
      console.log('Please enter email/username or password.');
    }
  }


  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

}
