export interface TareaAsignada {
    tareaAsignadaID: number;
    tareaPredefinidaID: number;
    usuarioID: number;
    estadoTarea: 'pendiente' | 'progreso' | 'completada';
    fechaAsignacion: Date;
}