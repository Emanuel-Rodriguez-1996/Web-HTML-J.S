window.addEventListener("load", inicio);

function inicio() {
    //--------------Esconde secciones----------
    document.querySelector("#seccionLogin").style.display = "none";
    document.querySelector("#seccionRegistrarUsuario").style.display = "none";
    document.querySelector("#seccionPerfiles").style.display = "block";
    document.querySelector("#navPrincipal").style.display = "none";
    document.querySelector("#seccionRegistrarCenso").style.display = "none";
    document.querySelector("#seccionBuscador").style.display = "none";
    document.querySelector("#seccionReasignar").style.display = "none";
    document.querySelector("#seccionInfoEstadisitca").style.display = "none";
    document.querySelector("#seccionInvitados").style.display = "none";

    //---------Cargar combo desplegables--------
    cargarSlcDpto();
    cargarSlcOcup();

    //------Funciones ocultar y mostrar secciones, y eventos de click----------------
    document.querySelector("#btnMostrarRegistrar").addEventListener("click", CargarRegistroCenso);
    document.querySelector("#btnRegistrar").addEventListener("click", mostrarRegistro);
    document.querySelector("#btnBuscar").addEventListener("click", cargarBuscador);
    document.querySelector("#btnReasignarPersona").addEventListener("click", mostrarSeccionReasignarCenso);
    document.querySelector("#btnEstadisticas").addEventListener("click", mostrarSeccionEstadisticas);
    document.querySelector("#btnRegistrarInvi").addEventListener("click", seccionRegistrarInvi);
    document.querySelector("#btnMostrarEstadisticas").addEventListener("click", mostrarEstadisticasPorDepartamento);
    document.querySelector("#btnMostrarEstadistica").addEventListener("click", tablaEstadisticaInvitado);

    //--------Eventos de los botones para las distintas funcionalidades----------------
    document.querySelector("#btnIngresarCensista").addEventListener("click", loginUsuario);
    document.querySelector("#btnLogin").addEventListener("click", hacerLogin);
    document.querySelector("#btnSalir").addEventListener("click", logaut);
    document.querySelector("#confirmarRegistro").addEventListener("click", registrarCensista);
    document.querySelector("#btnRegistrarCenso").addEventListener("click", guardarCenso);
    document.querySelector("#btnValidarCenso").addEventListener("click", validarCenso);
    document.querySelector("#btnValidarCensos").addEventListener("click", validarEnBusquedaCensista);
    document.querySelector("#btnBuscarCi").addEventListener("click", buscarCensado);
    document.querySelector("#btnBuscarCiinv").addEventListener("click", buscarCiInvitado);
    document.querySelector("#btnReasignarCensado").addEventListener("click", reasignarCenso);
    document.querySelector("#idTotalCensados").addEventListener("click", totalPersonasCensadas);
    document.querySelector("#idTotalporDepto").addEventListener("click", censadosPorDepto);
    document.querySelector("#idPendites").addEventListener("click", personasPendientes);
    document.querySelector("#btnVerDeptos").addEventListener("click", seleccionarDeptosTotal);
    document.querySelector("#btnGuardarInvitado").addEventListener("click", guardarRegistroInvitados);
}

let sistema = new Sistema;

//----------------Registro--------------
let usuarioLogueado = null;
// Aca se muestra la pantalla cuando lueguea el usuario
function mostrarUsuarioLogueado() {
    document.querySelector("#seccionPerfiles").style.display = "none"
    document.querySelector("#seccionRegistrarUsuario").style.display = "none"
    document.querySelector("#seccionLogin").style.display = "none"
    document.querySelector("#nombreUsuarioLogeado").style.display = "block"
    document.querySelector("#seccionBuscador").style.display = "none"
    document.querySelector("#seccionReasignar").style.display = "none"
    document.querySelector("#seccionInfoEstadisitca").style.display = "none"
    document.querySelector("#nombreUsuarioLogeado").innerHTML = "Bienvenido " + usuarioLogueado.nombre;
}

//--------Aca seleccionamos el tipo de perfil--------
function loginUsuario() {
    let perfil = document.querySelector("#slcPerfiles").value;
    if (perfil === "censista") {
        document.querySelector("#seccionLogin").style.display = "block";
        document.querySelector("#seccionPerfiles").style.display = "none";
        document.querySelector("#seccionRegistrarUsuario").style.display = "none";
        document.querySelector("#seccionReasignar").style.display = "none";
        document.querySelector("#seccionInfoEstadisitca").style.display = "none";
        document.querySelector("#navPrincipal").style.display = "block";
        document.querySelector("#btnMostrarRegistrar").style.display = "none";
        document.querySelector("#btnBuscar").style.display = "none";
        document.querySelector("#btnReasignarPersona").style.display = "none";
        document.querySelector("#btnEstadisticas").style.display = "none";
    }
    if (perfil === "persona") {
        document.querySelector("#seccionPerfiles").style.display = "none";
        document.querySelector("#seccionInvitados").style.display = "block";
        document.querySelector("#btnGuardarCensosinvi").style.display = "none";
    }
}

//------Validamos nombre de ususario y contraseña-------
function hacerLogin() {
    let nombreUsuario = document.querySelector("#loginUsuario").value;
    let clave = document.querySelector("#loginClave").value;
    let mensaje = "";

    let login = sistema.verficarLogin(nombreUsuario, clave);
    if (login === true) {
        document.querySelector("#navPrincipal").style.display = "block"
        document.querySelector("#btnBuscar").style.display = "block"
        document.querySelector("#btnMostrarRegistrar").style.display = "block"
        document.querySelector("#btnReasignarPersona").style.display = "block"
        document.querySelector("#btnEstadisticas").style.display = "block"
        document.querySelector("#loginUsuario").value = "";
        document.querySelector("#loginClave").value = "";
        usuarioLogueado = sistema.obtenerObjeto(sistema.censistas, "nombreUsuario", nombreUsuario);
        mostrarUsuarioLogueado();
    } else {
        mensaje = "Usuario y/o contrseña incorrectos";
    }
    document.querySelector("#mensajeLogin").innerHTML = mensaje;

}

function logaut() {
    alert("Gracias por su registro")
    document.querySelector("#seccionInfoEstadisitca").style.display = "none";
    document.querySelector("#seccionReasignar").style.display = "none";
    document.querySelector("#seccionRegistrarUsuario").style.display = "none";
    document.querySelector("#seccionLogin").style.display = "none";
    document.querySelector("#navPrincipal").style.display = "none";
    document.querySelector("#seccionRegistrarCenso").style.display = "none";
    document.querySelector("#seccionBuscador").style.display = "none";
    document.querySelector("#navPrincipal").style.display = "none";
    document.querySelector("#seccionReasignar").style.display = "none";
    document.querySelector("#nombreUsuarioLogeado").innerHTML = ""
    document.querySelector("#seccionPerfiles").style.display = "block";
    document.querySelector("#seccionInvitados").style.display = "none";
    usuarioLogueado = null
}

function cargarSlcDpto() {
    document.querySelector("#slcDepartamento").innerHTML = `<option value="-1">Seleccione una opcion...</option>`;
    for (let i = 0; i < sistema.departamentos.length; i++) {
        const unDpto = sistema.departamentos[i];
        document.querySelector("#slcDepartamento").innerHTML += `<option value="${unDpto.nombre}">
        ${unDpto.nombre}</option>`;
    }
}
function cargarSlcOcup() {
    document.querySelector("#slcOcupacion").innerHTML = `<option value="-1">Seleccione una opcion...</option>`;
    for (let i = 0; i < sistema.ocupaciones.length; i++) {
        const unaOcup = sistema.ocupaciones[i];
        document.querySelector("#slcOcupacion").innerHTML += `<option value="${unaOcup.ocupacion}">
        ${unaOcup.ocupacion}</option>`;
    }
}

//aca mostrar formulario registro de usuarios Censistas
function mostrarRegistro() {
    document.querySelector("#seccionReasignar").style.display = "none";
    document.querySelector("#seccionRegistrarUsuario").style.display = "block";
    document.querySelector("#seccionLogin").style.display = "none";
    document.querySelector("#seccionInfoEstadisitca").style.display = "none";
}
let idCensista = 4
//funcion para registrar perfil censita 
function registrarCensista() {
    let nombre = document.querySelector("#nombreCen").value;
    let nombreUsuario = document.querySelector("#nombreUsuario").value;
    let clave = document.querySelector("#clave").value;
    let mensaje = "";

    if (sistema.validarRegistroOk(nombre, nombreUsuario, clave)) {
        if (sistema.validarContrasena(clave)) {
            if (!sistema.buscarElemento(sistema.censistas, "nombreUsuario", nombreUsuario)) {
                let censista = new Censista(nombre, nombreUsuario, clave, id);
                sistema.agregarCensista(censista);
                idCensista++
                mensaje = "Registro con exito!"
                document.querySelector("#nombreCen").value = "";
                document.querySelector("#nombreUsuario").value = "";
                document.querySelector("#clave").value = "";
                document.querySelector("#navPrincipal").style.display = "block"
                usuarioLogueado = sistema.obtenerObjeto(sistema.censistas, "nombreUsuario", nombreUsuario)
                mostrarUsuarioLogueado();
            }
            else {
                mensaje = "Ya existe un usuario con ese nombre";
            }
        }
        else {
            mensaje = "Formato de contraseña incorrecto: La contraseña deberá tener un mínimo de 5 caracteres, contando con al menos una mayúscula, una minúscula y un número"
        }
    }
    else {
        mensaje = "Los campos no pueden ser vacíos";
    }
    document.querySelector("#mensajeRegistro").innerHTML = mensaje;
}




