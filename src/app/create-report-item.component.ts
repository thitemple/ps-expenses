import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'ps-create-report-item',
    templateUrl: './create-report-item.component.html'
})
export class CreateReportItemDialogComponent {

    hasComprovante: boolean;

    constructor(private dialogRef: MatDialogRef<CreateReportItemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any) { }

    onCancelClick() {
        this.dialogRef.close();
    }
}
