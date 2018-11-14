import { Telefone } from "src/app/model/telefone";


export interface Pessoa{
    id: number,
    nome: string,
    email: string,
    dataNascimento: Date,
    telefones: Telefone[]
}