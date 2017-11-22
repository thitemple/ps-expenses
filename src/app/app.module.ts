import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatTabsModule,
  MatTableModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { PsRootComponent } from './root.component';
import { CreateReportComponent } from './create-report.component';
import { CreateReportItemDialogComponent } from './create-report-item.component';
import { ReportsComponent } from './reports.component';
import { AppRoutingModule } from './app-routing.module';
import { ReportDataService} from './services/reportData.service';
import { ReportItemService } from './services/reportItem.service';
import { WindowService } from './services/window.service';
import { MessengerWatcher } from './services/messenger.service';
import { EditReportComponent } from './edit-report.component';

export const initApp = (messengerWatcher: MessengerWatcher) => () => {
  messengerWatcher.watch();
}

export const initMessengerWatcher = (reportDataService: ReportDataService) =>
  new MessengerWatcher(reportDataService);

@NgModule({
  declarations: [
    PsRootComponent,
    ReportsComponent,
    CreateReportComponent,
    EditReportComponent,
    CreateReportItemDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    ReportDataService,
    ReportItemService,
    {
      provide: MessengerWatcher,
      deps: [ReportDataService],
      useFactory: initMessengerWatcher 
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [MessengerWatcher],
      multi: true
    },
    {
      provide: WindowService,
      useValue: window
    }
  ],
  bootstrap: [PsRootComponent, CreateReportItemDialogComponent]
})
export class PsExpensesModule { }
