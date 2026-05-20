const {Application, Container} = PIXI;

import {Board} from './Board.js';
import {Render} from './Render.js';
import {Snake} from './Snake.js';
import {Food} from './Food.js';
import {Portal} from './Portal.js';


export class Game {
    constructor() {
        this.app = new Application();
        this.container = new Container();
        this.rootContainer = document.getElementById('game-field');

        //Class
        this.board = new Board();
        this.snake = new Snake(this.board);
        this.food = new Food(this.board, this.snake);

        this.portals = new Portal();

        this.board.addSnake(this.snake);

        this.render = new Render(this.board, this.snake, this.container);

        this.timer = 0;
        this.baseSpeed = 200;
        this.speed = this.baseSpeed;

        //state Game
        this.isPlaying = false;
        this.isMenuOpen = true;

        //Score
        this.score = 0;
        this.bestScore = 0;


        // GUI
        this.gui = {
            score: {
                current: document.getElementById('current-score'),
                best: document.getElementById('best-score'),
            },
            buttons: {
                play: document.getElementById('play-button'),
                menu: document.getElementById('menu-button'),
                exit: document.getElementById('exit-button'),
            },

        };

        this.gui.modes = document.querySelector('.modes')

        this.mode = 'classic';

        this.modeList = {
            classic: {
                canDie: true,
                wrapWalls: false,
            },
            god: {
                canDie: false,
                wrapWalls: true,
            },
            walls: {
                canDie: true,
                wrapWalls: false,
            },
            portal: {
                canDie: true,
                wrapWalls: false,
            },
            speed: {
                canDie: true,
                wrapWalls: false,
            },
        };
    }

    async initGame() {
        await this.app.init({
            background: '#333333',
            width: this.board.cols * this.board.itemSize,
            height: this.board.rows * this.board.itemSize,
        });

        this.rootContainer.appendChild(this.app.canvas);

        this.app.stage.addChild(this.container);

        this.bindButtons();
        this.bindControls();

        this.render.drawBoard();

        this.app.ticker.add((ticker) => {
            if (!this.isPlaying) return;

            this.timer += ticker.deltaMS;

            if (this.timer < this.speed) return;

            this.timer = 0;

            this.snake.move();
            if (this.mode === 'portal') {
                this.teleportSnake();
            }

            const modeRules = this.modeList[this.mode];

            if (modeRules.wrapWalls) {
                this.wrapSnake();
            }

            if (modeRules.canDie && this.snake.snakeDied) {
                this.isPlaying = false;
                this.resetGame();
                this.showMenu();
                return;
            }

            if (this.mode !== 'portal' && this.isFoodEaten()) {
                this.snake.grow();
                this.food.makeNewPosition();
                this.addScore();

                if (this.mode === 'walls') {
                    this.board.addRandomWall(this.snake, this.food);
                    this.render.drawWalls();
                }

                if (this.mode === 'speed') {
                    this.speed *= 0.9;
                }

                this.render.drawFood(this.food);
            }

            this.render.drawSnake();

        });

    }


    updateScoreView() {
        this.gui.score.current.textContent = this.score;
        this.gui.score.best.textContent = this.bestScore;
    }

    bindButtons() {
        this.gui.buttons.play.addEventListener('click', () => {
            this.mode = this.getSelectedMode();

            if (this.mode !== 'walls') {
                this.board.clearWalls();
            }


            if (this.mode === 'portal') {
                this.portals.makeNewPositions(this.board, this.snake, this.food);
                this.render.drawPortals(this.portals);
            } else {
                this.render.drawFood(this.food);
            }

            this.gui.modes.style.opacity = '0';
            this.gui.modes.style.pointerEvents = 'none';

            this.isPlaying = true;

            this.render.drawWalls();
            this.render.drawSnake();

            this.gui.buttons.play.hidden = true;
            this.gui.buttons.menu.hidden = false;
            this.gui.buttons.exit.hidden = true;
        });

        this.gui.buttons.menu.addEventListener('click', () => {
            this.gui.modes.style.opacity = '1';
            this.gui.modes.style.pointerEvents = 'auto';


            this.isPlaying = false;
            this.render.clearObjects();

            this.gui.buttons.play.hidden = false;
            this.gui.buttons.menu.hidden = true;
            this.gui.buttons.exit.hidden = false;
        });

        this.gui.buttons.exit.addEventListener('click', () => {

            this.gui.modes.style.opacity = '1';
            this.gui.modes.style.pointerEvents = 'auto';


            this.isPlaying = false;
            this.resetGame();

            this.gui.buttons.play.hidden = false;
            this.gui.buttons.menu.hidden = true;
            this.gui.buttons.exit.hidden = false;
        });
    }

    getSelectedMode() {
        return document.querySelector('input[name="mode"]:checked').value;
    }

    bindControls() {
        window.addEventListener('keydown', (event) => {
            const directions = {
                ArrowUp: {x: 0, y: -1},
                KeyW: {x: 0, y: -1},
                ArrowDown: {x: 0, y: 1},
                KeyS: {x: 0, y: 1},
                ArrowLeft: {x: -1, y: 0},
                KeyA: {x: -1, y: 0},
                ArrowRight: {x: 1, y: 0},
                KeyD: {x: 1, y: 0},
            };

            const direction = directions[event.code];

            if (!direction) return;

            event.preventDefault();
            this.snake.setDirection(direction);
        });
    }

    isFoodEaten() {
        return (
            this.snake.head.x === this.food.position.x &&
            this.snake.head.y === this.food.position.y
        );
    }

    addScore() {
        this.score += 1;

        if (this.score > this.bestScore) {
            this.bestScore = this.score;
        }

        this.updateScoreView();
    }

    resetGame() {

        this.speed = this.baseSpeed;

        this.board.clearWalls();
        this.snake.body = [
            {x: 3, y: 1},
            {x: 2, y: 1},
            {x: 1, y: 1},
        ];

        this.snake.direction = {x: 0, y: 0};
        this.snake.directionQueue = [];

        this.timer = 0;
        this.score = 0;

        this.food.makeNewPosition();
        this.updateScoreView();
        this.render.clearObjects();
    }

    showMenu() {
        this.gui.modes.style.opacity = '1';
        this.gui.modes.style.pointerEvents = 'auto';

        this.gui.buttons.play.hidden = false;
        this.gui.buttons.menu.hidden = true;
        this.gui.buttons.exit.hidden = false;
    }

    wrapSnake() {
        if (this.snake.head.x <= 0) {
            this.snake.head.x = this.board.cols - 2;
        }

        if (this.snake.head.x >= this.board.cols - 1) {
            this.snake.head.x = 1;
        }

        if (this.snake.head.y <= 0) {
            this.snake.head.y = this.board.rows - 2;
        }

        if (this.snake.head.y >= this.board.rows - 1) {
            this.snake.head.y = 1;
        }
    }

    teleportSnake() {
        const [first, second] = this.portals.items;

        if (this.snake.head.x === first.x && this.snake.head.y === first.y) {
            this.snake.head.x = second.x;
            this.snake.head.y = second.y;
            this.snake.grow();
            this.addScore();
            this.portals.makeNewPositions(this.board, this.snake, this.food);
            this.render.drawPortals(this.portals);
        } else if (this.snake.head.x === second.x && this.snake.head.y === second.y) {
            this.snake.head.x = first.x;
            this.snake.head.y = first.y;
            this.snake.grow();
            this.addScore();
            this.portals.makeNewPositions(this.board, this.snake, this.food);
            this.render.drawPortals(this.portals);
        }
    }

}
