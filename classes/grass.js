class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = Math.round(Math.random() * 8);
        this.speed = 8;
    }
    
    mul() {
        this.multiply++;
        var newCell = random(super.chooseCell(0));
        if(this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0],newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
        }
    }
}

