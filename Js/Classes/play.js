let flag = 'up'


export default class Play {
    #dispatcher;
    #intervalStop;

    constructor(dispatcher){
        this.#dispatcher = dispatcher;
        document.addEventListener('keydown', this.#KeyPressed.bind(this));
    }

    run(){
        flag = 'up';
        this.#intervalStop = setInterval(this.#steps.bind(this), 500, this.#dispatcher)
    }
   
    stopPlay(){
        flag = 'stop';
        clearInterval(this.#intervalStop);
        document.removeEventListener('keydown', this.#KeyPressed.bind(this));
        this.#dispatcher.game.score.setScore();
        this.#dispatcher.game.draw.drawOff();
        this.#dispatcher.getMenu();
    }

    #KeyPressed(k) {
        switch(k.keyCode){
            case 39 :
                if (flag!='left'){
                flag = 'right'};
                break;
            case 40 :
                if (flag !='up'){
                flag = 'down'};
                break;
            case 37 :
                if(flag!='right'){
                flag = 'left'};
                break;
            case 38 :
                if(flag!='down'){
                flag = 'up'};
                break;
            case 27 :
                flag = 'stop';
                break;
        }
    }   

    #step(dispatcher){
        let coordSnbake = dispatcher.game.snake.getCoordStart();
        let newCoord = [];
        let numberOfCells = dispatcher.game.menu.getSize();
        switch(flag){
            case 'up': 
                newCoord[0] = (coordSnbake[0]-1)<0?numberOfCells-1:coordSnbake[0]-1;
                newCoord[1] = coordSnbake[1]
                break;
            case 'down': 
                newCoord[0] = (coordSnbake[0]+1>numberOfCells-1)?0:coordSnbake[0]+1;
                newCoord[1] = coordSnbake[1]
                break;
            case 'right':
                newCoord[1] = (coordSnbake[1]+1)>numberOfCells-1?0:coordSnbake[1]+1;
                newCoord[0] = coordSnbake[0]
                break;
            case 'left': 
                newCoord[1] = (coordSnbake[1]-1)<0?numberOfCells-1:coordSnbake[1]-1;
                newCoord[0] = coordSnbake[0]
            break;
        }
        let gameObj = dispatcher.game.field.getGameObject(newCoord);
        if (gameObj){
            gameObj.act(newCoord)
        }
        else {
            dispatcher.game.snake.stepNull(newCoord)
        }
    }

    #steps(dispatcher){
        if (flag == 'stop'){
            dispatcher.game.play.stopPlay();
        };
        if (flag !='stop'){
            this.#step(dispatcher)
        };
        if (flag != 'stop'){
        dispatcher.game.draw.reDrawCells();
        }
    }
}
