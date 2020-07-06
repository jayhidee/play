import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { HomeGuard } from 'src/app/guard/home.guard';
import { UserDataResolver } from 'src/app/resolvers/user-data-resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate: [HomeGuard],
    resolve:{
      userData: UserDataResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
