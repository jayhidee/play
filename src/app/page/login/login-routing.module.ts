import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { IndexGuard } from 'src/app/guard/index.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [IndexGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
