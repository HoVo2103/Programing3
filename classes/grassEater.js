module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 8);
        this.multiply = Math.round(Math.random() * 8);
        this.speed = 8;
    }

    move() {
        var cell = random(super.chooseCell(0));
        if (cell && this.multiply >= this.speed / 4) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = cell[0]; this.y = cell[1];
            matrix[this.y][this.x] = 2;
            this.multiply = 0;
        }
    }

    eat() {
        this.energy--;
        this.multiply++;
        var cell = random(super.chooseCell(1));
        if (cell && this.multiply >= this.speed / 4) {
            this.energy += this.speed;
            matrix[this.y][this.x] = 0;
            this.x = cell[0]; this.y = cell[1];
            matrix[this.y][this.x] = 2;
            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else this.move();
    }

    infected() {
        this.speed /= 2;
        this.energy -= 2;
    }

    mul() {
        var cell = random(super.chooseCell(0));
        if (cell && this.energy >= this.speed) {
            this.energy = 1;
            var newgrasseater = new GrassEater(cell[0], cell[1], 2);
            grassEaterArr.push(newgrasseater);
        }
    }

    die() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}