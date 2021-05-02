import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'stock-view/:ticker',
    loadChildren: () => import('./stock-view/stock-view.module').then( m => m.StockViewPageModule)
  },
  {
    path: 'view-news',
    loadChildren: () => import('./view-news/view-news.module').then( m => m.ViewNewsPageModule)
  },  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'simulator',
    loadChildren: () => import('./simulator/simulator.module').then( m => m.SimulatorPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
