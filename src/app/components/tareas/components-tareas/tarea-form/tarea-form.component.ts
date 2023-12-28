import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { TareaPredefinida } from '../../../../models/tareaPredefinida';
import { DataService } from '../../../../data.service';
import { MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef
import { Fase } from '../../../../models/fase';

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.css']
})
export class TareaFormComponent implements OnInit {
  tareaForm: FormGroup;
  fases: Fase[] = [];
  tareasPredefinidas: TareaPredefinida[] = [];

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private dataService: DataService,
    private dialogRef: MatDialogRef<TareaFormComponent>
  ) {
    this.tareaForm = this.fb.group({
      descripcionTarea: ['', Validators.required],
      tiempoEstimado: [null, [Validators.required, Validators.min(1)]],
      faseID: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.appService.getTareasPredefinidas().subscribe(tareasPredefinidas => {
      this.tareasPredefinidas = tareasPredefinidas;
    });

    this.appService.getFases().subscribe(fases => {
      this.fases = fases;
    });
  }

  crearTarea() {
    if (this.tareaForm.valid) {
      const nuevaTarea = this.tareaForm.value;

      this.appService.addTareaPredefinida(nuevaTarea).subscribe({
        next: (tareaCreada: TareaPredefinida) => {
          this.dataService.sendData(tareaCreada);
          this.dialogRef.close(tareaCreada);
        },
        error: (error) => console.error('Error al crear la tarea', error)
      });
    }
  }

  cancelarFormulario(): void {
    this.dialogRef.close();
  }
}
