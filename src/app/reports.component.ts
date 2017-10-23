import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Report, ReportDataService } from './services/reportData.service';

export class ReportsDataSource extends DataSource<any> {

    constructor(private dataSource: ReportDataService) {
        super();
    }

    connect(): Observable<Report[]> {
        return this
            .dataSource
            .dataChange
            .map(data => data);
    }

    disconnect() { }
}

@Component({
    selector: 'ps-reports',
    templateUrl: './reports.component.html'
})
export class ReportsComponent {
    reports: ReportsDataSource;
    displayedColumns = ['id', 'description', 'date', 'amount', 'approved'];

    constructor(reportDataService: ReportDataService) {
        this.reports = new ReportsDataSource(reportDataService);
    }
}
