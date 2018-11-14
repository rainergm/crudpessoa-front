import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/model/pessoa';
import { Telefone } from 'src/app/model/telefone';
import { PessoaService } from 'src/app/service/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {

  nome: string = '';
  cpf: string = '';
  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
 
    this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[])=>{
      this.pessoas = pessoas;
    });

    //PEssoa 1
   /*  let pessoa1 = {} as Pessoa;
    pessoa1.id = 1;
    pessoa1.nome = 'Rainer Gondim';
    pessoa1.dataNascimento = new Date();
    pessoa1.email = 'rainer.gondim@gmail.com';

    let tel1 = {} as Telefone;
    tel1.id = 1;
    tel1.ddd = 85;
    tel1.numero = 97335863;
    
    let tel2 = {} as Telefone;
    tel2.id = 2;
    tel2.ddd = 85;
    tel2.numero = 96666666; 

    pessoa1.telefones = [];
    pessoa1.telefones.push(tel1);
    pessoa1.telefones.push(tel2);

    //PEssoa 2
    let pessoa2 = {} as Pessoa;
    pessoa2.id = 2;
    pessoa2.nome = 'Joanelson Rodrigues';
    pessoa2.dataNascimento = new Date();
    pessoa2.email = 'rainer.gondim@gmail.com';

    let tel3 = {} as Telefone;
    tel3.id = 3;
    tel3.ddd = 85;
    tel3.numero = 99876655;
    
    let tel4 = {} as Telefone;
    tel4.id = 4;
    tel4.ddd = 85;
    tel4.numero = 90897733; 
    
    pessoa2.telefones = [];
    pessoa2.telefones.push(tel3);
    pessoa2.telefones.push(tel4);

    this.pessoas.push(pessoa1);
    this.pessoas.push(pessoa2);

    console.log(this.pessoas) */
  }

  getPessoasFiltradas(){
    
    this.pessoaService.getPessoasFiltradas(this.nome, this.cpf).subscribe((pessoas: Pessoa[])=>{
      this.pessoas = pessoas;
    });
  }
}
