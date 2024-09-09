import { Especies } from './enums/especies.js';
import{ Leao, Leopardo, Crocodilo, Macaco, Gazela, Hipopotamo } from './objects/animais.js';
import{ recinto1, recinto2, recinto3, recinto4, recinto5 } from './objects/recinto.js';

class RecintosZoo {
    // declarando erro na classe para guardar qualquer possivel erro
    erro;

    // criando uma lista com os recintos declarados manualmente para ser mais facil iterar sobre
    recintos = [recinto1, recinto2, recinto3, recinto4, recinto5];

    // verifica se o animal fornecido é um dos animais permitidos
    // e retorna um objeto equivalente ao animal fornecido caso ele seja valido
    // caso contrario lanca um erro
    verifAnimal(animal) {
        // transforma o valor dado em uma string para evitar erros inesperados
        animal = (animal + '').toLowerCase();

        switch(animal) {
            case 'leao':
                return new Leao();
                break;
            
            case 'leopardo':
                return new Leopardo();
                break;

            case 'crocodilo':
                return new Crocodilo();
                break;

            case 'macaco':
                return new Macaco();
                break;

            case 'gazela':
                return new Gazela();
                break;
            
            case 'hipopotamo':
                return new Hipopotamo();
                break;
        
            default:
                // caso nao exista outro erro previo, lanca este erro
                if(this.erro === undefined) {
                    this.erro = 'Animal inválido';
                }
                return 'Animal não definido';
                break;
        }
    }

    // acha recintos viaveis para os animais e a quantidade informadas
    // possivelmente poderia ser quebrado em tres metodos diferentes, mas achei mais pratico desta maneira
    achaRecintos(animal, quantidade) {
        let recintosViaveis = [];
        // verifica recintos com espaco disponivel
        let tamaAnimais = animal.tamanho * quantidade;  
        this.recintos.forEach(r => {
            // caso exista especies diferentes, considera o recinto como tendo um espaco ocupado
            if(r.diferentesEspe(animal)) {
                tamaAnimais <= r.calculaEspacoLivre() - 1 ? recintosViaveis.push(r) : null;
            } else {
                tamaAnimais <= r.calculaEspacoLivre() ? recintosViaveis.push(r) : null;
            }
        });

        // verifica e remove recintos com biomas nao compativeis
        let bioNaoCompat = []
        recintosViaveis.forEach(r => r.verifBioma(animal) ? null : bioNaoCompat.push(r));
        bioNaoCompat.forEach(r => recintosViaveis.splice(recintosViaveis.indexOf(r), 1));

        // verifica e remove recintos com animais nao compativeis
        let aniNaoCompat = [];
        recintosViaveis.forEach(r => r.verifAnimais(animal) ? null : aniNaoCompat.push(r));
        aniNaoCompat.forEach(r => recintosViaveis.splice(recintosViaveis.indexOf(r), 1));

        // caso nao tenha erro previo e nenhum recinto tenha sido encontrado, lanca este erro
        if(this.erro === undefined && recintosViaveis.length === 0) {
            this.erro = 'Não há recinto viável';
        }

        return recintosViaveis;
    }

    analisaRecintos(animal, quantidade) {
        // verifica se a quantidade de animais e valida
        if(quantidade <= 0) {
            this.erro = 'Quantidade inválida';
        }
        // os recintos vaveis para o aninal
        let recintos = [];
        // transformando o parametro 'animal' em um objeto da classe 'animal
        let objAnimal = this.verifAnimal(animal);
        // encontrando recintos compativeis com este animal e quantidade
        recintos = this.achaRecintos(objAnimal, quantidade);

        // se o animal for um macaco, remove recintos em que ele fica sozinho
        if(objAnimal.especie === Especies.MACACO){
            let recintosSozinho = [];
            recintos.forEach(r => r.verifSozinho(quantidade) ? recintosSozinho.push(r) : null);
            recintosSozinho.forEach(r => recintos.splice(recintos.indexOf(r), 1));
        }

        // se o animal for um hipopotamo, remove recintos que nao tem rio e savana e nao estao ocupados
        if(objAnimal.especie === Especies.HIPOPOTAMO) {
            let recintosOcupados = [];
            // dentro do forEach verifica se o recinto nao tem bioma de rio e savana e se ele esta ocupado
            recintos.forEach(r => (!(r.verifRioSavana()) && !(r.verifSozinho(1)) ? recintosOcupados.push(r) : null));
            recintosOcupados.forEach(r => recintos.splice(recintos.indexOf(r), 1));
        }

        // a lista de strings que vai ser retornada 
        let recintosString = [];

        recintos.forEach(r => {
            let espacoLivre = r.calculaEspacoLivre() - (objAnimal.tamanho * quantidade);

            // verifica se tem outra especie dentro do recinto e remove um espaco livre
            if(r.diferentesEspe(objAnimal) && r.animaisExistentes.length != 0) {
                espacoLivre -= 1;
            }
            // formatacao da string a ser retornada
            let formatedString = `Recinto ${r.id} (espaço livre: ${espacoLivre} total: ${r.tamanhoTotal})`;
            recintosString.push(formatedString);
        })

        // caso nao tenha nehum erro no codigo, retorna os recintos viaveis
        //caso contrario, retorna o erro que ocorreu durante o codigo
        if(this.erro === undefined) {
            return {
                recintosViaveis: recintosString
            };        
        } else {
            return {
                erro: this.erro
            }
        }
        
    }

}

export { RecintosZoo as RecintosZoo };
