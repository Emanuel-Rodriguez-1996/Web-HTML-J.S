class Sistema {
    constructor() {
        this.censistas = [
            new Censista("censista-1", "usuarioCensista1", "Em12345", 1),
            new Censista("censista-2", "usuarioCensista2", "Em12345", 2),
            new Censista("censista-3", "usuarioCensista3", "Em12345", 3)
        ];

        this.censados = [
            new Censado("Jose", "Rodriguez", 27, 48437214, "Canelones", "independiente", 1, 1, false),
            new Censado("Pepe", "Torres", 14, 48437244, "San Jose", "independiente", 2, 2, true),
            new Censado("Juan", "Perdomo", 21, 48438214, "Artigas", "estudiante", 3, 3, false),
            new Censado("Julio", "Almeida", 29, 45437214, "Tacuarembo", "no trabaja", 1, 4, false),
            new Censado("Javier", "Alfonso", 33, 45537264, "Paysandu", "dependiente", 2, 5, true),
            new Censado("Emanuel", "Rodriguez", 12, 48433415, "Flores", "independiente", 3, 6, true),
            new Censado("Florencia", "Casas", 13, 64756987, "Florida", "dependiente", 1, 7, true),
            new Censado("Antonia", "Ramirez", 14, 53678904, "Durazno", "estudiante", 2, 8, true),
            new Censado("Alfonsa", "Paredes", 16, 32358763, "Soriano", "no trabaja", 3, 9, true),
            new Censado("Rosita", "Cardozo", 8, 47652341, "Colonia", "independiente", 1, 10, true),
            new Censado("Pedro", "Alfonso", 63, 55361343, "Treinta y tres", "independiente", 2, 11, false),
            new Censado("Julian", "Alvarez", 46, 39457653, "Montevideo", "estudiante", 3, 12, false),
            new Censado("Luis", "Suarez", 36, 43651341, "Canelones", "no trabaja", 1, 13, true),
            new Censado("Facundo", "Torres", 63, 82568741, "Florida", "dependiente", 2, 14, true),
            new Censado("Antonio", "Pacheco", 19, 24658563, "Montevideo", "independiente", 3, 15, false),
            new Censado("Alberto", "Sellanes", 63, 43675462, "Rocha", "estudiante", 1, 16, true),
            new Censado("Obdulio ", "Varela", 89, 25679862, "Maldonado", "no trabaja", 2, 17, false),
            new Censado("Nestor ", "Goncalves", 24, 34569876, "Tacuarembo", "dependiente", 3, 18, false),
            new Censado("kevin", "Dawson", 33, 25438769, "Paysandu", "independiente", 1, 19, false),
            new Censado("Valentin", "Rodriguez", 13, 65423456, "Flores", "estudiante", 2, 20, true),
            new Censado("Dario", "Rodriguez", 8, 38519238, "Treinta y tres", "no trabaja", 3, 21, false),
            new Censado("Sebastian", "Cristoforo", 12, 25673459, "Salto", "no trabaja", 1, 22, true),
            new Censado("Fabian", "Estoyanoff", 59, 67452463, "Artigas", "dependiente", 2, 23, true),
            new Censado("Cristiano", "Ronaldo", 13, 36457653, "Rio Negro", "independiente", 3, 24, false),
            new Censado("Ronaldinho", "Gaucho", 23, 24957432, "LaValleja", "estudiante", 1, 25, false),
            new Censado("Lionel", "Messi", 19, 67859664, "Cerro Largo", "no trabaja", 2, 26, false),
            new Censado("Neymar", "J.R", 66, 45679863, "Soriano", "independiente", 3, 27, true),
            new Censado("Ronaldo", "Nazario", 91, 53425436, "Rivera", "dependiente", 1, 28, false),
            new Censado("Darwin", "Nuñez", 12, 29876543, "San Jose", "estudiante", 2, 29, true),
            new Censado("Luis", "Nuñez", 12, 29876665, "San Jose", "estudiante", 2, 30, true)
        ];

        this.ocupaciones = [
            new Ocupacion(1, "dependiente"),
            new Ocupacion(2, "independiente"),
            new Ocupacion(3, "estudiante"),
            new Ocupacion(4, "no trabaja")
        ];

        this.departamentos = [
            new Departamento(1, "Montevideo"),
            new Departamento(2, "Canelones"),
            new Departamento(3, "Florida"),
            new Departamento(5, "Rocha"),
            new Departamento(6, "Maldonado"),
            new Departamento(7, "Tacuarembo"),
            new Departamento(8, "Paysandu"),
            new Departamento(9, "Flores"),
            new Departamento(10, "Durazno"),
            new Departamento(11, "Treinta y tres"),
            new Departamento(12, "Salto"),
            new Departamento(13, "Artigas"),
            new Departamento(14, "Rio Negro"),
            new Departamento(15, "LaValleja"),
            new Departamento(16, "Cerro Largo"),
            new Departamento(17, "Rivera"),
            new Departamento(18, "San Jose"),
            new Departamento(19, "Soriano"),
            new Departamento(20, "Colonia")
        ];

    }

contarPersonasPorDepartamentoInvi() {
    //objeto
        let conteo = {};
        for (let i = 0; i < this.departamentos.length; i++) {
            let depto = this.departamentos[i].nombre;
            conteo[depto] = {
                //prop
                estudiantes: 0,
                noTrabajan: 0,
                dependienteOIndependiente: 0,
                totalCensados: 0,
                porcentaje: 0,
            };
        }

        for (let j = 0; j < this.censados.length; j++) {
            const censo = this.censados[j];
            let departamento = censo.depto;
            let ocupacion = censo.ocupacion;

            if (ocupacion === 'estudiante') {
                conteo[departamento].estudiantes++;
            } else if (ocupacion === 'no trabaja') {
                conteo[departamento].noTrabajan++;
                conteo[departamento].dependiente++;
            } else if (ocupacion === 'dependiente' || ocupacion === 'independiente') {
                conteo[departamento].dependienteOIndependiente++;
            }

            conteo[departamento].totalCensados++;
        }

        let totalCensados = this.censados.length;
        for (let deptartamento in conteo) {
            conteo[deptartamento].porcentaje = ((conteo[deptartamento].totalCensados / totalCensados) * 100).toFixed(2) + " %"
        }

        return conteo;
    }

    agregarCensista(censista) {
        this.censistas.push(censista)
    }

    agregarCensados(censista) {
        this.censados.push(censista)
    }

    
    buscarElemento(arrElementos, propiedad, busqueda) {
        let existe = false;
        for (let i = 0; i < arrElementos.length; i++) {
            const unElemento = arrElementos[i];
            if (unElemento[propiedad] === busqueda) {
                existe = true;
                break;
            }
        }
        return existe;
    }

    obtenerObjeto(arrElementos, propiedad, busqueda) {
        let objeto = null;
        for (let i = 0; i < arrElementos.length; i++) {
            const unElemento = arrElementos[i];
            if (unElemento[propiedad] == busqueda) {
                objeto = unElemento;
                break
            }
        }
        return objeto;
    }

    validarCensistaRepetido(censista) {
        let existe = false;
        for (let i = 0; i < this.censistas.length; i++) {
            if (censistas[i] === censista) {
                existe = true;
                break
            }
        }
        return existe;
    }
//----Valida el registro de usuario censista
    validarRegistroOk(nombre, nombreUsuario, clave) {
        let campoValido = false;
        if (nombre != "" && nombreUsuario != "" && clave != "") {
            campoValido = true;
        }
        return campoValido;
    }
    validarContrasena(contraseña) {
        if (contraseña.length < 5) {
            return false;
        }
        let tieneMayuscula = false;
        let tieneMinuscula = false;
        let tieneNumero = false;

        //validamos para que pueda ingresar mayus, min 
        const caracteresMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const caracteresMinusculas = "abcdefghijklmnopqrstuvwxyz";
        const caracteresNumeros = "0123456789";

        for (let i = 0; i < contraseña.length; i++) {
            const caracter = contraseña[i];

            if (caracteresMayusculas.indexOf(caracter) !== -1) {
                tieneMayuscula = true;
            }
            if (caracteresMinusculas.indexOf(caracter) !== -1) {
                tieneMinuscula = true;
            }
            if (caracteresNumeros.indexOf(caracter) !== -1) {
                tieneNumero = true;
            }
            // Verificar si la contraseña es valida
            if (tieneMayuscula && tieneMinuscula && tieneNumero) {
                return true;
            }
        }
        return false;
    }

    verficarLogin(nombreUsuario, clave) {
        let resultado = false;
        let unUsuario = this.obtenerObjeto(this.censistas, "nombreUsuario", nombreUsuario);
        if (unUsuario !== null) {
            if (unUsuario.contrasena === clave) {
                resultado = true;
            }
        }
        return resultado;
    }

    //Eliminar Censo completado (solo el invitado elimina si no fue validado.)
    eliminarCenso(pos) {
        this.censados.splice(pos, 1);
    }


    eliminarCaracter(texto, letra) {
        let textoSustituido = "";
        for (let i = 0; i < texto.length; i++) {
            if (texto.charAt(i) !== letra) {
                textoSustituido += texto.charAt(i);
            }
        }
        return textoSustituido;
    }
    //funcion estadisitca, cuenta la edad por departamento. 
    contarEdadPorDepartamento(censados, departamentos, departamentoSeleccionado) {
        let conteoEdadMayores = 0;
        let conteoEdadMenores = 0;

        for (let i = 0; i < censados.length; i++) {
            let censo = censados[i];
            let departamento = censo.depto;

            if (departamento === departamentoSeleccionado) {
                if (censo.edad >= 18 && censo.estadoValidado !== false) {
                    conteoEdadMayores++;
                } else if (censo.edad < 18) {
                    conteoEdadMenores++;
                }
            }
        }

        return {
            cantidadMayores: conteoEdadMayores,
            cantidadMenores: conteoEdadMenores
        };
    }

    contarPersonasPorDepartamento(censados, departamentos) {
        let conteo = {};
        // Inicializar el conteo en cero para cada departamento
        for (let i = 0; i < departamentos.length; i++) {
            let depto = departamentos[i].nombre;
            conteo[depto] = 0;
        }
        // Recorrer el array de censados y contar las personas por departamento     
        for (let j = 0; j < censados.length; j++) {
            let censo = censados[j];
            let departamento = censo.depto;

            if (censo.estadoValidado !== false)
                conteo[departamento]++;
        }
        return conteo;
    }

    validation_digit(ci) {
        var a = 0;
        var i = 0;
        if (ci.length <= 6) {
            for (i = ci.length; i < 7; i++) {
                ci = '0' + ci;
            }
        }
        for (i = 0; i < 7; i++) {
            a += (parseInt("2987634"[i]) * parseInt(ci[i])) % 10;
        }
        if (a % 10 === 0) {
            return 0;
        } else {
            return 10 - a % 10;
        }
    }

    clean_ci(ci) {
        return ci.replace(/\D/g, '');
    }
    validarCedula(ci) {
        ci = this.clean_ci(ci);
        var dig = ci[ci.length - 1];
        ci = ci.replace(/[0-9]$/, '');
        return (dig == this.validation_digit(ci));
    }

    aleatorioID(array) {
        let indiceAleatorio = Math.floor(Math.random() * array.length);
        return array[indiceAleatorio].id;
    }



    /*mostrarTablaConteo(conteo) {
    let tabla = '<table>';

    tabla += '<tr><th>Departamento</th><th>Cantidad de personas censadas</th></tr>';
    for(let i = 0; i < conteo.length; i++) {
        let depto = conteo[i].departamento
        let cantidad = conteo[i].censado
        tabla += '<tr><td>' + depto + '</td><td>' + cantidad + '</td></tr>';
    }
    console.log(conteo)
    tabla += '</table>';

    return document.querySelector("#tabla-conteo").innerHTML = tabla
}*/
}