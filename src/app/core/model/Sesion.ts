export interface Sesion {
    idSesion:     number;
    usuario:      Usuario;
    fechaIngreso: Date;
    fechaCierre:  Date;
}

export interface Usuario {
    idUsuario:        number;
    userName:         string;
    password:         string;
    mail:             string;
    intentosFallidos: number;
    sessionActive:    string;
    persona:          Persona;
    status:           string;
    roles:            Role[];
}

export interface Persona {
    idPersona:       number;
    nombres:         string;
    apellidos:       string;
    identificacion:  string;
    fechaNacimiento: Date;
}

export interface Role {
    idRol:   number;
    rolName: string;
}