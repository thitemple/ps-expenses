import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { ReportDataService } from './services/reportData.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WindowService } from './services/window.service';
import { Report, RemoteData } from './types';
import { MatTableDataSource } from '@angular/material';

function mapUser(params: ParamMap): boolean {
    const userName = params.get('user') || '';
    return userName.indexOf('admin') > -1;
}

function toggleApprovedStyle(this: HTMLElement, approved: boolean) {
    if (approved && this.className.indexOf('approved') === -1) {
        this.className += ' approved';
    } else {
        this.className = this.className.replace('approved', '');
    }
}


@Component({
    selector: 'ps-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
    reports: MatTableDataSource<Report>;
    isAdmin = Observable.of(false);
    displayedColumns = ['id', 'description', 'date', 'amount', 'approved', 'actions'];

    constructor(private route: ActivatedRoute,
        private reportDataService: ReportDataService,
        @Inject(WindowService) private _window: Window) {
        this.reports = new MatTableDataSource([]);
        this.isAdmin = this.route.queryParamMap.map(mapUser);

        reportDataService.dataChange.subscribe(remoteData => {
            this.handleDataChanged(remoteData);
        });
    }

    handleDataChanged(remoteData: RemoteData<Report[]>): string {
        switch(remoteData.kind) {
            case 'ok':
                this.reports.data = remoteData.data;
                return remoteData.kind;
            case 'error':
                alert(remoteData.error);
                return remoteData.kind;
            case 'loading':
                // display loading spinner;
                return remoteData.kind;
            case 'notFetched':
                // display initial page;
                return remoteData.kind;
        }
    }

    approve(report: Report) {
        this.toggleApproval(report, true);
        this.toggleApprovedStyle(report.id, true);
    }

    reject(report: Report) {
        this.toggleApproval(report, false);
        this.toggleApprovedStyle(report.id, false);
    }

    private toggleApprovedStyle(reportId: number, approved: boolean) {
        setTimeout(() => {
            const row = this._window.document.getElementById(`report$${reportId}`)!.closest('mat-row');
            toggleApprovedStyle.call(row, approved);
        }, 50);
    }

    private toggleApproval(report: Report, approved: boolean) {
        report.approved = approved;
        this.route
            .queryParamMap
            .take(1)
            .map(params => params.get('user'))
            .subscribe(user => {
                if (user) {
                    this.reportDataService.toggleApproval(report, user);
                }
            });
    }
}
