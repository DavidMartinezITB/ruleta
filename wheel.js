// Declaramos los objetos que utilizaremos mas adelante
const canvas = document.getElementById('wheelCanvas'); // Seleccionamos el canvas
const ctx = canvas.getContext('2d'); // Seleccionamos el contexto 2d
const spinSound = document.getElementById('spinSound'); // Seleccionamos el elemento multimedia de cuando hace spin
const winSound = document.getElementById('winSound'); // Seleccionamos el elemento multimedia de cuando ganas

let names = []; // Declaramos el array en el que cargaremos los nombres
let isSpinning = false; // Variable de control para saber si la ruleta esta girando o no

// Cuando hacemos click en el boton de girar ruleta
document.getElementById('spinWheel').addEventListener('click', () => {
	// Si esta rodando o no hay nombres cargados, vuelve
	if (isSpinning || names.length === 0) {
		return;
	};

	isSpinning = true; // Seteamos la variable de control en true
	spinSound.play(); // Reproducimos el sonido de girar
	const spinTime = Math.random() * 3000 + 3000; // Duración entre 3 y 6 segundos - Math.random() genera un numero aleatorio entre 0 y 1
	let angle = 0; // Inicializamos el angulo de la ruleta, que por defecto es 0
	const spinSpeed = Math.random() * 10 + 10;

	// Con la siguiente funcion, definimos un bloque de codigo que se ejecutara cada 16ms, que aumentara el angulo de la ruleta, 
	// haciendola girar. 
	const spin = setInterval(() => {
		angle += spinSpeed; // Modificamos el angulo, simulando un giro
		drawWheel(angle); // Printamos la ruleta con el nuevo angulo
	}, 16); // Definimos 16ms por la tasa de refresco de la pantalla: 60FPS

	// Definimos una funcion que detendra la ruleta una vez el tiempo de rodad finalice
	setTimeout(() => {
		clearInterval(spin); // Detenemos el intervalo para que la ruleta no gire mas
		const selectedName = getSelectedName(angle); // Seleccionamos el nombre que ha tocado
		document.getElementById('result').textContent = selectedName; // Lo mostramos
		winSound.play(); // Reproducimos el sonido de ganar
		isSpinning = false; // Definimos en falso la variable de control
	}, spinTime);
});

// Declaramos la funcion que imprime (y actualiza) la ruleta con el angulo que le pasemos
function drawWheel(rotation = 0) {
	// Obtenemos los centros del canvas
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	const radius = Math.min(canvas.width, canvas.height) / 2; // Obtenemos el radio del circulo
	const sliceAngle = (2 * Math.PI) / names.length; // Obtenemos el angulo de los cortes

	ctx.clearRect(0, 0, canvas.width, canvas.height); // Borramos el contenido del canvas

	// Para cada nombre, definimos su posicion dentro de cada porcion del circulo (ruleta), teniendo en cuenta la rotacion
	names.forEach((name, i) => {
		const startAngle = i * sliceAngle + rotation * (Math.PI / 180);
		const endAngle = startAngle + sliceAngle;

		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.closePath();

		ctx.fillStyle = i % 2 === 0 ? '#007bff' : '#00c8ff';
		ctx.fill();

		ctx.save();
		ctx.translate(
			centerX + Math.cos(startAngle + sliceAngle / 2) * (radius / 1.5),
			centerY + Math.sin(startAngle + sliceAngle / 2) * (radius / 1.5)
		);
		ctx.rotate(startAngle + sliceAngle / 2);
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = '16px Arial';
		ctx.fillText(name, 0, 0);
		ctx.restore();
	});
}

// Obtenemos el nombre escogido
function getSelectedName(rotation) {
	const sliceAngle = (2 * Math.PI) / names.length;
	const normalizedRotation = (rotation * (Math.PI / 180)) % (2 * Math.PI);
	const selectedIndex = Math.floor((2 * Math.PI - normalizedRotation) / sliceAngle) % names.length;
	return names[selectedIndex];
}
