import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

enum ReportItemType {
    food = 'Food',
    travel = 'Travel',
    training = 'Training',
    transport = 'Transport',
    unselected = ''
}

export type ReportItem = {
    description: string;
    amount: number;
    hasReceipt: boolean;
    type: ReportItemType;
    date: Date;
};

@Component({
    selector: 'ps-create-report-item',
    templateUrl: './create-report-item.component.html',
    styleUrls: ['./create-report-item.component.css']
})
export class CreateReportItemDialogComponent {

    item: ReportItem = {
        description: '',
        amount: 0,
        hasReceipt: false,
        type: ReportItemType.unselected,
        date: new Date()
    };

    itemTypeOptions: ReportItemType[] = [
        ReportItemType.unselected,
        ReportItemType.food,
        ReportItemType.training,
        ReportItemType.transport,
        ReportItemType.travel
    ];

    constructor(private dialogRef: MatDialogRef<CreateReportItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) { }
}
