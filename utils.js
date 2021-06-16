import { $arenas, 
	$chat, 
	$formFight,
	HIT,
	ATTACK,
	start,
	end,
	hit,
	defence,
	draw } from "./const.js";

import { player1, player2 } from "./main.js";


const randomDamage = (num) => Math.ceil(Math.random() * num);

function attack() {
	console.log(`${this.name}Fight...`);
}

const enemyAttak = () => {
	const hit = ATTACK[randomDamage(3) - 1];
	const defence = ATTACK[randomDamage(3) - 1];
	
	return {
		value: randomDamage(HIT[hit]),
		hit,
		defence,
	}
}

const createElement = (tag, className) => {
	
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
		
	return $tag;

}

const createPlayer = (player) => {
	
	const $player = createElement('div', `player${player.num}`);
	const $progressbar = createElement('div', 'progressbar');
	const $character = createElement('div', 'character');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $img = createElement('img');
		
	$img.src = player.img;
	$name.innerText = player.name;
	$life.style.width = `${player.hp}%`;
	
	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);

	return $player;
}

const playerWin = (name) => {
	const $winTitle = createElement('div', 'loseTitle');
	if (name) {
		$winTitle.innerText = `${name} win`;
	} else {
		$winTitle.innerText = 'draw';
	}

	return $winTitle;
}

function changeHP(damage) {
	
	this.hp -= damage;

	if (this.hp <= 0) {
		this.hp = 0;
	}
	
}

function elHP() {
	return document.querySelector(`.player${this.num} .life`);
}


function renderHP() {
	this.elHP().style.width = `${this.hp}%`;
}

const createReloadButton = () => {
	const $reloadWrap = createElement('div', 'reloadWrap');
	const $button = createElement('button', 'button');
	$button.innerText = 'Restart';
	
	$reloadWrap.addEventListener('click', function(){
		window.location.reload();
	});

	$reloadWrap.appendChild($button);
	$arenas.appendChild($reloadWrap);
	
}

const playerAttack = () => {
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

	return attack;
}

const showResult = () => {
	
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
		generateLogs('end', player2, player1);
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWin(player1.name));
		generateLogs('end', player1, player2);
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWin());
		generateLogs('draw');
	}

}

const showTime = () => {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}`;
}


const generateLogs = (type, playerKick, playerDefence, value) => {
	let el;
	switch (type) {
		case 'start':
			el = `<p>${start.replace('[player2]', playerDefence.name).replace('[player1]', playerKick.name).replace('[time]', showTime())}</p>`;
			break;		
		case 'hit':
			el = `<p>${showTime()} - ${hit[randomDamage(hit.length - 1)].replace('[playerDefence]', playerDefence.name).replace('[playerKick]', playerKick.name)} -${value} [${playerDefence.hp}/100]</p>`;
			break
		case 'defence':
			el = `<p>${showTime()} - ${defence[randomDamage(defence.length - 1)].replace('[playerDefence]', playerDefence.name).replace('[playerKick]', playerKick.name)}</p>`;
			break;
		case 'draw':
			el = `<p>${draw}</p>`;
			break;
		case 'end':
			el = `<p>${end[randomDamage(end.length - 1)].replace('[playerWins]', playerKick.name).replace('[playerLose]', playerDefence.name)}</p>`;
			break;
		default:
			el = `<P>Что-то пошло не так! Попробуй ещё раз!</p>`;
	}
	
	$chat.insertAdjacentHTML('afterbegin', el);

}

const startGame = () => {
	
	$arenas.appendChild(createPlayer(player1));
	$arenas.appendChild(createPlayer(player2));

	generateLogs('start', player1, player2);
}

export { randomDamage,
		attack,
		enemyAttak,
		createPlayer,
		playerWin,
		changeHP,
		elHP,
		renderHP,
		createReloadButton,
		playerAttack,
		showResult,
		showTime,
		generateLogs,
		createElement,
		startGame };