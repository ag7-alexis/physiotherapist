import { Component } from '@angular/core';
import { TUI_NOTIFICATION_OPTIONS, TUI_NOTIFICATION_DEFAULT_OPTIONS, TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'physiotherapist-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  providers: [{
    provide: TUI_NOTIFICATION_OPTIONS,
    useValue: {
        ...TUI_NOTIFICATION_DEFAULT_OPTIONS,
        status: TuiNotification.Error,
        hasIcon: false,
    },
},]
})
export class AppointmentComponent {}













// import { Component, OnInit } from '@angular/core';
// import { TUI_NOTIFICATION_OPTIONS, TUI_NOTIFICATION_DEFAULT_OPTIONS, TuiNotification } from '@taiga-ui/core';
// import { Observable } from 'rxjs';


// @Component({
//   selector: 'physiotherapist-appointment',
//   templateUrl: './appointment.component.html',
//   styleUrls: ['./appointment.component.scss'],
//   providers: [{
//     provide: TUI_NOTIFICATION_OPTIONS,
//     useValue: {
//         ...TUI_NOTIFICATION_DEFAULT_OPTIONS,
//         status: TuiNotification.Error,
//         hasIcon: false,
//     },
// },]
// })
// export class AppointmentComponent implements OnInit {
//   showCalendar: boolean = false;

//   ngOnInit() {
//   }
  
// }