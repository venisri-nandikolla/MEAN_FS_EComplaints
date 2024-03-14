import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ComplaintformComponent } from './complaintform/complaintform.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StatusComponent } from './status/status.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { protectGuard } from './protect.guard';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent

}, {
  path: 'login',
  component: LoginComponent
},

   {
  path: 'register',
  component: RegisterComponent
   },
 {
  path: 'admin/:username',
  component: AdminComponent,canActivate:[protectGuard]
},
 {
  path: 'complaintform/:username',
  component: ComplaintformComponent,canActivate:[protectGuard]
},
 {
  path: 'header',
  component: HeaderComponent
}, {
  path: 'footer',
  component: FooterComponent
}, {
  path: 'status',
  component: StatusComponent,canActivate:[protectGuard]
},
 {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},{
  path:'**',
  component:PagenotfoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
