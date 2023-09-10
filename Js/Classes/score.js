export default class Score {
    #dispatcher;
    #score;

    constructor(dispatcher){
        this.#dispatcher = dispatcher;
        this.#score = 0;
    }

    newScore(){
        this.#score = 0;
    }

    incrementScore(){
        this.#score +=1;
    }

    getScore(){
        return this.#score;
    }

    setScore(){
        let size = this.#dispatcher.game.menu.getSize();
        let storageScore = window.localStorage.getItem(`maxScoreSnake${size}`);
        if (storageScore<this.#score){
            window.localStorage.setItem(`maxScoreSnake${size}`, this.#score)
        }
        this.#score = 0
    }

    getStorageScore(size){
        return window.localStorage.getItem(`maxScoreSnake${size}`)
    }
}