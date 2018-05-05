class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy;
        this.multiply;
        this.speed;
        this.directions = [];
    }

    chooseCell(ch, q = 0) {
        this.getNewCoordinates(q);
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getNewCoordinates(q) {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

        if (q > 1 && Number.isInteger(q)) {
            while (q > 1) {
                this.directions.push([this.x - q, this.y - q]);
                this.directions.push([this.x, this.y - q]);
                this.directions.push([this.x + q, this.y - q]);
                this.directions.push([this.x - q, this.y]);
                this.directions.push([this.x + q, this.y]);
                this.directions.push([this.x - q, this.y + q]);
                this.directions.push([this.x, this.y + q]);
                this.directions.push([this.x + q, this.y + q]);

                q--;
            }
        }
    }
}
