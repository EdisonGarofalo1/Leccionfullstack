export interface User {
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
