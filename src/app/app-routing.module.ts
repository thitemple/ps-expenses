import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PsRootComponent } from './root.component';
import { ReportsComponent } from './reports.component';
import { CreateReportComponent } from './create-report.component';

const routes: Routes = [
    { path: '', redirectTo: '/reports', pathMatch: 'full' },
    { path: 'reports', component: ReportsComponent },
    { path: 'reports/create', component: CreateReportComponent }
    // { path: 'detail/:id', component: HeroDetailComponent },
    // { path: 'heroes', component: HeroesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
