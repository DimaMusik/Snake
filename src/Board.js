import {Elements} from "./Elements.js";

export class Board {
    constructor() {
        this.element = new Elements();
        this.rows = 22;
        this.cols = 22;
        this.itemSize = 20;
        this.matrix = this.makeMatrix
        this.makeDefaultBorder()
        console.table(this.matrix)
        this.walls = [];
    }

    get makeMatrix() {
        return Array.from({length: this.rows}, () =>
            Array.from({length: this.cols}, () => null)
        );
    }

    makeDefaultBorder() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (y === 0 || y === this.rows - 1 || x === 0 || x === this.cols - 1) {
                    this.matrix[y][x] = this.element.index.border
                } else {
                    this.matrix[y][x] = this.element.index.empty
                }
            }
        }
    }

    addSnake(snake) {
        for (const part of snake.body) {
            this.matrix[part.y][part.x] = this.element.index.snakeBody;
        }

        this.matrix[snake.head.y][snake.head.x] = this.element.index.snakeHead;
    }


    isBadWallPosition(position, snake, food) {
        const isSnake = snake.body.some(part =>
            part.x === position.x && part.y === position.y
        );

        const isFood =
            food.position.x === position.x &&
            food.position.y === position.y;

        const isWall = this.walls.some(wall =>
            wall.x === position.x && wall.y === position.y
        );

        return isSnake || isFood || isWall;
    }

    addRandomWall(snake, food) {
        let wall;

        do {
            wall = {
                x: Math.floor(Math.random() * (this.cols - 2)) + 1,
                y: Math.floor(Math.random() * (this.rows - 2)) + 1,
            };
        } while (this.isBadWallPosition(wall, snake, food));

        this.walls.push(wall);
        this.matrix[wall.y][wall.x] = this.element.index.border;
    }

    clearWalls() {
        for (const wall of this.walls) {
            this.matrix[wall.y][wall.x] = this.element.index.empty;
        }

        this.walls = [];
    }
}