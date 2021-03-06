/** @format */

gsap.from('#nav-container', {
	duration: 2,
	y: '-100%',
	ease: 'bounce',
	opacity: 0,
	delay: 2,
});

gsap.from('#small', {
	duration: 1.5,
	x: '-100vw',
	ease: 'power2.in',
	delay: 1,
});

gsap.fromTo(
	'.welcome',
	{
		opacity: 0,
		scale: 0,
		rotation: 720,
	},
	{ duration: 1, opacity: 1, scale: 1, rotation: 0 }
);

gsap.from('select', {
	duration: 1.5,
	x: '100vw',
	ease: 'power2.in',
	delay: 2,
});
