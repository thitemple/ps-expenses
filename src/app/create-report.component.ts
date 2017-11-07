import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ReportDataService, Report } from './services/reportData.service';
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
