const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
	num: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['sword', 'knife', 'axe'],
	attack: function() {
		console.log(this.name + 'Fight...')
	}
}

const player2 = {
	num: 2,
	name: 'Kitana',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['sword', 'gun', 'blade'],
	attack: function() {
		console.log(this.name + 'Fight...')
	}
}

function createElement(tag, className) {
	
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
		
	return $tag;

}

function createPlayer(player) {
	
	const $player = createElement('div', 'player' + player.num);
	const $progressbar = createElement('div', 'progressbar');
	const $character = createElement('div', 'character');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $img = createElement('img');
		
	$img.src = player.img;
	$name.innerText = player.name;
	$life.style.width = player.hp + '%';
	
	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);

	return $player;
}

function randomDamage() {
	const damage = Math.ceil(Math.random() * 100);
	return damage;
}

function changeHP(player) {
	const $playerLife = document.querySelector('.player' + player.num + ' .life');
	player.hp -= randomDamage();
	
	if (player1.hp <= 0 && player2.hp <= 0) {
		const $draw = createElement('div', 'loseTitle');
		$draw.innerText = 'draw';
		$arenas.appendChild($draw);
	} else if (player1.hp <= 0 && player2.hp > 0) {
		
		$playerLife.style.width = 0;
		$randomButton.disabled = true;
		$arenas.appendChild(playerWin(player2.name));
		
	} else if (player2.hp <=0 && player1.hp > 0) {
		$playerLife.style.width = 0;
		$randomButton.disabled = true;
		$arenas.appendChild(playerWin(player1.name));
	}

	$playerLife.style.width = player.hp + '%';
}

function playerWin(name) {
	const $winTitle = createElement('div', 'loseTitle');
	$winTitle.innerText = name + ' win';

	return $winTitle;
}

$randomButton.addEventListener('click', function () {
	
	changeHP(player1);
	changeHP(player2);

	console.log(player1.hp, player2.hp);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
