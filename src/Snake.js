export class Snake {
    constructor(board) {
        this.board = board;

        this.body = [
            {x: 3, y: 1},
            {x: 2, y: 1},
            {x: 1, y: 1},
        ];
        this.direction = {x: 0, y: 0};
        this.directionQueue = [];
    }

    get head() {
        return this.body[0];
    }


    setDirection(direction) {
        const lastDirection = this.directionQueue.length > 0
            ? this.directionQueue[this.directionQueue.length - 1]
            : this.direction;

        const isOppositeDirection =
            direction.x + lastDirection.x === 0 &&
            direction.y + lastDirection.y === 0;

        if (isOppositeDirection) return;

        this.directionQueue.push(direction);
    }

    move() {
        const next = this.directionQueue.shift();

        if (next) {
            this.direction = next;
        }

        if (this.direction.x === 0 && this.direction.y === 0) return;

        const newHead = {
            x: this.head.x + this.direction.x,
            y: this.head.y + this.direction.y,
        };

        this.body.unshift(newHead);
        this.lastTail = this.body.pop();
    }

    grow() {
        this.body.push(this.lastTail);
    }

    get snakeDied() {
        const isBorder =
            this.board.matrix[this.head.y][this.head.x] === this.board.element.index.border;

        const isSelf = this.body.slice(1).some(part =>
            part.x === this.head.x && part.y === this.head.y
        );

        return isBorder || isSelf;
    }


}

