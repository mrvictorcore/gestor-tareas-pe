import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-register-user',
  standalone: false,
  // imports: [],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  userForm: FormGroup;
  tiposUsuario = ['operario', 'auxiliar', 'superAdmin'];

  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ){
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      numeroTelefono: ['', Validators.required],
      departamentoArea: ['', Validators.required],
      fechaInicioEmpleo: ['', Validators.required],
      rolPuesto: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.appService.addUsuario(this.userForm.value).subscribe(result => {
        console.log('Usuario registrado correctamente', result);
        localStorage.setItem('usuarioRegistrado', JSON.stringify(result));
      });
    }
  }

}
