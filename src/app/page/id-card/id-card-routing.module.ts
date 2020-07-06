import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdCardPage } from './id-card.page';
import { HomeGuard } from 'src/app/guard/home.guard';
import { UserDataResolver } from 'src/app/resolvers/user-data-resolver';

const routes: Routes = [
  {
    path: '',
    component: IdCardPage,
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
export class IdCardPageRoutingModule {}
