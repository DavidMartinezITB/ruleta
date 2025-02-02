// Cuando se hace click en cargar nombres, creamos una funcion asincrona para cargar los nombres
document.getElementById('loadNames').addEventListener('click', async () => {
	try {
		const response = await fetch('./noms.txt'); // Abrimos el fichero de logs
		const data = await response.text(); // Obtenemos los nombres del fichero
		names = data.split('\n'); // Creamos un array con los nombres, separando cada nombre por salto de linea

		// Si obtenemos nombres...
		if (names.length > 0) {
			document.getElementById('spinWheel').disabled = false; // Mostramos ruleta
			document.getElementById('winMark').style.display = 'block';
			drawWheel(); // La hacemos girar (el angulo predeterminado es 0)
		} else {
			alert('El archivo de nombres está vacío.');
		}
	// En caso de error al abrir el fichero
	} catch (error) {
		console.error('Error al cargar los nombres:', error);
		alert('No se pudo cargar el archivo de nombres.');
	}
});

// Cuando trabajamos con ficheros, es importante utilizar funciones asincronas para asegurarnos de que el contenido
// se carga correctamente. De lo contrario, es posible que se ejecute la siguiente linea de codigo sin que el fichero haya sido 
// cargado correctamente en la variable.