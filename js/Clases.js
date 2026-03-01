class Censista {
    constructor(nombre, nombreUsuario, contrasena, id) {
    this.nombre = nombre;
    this.nombreUsuario = nombreUsuario;
    this.contrasena = contrasena;
    this.id = id;
    }
}

class Censado {
    constructor(nombreCen, apellidoCen, edadCen, cedulaCen, deptoCen, ocupCen, idCensista, idCen, estadoValidadoCen = false) {
        this.nombre = nombreCen;
        this.apellido = apellidoCen;
        this.edad = edadCen;
        this.cedula = cedulaCen;
        this.depto = deptoCen;
        this.ocupacion = ocupCen;
        this.idCensista = idCensista;
        this.id = idCen
        this.estadoValidado = estadoValidadoCen;
    }
}

class Departamento{
    constructor(idDepartamento, departamentoNombre){
        this.id = idDepartamento;
        this.nombre = departamentoNombre;
    }

}

class Ocupacion{
    constructor(idOcupacion, ocuNombre){
        this.id = idOcupacion;
        this.ocupacion = ocuNombre;
    }
}