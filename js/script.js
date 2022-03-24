
let opacity = 0;
const step = 0.01;
let drxn = 1;
const period = 10;

function animateSpans() {

	const divComingSoon = document.querySelector('.coming-soon');
	const comingSpan = divComingSoon.querySelector('span:first-child');
	const soonSpan = divComingSoon.querySelector('span:last-child');

	if (opacity < 0) {
		opacity = 0;
		drxn = 1;
	}

	if (opacity > 1) {
		opacity = 1;
		drxn = -1;
	}

	comingSpan.style.opacity = opacity;
	soonSpan.style.opacity = 1 - opacity;

	opacity += drxn * step;

	setTimeout(animateSpans, period);

}

animateSpans();


function setDimensions() {

	const winWidth = window.innerWidth + 'px';
	const winHeight = window.innerHeight  + 'px';
	const diagonalLengthRaw = Math.sqrt(window.innerHeight ** 2 + window.innerWidth ** 2);
	const diagonalLength = diagonalLengthRaw + 'px';
	const rotatingAngleRaw = Math.atan(window.innerHeight / window.innerWidth);

	// calculate tra=ianglular positioning
	const triCX = (window.innerWidth / 2) + (diagonalLengthRaw / 2) * Math.sin(rotatingAngleRaw);
	const triCY = (window.innerHeight / 2) + (diagonalLengthRaw / 2) * Math.cos(rotatingAngleRaw);
	const triLeft = triCX - (diagonalLengthRaw / 2) + 'px';
	const triTop = triCY - (diagonalLengthRaw / 2) + 'px';


	const divComingSoonHeight = document.querySelector('div.coming-soon').offsetHeight + 'px';
	const rotatingAngle = (Math.PI/2 - rotatingAngleRaw) + 'rad';
	const rotatingAngleDeg = (180/Math.PI * rotatingAngleRaw)	

	document.documentElement.style.setProperty('--window-width', winWidth);
	document.documentElement.style.setProperty('--window-height', winHeight);
	document.documentElement.style.setProperty('--diagonal-length', diagonalLength);
	document.documentElement.style.setProperty('--coming-soon-height', divComingSoonHeight);
	document.documentElement.style.setProperty('--rotate-transform', `rotate(${rotatingAngle})`);
	document.documentElement.style.setProperty('--triangle-left', triLeft);
	document.documentElement.style.setProperty('--triangle-top', triTop);

	
}


window.addEventListener('resize', setDimensions);
setDimensions();




function delay(millis) {
	return new Promise(resolve => setTimeout(resolve, millis))
}

(async function() {

	let playing = false;

	while (!playing) {

		try {
			await document.querySelector('audio').play();
			// throw "xavi"
			playing = true;
		} catch (err) {
			console.log(err);
			await delay(2000);
		}

	}
})();


async function playAudio() {
	console.log('focus');
	await document.querySelector('audio').play();
}

async function pauseAudio() {
	console.log('blur');
	await document.querySelector('audio').pause();
}


window.onblur = pauseAudio;
window.onfocus = playAudio;

document.querySelector('audio').volume = 0.1