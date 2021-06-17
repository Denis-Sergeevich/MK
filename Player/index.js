import { createElement } from "../utils/index.js";

class Player {
    constructor(props) {
        
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.num = props.num;
        this.selector = `player${this.num}`;
        this.rootSelector = props.rootSelector;
        
    }

    changeHP = (damage) => {
	
        this.hp -= damage;
    
        if (this.hp <= 0) {
            this.hp = 0;
        }
        
    }
    
    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }
    
    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

    createPlayer = () => {
	
        const $player = createElement('div', `${this.selector}`);
        const $progressbar = createElement('div', 'progressbar');
        const $character = createElement('div', 'character');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $img = createElement('img');
            
        $img.src = this.img;
        $name.innerText = this.name;
        $life.style.width = `${this.hp}%`;
        
        $player.appendChild($progressbar);
        $player.appendChild($character);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);
        
        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);

        return $player;
    }
  
}

export default Player;