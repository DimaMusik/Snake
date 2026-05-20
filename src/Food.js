export class Food {
    constructor(board, snake) {
        this.board = board;
        this.snake = snake;

        this.position = {
            x: null,
            y: null,
        };

        this.makeNewPosition();
    }

    makeNewPosition() {
        let position;

        do {
            position = {
                x: Math.floor(Math.random() * (this.board.cols - 2)) + 1,
                y: Math.floor(Math.random() * (this.board.rows - 2)) + 1,
            };
        } while (this.isBadGeneration(position));

        this.position = position;
    }

    isBadGeneration(position) {
        const isBorderOrWall =
            this.board.matrix[position.y][position.x] === this.board.element.index.border;

        const isSnake = this.snake.body.some(part =>
            part.x === position.x && part.y === position.y
        );

        return isBorderOrWall || isSnake;
    }
}
