export class Board {
    constructor() {
        this.cols = 20;
        this.rows = 20;
        this.cellSize = 30;

        this.width = this.cols * this.cellSize;
        this.height = this.rows * this.cellSize;

        this.cells = {
            empty: 0,
            snake: 1,
            head: 2,
            apple: 3,
        };

        this.matrix = this.createMatrix();
    }

    createMatrix() {
        return Array.from({ length: this.rows }, () => {
            return Array(this.cols).fill(this.cells.empty);
        });
    }
    clear() {
        for (let y = 0; y < this.rows; y++) {
            this.matrix[y].fill(this.cells.empty);
        }
    }
}
