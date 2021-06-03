const player1 = {
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['sword', 'knife', 'axe'],
	attack: function() {
		console.log(this.name + 'Fight...')
	}
}

const player2 = {
	name: 'Kitana',
	hp: 95,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['sword', 'gun', 'blade'],
	attack: function() {
		console.log(this.name + 'Fight...')
	}
}

function createPlayer(playerClass, player) {
	const $player = document.createElement('div');
	$player.classList.add(`${playerClass}`);

	const $arenas = document.querySelector('.arenas');
	$arenas.appendChild($player);

	const $progressbar = document.createElement('div');
	$progressbar.classList.add('progressbar');
	$player.appendChild($progressbar);

	const $character = document.createElement('div');
	$character.classList.add('character');
	$player.appendChild($character);

	const $life = document.createElement('div');
	$life.classList.add('life');
	$progressbar.appendChild($life);
	$life.style.width = '100%';

	const $name = document.createElement('div');
	$name.classList.add('name');
	$progressbar.appendChild($name)
	$name.innerText = player.name;

	const $img = document.createElement('img');
	$character.appendChild($img);
	$img.src = player.img;
}

createPlayer('player1', player1);
createPlayer('player2', player2);