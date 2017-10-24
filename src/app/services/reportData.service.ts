import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReportItem } from '../create-report-item.component';

export type Report = {
    id?: number;
    date: Date;
    approved: boolean;
    description: string;
    items: ReportItem[];
    amount?(): number;
};

@Injectable()
export class ReportDataService {
    dataChange = new BehaviorSubject<Report[]>([]);

    get data(): Report[] {
        return this.dataChange.value;
    }

    addReportItem(report: Report) {
        const newReport = {
            ...report,
            id: this.data.reduce((biggestId, rep) => biggestId > rep.id ? biggestId : rep.id, 0) + 1
        };
        const newData = [...this.data, report];
        this.dataChange.next(newData);
    }
}
