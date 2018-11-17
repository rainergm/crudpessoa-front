import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { Telefone } from 'src/app/pessoa/telefone';
import { Pessoa } from 'src/app/pessoa/pessoa';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit, OnDestroy {

  pessoa: Pessoa;
  pessoaForm: FormGroup;
  subscription: Subscription;
  id: number;
  errorMsg: string;

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
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, Validators.pattern]],
      telefone: this.criarTelefone(),
      telefones: this.formBuilder.array([])
    });


    this.subscription = this.activatedRoute.params.subscribe(params => {

      if (params['id']) {
        this.id = +params['id'];
        this.carregarPessoa(+params['id']);
      }
    });

    console.log('aqui', this.pessoaForm.controls.id.value);
  }

  carregarPessoa(id: number) {
    this.pessoaService.getPessoa(id).subscribe((pessoaResult: Pessoa) => {

      this.pessoaForm.patchValue({...this.pessoaForm.value, ...pessoaResult});

      pessoaResult.telefones.forEach(telefoneIter => {
          this.construirTelefone(telefoneIter);
      });
    });
  }

  criarTelefone(): FormGroup {
    return this.formBuilder.group({
      id: '',
      ddd: ['', [Validators.required, Validators.maxLength(3)]],
      numero: ['', Validators.required]
    });
  }

  salvar(): void {

    const pessoaMerge = {...this.pessoa, ...this.pessoaForm.value};
    this.pessoaService.salvarPessoa(pessoaMerge).subscribe(() => {
      this.pessoaForm.reset();
      this.router.navigate(['/pessoa']);
    });
  }

  verificaCamposValidos(): boolean {

    if (this.pessoaForm.controls.nome.errors
        || this.pessoaForm.controls.email.errors
        || this.pessoaForm.controls.dataNascimento.errors
        || this.pessoaForm.controls.cpf.errors ) {
      return true;
    }

    return false;
  }

  adicionarTelefone() {
    this.construirTelefone(this.telefone.value);
    this.telefone.reset();
  }

  construirTelefone(telefone?: Telefone) {
    const novoTelefone = this.formBuilder.group(telefone);
    this.telefones.push(novoTelefone);
  }

  removerTelefone(index: number) {
    this.telefones.removeAt(index);
  }

  get telefones() {
    return <FormArray>this.pessoaForm.get('telefones');
  }

  possuiTelefone(): boolean {
    return this.telefones.length > 0;
  }

  get telefone() {
    return this.pessoaForm.get('telefone');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
