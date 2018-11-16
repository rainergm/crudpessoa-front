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

  }

  getPessoasFiltradas(){
    
    this.pessoaService.getPessoasFiltradas(this.nome, this.cpf).subscribe((pessoas: Pessoa[])=>{
      this.pessoas = pessoas;
    });
  }

  removerPessoa(id: number, index: number){
    this.pessoaService.removerPessoa(id).subscribe(() => {
     // this.pessoas.splice(index);
      alert('Registro removido com sucesso');
    });
  }
}
