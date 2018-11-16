import { Injectable } from '@angular/core/';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HttpParams } from '@angular/common/http';

import { Pessoa } from 'src/app/model/pessoa';


@Injectable()
export class PessoaService {

    private URL_RECURSO = 'http://localhost:8080/pessoa';

    constructor(private http: HttpClient){
    }

    getPessoas(): Observable<Pessoa[]>{
        return this.http.get<Pessoa[]>(this.URL_RECURSO);
    }

    getPessoa(id: number): Observable<Pessoa>{
        return this.http.get<Pessoa>(`${this.URL_RECURSO}/${id}`);
    }

    salvarPessoa(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.post<Pessoa>(this.URL_RECURSO, pessoa);
    }

    removerPessoa(id: number){
        return this.http.delete<Pessoa>(`${this.URL_RECURSO}/${id}`);
    }

    getPessoasFiltradas(nome:string, cpf:string): Observable<Pessoa[]>{
        
        const params = new HttpParams().
            set('nome', nome).set('cpf', cpf);

        return this.http.get<Pessoa[]>(`${this.URL_RECURSO}/filtro`, {params});
        
      /*   let url:string = `${this.urlRecurso}`;
        
        if(nome.trim() != ''){
            url += `/${nome}`;
        }

        if(cpf.trim() != ''){
            url += `/${cpf}`;
        }
        
        return this.http.get<Pessoa[]>(`${this.urlRecurso}/${nome}/${cpf}`); */
    }
}