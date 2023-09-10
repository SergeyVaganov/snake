const DEFAULT_SIZE = 20;
const ID_MENU = 'menu'
const ID_VALUE_GAMEFIELD = "menu__value-gamefield"
const ID_INPUT = 'menu__size'
const ID_BUTTON = 'menu__button'
const ID_MAX_SCORE = 'menu__maxScore'
const CLASS_MAIN = 'main'


export default class Menu{
    #dispatcher;
    #size;
    #mainHtml;
    #menuHtml;
    #inputHtml;
    #valueGameFieldHtml;
    #maxScoreHtml;


    constructor(dispatcher){
        this.#dispatcher = dispatcher;
        this.#size = DEFAULT_SIZE;
        this.#mainHtml = document.getElementsByClassName(CLASS_MAIN);
        const widthMain = this.#mainHtml[0].clientWidth;
        this.#mainHtml[0].style.height = `${widthMain}px`;
        this.#menuHtml = document.getElementById(ID_MENU);
    }

    getSize(){
        return this.#size;
    }

    menuOn(){
        this.#menuHtml.style.display = '';
        const h1Html = document.createElement('h1');
        h1Html.innerText = 'Змейка';
        this.#menuHtml.append(h1Html);
        this.#valueGameFieldHtml = document.createElement('div');
        this.#valueGameFieldHtml.setAttribute('id', ID_VALUE_GAMEFIELD)
        this.#menuHtml.append(this.#valueGameFieldHtml)
        this.#inputHtml = document.createElement('input');
        this.#inputHtml.setAttribute('id', ID_INPUT);
        this.#inputHtml.setAttribute('type', 'range');
        this.#inputHtml.setAttribute('min', '10');
        this.#inputHtml.setAttribute('max', '30');
        this.#inputHtml.setAttribute('step', '5');
        this.#menuHtml.append(this.#inputHtml);
        this.#inputHtml.setAttribute('value', this.#size);
        this.#inputHtml.addEventListener('input', this.#sizeGameField.bind(this));
        this.#maxScoreHtml = document.createElement('div');
        this.#maxScoreHtml.setAttribute('id', ID_MAX_SCORE);
        this.#menuHtml.append(this.#maxScoreHtml);
        const buttonHtml = document.createElement('button');
        buttonHtml.setAttribute('id', ID_BUTTON);
        buttonHtml.innerText = 'Играть';
        this.#menuHtml.append(buttonHtml);
        buttonHtml.addEventListener('click', ()=>this.#dispatcher.getPlay());
        this.#sizeGameField();
    }

    #sizeGameField(){  
        this.#size = +this.#inputHtml.value;
        this.#valueGameFieldHtml.innerText = `Размер игрового поля: ${this.#size}`;
        const maxScore = this.#dispatcher.game.score.getStorageScore(this.#size);
        if (maxScore){
            this.#maxScoreHtml.innerText = `Ваш рекорд - ${maxScore}`
        }
        else {
            this.#maxScoreHtml.innerText = `Вы еще не играли на таком поле`
        }
    }

    menuOff(){
        this.#menuHtml.style.display = 'none';
        document.removeEventListener('click', ()=>this.#dispatcher.getPlay());
        this.#menuHtml.innerHTML = ' '
    }
}

