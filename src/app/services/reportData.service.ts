import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export type Report = {
    date: Date;
    amount: number;
    approved: boolean;
    description: string;
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
