const ID_FIELD = 'field'
const ID_EMPTY_CELL = 'cell'
const ID_SCORE = 'score'
const ID_PLAY = 'play'
const CLASS_MAIN = 'main'
const PROCENT_OF_SCREEN = 0.8;

export default class Draw{
        #dispatcher;
        #numderOfCells;
        #mainHtml;
        #sizeCell;
        #playHtml;
        #scoreHtml;
        #fieldHtml;
    
    constructor(dispatcher){
        this.#dispatcher = dispatcher;
        this.#numderOfCells = this.#dispatcher.game.menu.getSize();
        this.#mainHtml = document.getElementsByClassName(CLASS_MAIN);
        const widthMain = this.#mainHtml[0].clientWidth*PROCENT_OF_SCREEN;
        this.#sizeCell = Math.round(widthMain/this.#numderOfCells);
        this.#playHtml = document.getElementById(ID_PLAY);
    }

    #drawScore(){
        this.#scoreHtml = document.createElement('div');
        this.#playHtml.append(this.#scoreHtml);
        this.#scoreHtml.classList.add(ID_SCORE); 
        this.#scoreHtml.innerText = `Ваш результат - ${this.#dispatcher.game.score.getScore()}`
    }


    drawField(){
        this.#drawScore();
        this.#fieldHtml = document.createElement('div');
        this.#fieldHtml.classList.add(ID_FIELD);
        this.#playHtml.append(this.#fieldHtml);
        this.#fieldHtml.style.display = 'grid';
        this.#fieldHtml.style.gridTemplate = `repeat(${this.#numderOfCells}, ${this.#sizeCell}px) / repeat(${this.#numderOfCells}, ${this.#sizeCell}px)`
        this.#drawCells();
    }

    #drawCell(coord, className= ID_EMPTY_CELL){
        let cellHtml = document.createElement('div');
        cellHtml.classList.add(className);
        cellHtml.setAttribute('data-row', `${coord[0]}`);
        cellHtml.setAttribute('data-column', `${coord[1]}`);
        this.#fieldHtml.append(cellHtml);
    }

    #drawCells(){
        for (let row = 0; row<this.#numderOfCells;row++){
            for(let column = 0; column<this.#numderOfCells; column++){
                let cell = this.#dispatcher.game.field.getGameObject([row, column])
                if (cell) {    
                    this.#drawCell([row, column], cell.getCLassName())
                }
                else {
                    this.#drawCell([row, column])
                }
            }
        }
    }

    reDrawCells(){
        for (let row = 0; row<this.#numderOfCells;row++){
            for(let column = 0; column<this.#numderOfCells; column++){
                let cell = document.querySelector(`[data-row="${row}"][data-column="${column}"] `)
                let obj = this.#dispatcher.game.field.getGameObject([row,column])
                if (obj){
                    cell.setAttribute('class', obj.getCLassName())
                }
                else {
                    cell.setAttribute('class', ID_EMPTY_CELL)
                }

            }
        }
        this.#scoreHtml.innerText = `Ваш результат - ${this.#dispatcher.game.score.getScore()}`
    }

    drawOff(){
        this.#playHtml.innerHTML = '';
    }
}
