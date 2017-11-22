import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";

import { ReportDataService, Report } from "./services/reportData.service";
import { BaseReportComponent } from "./base-report.component";

@Component({
    selector: 'ps-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class EditReportComponent extends BaseReportComponent {
    title = 'Edit expense report';
    private report: Report;
    constructor(location: Location,
        dialog: MatDialog,
        reportDataService: ReportDataService,
        route: ActivatedRoute) {
        super(location, dialog, reportDataService);

        route
            .paramMap
            .switchMap(params => reportDataService.getReport(+params.get('id')!))
            .subscribe(report => {
                if (report) {
                    this.description = report.description;
                    this.itemsDataBase.addRange(report.items);
                    this.report = report;
                } else {
                    console.log("report is undefined")
                }
            });
    }

    save(): void {
        const modifiedReport = {
            ...this.report,
            description: this.description,
            items: this.itemsDataBase.data
        };
        this.reportDataService.save(modifiedReport);
    }
}