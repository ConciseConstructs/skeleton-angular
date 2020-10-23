import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage extends ConciseComponent {

  constructor(
    public app:AppService
  ) {
    super(app)
  }

}
