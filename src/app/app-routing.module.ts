import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { TareasComponent } from './components/tareas/tareas.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterUserComponent,
    },
    {
        path: 'tareas',
        component: TareasComponent,
    },
    {
        path: '', redirectTo: '/login', pathMatch:'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }