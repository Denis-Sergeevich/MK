import { HIT,
        ATTACK,
        start,
        end,
        hit,
        defence,
        draw } from "../constants/index.js";

import { randomDamage,
        createElement,
        showTime } from "../utils/index.js" ;

import { player1, player2 } from "../examplesPlayer/index.js" 



class Game {
    constructor() {
        
        this.$arenas = document.querySelector('.arenas');
        this.$formFight = document.querySelector('.control');
        this.$chat = document.querySelector('.chat');

    }

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $button = createElement('button', 'button');
        $button.innerText = 'Restart';
        
        $reloadWrap.addEventListener('click', function(){
            window.location.reload();
        });
    
        $reloadWrap.appendChild($button);
        this.$arenas.appendChild($reloadWrap);
        
    }

    enemyAttak = () => {
        const hit = ATTACK[randomDamage(3) - 1];
        const defence = ATTACK[randomDamage(3) - 1];
        
        return {
            value: randomDamage(HIT[hit]),
            hit,
            defence,
        }
    }

    playerAttack = () => {
        const attack = {};
    
        for (let item of this.$formFight) {
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
    
    playerWin = (name) => {
        const $winTitle = createElement('div', 'loseTitle');
        if (name) {
            $winTitle.innerText = `${name} win`;
        } else {
            $winTitle.innerText = 'draw';
        }
    
        return $winTitle;
    }

    showResult = () => {
	
        if (player1.hp === 0 || player2.hp === 0){
            
            for (let item of this.$formFight) {
                
                if (item.name === 'submit') {
                    item.disabled = true;
                }
    
            }
            
            this.createReloadButton();
    
        }
    
        if (player1.hp === 0 && player1.hp < player2.hp) {
            this.$arenas.appendChild(this.playerWin(player2.name));
            this.generateLogs('end', player2, player1);
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            this.$arenas.appendChild(this.playerWin(player1.name));
            this.generateLogs('end', player1, player2);
        } else if (player1.hp === 0 && player2.hp === 0) {
            this.$arenas.appendChild(this.playerWin());
            this.generateLogs('draw');
        }
    
    }

    generateLogs = (type, playerKick, playerDefence, value) => {
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
        
        this.$chat.insertAdjacentHTML('afterbegin', el);
    
    }

    startGame = () => {
	
        player1.createPlayer();
        player2.createPlayer();
    
        this.generateLogs('start', player1, player2);
         
        this.$formFight.addEventListener('submit', (e) => {
            e.preventDefault();
            const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = this.enemyAttak();
            const {hit, defence, value} = this.playerAttack();
       
            if (hit !== defenceEnemy) {
                player2.changeHP(value);
                player2.renderHP();
                this.generateLogs('hit', player1, player2, value);
                
            } else {
                this.generateLogs('defence', player1, player2);
            }
        
            if (defence !== hitEnemy) {
                player1.changeHP(valueEnemy);
                player1.renderHP();
                this.generateLogs('hit', player2, player1, valueEnemy);
                
            } else {
                this.generateLogs('defence', player2, player1);
            }
        
            this.showResult();
        
            console.log('#### attack', {hit, defence, value});
            console.log('#### enemy', {hitEnemy, defenceEnemy, value: valueEnemy});
            console.log(player1.hp, player2.hp);
        })
    
    
    }

    

}

export default Game;