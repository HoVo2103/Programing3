class Virus extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 10);
        this.speed = 4;
        this.multiply = 2;
        this.emptyORgrass = 0;
        this.cell = [
            random(super.chooseCell(0, 2)),
            random(super.chooseCell(1, 3)),
            random(super.chooseCell(2, 2)),
            random(super.chooseCell(3, 2)),
        ];
    }

    move() {
        var r = Math.round(random(1));
        var cell = this.cell[r];
        if (cell && this.multiply >= this.speed / 2) {
            this.energy--;
            matrix[this.y][this.x] = this.emptyORgrass == 0 ? 0 : 1;
            this.x = cell[0]; this.y = cell[1];
            if (matrix[this.y][this.x] == 0) this.emptyORgrass = 0;
            else if (matrix[this.y][this.x] == 1) this.emptyORgrass = 1;
            matrix[this.y][this.x] = 4;
        }
    }

    infect() {
        this.energy--;
        var r = Math.round(random(2, 3));
        var cell = this.cell[r];

        if (cell && this.multiply >= this.speed / 2) {
            this.energy += this.speed / 2;
            if (r == 2) {              
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == cell[0] && grassEaterArr[i].y == cell[1]) {
                        grassEaterArr[i].infected();
                    }
                }
            }
            else if (r == 3) {
                for (var i in predatorArr) {
                    if (predatorArr[i].x == cell[0] && predatorArr[i].y == cell[1]) {
                        predatorArr[i].infected();
                    }
                }
            }
        }
        else this.move();
    }

    mul() {
        var r = Math.round(random(1));
        var cell = random(super.chooseCell(r));
        if (cell && this.energy >= 3 * this.speed) {
            this.energy = 1;
            var newvirus = new Virus(cell[0], cell[1], 4);
            virusArr.push(newvirus);
        }
    }

    die() {
        if (this.energy <= -(this.speed)) {
            matrix[this.y][this.x] = this.emptyORgrass == 0 ? 0 : 1;
            for (var i in virusArr) {
                if (virusArr[i].x == this.x && virusArr[i].y == this.y) {
                    virusArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}