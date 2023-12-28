import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from "./components/footer/footer.component";
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TareaFormComponent } from './components/tareas/components-tareas/tarea-form/tarea-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DataService } from './data.service';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';

@NgModule({
    declarations: [
        AppComponent,
        RegisterUserComponent,
        LoginComponent,
        TareasComponent,
        FooterComponent,
        HeaderComponent,
        TareaFormComponent
    ],
    providers: [
        DataService
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        MatDialogModule,
        FormsModule 
    ]
})
export class AppModule { }
