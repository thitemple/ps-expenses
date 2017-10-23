import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReportItem } from '../create-report-item.component';

export type Report = {
    id: number;
    date: Date;
    amount: number;
    approved: boolean;
    description: string;
    items: ReportItem[];
};

@Injectable()
export class ReportDataService {
    dataChange = new BehaviorSubject<Report[]>([]);

    get data(): Report[] {
        return this.dataChange.value;
    }

    addReportItem(report: Report) {
        const newData = [...this.data, report];
        this.dataChange.next(newData);
    }
}
