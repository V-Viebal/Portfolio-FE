document.addEventListener('DOMContentLoaded', () => {
	// Link to the stylesheet where the fonts are defined
	const linkElement = document.createElement('link');
	linkElement.rel = 'stylesheet';
	linkElement.href = '/assets/css/fonts/fonts.css'; // Assuming the @font-face rules are in fonts.css
	document.head.appendChild(linkElement);

	// Optional: Add event listener to confirm that fonts are loaded (modern browsers only)
	if (document.fonts) {
		document.fonts.ready.then(() => {
			console.log('Fonts are loaded');
		}).catch((error) => {
			console.error('Error loading fonts:', error);
		});
	}
});
