import { 
		attack,
		enemyAttak,
		changeHP,
		elHP,
		renderHP,
		playerAttack,
		showResult,
		generateLogs,
		startGame } from "./utils.js";


import { $formFight	} from "./const.js";


export const player1 = {
	num: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['sword', 'knife', 'axe'],
	attack,
	changeHP,
	elHP,
	renderHP
}

export const player2 = {
	num: 2,
	name: 'Kitana',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['sword', 'gun', 'blade'],
	attack,
	changeHP,
	elHP,
	renderHP
}


startGame();

$formFight.addEventListener('submit', function (e){
	e.preventDefault();
	const enemy = enemyAttak();
	const player = playerAttack();

	if (player.hit !== enemy.defence) {
		player2.changeHP(player.value);
		player2.renderHP();
		generateLogs('hit', player1, player2, player.value);
		
	} else {
		generateLogs('defence', player1, player2);
	}

	if (player.defence !== enemy.hit) {
		player1.changeHP(enemy.value);
		player1.renderHP();
		generateLogs('hit', player2, player1, enemy.value);
		
	} else {
		generateLogs('defence', player2, player1);
	}

	showResult();

	console.log('#### attack', player);
	console.log('#### enemy', enemy);
	console.log(player1.hp, player2.hp);
})