//--------Formulario registro censos
function CargarRegistroCenso() {
    document.querySelector("#seccionRegistrarCenso").style.display = "block"
    document.querySelector("#seccionBuscador").style.display = "none"
    document.querySelector("#seccionReasignar").style.display = "none"
    document.querySelector("#seccionInfoEstadisitca").style.display = "none"
    document.querySelector("#seccionRegistrarUsuario").style.display = "none"
    document.querySelector("#btnGuardarInvitado").style.display = "none"
}
function guardarCenso() {
    let nombre = document.querySelector("#nombreRegistroCenso").value;
    let apellido = document.querySelector("#apellidoRegistroCenso").value;
    let edad = Number(document.querySelector("#edadRegistroCenso").value);
    let cedula = document.querySelector("#cedulaRegistroCenso").value.toString();
    let depto = document.querySelector("#slcDepartamento").value;
    let ocup = document.querySelector("#slcOcupacion").value;
    let mensaje = "";
    let idCensista = usuarioLogueado;

    cedula = sistema.eliminarCaracter(cedula, '.');
    cedula = sistema.eliminarCaracter(cedula, '-');

    if (nombre != "" && apellido != "" && edad > 0 && edad < 130) {
        if (sistema.validarCedula(cedula)) {
            if (!sistema.buscarElemento(sistema.censados, "cedula", cedula)) {
                if (depto != -1 && depto != "" && ocup != -1 && ocup != "") {
                    let unCenso = new Censado(nombre, apellido, edad, cedula, depto, ocup, idCensista, id);
                    estadoValidado = false
                    sistema.censados.push(unCenso);
                    id++;
                    mensaje = "Datos guardados correctamente";
                    document.querySelector("#nombreRegistroCenso").value = "";
                    document.querySelector("#apellidoRegistroCenso").value = "";
                    document.querySelector("#edadRegistroCenso").value = "";
                    document.querySelector("#cedulaRegistroCenso").value = "";
                    document.querySelector("#slcDepartamento").value = "";
                    document.querySelector("#slcOcupacion").value = "";
                } else {
                    mensaje = "Debe seleccionar una opcion";
                }
            } else {
                mensaje = "C.I ya registrado";
            }
        } else {
            mensaje = "C.I no valida";
        }
    } else {
        mensaje = "Los campos nombre y apellido no deben estar vacios, y la edad debe ser menor a 130";
    }
    document.querySelector("#mensajeRegistroCenso").innerHTML = mensaje;
}
function validarCenso() {
    let nombre = document.querySelector("#nombreRegistroCenso").value;
    let apellido = document.querySelector("#apellidoRegistroCenso").value;
    let edad = Number(document.querySelector("#edadRegistroCenso").value);
    let cedula = document.querySelector("#cedulaRegistroCenso").value;
    let depto = document.querySelector("#slcDepartamento").value;
    let ocup = document.querySelector("#slcOcupacion").value;
    let mensaje = "";
    let idCensista = usuarioLogueado

    cedula = sistema.eliminarCaracter(cedula, '.');
    cedula = sistema.eliminarCaracter(cedula, '-');

    if (sistema.validarCedula(cedula)) {
        if (nombre !== "" && apellido !== "" && edad > 0 && edad < 130) {
            if (!sistema.buscarElemento(sistema.censados, "cedula", cedula)) {
                if (depto != -1 && ocup != -1 && depto != "" && ocup != "") {
                    let validado = new Censado(nombre, apellido, edad, cedula, depto, ocup, idCensista, id, estadoValidado = true);
                    validado.estadoValidado = true;
                    id++;
                    sistema.agregarCensados(validado);
                    mensaje = "Datos validados";
                    document.querySelector("#nombreRegistroCenso").value = "";
                    document.querySelector("#apellidoRegistroCenso").value = "";
                    document.querySelector("#edadRegistroCenso").value = "";
                    document.querySelector("#cedulaRegistroCenso").value = "";
                    document.querySelector("#slcDepartamento").value = "";
                    document.querySelector("#slcOcupacion").value = "";
                } else {
                    mensaje = "Debe seleccionar una ocupacion y/o departamento";
                }
            } else {
                mensaje = "C.I ya registrada";
            }
        } else {
            mensaje = "Los campos no pueden estar vacios";
        }
    } else {
        mensaje = "C.I no valida";
    }
    document.querySelector("#mensajeRegistroCenso").innerHTML = mensaje;
}
function validarEnBusquedaCensista() {
    let cedulaBuscar = document.querySelector("#buscarCedula").value;
    cedulaBuscar = sistema.eliminarCaracter(cedulaBuscar, '.');
    cedulaBuscar = sistema.eliminarCaracter(cedulaBuscar, '-');
    let validar = sistema.obtenerObjeto(sistema.censados, "cedula", cedulaBuscar)
    if (validar !== null) {
        validar.estadoValidado = true;
        document.querySelector("#pResultadoBusqueda").innerHTML = "Registro validado con éxito!";
        document.querySelector("#btnValidarCensos").style.display = "none";
    } else {
        document.querySelector("#pResultadoBusqueda").innerHTML = "No se encuentra ese registro";
        document.querySelector("#buscarCedula").innerHTML = "";
    }
}
//variable global para los id de las precargas, comienza en 31 así los nuevos reistros no toman un valor menor a 31.
id = 31
function guardarRegistroInvitados() {
    let nombre = document.querySelector("#nombreRegistroCenso").value;
    let apellido = document.querySelector("#apellidoRegistroCenso").value;
    let edad = Number(document.querySelector("#edadRegistroCenso").value);
    let cedula = document.querySelector("#cedulaRegistroCenso").value.toString();
    let depto = document.querySelector("#slcDepartamento").value;
    let ocup = document.querySelector("#slcOcupacion").value;
    let mensaje = "";
    let idCensista = sistema.aleatorioID(sistema.censistas)
    let reas = sistema.obtenerObjeto(sistema.censistas, "id", idCensista)
    cedula = sistema.eliminarCaracter(cedula, '.');
    cedula = sistema.eliminarCaracter(cedula, '-');

    if (nombre != "" && apellido != "" && edad > 0 && edad < 130) {
        if (sistema.validarCedula(cedula)) {
            if (!sistema.buscarElemento(sistema.censados, "cedula", cedula)) {
                if (depto != -1 && depto != "" && ocup != -1 && ocup != "") {
                    let unCenso = new Censado(nombre, apellido, edad, cedula, depto, ocup, idCensista, id);
                    estadoValidado = false
                    sistema.censados.push(unCenso);
                    id++;
                    mensaje = "Datos guardados correctamente";
                    document.querySelector("#nombreRegistroCenso").value = "";
                    document.querySelector("#apellidoRegistroCenso").value = "";
                    document.querySelector("#edadRegistroCenso").value = "";
                    document.querySelector("#cedulaRegistroCenso").value = "";
                    document.querySelector("#slcDepartamento").value = "";
                    document.querySelector("#slcOcupacion").value = "";
                    document.querySelector("#seccionInvitados").style.display = "block"
                    document.querySelector("#seccionRegistrarCenso").style.display = "none"
                    alert("Datos Guardado Correctamente - Censista asignado = " + reas.nombre);
                } else {
                    mensaje = "Debe seleccionar una opcion";
                }
            } else {
                mensaje = "C.I ya registrado";
            }
        } else {
            mensaje = "C.I no valida";
        }
    } else {
        mensaje = "Los campos nombre y apellido no deben estar vacios, y la edad debe ser menor a 130";
    }
    document.querySelector("#mensajeRegistroCenso").innerHTML = mensaje;
}
//----------Busqueda censos---------------
function cargarBuscador() {
    document.querySelector("#seccionBuscador").style.display = "block"
    document.querySelector("#btnValidarCensos").style.display = "none"
    document.querySelector("#seccionReasignar").style.display = "none"
    document.querySelector("#seccionRegistrarCenso").style.display = "none"
    document.querySelector("#seccionInfoEstadisitca").style.display = "none"
    document.querySelector("#seccionRegistrarUsuario").style.display = "none"
}
function buscarCensado() {
    let cedulaBuscar = document.querySelector("#buscarCedula").value

    let cedulaLimpia = cedulaBuscar.replace(/[.-]/g, "");
    let ci = null;

    for (let i = 0; i < sistema.censados.length; i++) {
        const censado = sistema.censados[i];
        const cedulaSinFormato = censado.cedula.toString().replace(/[.-]/g, "");

        if (cedulaSinFormato === cedulaLimpia) {
            ci = censado;
            break;
        }
    }
    if (ci === null) {
        document.querySelector("#pResultadoBusqueda").innerHTML = "C.I no encontrado";
        document.querySelector("#btnValidarCenso").style.display = "none";
    } else if (ci.estadoValidado === true) {
        document.querySelector("#pResultadoBusqueda").innerHTML = "C.I Registrado";
    } else if (ci.estadoValidado === false) {
        document.querySelector("#pResultadoBusqueda").innerHTML = `
        Nombre: <input type="text" value = "${ci.nombre}"> <br>
        Apellido: <input type="text" value = "${ci.apellido}"> <br>
        Edad: <input type="text" value = "${ci.edad}"> <br>
        Departamento: <input type="text" value = "${ci.depto}"> <br>
        Ocupacion: <input type="text" value = "${ci.ocupacion}">
        `;
        document.querySelector("#btnValidarCensos").style.display = "block";
    }
}
function buscarCiInvitado() {
    let cedulaBuscar = document.querySelector("#buscarCedulainv").value;
    let cedulaLimpia = cedulaBuscar.replace(/[.-]/g, "");
    let ci = null;

    for (let i = 0; i < sistema.censados.length; i++) {
        const censado = sistema.censados[i];
        const cedulaSinFormato = censado.cedula.toString().replace(/[.-]/g, "");

        if (cedulaSinFormato === cedulaLimpia) {
            ci = censado;
            break;
        }
    }
    if (ci === null) {
        document.querySelector("#pResultadoBusquedainv").innerHTML = "C.I no encontrado";
    } else if (ci.estadoValidado === true) {
        document.querySelector("#pResultadoBusquedainv").innerHTML = "C.I Registrado";
    } else if (ci.estadoValidado === false) {
        document.querySelector("#btnGuardarCensosinvi").style.display = "none";
        for (let i = 0; i < sistema.censados.length; i++) {
            document.querySelector("#pResultadoBusquedainv").innerHTML = `
            <ul>
            <li>Nombre: ${ci.nombre} </li><br>
            <li>Apellido: ${ci.apellido}</li> <br>
            <li>Edad: ${ci.edad}</li> <br>
            <li>Departamento: ${ci.depto}</li> <br>
            <li>Ocupacion: ${ci.ocupacion}</li>
            </ul> <input type="button" value="Eliminar" data-invitado="${sistema.censados[i].id}" class="btnEliminar"> 
            `
            let btnEliminarInvitado = document.querySelectorAll(".btnEliminar");
            for (let i = 0; i < btnEliminarInvitado.length; i++) {
                btnEliminarInvitado[i].addEventListener("click", eliminarInvitado); //eliminarInvitado funcion a crear
            }
            document.querySelector("#btnMostrarEstadistica").style.display = "none";
        }
    }
}

