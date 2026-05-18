export class Snake {
    constructor() {

        this.reset();
    }

    reset() {
        this.body = [
            { x: 1, y: 1, index : 2, },
            { x: 2, y: 1, index : 2, },
            { x: 3, y: 1, index : 2, },
        ];

        this.direction = { x: 0, y: 0 };
        this.nextDirection = { x: 0, y: 0 };
    }


    move() {

    }

    isEatSomeone() {

}
    isEatBorder() {

    }
    isEatApple(applePosition) {

    }
}
