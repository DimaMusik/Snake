export class Portal {
    constructor() {
        this.items = [
            {x: null, y: null},
            {x: null, y: null},
        ];
    }

    makeNewPositions(board, snake, food) {
        const first = this.makeOnePosition(board, snake, food, []);
        const second = this.makeOnePosition(board, snake, food, [first]);

        this.items = [first, second];
    }

    makeOnePosition(board, snake, food, portals) {
        let position;

        do {
            position = {
                x: Math.floor(Math.random() * (board.cols - 2)) + 1,
                y: Math.floor(Math.random() * (board.rows - 2)) + 1,
            };
        } while (this.isBadGeneration(position, board, snake, food, portals));

        return position;
    }

    isBadGeneration(position, board, snake, food, portals) {
        const isBorderOrWall =
            board.matrix[position.y][position.x] === board.element.index.border;

        const isSnake = snake.body.some(part =>
            part.x === position.x && part.y === position.y
        );

        const isFood =
            food.position.x === position.x &&
            food.position.y === position.y;

        const isPortal = portals.some(portal =>
            portal.x === position.x && portal.y === position.y
        );

        return isBorderOrWall || isSnake || isFood || isPortal;
    }
}
