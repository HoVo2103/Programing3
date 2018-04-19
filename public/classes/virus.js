class Virus extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 20);
        this.speed = 8;
        this.multiply = Math.round(Math.random() * 20);
        this.emptyORgrass = 0;

        this.cell = [
            random(super.chooseCell(0)),
            random(super.chooseCell(1)),
            random(super.chooseCell(2)),
            random(super.chooseCell(3))
        ];
    }

    move() {
        var r = Math.round(random(3));
        var cell = this.cell[r];

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

    infect() {
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