//-------Perfil Invitado formulario registro invitado--------
function seccionRegistrarInvi() {
    document.querySelector("#seccionRegistrarCenso").style.display = "block"
    document.querySelector("#btnValidarCenso").style.display = "none"
    document.querySelector("#btnRegistrarCenso").style.display = "none"
    document.querySelector("#seccionInvitados").style.display = "none"
}

//------Reasignar Censos---------
function mostrarSeccionReasignarCenso() {
    document.querySelector("#seccionReasignar").style.display = "block";
    document.querySelector("#seccionBuscador").style.display = "none";
    document.querySelector("#seccionRegistrarCenso").style.display = "none";
    document.querySelector("#seccionInfoEstadisitca").style.display = "none";
    document.querySelector("#seccionRegistrarUsuario").style.display = "none";
    document.querySelector("#slcReasignar").innerHTML = `<option value="-1">Seleccionar</option>`;
    for (let i = 0; i < sistema.censados.length; i++) {
        let unaReasignacion = sistema.censados[i];
        if (unaReasignacion.estadoValidado !== true)
            document.querySelector("#slcReasignar").innerHTML += `<option value="${unaReasignacion.id}">
            ${unaReasignacion.cedula}-
            ${unaReasignacion.nombre}
            </option>`;
    }
    document.querySelector("#slcCensistas").innerHTML = `<option value="-1">Seleccionar</option>`;
    for (let i = 0; i < sistema.censistas.length; i++) {
        let unCensista = sistema.censistas[i];
        document.querySelector("#slcCensistas").innerHTML += `<option value="${unCensista.id}">
    ${unCensista.nombre}-
    ${unCensista.nombreUsuario}-
</option>`;
    }
}
function reasignarCenso() {
    let valorCensista = Number(document.querySelector("#slcCensistas").value);
    let valorCenso = Number(document.querySelector("#slcReasignar").value);

    let censado = sistema.obtenerObjeto(sistema.censados, "id", valorCenso);
    let censista = sistema.obtenerObjeto(sistema.censistas, "id", valorCensista);

    if (censado && censista) {
        censado.idCensista = censista.id;
        document.querySelector("#pReasignarPersona").innerHTML = "Censo reasignado correctamente.";
    } else {
        document.querySelector("#pReasignarPersona").innerHTML = "No se encontró el censado o el censista.";
    }
}
//--------Estadisticas---------
function mostrarSeccionEstadisticas() {
    document.querySelector("#seccionInfoEstadisitca").style.display = "block"
    document.querySelector("#seccionReasignar").style.display = "none"
    document.querySelector("#seccionBuscador").style.display = "none"
    document.querySelector("#seccionRegistrarCenso").style.display = "none"
    document.querySelector("#seccionRegistrarUsuario").style.display = "none"
    document.querySelector("#slcSeleccionarDepto2").style.display = "none"
    document.querySelector("#btnMostrarEstadisticas").style.display = "none"
}
function totalPersonasCensadas() {
    let censosTrue = 0;
    for (let i = 0; i < sistema.censados.length; i++) {
        let mostrar = sistema.censados[i]
        if (mostrar.estadoValidado === true)
            censosTrue++
    }
    document.querySelector("#pTotalCensados").innerHTML = censosTrue
}

