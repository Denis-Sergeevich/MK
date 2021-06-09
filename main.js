const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.control .button');


const player1 = {
	num: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon: ['sword', 'knife', 'axe'],
	attack: function() {
		console.log(this.name + 'Fight...')
	},
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP
}




const player2 = {
	num: 2,
	name: 'Kitana',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['sword', 'gun', 'blade'],
	attack: function() {
		console.log(this.name + 'Fight...')
	},
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP
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
	$reloadWrap.appendChild($button);
	$button.innerText = 'Restart';
	return $reloadWrap;
}

$randomButton.addEventListener('click', function () {
	
	player1.changeHP(randomDamage(10));
	player2.changeHP(randomDamage(10));
	player1.renderHP();
	player2.renderHP();


	if (player1.hp === 0 || player2.hp === 0){
		$randomButton.disabled = true;
		$arenas.appendChild(createReloadButton());
		const $reloadButton = document.querySelector('.reloadWrap .button')
		$reloadButton.addEventListener('click', function(){
			window.location.reload();
		})
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWin(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWin(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWin());
	}

	console.log(player1.hp, player2.hp);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
