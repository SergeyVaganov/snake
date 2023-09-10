import { AppleCell } from "./cells.js";

export default class Apple{
    #dispatcher;

    constructor(dispatcher){
        this.#dispatcher = dispatcher;
        let coord = this.#dispatcher.game.field.getEmptyCoord();
        let appleCell = new AppleCell(coord[0], coord[1], this.#dispatcher);
        this.#dispatcher.game.field.addGameObject(appleCell, coord);
    }
}
