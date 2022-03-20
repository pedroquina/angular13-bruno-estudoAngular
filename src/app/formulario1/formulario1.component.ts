/*
   TODO 
   Validação do email   https://material.angular.io/components/form-field

   Upload 
      para gravar em file system // java
      para gravar em base de dados // java
   
   Chamada a páginas estáticas  // angular

   Instalar e configurar o bootstrap  // angular

   Troca de informações entre componentes  // angular

   Autenticação OAuth2  // angular + java


*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, NgForm, Validators,FormGroupDirective } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface UF {
  value: string;
  display: string;
}

interface PREFERENCIA {
  value : boolean;
  display: string;
}

@Component({
  selector: 'app-formulario1',
  templateUrl: './formulario1.component.html',
  styleUrls: ['./formulario1.component.css']
})
export class Formulario1Component implements OnInit {

  nome: string = '1';
  telefone : string = '';
  email : string = '';
  uf: string = 'RJ';
  estadoCivilSelecionado: string = 'Solteiro';
  dataNascimento: Date = new Date();
  observacao : string = 'obs';
  resumo : string = '';
  siteFavorito : string = 'http://www.uol.com.br';
  // upload file
  fileName : string = '';


  // campo email
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();


  constructor(private http: HttpClient) { }


  estadoCivis: String[] = ['Casado', 'Solteiro'];

  ufs: UF[] = [
    { value: 'SP', display: 'São Paulo' },
    { value: 'RJ', display: 'Rio de Janeiro' },
    { value: 'MG', display: 'Minas Gerais' },
  ];

  preferencias: PREFERENCIA[] = [
    { value: false, display: 'Cinema' }
    ,{ value: true, display: 'Restaurante' }
    //,{ value: false, viewValue: 'Outros' }
  ];

  ngOnInit(): void {
  }

  enviar(form: NgForm) {
    console.log("Nome : " + form.value.nome);
    console.log("Email : " + form.value.email);
    console.log("telefone: " + form.value.telefone);
    console.log("Estado civil : " + form.value.estadoCivilSelecionado);
    console.log("UF : " + form.value.uf);
    console.log("Preferências : ");
    this.preferencias.map(p => console.log(p.display + '=' + p.value));
    console.log("Data Nascimento  : "  + " : " + form.value.dataNascimento);
    console.log("Observação : " + this.observacao);
  }


  preferenciaChange(_preferencias : PREFERENCIA[] , _preferencia :PREFERENCIA , $event : any){
    _preferencia.value = $event.checked;
    console.log($event.checked);
    console.log(_preferencia.display);
  }

  showResumo(){
      this.resumo = this.observacao;

  }

  onFileSelected(event : any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        // criar end-point
        const upload$ = this.http.post("/uploads", formData);

        upload$.subscribe();
    }


}

}
