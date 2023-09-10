import { SnakeCell } from "./cells.js";

export default class Snake{
    #dispatcher;
    #start;
    #end;

    constructor(dispatcher){
        this.#dispatcher = dispatcher;
        let size = dispatcher.game.menu.getSize();
        let coordStart = Math.round(size/2);
        let coord = [coordStart, coordStart];
        let snakeCell = new SnakeCell(coord[0], coord[1], this.dispatcher);
        this.#dispatcher.game.field.addGameObject(snakeCell, coord);
        this.#start = coord;
        this.#end = coord;
        this.addCellSnake([coord[0]-1,coord[1]]);
    }

    addCellSnake(coord){
        let startSnake = this.#dispatcher.game.field.getGameObject(this.#start);
        startSnake.setNext(coord);
        let snakeCell = new SnakeCell(coord[0], coord[1], this.#dispatcher);
        this.#dispatcher.game.field.addGameObject(snakeCell, coord);
        this.#start = coord;
    }

    getCoordStart(){
        return this.#start
    }    

    delCellSnake(){
        let endCell = this.#dispatcher.game.field.getGameObject(this.#end);
        let newEndCoord = endCell.getNext();
        this.#dispatcher.game.field.delGameObject(this.#end);
        this.#end = newEndCoord;
    }

    stepNull(coord){
        this.addCellSnake(coord);
        this.delCellSnake();
    }
}