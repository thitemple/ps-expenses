import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateReportItemDialogComponent } from './create-report-item.component';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReportDataService, Report } from './services/reportData.service';
import { ReportItem } from './services/reportItem.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BaseReportComponent } from './base-report.component';

@Component({
    selector: 'ps-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class CreateReportComponent extends BaseReportComponent {

    title = 'Create new expense report';
    constructor(location: Location,
        dialog: MatDialog,
        reportDataService: ReportDataService) {
        super(location, dialog, reportDataService);
    }

    save(): void {
        const newReport: Report = {
            date: new Date(),
            approved: false,
            description: this.description,
            items: this.itemsDataBase.data
        };
        this.reportDataService.add(newReport);
        this.location.back();
    }
}
