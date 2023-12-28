import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private tareaFormSubject = new BehaviorSubject<any>(null);
  public tareaForm$ = this.tareaFormSubject.asObservable();

  private tareaEditadaSubject = new BehaviorSubject<any>(null);
  public tareaEditada$ = this.tareaEditadaSubject.asObservable();

  private tareaAñadidaSubject = new BehaviorSubject<any>(null);
  public tareaAñadida$ = this.tareaAñadidaSubject.asObservable();

  private tareaEliminadaSubject = new BehaviorSubject<number | null>(null);
  public tareaEliminada$ = this.tareaEliminadaSubject.asObservable();
  

  constructor() {}

  sendData(data: any) {
    this.tareaFormSubject.next(data);
  }

  notifyTareaEditada(tarea: any) {
    this.tareaEditadaSubject.next(tarea);
  }

  notifyTareaAñadida(tarea: any) {
    this.tareaAñadidaSubject.next(tarea);
  }

  notifyTareaEliminada(id: number) {
    this.tareaEliminadaSubject.next(id);
  }
}
