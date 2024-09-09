import{ Leao, Leopardo, Crocodilo, Macaco, Gazela, Hipopotamo} from './animais.js';
import { Biomas } from '../enums/biomas.js';

export{
    recinto1 as recinto1,
    recinto2 as recinto2,
    recinto3 as recinto3,
    recinto4 as recinto4,
    recinto5 as recinto5,
    
}

class Recinto {
    id;
    biomas;
    tamanhoTotal;
    animaisExistentes;

    constructor(id, biomas, tamanhoTotal, animaisExistentes) {
        this.id = id;
        this.biomas = biomas;
        this.tamanhoTotal = tamanhoTotal;
        this.animaisExistentes = animaisExistentes;
    }

    // calcula o espaco livre no recinto calculando o espaco ocupado por todos os animais existentes
    // retorna o espaco livre em forma de number
    calculaEspacoLivre() {
        let tamaOcupado = 0;
        this.animaisExistentes.forEach(ani => tamaOcupado += ani.tamanho);
        return this.tamanhoTotal - tamaOcupado;
    }

    // verifica se os animais podem ser colocados no recinto com esse bioma
    // como um recinto pode ter mais de um bioma, a lista de biomas e percorrida em um for each
    // se um dos biomas do recinto é compativel, entao o animal pode ser colocado no bioma
    // retorna true se compativel e false se nao for compativel
    verifBioma(animal) {
        let biomaCompat = false;
        let biomasAni = animal.biomas;
        this.biomas.forEach(b => biomasAni.includes(b) ? biomaCompat = true : null);
        return biomaCompat;
    }

    // verifica se existe um animal de outra especie presente no recinto
    // caso exista um animal de outra especie, retorna true
    // caso nao exista um animal de especie diferente, ou o recinto esteja vazio, retorna false
    diferentesEspe(animal) {
        let espeDiferente = true;
        this.animaisExistentes.length === 0 ? espeDiferente = false : null;
        this.animaisExistentes.forEach(a => a.especie === animal.especie ? espeDiferente = false : null);

        return espeDiferente;
    }

    // verifica se os animais podem ser colocados no mesmo recinto com base em especie e se o animal e carnivoro
    // percorre todos os animais ja existentes no recinto e verifica se eles sao da mesma especie ou
    // se algum deles e carinivoro, caso eles sejam da mesma especie ou nenhum seja carnivoro, retorna true
    // caso eles sejam de especies diferentes e algum deles seja carnivoro, retorna false
    verifAnimais(animal) {
        let aniCompat = false;
        let temCarn = false;
        let mesmaEspe = false;
        // verificacao se tem carnivoro no  recinto
        this.animaisExistentes.forEach(a => a.isCarnivoro ? temCarn = true : null);
        // verificacao se os animais a sereme adicionados e os ja existentes sao da mesma especie
        this.animaisExistentes.forEach(a => a.especie === animal.especie ? mesmaEspe = true : null);
        // se sao carnivoros e da mesma especie retorna true
        if(temCarn && mesmaEspe) {
            aniCompat = true;
                // se nao tem carnivoro no recinto e o a ser adicionado nao e carnivoro retorna true
        } else if(!(temCarn) && !(animal.isCarnivoro)) {
                    aniCompat = true;
                    // se nao tem animal no recinto, retorna true
            } else if(this.animaisExistentes.length === 0) {
                aniCompat = true;
            }

        return aniCompat;
    }

    // verifica se o animal a ser adicionado vai estar sozinho no recinto
    verifSozinho(quantidade) {
        return !(quantidade >= 2 || this.animaisExistentes.length >= 1);
    }

    // vetifica se o recinto tem savana e rio
    verifRioSavana() {
        return (this.biomas.includes(Biomas.SAVANA) && this.biomas.includes(Biomas.RIO));
    }
}

// declaracao dos recintos que atualmente existem
// como no README nao se fala nada sobre um banco de dados para guardar as informacoes
// as declaracoes de objetos serao manuais

let recinto1 = new Recinto(1, [Biomas.SAVANA], 10, [new Macaco(), new Macaco(), new Macaco()]);
let recinto2 = new Recinto(2, [Biomas.FLORESTA], 5, []);
let recinto3 = new Recinto(3, [Biomas.SAVANA, Biomas.RIO], 7, [new Gazela()]);
let recinto4 = new Recinto(4, [Biomas.RIO], 8, []);
let recinto5 = new Recinto(5, [Biomas.SAVANA], 9, [new Leao()]);

