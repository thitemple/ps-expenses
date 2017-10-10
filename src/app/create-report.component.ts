import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'ps-create-report',
    templateUrl: './create-report.component.html'
})
export class CreateReportComponent {

    constructor(private location: Location) { }

    cancel(): void {
        this.location.back();
    }
}
