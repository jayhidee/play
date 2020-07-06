import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PopoverController, ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-id-card',
  templateUrl: './id-card.page.html',
  styleUrls: ['./id-card.page.scss'],
})
export class IdCardPage implements OnInit {
  ngOnInit() {
    this.getListOfIds();
    // setInterval(()=> { this.getListOfIds(); },4000);

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }



  dataReturned: any;
  cards: any;

  constructor(
    private screenOrientation: ScreenOrientation,
    public modalController: ModalController,
    public httpService: HttpService,
    public toast: ToastService
  ) { }

  getListOfIds(){
    this.httpService.getHeader('card/').subscribe((res) => {
      this.cards = res;
    });
  }


}
