// app-routing.module.ts
// frontend/src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard'; // optional

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // 🔐 Protected routes (optional: use AuthGuard)
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },

  // 🧑 Login route (public)
  { path: 'login', component: LoginComponent },

  // ❌ Fallback route
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
