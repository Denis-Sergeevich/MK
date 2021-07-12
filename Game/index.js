import { start,
        end,
        hit,
        defence,
        draw } from "../constants/index.js";

import { randomDamage,
        createElement,
        showTime } from "../utils/index.js" ;


import Player from "../Player/index.js";



class Game {
    constructor() {
        
        this.$arenas = document.querySelector('.arenas');
        this.$formFight = document.querySelector('.control');
        this.$chat = document.querySelector('.chat');
        this.player1 = {};
        this.player2 = {};

    }

    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    }

    

    startGame = async () => {
	
        const players = await this.getPlayers();

        const p1 = JSON.parse(localStorage.getItem('player1'));
        const p2 = players[randomDamage(players.length) - 1];

        console.log(p1);

        this.player1 = new Player({
            ...p1,
            num: 1,
            rootSelector: 'arenas',
        })

        console.log('###', this.player);

        this.player2 = new Player({
            ...p2,
            num: 2,
            rootSelector: 'arenas',
        })

        this.player1.createPlayer();
        this.player2.createPlayer();
    
        this.generateLogs('start', this.player1, this.player2);
         
        this.$formFight.addEventListener('submit', async (e) => {
            e.preventDefault();
            const { player1 , player2 } = await this.getDamage();
            const { value, hit, defence } = player1;
            const { value: valueEnemy, hit: hitEnemy, defence: defenceEnemy} = player2;
            
            console.log('###1 ', player1);
            console.log('###2', player2);

            if (hit !== defenceEnemy) {
                this.player2.changeHP(value);
                this.player2.renderHP();
                this.generateLogs('hit', this.player1, this.player2, value);
                
            } else {
                this.generateLogs('defence', this.player1, this.player2);
            }
        
            if (defence !== hitEnemy) {
                this.player1.changeHP(valueEnemy);
                this.player1.renderHP();
                this.generateLogs('hit', this.player2, this.player1, valueEnemy);
                
            } else {
                this.generateLogs('defence', this.player2, this.player1);
            }
        
            this.showResult();
        
            console.log('#### attack', {hit, defence, value});
            console.log('#### enemy', {hitEnemy, defenceEnemy, value: valueEnemy});
            console.log(this.player1.hp, this.player2.hp);
        })
    
    
    }

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $button = createElement('button', 'button');
        $button.innerText = 'Restart';
        
        $reloadWrap.addEventListener('click', function(){
            window.location.pathname = '../index.html';
        });
    
        $reloadWrap.appendChild($button);
        this.$arenas.appendChild($reloadWrap);
        
    }


    getDamage = async () => {
        const damage = {};
    
        for (let item of this.$formFight) {
            if (item.checked && item.name === 'hit') {
                damage.hit = item.value;
            };
    
            if (item.checked && item.name === 'defence') {
                damage.defence = item.value;
            }
    
            item.checked = false;
        }
        
        const { hit, defence } = damage;

        const q = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(resp => resp.json());

        return q;
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
	
        if (this.player1.hp === 0 || this.player2.hp === 0){
            console.log(this.player1.hp);
            for (let item of this.$formFight) {
                
                if (item.name === 'submit') {
                    item.disabled = true;
                }
    
            }
            
            this.createReloadButton();
    
        }
    
        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            this.$arenas.appendChild(this.playerWin(this.player2.name));
            this.generateLogs('end', this.player2, this.player1);
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            this.$arenas.appendChild(this.playerWin(this.player1.name));
            this.generateLogs('end', this.player1, this.player2);
        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
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
                break;
        }
        
        this.$chat.insertAdjacentHTML('afterbegin', el);
    
    }

 

}

export default Game;