function censadosPorDepto() {
    let ver = sistema.contarPersonasPorDepartamento(sistema.censados, sistema.departamentos)
    mostrarTablaConteo(ver);
}

function mostrarTablaConteo(conteo) {
    var tabla = '<table>';

    // Encabezado de la tabla
    tabla += '<tr><th>Departamento</th><th>Cantidad de personas censadas</th></tr>';

    // Filas de la tabla con los datos del conteo
    for (let depto in conteo) {
        tabla += '<tr><td>' + depto + '</td><td>' + conteo[depto] + '</td></tr>';
    }

    tabla += '</table>';

    // Mostrar la tabla en el elemento con el ID "tabla-conteo"
    document.getElementById('tabla-conteo').innerHTML = tabla;
}

function personasPendientes() {
    let totalCensados = sistema.censados.length
    let totalPendientes = 0
    for (let i = 0; i < sistema.censados.length; i++) {
        let censo = sistema.censados[i];
        if (censo.estadoValidado !== true) {
            totalPendientes++
        }
    }
    let final = ((totalPendientes / totalCensados) * 100).toFixed(2)

    document.querySelector("#pTotalpendientes").innerHTML = final + "%"
}

//--------Estadistica por departamento-------------
function seleccionarDeptosTotal() {
    document.querySelector("#slcSeleccionarDepto2").style.display = "block"
    document.querySelector("#btnVerDeptos").style.display = "none"
    document.querySelector("#btnMostrarEstadisticas").style.display = "block"
    let slc = '<select id="slcSeleccionarDepto2">'
    slc += '<option value="-1">Seleccione una opcion...</option>'
    for (let i = 0; i < sistema.departamentos.length; i++) {
        let unDepto = sistema.departamentos[i]
        slc += `<option value="${unDepto.nombre}">${unDepto.nombre}</option>`
    }
    slc += '</select>'
    document.getElementById('slcSeleccionarDepto2').innerHTML = slc
    document.querySelector("#btnMostrarEstadisticas").addEventListener("click", mostrarEstadisticasPorDepartamento);
}
function mostrarEstadisticasPorDepartamento() {
    let selectElement = document.getElementById("slcSeleccionarDepto2");
    let departamentoSeleccionado = selectElement.value;

    if (departamentoSeleccionado === "-1") {
        document.querySelector("#pMostrarPorDepto").innerHTML = "";
        return;
    }

    var estadisticas = sistema.contarEdadPorDepartamento(sistema.censados, sistema.departamentos, departamentoSeleccionado);

    // Crear la cadena de texto para mostrar en el elemento HTML
    var textoMostrar = "Cantidad de personas mayores de edad: " + estadisticas.cantidadMayores + "<br>";
    textoMostrar += "Cantidad de personas menores de edad: " + estadisticas.cantidadMenores;

    // Mostrar el resultado en el elemento HTML
    document.querySelector("#pMostrarPorDepto").innerHTML = textoMostrar;
}

