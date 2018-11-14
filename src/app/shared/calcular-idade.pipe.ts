import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

@Pipe({
    name: 'calcularIdade'
})
export class CalcularIdadePipe implements PipeTransform{
    
    transform(value: any, ...args: any[]) {

        /* var dob = new Date(dobString);
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var birthdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate());
        var age = currentYear - dob.getFullYear();
        if(birthdayThisYear > currentDate) {
          age--;
        }
        return age;
         */
        
        let dataNascimento = new Date(value);
        let dataAtual = new Date();
        let aniversarioAno = new Date(dataAtual.getFullYear(), dataNascimento.getMonth(),
            dataNascimento.getDate());
        let idade = dataAtual.getFullYear() - dataNascimento.getFullYear(); 

        if(aniversarioAno > dataAtual){
            idade--;
        }
        
        return idade;
    }
   
}