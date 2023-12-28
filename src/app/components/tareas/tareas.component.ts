import { Component, OnInit, OnDestroy } from '@angular/core';
import { TareaFormComponent } from './components-tareas/tarea-form/tarea-form.component';
import { AppService } from '../../app.service';
import { TareaPredefinida } from '../../models/tareaPredefinida';
import { TareaAsignada } from '../../models/tareaAsignada';
import { Operario } from '../../models/operario';
import { User } from '../../models/user';
import { DataService } from '../../data.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit, OnDestroy {
  mostrarFormulario = false;
  tareasPredefinidas: TareaPredefinida[] = [];
  tareasAsignadas: TareaAsignada[] = [];
  operarios: Operario[] = [];
  usuarios: User[] = [];
  
  tareaFormSubscription: Subscription | undefined;
  tareaEditadaSubscription: Subscription | undefined;
  tareaAñadidaSubscription: Subscription | undefined;
  tareaEliminadaSubscription: Subscription | undefined;

  constructor(
    private dialog: MatDialog,
    private appService: AppService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userSession = localStorage.getItem('usuarioSesion');
    if(!userSession) {
      this.router.navigate(['/login']);
    }
    
    this.cargarDatos();

    this.tareaFormSubscription = this.dataService.tareaForm$.subscribe((tareaCreada: TareaPredefinida) => {
      if (tareaCreada) {
        this.handleTareaAñadida(tareaCreada);
      }
    });

    this.tareaEditadaSubscription = this.dataService.tareaEditada$.subscribe((tareaEditada: TareaPredefinida) => {
      if (tareaEditada) {
        this.handleTareaEditada(tareaEditada);
      }
    });

    this.tareaAñadidaSubscription = this.dataService.tareaAñadida$.subscribe((tareaAñadida: TareaPredefinida) => {
      if (tareaAñadida) {
        this.handleTareaAñadida(tareaAñadida);
      }
    });

    this.tareaEliminadaSubscription = this.dataService.tareaEliminada$.subscribe((tareaID: number | null) => {
      if (tareaID !== null) {
        this.handleTareaEliminada(tareaID);
      }
    });
    
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    this.tareaFormSubscription?.unsubscribe();
    this.tareaEditadaSubscription?.unsubscribe();
    this.tareaAñadidaSubscription?.unsubscribe();
    this.tareaEliminadaSubscription?.unsubscribe();
  }
  

  cargarDatos(): void {
    this.appService.getTareasPredefinidas().subscribe(tareasPredefinidas => {
      this.tareasPredefinidas = tareasPredefinidas;
    });

    this.appService.getTareasAsignadas().subscribe(tareasAsignadas => {
      this.tareasAsignadas = tareasAsignadas;
    });

    this.appService.getOperarios().subscribe(operarios => {
      this.operarios = operarios;
    });

    this.appService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  getOperarioNombre(operarioID: number): string {
    const operario = this.operarios.find(o => o.operarioID === operarioID);
    return operario ? operario.nombreOperario : 'Desconocido';
  }

  crearTarea(): void {
    const dialogRef = this.dialog.open(TareaFormComponent, {
      width: '800px', 
    });
  
    dialogRef.afterClosed().subscribe((result: TareaPredefinida) => {
      if (result) {
        this.handleTareaAñadida(result);
      }
    });
  }

  editarTarea(tareaPredefinidaID: number): void {
    this.appService.getTareaPredefinida(tareaPredefinidaID).subscribe((tareaAEditar) => {
      if (tareaAEditar) {
        const dialogRef = this.dialog.open(TareaFormComponent, {
          width: '800px',
          data: tareaAEditar,
        });

        dialogRef.afterClosed().subscribe((result: TareaPredefinida) => {
          if (result) {
            this.handleTareaEditada(result);
          }
        });
      }
    });
  }

  eliminarTarea(tareaPredefinidaID: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.appService.deleteTareaPredefinida(tareaPredefinidaID).subscribe(() => {
        this.handleTareaEliminada(tareaPredefinidaID);
      });
    }
  }

  asignarTarea(tareaPredefinidaID: number, usuarioID: number): void {
    const nuevaTareaAsignada: TareaAsignada = {
      tareaPredefinidaID,
      usuarioID,
      estadoTarea: 'pendiente',
      fechaAsignacion: new Date(),
      tareaAsignadaID: 0
    };

    this.appService.addTareaAsignada(nuevaTareaAsignada).subscribe((tareaAsignada) => {
      this.tareasAsignadas.push(tareaAsignada);
    });
  }

  editarTareaAsignada(tareaAsignadaID: number, nuevoUsuarioID: number): void {
    this.appService.getTareaAsignada(tareaAsignadaID).subscribe((tareaAsignada) => {
      if (tareaAsignada) {
        tareaAsignada.usuarioID = nuevoUsuarioID;
        this.appService.updateTareaAsignada(tareaAsignada).subscribe(() => {
          const index = this.tareasAsignadas.findIndex((t) => t.tareaAsignadaID === tareaAsignadaID);
          this.tareasAsignadas[index] = tareaAsignada;
        });
      }
    });
  }

  eliminarTareaAsignada(tareaAsignadaID: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea asignada?')) {
      this.appService.deleteTareaAsignada(tareaAsignadaID).subscribe(() => {
        this.tareasAsignadas = this.tareasAsignadas.filter((t) => t.tareaAsignadaID !== tareaAsignadaID);
      });
    }
  }

  private handleTareaAñadida(tareaAñadida: TareaPredefinida): void {
    console.log('Nueva tarea añadida:', tareaAñadida);
    this.tareasPredefinidas.push(tareaAñadida);
  }

  private handleTareaEditada(tareaEditada: TareaPredefinida): void {
    console.log('Tarea editada:', tareaEditada);
    const index = this.tareasPredefinidas.findIndex((t) => t.tareaPredefinidaID === tareaEditada.tareaPredefinidaID);
    if (index !== -1) {
      this.tareasPredefinidas[index] = tareaEditada;
    }
  }

  private handleTareaEliminada(tareaID: number): void {
    console.log('Tarea eliminada, ID:', tareaID);
    this.tareasPredefinidas = this.tareasPredefinidas.filter((t) => t.tareaPredefinidaID !== tareaID);
  }


}
