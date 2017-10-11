import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateReportItemDialogComponent } from './create-report-item.component';

@Component({
    selector: 'ps-create-report',
    templateUrl: './create-report.component.html',
    styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent {

    constructor(private location: Location,
        private dialog: MatDialog) { }

    cancel(): void {
        this.location.back();
    }

    addItem(): void {
        const dialogRef = this.dialog.open(CreateReportItemDialogComponent, {
            width: '450px'
        });
        dialogRef.afterClosed().subscribe(data => {
            console.log(data)
        });
    }
}
