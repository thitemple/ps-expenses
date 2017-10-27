import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
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
    private isLoading: boolean;

    constructor(private route: ActivatedRoute, private reportDataService: ReportDataService) {
        this.reports = new ReportsDataSource(reportDataService);
        this.isAdmin = this.route.queryParamMap.map(mapUser);
    }

    approve(report: Report) {
        this.toggleApproval(report, true);
    }

    reject(report: Report) {
        this.toggleApproval(report, false);
    }

    private toggleApproval(report: Report, approved: boolean) {
        report.approved = approved;
        const user = this.route
            .queryParamMap
            .take(1)
            .subscribe(params => this.reportDataService.save(report, params.get('user')));
        
    }
}
