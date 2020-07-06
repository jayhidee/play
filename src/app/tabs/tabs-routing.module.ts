import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { IndexGuard } from '../guard/index.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [IndexGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
