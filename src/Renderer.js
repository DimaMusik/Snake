import { Graphics } from 'pixi.js';

export class Renderer {
    constructor(app, board) {
        this.app = app;
        this.board = board;

        this.graphics = new Graphics();
        this.palette = {
            [this.board.cells.empty]: '#ffffff',
            [this.board.cells.snake]: '#333333',
            [this.board.cells.head]: '#777000',
            [this.board.cells.apple]: '#000777',
        };

        this.app.stage.addChild(this.graphics);
    }

    render() {
        this.graphics.clear();

        this.drawMatrix();
    }

    drawMatrix() {
        for (let y = 0; y < this.board.rows; y++) {
            for (let x = 0; x < this.board.cols; x++) {
                this.drawCell(x, y, this.board.matrix[y][x]);
            }
        }
    }

    drawCell(x, y, value) {
        const size = this.board.cellSize;
        const pixelX = x * size;
        const pixelY = y * size;

        this.graphics.rect(pixelX, pixelY, size, size);
        this.graphics.fill(this.palette[value]);

        this.graphics.rect(pixelX, pixelY, size, size);
    }
}
