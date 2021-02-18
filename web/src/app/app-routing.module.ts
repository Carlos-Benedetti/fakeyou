import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bluetooth-find',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'coffeemaker/:id',
    loadChildren: () => import('./coffeemaker/coffeemaker.module').then( m => m.CoffeemakerPageModule)
  },
  {
    path: 'bluetooth-find',
    loadChildren: () => import('./bluetooth-find/bluetooth-find.module').then( m => m.BluetoothFindPageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
