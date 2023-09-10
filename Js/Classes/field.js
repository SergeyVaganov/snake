export default class Field {
    #dispatcher;
    #field;
    #numderOfCells;
    
    constructor(dispatcher){
        this.#dispatcher = dispatcher;
        this.#numderOfCells = this.#dispatcher.game.menu.getSize();
        this.#field = new Array();
        this.#field.length = this.#numderOfCells;
        for(let row = 0; row<this.#numderOfCells; row++){
            this.#field[row] = new Array();
            this.#field[row].length = this.#numderOfCells;
            this.#field[row].fill(null)
            }
    };

    #getRandomInt(){
        return Math.floor(Math.random() * (this.#numderOfCells-1))
    }

    getEmptyCoord(){
        do{
            let row = this.#getRandomInt();
            let column = this.#getRandomInt();
            if (!this.#field[row][column]){
                return [row, column];
            }
        } while(true)
    }

    addGameObject(Cell, coord){
        this.#field[coord[0]][coord[1]] = Cell
    }   

    getGameObject(coord){
        return this.#field[coord[0]][coord[1]]
    }

    delGameObject(coord){
        this.#field[coord[0]][coord[1]] = null;
    }
}