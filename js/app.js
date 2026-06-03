// FUNCIÓN DE FILTRADO PURA: Recibe el array por parámetro, genera el resultado y lo devuelve usando return
const filtrarDuplicados = (arregloOriginal) => {
    // new Set() elimina duplicados manteniendo tipos nativos (separa el número 10 del texto "10")
    // El operador de propagación [...] transforma la colección limpia de vuelta a un array tradicional
    const arregloLimpio = [...new Set(arregloOriginal)];

    // 🎯 REQUISITO: Genera el resultado y lo devuelve estrictamente mediante 'return'
    return arregloLimpio;
};

// Objeto global vacío para resguardar las referencias con nombre de las funciones flecha de escucha
const accionesDepurador = {};

const activarEcosistemaDepurador = () => {
    const formulario = document.getElementById("validador-form");
    const inputElementos = document.getElementById("input-elementos");
    const boxResultado = document.getElementById("resultado-validacion");
    const txtObjeto = document.getElementById("texto-objeto");

    if (!formulario || !inputElementos || !boxResultado || !txtObjeto) return;

    // A. ESCUCHADOR NATIVO 'input': Limpia y oculta el panel de resultados en tiempo real al escribir en el móvil
    inputElementos.addEventListener("input", () => {
        boxResultado.className = "hidden";
        txtObjeto.textContent = "";
    });

    // B. 🎯 FUNCIÓN MAESTRA MAIN: Lee, valida, pasa parámetros, recibe en variable y muestra por pantalla
    accionesDepurador.main = (evento) => {
        // Frenar el reinicio automático del navegador en pantallas de teléfonos móviles
        evento.preventDefault();

        // 1. LECTURA DE DATOS: Extrae la cadena de texto ingresada por el usuario
        const textoIngresado = inputElementos.value.trim();

        // 2. VALIDACIÓN DE DATOS: Comprueba que el campo no se procese vacío
        if (textoIngresado === "") {
            alert("⚠️ Por favor, introduce elementos separados por comas antes de limpiar.");
            return;
        }

        // Conversor inteligente de tipos para estructurar los elementos reales en un array
        const arrayProcesado = textoIngresado.split(",")
            .map(elemento => {
                let limpio = elemento.trim();
                
                // Remover comillas si el usuario escribió ["x", "10"] para limpiar el formato string
                if ((limpio.startsWith('"') && limpio.endsWith('"')) || (limpio.startsWith("'") && limpio.endsWith("'"))) {
                    return limpio.slice(1, -1);
                }
                // Si es un número puro sin comillas (ej: 10), convertirlo a tipo Number real
                if (limpio !== "" && !isNaN(limpio)) {
                    return Number(limpio);
                }
                // Si es un valor booleano sin comillas, convertirlo a Boolean real
                if (limpio === "true") return true;
                if (limpio === "false") return false;
                
                // En cualquier otro caso, procesar como cadena de texto (String)
                return limpio;
            })
            .filter(elemento => elemento !== "");

        // Control de seguridad por si la lista procesada queda vacía
        if (arrayProcesado.length === 0) {
            alert("❌ Error: No has introducido ningún elemento válido.");
            return;
        }

        // 3. PASO POR PARÁMETRO Y RECEPCIÓN EN VARIABLE: Pasa el array estructurado y 🎯 CAPTURA EL RETURN en la variable local 'resultadoRecibido'
        const resultadoRecibido = filtrarDuplicados(arrayProcesado);

        // Mapeamos los elementos para formatear las comillas de los Strings de manera visual en la interfaz
        const formatoVisual = resultadoRecibido.map(item => {
            if (typeof item === "string") return `"${item}"`;
            return item;
        });

        // 4. MUESTRA POR PANTALLA: La función main toma la variable capturada del return y la imprime de forma directa
        txtObjeto.textContent = `[ ${formatoVisual.join(", ")} ]`;

        // Hacer visible la sección aplicando las clases elásticas responsivas de alto contraste
        boxResultado.className = "mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl font-mono border-4 bg-slate-950 text-white border-slate-800 shadow-2xl max-w-full overflow-hidden text-left block animate-fade-in";
    };

    // D. ESCUCHADOR NATIVO 'submit': Captura de forma independiente el envío del formulario para disparar el Main
    formulario.addEventListener("submit", accionesDepurador.main);
};

document.addEventListener("DOMContentLoaded", () => {
    // Lanzar de forma directa las operaciones de escucha de los botones al estar listo el DOM
    activarEcosistemaDepurador();
});

