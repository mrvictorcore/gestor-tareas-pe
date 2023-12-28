export interface User{
    usuarioID: number;
    numeroUsuario: number;
    nombre: string;
    apellidos: string;
    contrasena: string;
    tipoUsuario: 'operario' | 'auxiliar' | 'superAdmin';
    correoElectronico: string;
    numeroTelefono: string;
    departamentoArea: string;
    fechaInicioEmpleo: Date;
    rolPuesto: string;
}