import { Application } from 'pixi.js';
import { Board } from './Board.js';
import { Snake } from './Snake.js';
import { Apple } from './Apple.js';
import { Renderer } from './Renderer.js';

export class Game {
    constructor() {
        this.app = new Application();

        this.board = new Board();
        this.snake = new Snake();
        this.apple = new Apple();
        this.renderer = null;

        this.score = 0;

        this.moveDelay = 120;
        this.moveTimer = 0;

        this.isStarted = false;
        this.isGameOver = false;

        this.rootElement = document.getElementById('main');
    }

    async init() {

        await this.app.init({
            width: this.board.width,
            height: this.board.height,
            antialias: false,
        });
       this.rootElement.appendChild(this.app.canvas)
    }

    gameOver() {

    }

    restart() {

    }

    addControls() {
        window.addEventListener('keydown', (event) => {
            const directions = {
                ArrowUp: { x: 0, y: -1 },
                ArrowDown: { x: 0, y: 1 },
                ArrowLeft: { x: -1, y: 0 },
                ArrowRight: { x: 1, y: 0 },
            };
        });
    }

}
