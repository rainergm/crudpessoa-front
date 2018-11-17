import { Telefone } from 'src/app/pessoa/telefone';

export class Pessoa {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: Date;
    telefones: Telefone[];
}
