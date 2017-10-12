import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

type Report = {
    date: Date;
    amount: number;
    approved: boolean;
    description: string;
};

const data: Report[] = [{
    date: new Date(2017, 5, 6),
    amount: 99,
    approved: true,
    description: 'Dining with client'
},
{
    date: new Date(2017, 6, 1),
    amount: 110.5,
    approved: false,
    description: 'Dining with client'
},
{
    date: new Date(2017, 7, 1),
    amount: 42,
    approved: true,
    description: 'Dining with client'
},
{
    date: new Date(2017, 8, 1),
    amount: 88.65,
    approved: false,
    description: 'Dining with client'
}];

export class ReportsDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Report[]> {
        return Observable.of(data);
    }

    disconnect() { }
}

@Component({
    selector: 'ps-reports',
    templateUrl: './reports.component.html'
})
export class ReportsComponent {
    reports = new ReportsDataSource();
    displayedColumns = ['description', 'date', 'amount', 'approved'];
}
