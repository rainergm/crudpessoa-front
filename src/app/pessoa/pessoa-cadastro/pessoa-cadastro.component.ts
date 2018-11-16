import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { Telefone } from 'src/app/model/telefone';
import { Pessoa } from 'src/app/model/pessoa';
import { PessoaService } from 'src/app/service/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa: Pessoa
  pessoaForm: FormGroup;
  subscription: Subscription;
  id: number;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, private pessoaService: PessoaService) { 
  }

  ngOnInit() {
    this.pessoa = new Pessoa();
    this.pessoa.telefones = [];
    
    this.pessoaForm = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      telefone: this.criarTelefone(),
      telefones: this.formBuilder.array([])
    });


    this.subscription = this.activatedRoute.params.subscribe(params => {

      if(params['id']){

        this.id = +params['id'];

        this.carregarPessoa(+params['id']);

       /*  this.pessoaService.getPessoa(+params['id']).subscribe((pessoaResult: Pessoa) => {
      
          this.pessoaForm.patchValue({...this.pessoaForm.value, ...pessoaResult});

          pessoaResult.telefones.forEach(telefoneIter =>{
              this.construirTelefone(telefoneIter);
          });
        }); */
    }
    });

    console.log('aqui', this.pessoaForm.controls.id.value);
  }
  
  carregarPessoa(id: number){
    this.pessoaService.getPessoa(id).subscribe((pessoaResult: Pessoa) => {
      
      this.pessoaForm.patchValue({...this.pessoaForm.value, ...pessoaResult});

      pessoaResult.telefones.forEach(telefoneIter =>{
          this.construirTelefone(telefoneIter);
      });
    });
  }

  criarTelefone(): FormGroup {
    return this.formBuilder.group({
      id: '',
      ddd: '',
      numero: ''
    });
  }

  salvar(): void {

    const pessoaMerge = {...this.pessoa, ...this.pessoaForm.value};
    this.pessoaService.salvarPessoa(pessoaMerge).subscribe(() => {
      this.pessoaForm.reset();
    });
  }

  adicionarTelefone() {
    this.construirTelefone(this.telefone.value);
  }

  construirTelefone(telefone?: Telefone) {
    const novoTelefone = this.formBuilder.group(telefone);
    this.telefones.push(novoTelefone);
  }

  removerTelefone(index: number){
    this.telefones.removeAt(index);
  }

  get telefones() {
    return <FormArray>this.pessoaForm.get('telefones');
  }

  get telefone() {
    return this.pessoaForm.get('telefone');
  }

}
