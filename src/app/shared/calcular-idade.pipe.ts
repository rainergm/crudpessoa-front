import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

@Pipe({
    name: 'calcularIdade'
})
export class CalcularIdadePipe implements PipeTransform{
    
    transform(value: any, ...args: any[]) {

        
            var nascimento = value.split("/");
            var dataNascimento = new Date(parseInt(nascimento[2], 10),
                          parseInt(nascimento[1], 10) - 1,
                          parseInt(nascimento[0], 10));
        
            var diferenca = Date.now() -  dataNascimento.getTime();
            var idade = new Date(diferenca);
            return Math.abs(idade.getUTCFullYear() - 1970);
        
 /*        
        let dataNascimento = new Date(value);
        let dataAtual = new Date();
        let aniversarioAno = new Date(dataAtual.getFullYear(), dataNascimento.getMonth(),
            dataNascimento.getDate());
        let idade = dataAtual.getFullYear() - dataNascimento.getFullYear(); 

        if(aniversarioAno > dataAtual){
            idade--;
        }
    
        if(isNaN(idade) ){
            console.log('.');
        }     

        return idade;*/
    }
   
}