import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Report, ReportDataService } from './services/reportData.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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

function mapUser(params: ParamMap, index: number): boolean {
    const userName = params.get('user') || '';
    return userName.indexOf('admin') > -1;
}

@Component({
    selector: 'ps-reports',
    templateUrl: './reports.component.html'
})
export class ReportsComponent {
    reports: ReportsDataSource;
    isAdmin = Observable.of(false);
    displayedColumns = ['id', 'description', 'date', 'amount', 'approved', 'actions'];

    constructor(private route: ActivatedRoute, private reportDataService: ReportDataService) {
        this.reports = new ReportsDataSource(reportDataService);
        this.isAdmin = this.route.queryParamMap.map(mapUser);
    }

    approve(report: Report) {
        report.approved = true;
    }

    reject(report: Report) {
        report.approved = false;
    }
}
