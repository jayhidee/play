import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private screenOrientation: ScreenOrientation, private httpService:HttpService) { }

  data;

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  dataTest(){  
    this.httpService.getHeader('basic-info/').subscribe(
      res=>{
        this.data = res
        console.log(res);
      },
      (error: any) => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      }
    );
    
  }

}
