import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContainerAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./components/pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./components/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    loadChildren: () =>
      import('./components/auth/login/login.module').then((m) => m.LoginModule),
    path: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
