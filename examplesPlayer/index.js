import Player from "../Player/index.js";

export const player1 = new Player ({
	num: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	rootSelector: 'arenas',
})


export const player2 = new Player ({
	num: 2,
	name: 'Kitana',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	rootSelector: 'arenas',
})