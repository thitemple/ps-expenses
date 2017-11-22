import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { CreateReportComponent } from './create-report.component';
import { EditReportComponent } from './edit-report.component';

const routes: Routes = [
    { path: '', redirectTo: '/reports', pathMatch: 'full' },
    { path: 'reports', component: ReportsComponent },
    { path: 'reports/create', component: CreateReportComponent },
    { path: 'reports/:id', component: EditReportComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
