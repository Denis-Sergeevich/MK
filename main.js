const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const player1 = {
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

const player2 = {
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

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

function attack() {
	console.log(this.name + 'Fight...');
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

function playerWin(name) {
	const $winTitle = createElement('div', 'loseTitle');
	if (name) {
		$winTitle.innerText = name + ' win';
	} else {
		$winTitle.innerText = 'draw';
	}

	return $winTitle;
}


function randomDamage(num) {
	const damage = Math.ceil(Math.random() * num);
	
	return damage;
}


function changeHP(damage) {
	
	this.hp -= damage;

	if (this.hp <= 0) {
		this.hp = 0;
	}
	
}

function elHP() {
	return document.querySelector('.player' + this.num + ' .life');
}


function renderHP() {
	this.elHP().style.width = this.hp + '%';
}

function createReloadButton() {
	const $reloadWrap = createElement('div', 'reloadWrap');
	const $button = createElement('button', 'button');
	$button.innerText = 'Restart';
	
	$reloadWrap.addEventListener('click', function(){
		window.location.reload();
	});

	$reloadWrap.appendChild($button);
	$arenas.appendChild($reloadWrap);
	
}

/*$randomButton.addEventListener('click', function () {
	
	player1.changeHP(randomDamage(10));
	player2.changeHP(randomDamage(10));
	player1.renderHP();
	player2.renderHP();


	if (player1.hp === 0 || player2.hp === 0){
		$randomButton.disabled = true;
		createReloadButton();
		
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWin(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWin(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWin());
	}

	console.log(player1.hp, player2.hp);
});*/

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttak() {
	const hit = ATTACK[randomDamage(3) - 1];
	const defence = ATTACK[randomDamage(3) - 1];
	
	return {
		value: randomDamage(HIT[hit]),
		hit,
		defence,
	}
}

$formFight.addEventListener('submit', function (e){
	e.preventDefault();
	const enemy = enemyAttak();
	const attack = {};

	for (let item of $formFight) {
		if (item.checked && item.name === 'hit') {
			attack.value = randomDamage(HIT[item.value]);
			attack.hit = item.value;
		};

		if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		}

		item.checked = false;
	}

	console.log('#### attack', attack);
	console.log('#### enemy', enemy);

	if (attack.hit != enemy.defence) {
		player2.changeHP(attack.value);
		player2.renderHP();
	}

	if (attack.defence != enemy.hit) {
		player1.changeHP(enemy.value);
		player1.renderHP();
	}

	if (player1.hp === 0 || player2.hp === 0){
		
		for (let item of $formFight) {
			if (item.name === 'submit') {
				
				item.disabled = true;
			
			}

		}
		
		createReloadButton();

	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWin(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWin(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWin());
	}

	console.log(player1.hp, player2.hp);
})
