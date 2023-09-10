const CLASS_SNAKE = 'snake';
const CLASS_APPLE = 'apple'; 

class GameObject{
    constructor(row, column, dispatcher, className){
        this.row = row;
        this.column - column;
        this.className = className;
        this.dispatcher = dispatcher;
    };

    getCLassName(){
        return this.className
    };
}


class AppleCell extends GameObject{
    constructor(row, column, dispatcher, className=CLASS_APPLE){
        super(row, column, dispatcher, className);
    }

    act(coord){
        this.dispatcher.game.snake.addCellSnake(coord);
        this.dispatcher.getNewApple(); 
    }
}


class SnakeCell extends GameObject{
    #nextCellCoord;
    constructor(row, column, dispatcher, className = CLASS_SNAKE){
        super(row, column, dispatcher, className);
        this.#nextCellCoord = null;
    }

    setNext(coord){
        this.#nextCellCoord = coord;
    }

    getNext(){
        return this.#nextCellCoord;
    }

    act(coord){
        this.dispatcher.game.play.stopPlay();
    }
}


export {AppleCell, SnakeCell}