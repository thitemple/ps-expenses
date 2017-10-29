import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ReportItem, ReportItemType, ReportItemService } from './services/reportItem.service';

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

    errorMessage = '';

    constructor(private dialogRef: MatDialogRef<CreateReportItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private reportItemService: ReportItemService) { }

        addItem(item: ReportItem) {
            this.errorMessage = this.reportItemService.isValid(item);
            if (!this.errorMessage) {
                this.dialogRef.close(item);
            }
        }

    private updateErrorMessage(message: string): void {
        if (message) {
            this.errorMessage = message;
        }
    }
}
