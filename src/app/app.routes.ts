import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./external-components/external-components.module').then( m => m.ExternalComponentsModule)
  },
  {
    path: 'control',
    loadChildren: () => import('./components/components.module').then( m => m.ComponentsModule)
  }
];
