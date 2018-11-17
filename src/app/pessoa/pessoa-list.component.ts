import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/pessoa/pessoa';
import { PessoaService } from 'src/app/pessoa/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {

  nome: string;
  cpf: string;
  pessoas: Pessoa[] = [];
  mensagem: string;
  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {

    this.nome = '';
    this.cpf = '';

    this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[]) => {
      this.pessoas = pessoas;
    });

  }

  getPessoasFiltradas() {

    this.pessoaService.getPessoasFiltradas(this.nome, this.cpf).subscribe((pessoas: Pessoa[]) => {
      this.pessoas = pessoas;
    });
  }

  removerPessoa(pessoaRemove: Pessoa, index: number) {
    this.pessoaService.removerPessoa(pessoaRemove.id).subscribe(() => {
      this.pessoas.splice(index, 1);
      this.mensagem = 'Registro removido com sucesso.';
//      alert('Registro removido com sucesso');
    });
  }
}
