const {Graphics} = PIXI;

export class Render {
    constructor(board, snake, container) {

        this.board = board;
        this.snake = snake;
        this.container = container;

        this.boardGraphics = new Graphics();
        this.snakeGraphics = new Graphics();
        this.foodGraphics = new Graphics();
        this.wallGraphics = new Graphics();
        this.portalGraphics = new Graphics();

        this.container.addChild(this.boardGraphics);
        this.container.addChild(this.wallGraphics);
        this.container.addChild(this.portalGraphics);
        this.container.addChild(this.foodGraphics);
        this.container.addChild(this.snakeGraphics);
    }


    drawWalls() {
        const size = this.board.itemSize;

        this.wallGraphics.clear();

        for (const wall of this.board.walls) {
            this.wallGraphics
                .rect(wall.x * size, wall.y * size, size, size)
                .fill('#777777');
        }
    }

    drawBoard() {
        const size = this.board.itemSize;

        for (let y = 0; y < this.board.rows; y++) {
            for (let x = 0; x < this.board.cols; x++) {
                const isBorder =
                    y === 0 ||
                    y === this.board.rows - 1 ||
                    x === 0 ||
                    x === this.board.cols - 1;

                this.boardGraphics
                    .rect(x * size, y * size, size, size)
                    .fill(isBorder ? this.board.element.color.border : this.board.element.color.empty);
            }
        }
    }

    drawSnake() {
        const size = this.board.itemSize;

        this.snakeGraphics.clear();

        for (const part of this.snake.body) {
            this.snakeGraphics
                .rect(part.x * size, part.y * size, size, size)
                .fill(this.board.element.color.snakeBody);
        }

        this.snakeGraphics
            .rect(this.snake.head.x * size, this.snake.head.y * size, size, size)
            .fill(this.board.element.color.snakeHead);
    }

    drawFood(food) {
        const size = this.board.itemSize;

        this.foodGraphics.clear();

        this.foodGraphics
            .rect(food.position.x * size, food.position.y * size, size, size)
            .fill(this.board.element.color.apple);
    }


    clearObjects() {
        this.foodGraphics.clear();
        this.snakeGraphics.clear();
        this.wallGraphics.clear();
        this.portalGraphics.clear();
    }


    drawPortals(portals) {
        const size = this.board.itemSize;

        this.portalGraphics.clear();

        for (const portal of portals.items) {
            this.portalGraphics
                .rect(portal.x * size, portal.y * size, size, size)
                .fill(this.board.element.color.portal);
        }
    }
}
