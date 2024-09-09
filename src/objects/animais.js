import { Biomas } from "../enums/biomas.js";
import { Especies } from "../enums/especies.js";

export {
    Animal as Animal,
    Leao as Leao,
    Leopardo as Leopardo,
    Crocodilo as Crocodilo,
    Macaco as Macaco,
    Gazela as Gazela,
    Hipopotamo as Hipopotamo
}

class Animal {
    especie;
    biomas;
    isCarnivoro;
    tamanho;

    constructor(especie, biomas, isCarnivoro, tamanho) {
        this.especie = especie;
        this.biomas = biomas;
        this.isCarnivoro = isCarnivoro;
        this.tamanho = tamanho;
    }
}

// declaracoes manuais dos animais estabelicidos no README

class Leao extends Animal {
    constructor() {
        super(Especies.LEAO, [Biomas.SAVANA], true, 3);
    }
}

class Leopardo extends Animal {
    constructor() {
        super(Especies.LEOPARDO, [Biomas.SAVANA], true, 2);
    }
}

class Crocodilo extends Animal {
    constructor() {
        super(Especies.CROCODILO, [Biomas.RIO], true, 3);
    }
}

class Macaco extends Animal {
    constructor() {
        super(Especies.MACACO, [Biomas.SAVANA, Biomas.FLORESTA], false, 1);
    }
}

class Gazela extends Animal {
    constructor() {
        super(Especies.GAZELA, [Biomas.SAVANA], false, 2);
    }
}

class Hipopotamo extends Animal {
    constructor() {
        super(Especies.HIPOPOTAMO, [Biomas.SAVANA, Biomas.RIO], false, 4);
    }

}
