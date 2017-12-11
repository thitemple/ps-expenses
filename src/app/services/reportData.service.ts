import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Report, NewReport, PS_REPORTS_KEY, RemoteData, isRemoteDataOK } from '../types';
import { WindowService } from './window.service';

@Injectable()
export class ReportDataService {
    dataChange = new BehaviorSubject<RemoteData<Report[]>>({ kind: "notFetched" });
    reportCreated: Subject<Report> = new Subject();
    reportApprovedReject: Subject<{ report: Report, user: string }> = new Subject();

    constructor(@Inject(WindowService) private _window: Window) {
        this.fetch();
    }

    get remoteData(): RemoteData<Report[]> {
        return this.dataChange.value;
    }

    getReport(reportId: number): Promise<Report | undefined> {
        if (isRemoteDataOK(this.remoteData)) {
            return Promise.resolve(this.remoteData.data.find(r => r.id === reportId));
        } else {
            return Promise.resolve(undefined);
        }
    }

    add(report: NewReport) {
        if (isRemoteDataOK(this.remoteData)) {
            const newReport = {
                ...report,
                id: this.remoteData.data.reduce((biggestId, rep) => biggestId > rep.id ? biggestId : rep.id, 0) + 1,
                amount: report.items.reduce((sum, item) => sum + item.amount, 0)
            };
            const newData = [...this.remoteData.data, newReport];
            this.updateData(newData);
            this.reportCreated.next(newReport);
        }
    }

    save(report: Report) {
        if (isRemoteDataOK(this.remoteData)) {
            const reportIndex = this.remoteData.data.findIndex(r => r.id === report.id);
            const newData = [...this.remoteData.data];
            newData.splice(reportIndex, 1, report);
            this.updateData(newData);
        }
    }

    toggleApproval(report: Report, user: string) {
        if (isRemoteDataOK(this.remoteData)) {
            const reportIndex = this.remoteData.data.findIndex(r => r.id === report.id);
            const newData = [...this.remoteData.data];
            newData.splice(reportIndex, 1, report);
            this.updateData(newData);
            this.reportApprovedReject.next({ report, user });
        }
    }

    private updateData(reports: Report[]) {
        this._window.localStorage.setItem(PS_REPORTS_KEY, JSON.stringify(reports));
        this.dataChange.next({ kind: "ok", data: reports });
    }

    private fetch(): void {
        this.dataChange.next({ kind: "loading" });
        setTimeout(() => {
            const random = Math.floor((Math.random() * 10) + 1);
            const stringfiedReports = this._window.localStorage.getItem(PS_REPORTS_KEY);
            if (random > 3 && stringfiedReports) {
                this.dataChange.next({
                    kind: "ok",
                    data: JSON.parse(stringfiedReports)
                });
            } else {
                this.dataChange.next({
                    kind: 'error',
                    error: 'The were was an issue loading the data'
                })
            }
        }, 1000);
    }
}
