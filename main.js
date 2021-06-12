const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

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

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

function attack() {
	console.log(`${this.name}Fight...`);
}

function createElement(tag, className) {
	
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
		
	return $tag;

}

function createPlayer(player) {
	
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

function playerWin(name) {
	const $winTitle = createElement('div', 'loseTitle');
	if (name) {
		$winTitle.innerText = `${name} win`;
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
	return document.querySelector(`.player${this.num} .life`);
}


function renderHP() {
	this.elHP().style.width = `${this.hp}%`;
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

function playerAttack() {
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

function showResult() {
	
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

function showTime() {
	const date = new Date();
	return time = `${date.getHours()}:${date.getMinutes()}`;
}



function generateLogs(type, playerKick, playerDefence, value) {
	let el;
	switch (type) {
		case 'start':
			el = `<p>${logs[type].replace('[player2]', playerDefence.name).replace('[player1]', playerKick.name).replace('[time]', showTime())}</p>`;
			break;		
		case 'hit':
			el = `<p>${showTime()} - ${logs[type][randomDamage(logs[type].length - 1)].replace('[playerDefence]', playerDefence.name).replace('[playerKick]', playerKick.name)} -${value} [${playerDefence.hp}/100]</p>`;
			break
		case 'defence':
			el = `<p>${showTime()} - ${logs[type][randomDamage(logs[type].length - 1)].replace('[playerDefence]', playerDefence.name).replace('[playerKick]', playerKick.name)}</p>`;
			break;
		case 'draw':
			el = `<p>${logs[type]}</p>`;
			break;
		case 'end':
			el = `<p>${logs[type][randomDamage(logs[type].length - 1)].replace('[playerWins]', playerKick.name).replace('[playerLose]', playerDefence.name)}</p>`;
			break;
	}
	
	console.log(el);
	
	$chat.insertAdjacentHTML('afterbegin', el);

}

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function (e){
	e.preventDefault();
	const enemy = enemyAttak();
	const player = playerAttack();

	if (player.hit != enemy.defence) {
		player2.changeHP(player.value);
		player2.renderHP();
		generateLogs('hit', player1, player2, player.value);
		
	} else {
		generateLogs('defence', player1, player2);
	}

	if (player.defence != enemy.hit) {
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
