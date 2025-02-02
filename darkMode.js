// Boton
const btn = document.getElementById('toggle-mode');

btn.addEventListener('click', () => {
	// Cambiamos a modo oscuro
	document.body.classList.toggle('dark-mode');

	// Cambiamos el estilo del boton segun estemos en un modo u otro
	if (document.body.classList.contains('dark-mode')) {
		btn.textContent = 'Modo claro';
	} else {
		btn.textContent = 'Modo oscuro';
	}
});