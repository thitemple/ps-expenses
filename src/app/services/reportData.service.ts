import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReportItem } from './reportItem.service';
import { WindowService } from './window.service';

export type Report = {
    id?: number;
    date: Date;
    approved: boolean;
    description: string;
    items: ReportItem[];
    amount?: number;
};

const psReportsKey = 'ps-reports';

@Injectable()
export class ReportDataService {
    dataChange = new BehaviorSubject<Report[]>([]);

    constructor(@Inject(WindowService) private _window: Window) {
        const stringfiedReports = _window.localStorage.getItem(psReportsKey);
        if (stringfiedReports) {
            this.dataChange.next(JSON.parse(stringfiedReports));
        }
    }

    get data(): Report[] {
        return this.dataChange.value;
    }

    add(report: Report) {
        const newReport = {
            ...report,
            id: this.data.reduce((biggestId, rep) => biggestId > rep.id ? biggestId : rep.id, 0) + 1,
            amount: report.items.reduce((sum, item) => sum + item.amount, 0)
        };
        const newData = [...this.data, newReport];
        this._window.localStorage.setItem(psReportsKey, JSON.stringify(newData));
        this.dataChange.next(newData);
    }

    save(report: Report) {
        const reportIndex = this.data.findIndex(r => r.id === report.id);
        const newData = [...this.data];
        newData.splice(reportIndex, 1, report);
        this._window.localStorage.setItem(psReportsKey, JSON.stringify(newData));
        this.dataChange.next(newData);
    }
}
