class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 16);
        this.speed = 24;
        this.multiply = Math.round(Math.random() * 16);
        this.emptyORgrass = 0;
    }

    move() {
        var cell0 = random(super.chooseCell(0));
        var cell1 = random(super.chooseCell(1));
        var r = Math.round(random(1));
        var cell = r == 0 ? cell0 : cell1;

        if (cell && this.multiply >= this.speed / 2) {
            this.energy--;
            matrix[this.y][this.x] = this.emptyORgrass == 0 ? 0 : 1;
            this.x = cell[0]; this.y = cell[1];
            if (matrix[this.y][this.x] == 0) {
                matrix[this.y][this.x] = 3;
                this.emptyORgrass = 0;
            }
            else if (matrix[this.y][this.x] == 1) {
                matrix[this.y][this.x] = 3;
                this.emptyORgrass = 1;
            }
        }
    }

    eat() {
        this.energy--;
        var cell = random(super.chooseCell(2));
        if (cell && this.multiply >= this.speed / 2) {
            this.energy += this.speed / 2;
            matrix[this.y][this.x] = 0;
            this.x = cell[0]; this.y = cell[1];
            matrix[this.y][this.x] = 3;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1);
                    break;
                }
            }
        }
        else this.move();
    }

    mul() {
        var cell = random(super.chooseCell(0));
        if (cell && this.energy >= this.speed) {
            this.energy = 1;
            var newpredator = new Predator(cell[0], cell[1], 3);
            gishatichArr.push(newpredator);
        }
    }

    die() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = this.emptyORgrass == 0 ? 0 : 1;
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}