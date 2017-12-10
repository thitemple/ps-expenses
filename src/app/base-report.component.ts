import { MatDialog } from "@angular/material";
import { Location } from '@angular/common';
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { ReportDataService } from "./services/reportData.service";
import { CreateReportItemDialogComponent } from "./create-report-item.component";
import { ReportItem } from "./types";

export abstract class BaseReportComponent {
    abstract title: string;
    description = '';
    dataSource: ReportItemsDataSource;
    displayedColumns = ['description', 'amount', 'type', 'date', 'hasReceipt'];
    protected itemsDataBase: ReportItemDatabase;

    constructor(protected location: Location,
        private dialog: MatDialog,
        protected reportDataService: ReportDataService) {
        this.itemsDataBase = new ReportItemDatabase();
        this.dataSource = new ReportItemsDataSource(this.itemsDataBase);
    }

    cancel(): void {
        this.location.back();
    }

    addItem(): void {
        const dialogRef = this.dialog.open(CreateReportItemDialogComponent, {
            width: '525px',
        });
        dialogRef.afterClosed().subscribe(item => {
            if (item) {
                this.itemsDataBase.addReportItem(item);
            }
        });
    }

    abstract save(): void;
}

class ReportItemDatabase {
    dataChange = new BehaviorSubject<ReportItem[]>([]);

    get data(): ReportItem[] {
        return this.dataChange.value;
    }

    addReportItem(item: ReportItem) {
        const newData = [...this.data, item];
        this.dataChange.next(newData);
    }

    addRange(items: ReportItem[]) {
        const newData = [...this.data, ...items];
        this.dataChange.next(newData);
    }
}

class ReportItemsDataSource extends DataSource<any> {

    constructor(private sourceDatabase: ReportItemDatabase) {
        super();
    }

    connect(): Observable<ReportItem[]> {
        return this.sourceDatabase.dataChange.map(data => data);
    }

    disconnect() { }
}