function eliminarInvitado() {
    let idInvitadoElimar = document.querySelector("#buscarCedulainv").value;
    let nuevaCI = idInvitadoElimar;
    //hacemos esto para poder sacar los puntos
    nuevaCI = sistema.eliminarCaracter(idInvitadoElimar, ".");
    let nuevaCI2 = nuevaCI;
    //luego para poder sacar los "-" realizamos esta variable, casteada a Number para que puede eliminar el array indicado
    nuevaCI2 = Number(sistema.eliminarCaracter(nuevaCI, "-"));
    
    let objetoInvitadoElimnar = sistema.obtenerObjeto(sistema.censados, "cedula", nuevaCI2);

    let confirmarElimnar = confirm(`¿Desea elimnar los datos ${objetoInvitadoElimnar.nombre}?`)
    if (confirmarElimnar) {

        for (let i = 0; i < sistema.censados.length; i++) {
            if (sistema.censados[i].cedula === nuevaCI2) {
                sistema.eliminarCenso(i);
                break;
            }
        }
        document.querySelector("#pResultadoBusquedainv").style.display = ""
        document.querySelector("#pResultadoBusquedainv").innerHTML = `Registro eliminado: ${objetoInvitadoElimnar.nombre}`
    }
}


function mostrarTablaConteoInvitados(conteo) {
    var tabla = '<table>';

    // Encabezado de la tabla
    tabla += '<tr><th>Departamento</th><th>Estudian</th><th>No trabajan</th><th>Dependientes o Independientes</th><th>Porcentaje del total de censados</th></tr>';

    // Filas de la tabla con los datos del conteo
    for (var depto in conteo) {
        var estadisticas = conteo[depto];
        tabla += '<tr>';
        tabla += '<td>' + depto + '</td>';
        tabla += '<td>' + estadisticas.estudiantes + '</td>';
        tabla += '<td>' + estadisticas.noTrabajan + '</td>';
        tabla += '<td>' + estadisticas.dependienteOIndependiente + '</td>';
        tabla += '<td>' + estadisticas.porcentaje + '</td>';
        tabla += '</tr>';
    }

    tabla += '</table>';

    // Mostrar la tabla en el elemento con el ID "tablaInvitado"
    document.getElementById('tablaInvitado').innerHTML = tabla;
}

// Info Estadistica del invitado
function tablaEstadisticaInvitado() {
    let llamar = sistema.contarPersonasPorDepartamentoInvi()
    mostrarTablaConteoInvitados(llamar)
}