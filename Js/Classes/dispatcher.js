import Menu from './menu.js';
import Field from './field.js';
import Play from './play.js';
import Snake from './snake.js';
import Apple from './apple.js';
import Draw from './draw.js';
import Score from './score.js';


export default class Dispatcher{ 
    constructor(){
        this.menu = new Menu(this);
        this.score = new Score(this);
        this.game = {menu:this.menu, score:this.score};
    }

    initGame(){
        this.game.field = new Field(this);
        this.game.play = new Play(this);
        this.game.snake = new Snake(this);
        this.game.apple = new Apple(this);
        this.game.draw = new Draw(this);
        this.game.score.newScore();   
        this.game.draw.drawField();
        this.game.play.run(this);
    }

    getNewApple(){
        this.game.apple = new Apple(this);
        this.game.score.incrementScore();
    }

    getPlay(){
        this.menu.menuOff();
        this.game = {menu:this.menu, score:this.score};
        this.initGame()
    }

    getMenu(){
        this.menu.menuOn()
    }
}


