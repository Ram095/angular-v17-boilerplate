import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageThreeComponent } from './page-three/page-three.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './admin.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'pageOne',
        component: PageOneComponent,
      },
      {
        path: 'pageTwo',
        component: PageTwoComponent,
      },
      {
        path: 'pageThree',
        component: PageThreeComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    SidebarComponent,
    LayoutComponent,
    HomeComponent,
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    NgbHighlight,
    AgGridAngular,
    FormsModule,
    ReactiveFormsModule,
    DecimalPipe,
    AsyncPipe,
  ],
  providers: [AdminService],
})
export class AdminModule {}
