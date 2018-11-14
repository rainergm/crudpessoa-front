import { Injectable } from '@angular/core/';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HttpParams } from '@angular/common/http';

import { Pessoa } from 'src/app/model/pessoa';


@Injectable()
export class PessoaService {

    private urlRecurso = 'http://localhost:8080/pessoa';

    constructor(private http: HttpClient){
    }

    getPessoas(): Observable<Pessoa[]>{
        return this.http.get<Pessoa[]>(this.urlRecurso);
    }

    getPessoasFiltradas(nome:string, cpf:string): Observable<Pessoa[]>{
        
        let url:string = `${this.urlRecurso}`;
        
        console.log(url);

        if(nome.trim() != ''){
            url += `/${nome}`;
        }

        console.log(url);

        if(cpf.trim() != ''){
            url += `/${cpf}`;
        }

        console.log(url);
        
        return this.http.get<Pessoa[]>(`${this.urlRecurso}/${nome}/${cpf}`);
    }
}