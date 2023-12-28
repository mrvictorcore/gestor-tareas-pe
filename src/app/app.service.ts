import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable, of } from 'rxjs';
import { Operario } from './models/operario';
import { ModeloInversor } from './models/modeloInversor';
import { Fase } from './models/fase';
import { DetalleOrdenFabricacion } from './models/detalleOrdenFabricacion';
import { OrdenFabricacion } from './models/ordenFabricacion';
import { TareaAsignada } from './models/tareaAsignada';
import { TareaPredefinida } from './models/tareaPredefinida';
import { environment } from '../environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Mockeos
  private usuarios: User[] = [
    {
      usuarioID: 1,
      numeroUsuario: 101,
      nombre: 'Juan',
      apellidos: 'Pérez',
      contrasena: '1234',
      tipoUsuario: 'operario',
      correoElectronico: 'juan.perez@example.com',
      numeroTelefono: '123456789',
      departamentoArea: 'Producción',
      fechaInicioEmpleo: new Date('2021-01-01'),
      rolPuesto: 'Operario'
    },
    {
    usuarioID: 2,
    numeroUsuario: 102,
    nombre: 'Ana',
    apellidos: 'Martínez',
    contrasena: '1234',
    tipoUsuario: 'auxiliar',
    correoElectronico: 'ana.martinez@example.com',
    numeroTelefono: '987654321',
    departamentoArea: 'Producción',
    fechaInicioEmpleo: new Date('2022-01-10'),
    rolPuesto: 'auxiliar de producción'
    },
    {
      usuarioID: 3,
      numeroUsuario: 103,
      nombre: 'Luis',
      apellidos: 'González',
      contrasena: '1234',
      tipoUsuario: 'superAdmin',
      correoElectronico: 'luis.gonzalez@example.com',
      numeroTelefono: '123789456',
      departamentoArea: 'superAdmin',
      fechaInicioEmpleo: new Date('2022-02-15'),
      rolPuesto: 'superAdmin'
    }
  ];

  private operarios: Operario[] = [
    {
      operarioID: 1,
      numeroOperario: 1001,
      nombreOperario: 'Carlos López',
      faseAsignada: 1
    },
    {
      operarioID: 2,
      numeroOperario: 1002,
      nombreOperario: 'María Gómez',
      faseAsignada: 2
    }
  ];

  private modelosInversores: ModeloInversor[] = [
    {
      modeloID: 1,
      nombreModelo: 'Modelo A',
      numeroSerie: 'A001'
    },
    {
      modeloID: 2,
      nombreModelo: 'Modelo B',
      numeroSerie: 'B001'
    }
  ];

  private fases: Fase[] = [
    {
      faseID: 1,
      nombreFase: 'Fase Inicial'
    },
    {
      faseID: 2,
      nombreFase: 'Fase Intermedia'
    }
  ];

  private detallesOrdenesFabricacion: DetalleOrdenFabricacion[] = [
    {
      detalleID: 1,
      ordenID: 1,
      modeloID: 1,
      cantidadFabricar: 100
    },
    {
      detalleID: 2,
      ordenID: 2,
      modeloID: 2,
      cantidadFabricar: 150
    }
  ];

  private ordenesFabricacion: OrdenFabricacion[] = [
    {
      ordenID: 1,
      numeroOrdenFabricacion: '10001',
      fechaInicio: new Date('2021-03-10'),
      fechaFinalizacion: new Date('2021-03-20')
    },
    {
      ordenID: 2,
      numeroOrdenFabricacion: '10002',
      fechaInicio: new Date('2021-04-05'),
      fechaFinalizacion: new Date('2021-04-15')
    }
  ];

  private tareasAsignadas: TareaAsignada[] = [
    {
      tareaAsignadaID: 1,
      tareaPredefinidaID: 1,
      usuarioID: 1,
      estadoTarea: 'pendiente',
      fechaAsignacion: new Date('2021-03-11')
    },
    {
      tareaAsignadaID: 2,
      tareaPredefinidaID: 2,
      usuarioID: 2,
      estadoTarea: 'progreso',
      fechaAsignacion: new Date('2021-04-06')
    }
  ];
  
  private tareasPredefinidas: TareaPredefinida[] = [
    {
      tareaPredefinidaID: 1,
      descripcionTarea: 'Inspección de Calidad',
      tiempoEstimado: 60,
      faseID: 1
    },
    {
      tareaPredefinidaID: 2,
      descripcionTarea: 'Empaque de Productos',
      tiempoEstimado: 30,
      faseID: 2
    }
  ];

  constructor(
    private dataService: DataService
  ) {
  }

  // Métodos para Usuarios
  getUsuarios(): Observable<User[]> {
    // const apiUrl = environment.apiUrl;
    return of(this.usuarios);
  }

  getUsuario(id: number): Observable<User | undefined> {
    const usuario = this.usuarios.find(u => u.usuarioID === id);
    return of(usuario);
  }

  addUsuario(newUsuario: User): Observable<User> {
    newUsuario.usuarioID = this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.usuarioID)) + 1 : 1;
    newUsuario.numeroUsuario = this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.numeroUsuario)) + 1 : 101;
    this.usuarios.push(newUsuario);
    return of(newUsuario);
  }

  updateUsuario(newUsuario: User): Observable<any> {
    const index = this.usuarios.findIndex(u => u.usuarioID === newUsuario.usuarioID);
    if (index > -1) {
      this.usuarios[index] = newUsuario;
    }
    return of(newUsuario);
  }

  deleteUsuario(id: number): Observable<User | null> {
    const index = this.usuarios.findIndex(u => u.usuarioID === id);
    if (index > -1) {
      this.usuarios.splice(index, 1);
    }
    return of(null);
  }

  login(data: any): Observable<User | null> {
    const user = this.usuarios.find(u => 
    u.numeroUsuario.toString() === data.numeroUsuario && u.contrasena === data.contrasena);

    if (user) {
      return of(user);
    } else {
      return of(null);
    }
  }

  setSessionCookie(user: any): void {
    const userCookie = encodeURIComponent(JSON.stringify(user));
    document.cookie = `usuarioSesion=${userCookie}; path=/;`;
  }

  clearUserSession() {
    localStorage.removeItem('usuarioSesion');
    localStorage.removeItem('usuarioRegistrado');
  
    document.cookie = 'usuarioSesion=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'usuarioRegistrado=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  pruebasBorrarCoockies() {
    document.cookie = 'usuarioSesion=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'usuarioRegistrado=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  // Métodos para Operarios
  getOperarios(): Observable<Operario[]> {
    return of(this.operarios);
  }

  getOperario(id: number): Observable<Operario | undefined> {
    const operario = this.operarios.find(o => o.operarioID === id);
    return of(operario);
  }

  addOperario(newOperario: Operario): Observable<Operario> {
    newOperario.operarioID = this.operarios.length > 0 ? Math.max(...this.operarios.map(o => o.operarioID)) + 1 : 1;
    this.operarios.push(newOperario);
    return of(newOperario);
  }

  updateOperario(newOperario: Operario): Observable<any> {
    const index = this.operarios.findIndex(o => o.operarioID === newOperario.operarioID);
    if (index > -1) {
      this.operarios[index] = newOperario;
    }
    return of(newOperario);
  }

  deleteOperario(id: number): Observable<Operario | null> {
    const index = this.operarios.findIndex(o => o.operarioID === id);
    if (index > -1) {
      this.operarios.splice(index, 1);
    }
    return of(null);
  }
  
  // Métodos para ModelosInversores
  getModelosInversores(): Observable<ModeloInversor[]> {
    return of(this.modelosInversores);
  }

  getModeloInversor(id: number): Observable<ModeloInversor | undefined> {
    const modeloInversor = this.modelosInversores.find(m => m.modeloID === id);
    return of(modeloInversor);
  }

  addModeloInversor(newModeloInversor: ModeloInversor): Observable<ModeloInversor> {
    newModeloInversor.modeloID = this.modelosInversores.length > 0 ? Math.max(...this.modelosInversores.map(m => m.modeloID)) + 1 : 1;
    this.modelosInversores.push(newModeloInversor);
    return of(newModeloInversor);
  }

  updateModeloInversor(newModeloInversor: ModeloInversor): Observable<any> {
    const index = this.modelosInversores.findIndex(m => m.modeloID === newModeloInversor.modeloID);
    if (index > -1) {
      this.modelosInversores[index] = newModeloInversor;
    }
    return of(newModeloInversor);
  }

  deleteModeloInversor(id: number): Observable<ModeloInversor | null> {
    const index = this.modelosInversores.findIndex(m => m.modeloID === id);
    if (index > -1) {
      this.modelosInversores.splice(index, 1);
    }
    return of(null);
  }

  // MMétodos para Fase
  getFases(): Observable<Fase[]> {
    return of(this.fases);
  }

  getFase(id: number): Observable<Fase | undefined> {
    const fase = this.fases.find(f => f.faseID === id);
    return of(fase);
  }

  addFase(newFase: Fase): Observable<Fase> {
    newFase.faseID = this.fases.length > 0 ? Math.max(...this.fases.map(f => f.faseID)) + 1 : 1;
    this.fases.push(newFase);
    return of(newFase);
  }

  updateFase(newFase: Fase): Observable<any> {
    const index = this.fases.findIndex(f => f.faseID === newFase.faseID);
    if (index > -1) {
      this.fases[index] = newFase;
    }
    return of(newFase);
  }

  deleteFase(id: number): Observable<Fase | null> {
    const index = this.fases.findIndex(f => f.faseID === id);
    if (index > -1) {
      this.fases.splice(index, 1);
    }
    return of(null);
  }

  // Métodos para detallesOrdenesFabricacion
  getDetallesOrdenesFabricacion(): Observable<DetalleOrdenFabricacion[]> {
    return of(this.detallesOrdenesFabricacion);
  }

  getDetalleOrdenFabricacion(id: number): Observable<DetalleOrdenFabricacion | undefined> {
    const detalleOrden = this.detallesOrdenesFabricacion.find(d => d.detalleID === id);
    return of(detalleOrden);
  }

  addDetalleOrdenFabricacion(newDetalleOrden: DetalleOrdenFabricacion): Observable<DetalleOrdenFabricacion> {
    newDetalleOrden.detalleID = this.detallesOrdenesFabricacion.length > 0 ? Math.max(...this.detallesOrdenesFabricacion.map(d => d.detalleID)) + 1 : 1;
    this.detallesOrdenesFabricacion.push(newDetalleOrden);
    return of(newDetalleOrden);
  }

  updateDetalleOrdenFabricacion(newDetalleOrden: DetalleOrdenFabricacion): Observable<any> {
    const index = this.detallesOrdenesFabricacion.findIndex(d => d.detalleID === newDetalleOrden.detalleID);
    if (index > -1) {
      this.detallesOrdenesFabricacion[index] = newDetalleOrden;
    }
    return of(newDetalleOrden);
  }

  deleteDetalleOrdenFabricacion(id: number): Observable<DetalleOrdenFabricacion | null> {
    const index = this.detallesOrdenesFabricacion.findIndex(d => d.detalleID === id);
    if (index > -1) {
      this.detallesOrdenesFabricacion.splice(index, 1);
    }
    return of(null);
  }

  // Métodos para ordenesFabricacion
  getOrdenesFabricacion(): Observable<OrdenFabricacion[]> {
    return of(this.ordenesFabricacion);
  }

  getOrdenFabricacion(id: number): Observable<OrdenFabricacion | undefined> {
    const orden = this.ordenesFabricacion.find(o => o.ordenID === id);
    return of(orden);
  }

  addOrdenFabricacion(newOrdenFabricacion: OrdenFabricacion): Observable<OrdenFabricacion> {
    newOrdenFabricacion.ordenID = this.ordenesFabricacion.length > 0 ? Math.max(...this.ordenesFabricacion.map(o => o.ordenID)) + 1 : 1;
    this.ordenesFabricacion.push(newOrdenFabricacion);
    return of(newOrdenFabricacion);
  }

  updateOrdenFabricacion(newOrdenFabricacion: OrdenFabricacion): Observable<any> {
    const index = this.ordenesFabricacion.findIndex(o => o.ordenID === newOrdenFabricacion.ordenID);
    if (index > -1) {
      this.ordenesFabricacion[index] = newOrdenFabricacion;
    }
    return of(newOrdenFabricacion);
  }

  deleteOrdenFabricacion(id: number): Observable<OrdenFabricacion | null> {
    const index = this.ordenesFabricacion.findIndex(o => o.ordenID === id);
    if (index > -1) {
      this.ordenesFabricacion.splice(index, 1);
    }
    return of(null);
  }

  // Métodos para tareasAsignadas
  getTareasAsignadas(): Observable<TareaAsignada[]> {
    return of(this.tareasAsignadas);
  }

  getTareaAsignada(id: number): Observable<TareaAsignada | undefined> {
    const tarea = this.tareasAsignadas.find(t => t.tareaAsignadaID === id);
    return of(tarea);
  }

  addTareaAsignada(newTarea: TareaAsignada): Observable<TareaAsignada> {
    newTarea.tareaAsignadaID = this.tareasAsignadas.length > 0 ? Math.max(...this.tareasAsignadas.map(t => t.tareaAsignadaID)) + 1 : 1;
    this.tareasAsignadas.push(newTarea);
    return of(newTarea);
  }

  updateTareaAsignada(newTarea: TareaAsignada): Observable<any> {
    const index = this.tareasAsignadas.findIndex(t => t.tareaAsignadaID === newTarea.tareaAsignadaID);
    if (index > -1) {
      this.tareasAsignadas[index] = newTarea;
    }
    return of(newTarea);
  }

  deleteTareaAsignada(id: number): Observable<TareaAsignada | null> {
    const index = this.tareasAsignadas.findIndex(t => t.tareaAsignadaID === id);
    if (index > -1) {
      this.tareasAsignadas.splice(index, 1);
    }
    return of(null);
  }

  // Métodos para tareasPredefinidas
  getTareasPredefinidas(): Observable<TareaPredefinida[]> {
    return of(this.tareasPredefinidas);
  }

  getTareaPredefinida(id: number): Observable<TareaPredefinida | undefined> {
    const tarea = this.tareasPredefinidas.find(t => t.tareaPredefinidaID === id);
    return of(tarea);
  }

  addTareaPredefinida(newTarea: TareaPredefinida): Observable<TareaPredefinida> {
    newTarea.tareaPredefinidaID = this.tareasPredefinidas.length > 0 ? Math.max(...this.tareasPredefinidas.map(t => t.tareaPredefinidaID)) + 1 : 1;
    this.tareasPredefinidas.push(newTarea);
    this.dataService.notifyTareaAñadida(newTarea);
    return of(newTarea);
  }

  updateTareaPredefinida(newTarea: TareaPredefinida): Observable<any> {
    const index = this.tareasPredefinidas.findIndex(t => t.tareaPredefinidaID === newTarea.tareaPredefinidaID);
    if (index > -1) {
      this.tareasPredefinidas[index] = newTarea;
    }
    this.dataService.notifyTareaEditada(newTarea);
    return of(newTarea);
  }

  deleteTareaPredefinida(id: number): Observable<TareaPredefinida | null> {
    const index = this.tareasPredefinidas.findIndex(t => t.tareaPredefinidaID === id);
    if (index > -1) {
      this.tareasAsignadas.splice(index, 1);
    }
    this.dataService.notifyTareaEliminada(id);
    return of(null);
  }
}
