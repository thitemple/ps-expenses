import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export type ReportItem = {
    description: string;
    amount: number;
    hasReceipt: boolean;
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
        hasReceipt: false
    };

    constructor(private dialogRef: MatDialogRef<CreateReportItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) { }
}
