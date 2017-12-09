import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReportItem } from './reportItem.service';
import { WindowService } from './window.service';
import { Subject } from 'rxjs/Subject';

export type Report = {
    id: number;
    date: Date;
    approved: boolean;
    description: string;
    items: ReportItem[];
    amount: number;
};

export type NewReport = Pick<Report, 'date' | 'approved' | 'description' | 'items'>;

const psReportsKey = 'ps-reports';

@Injectable()
export class ReportDataService {
    dataChange = new BehaviorSubject<Report[]>([]);
    reportCreated: Subject<Report> = new Subject();
    reportApprovedReject: Subject<{ report: Report, user: string }> = new Subject();

    constructor(@Inject(WindowService) private _window: Window) {
        const stringfiedReports = _window.localStorage.getItem(psReportsKey);
        if (stringfiedReports) {
            this.dataChange.next(JSON.parse(stringfiedReports));
        }
    }

    get data(): Report[] {
        return this.dataChange.value;
    }

    getReport(reportId: number): Promise<Report | undefined> {
        return Promise.resolve(this.data.find(r => r.id === reportId));
    }

    add(report: NewReport) {
        const newReport = {
            ...report,
            id: this.data.reduce((biggestId, rep) => biggestId > rep.id ? biggestId : rep.id, 0) + 1,
            amount: report.items.reduce((sum, item) => sum + item.amount, 0)
        };
        const newData = [...this.data, newReport];
        this.updateData(newData);
        this.reportCreated.next(newReport);
    }

    save(report: Report) {
        const reportIndex = this.data.findIndex(r => r.id === report.id);
        const newData = [...this.data];
        newData.splice(reportIndex, 1, report);
        this.updateData(newData);
    }

    toggleApproval(report: Report, user: string) {
        const reportIndex = this.data.findIndex(r => r.id === report.id);
        const newData = [...this.data];
        newData.splice(reportIndex, 1, report);
        this.updateData(newData);
        this.reportApprovedReject.next({ report, user });
    }

    private updateData(reports: Report[]) {
        this._window.localStorage.setItem(psReportsKey, JSON.stringify(reports));
        this.dataChange.next(reports);
    }
}
