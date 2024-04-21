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
import { AdminService } from './admin.service';
import { SharedModule } from '../shared.module';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './page-three/state/list.reducer';
import { counterReducer } from './page-two/state/counter.reducer';

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
    PageThreeComponent,
  ],
  imports: [
    CommonModule,
    NgbHighlight,
    AgGridAngular,
    DecimalPipe,
    AsyncPipe,
    SharedModule,
    StoreModule.forFeature('counter', counterReducer),
    StoreModule.forFeature('posts', postsReducer),
    RouterModule.forChild(routes),
  ],
  providers: [AdminService],
})
export class AdminModule {}
