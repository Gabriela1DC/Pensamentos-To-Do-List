import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pensamento } from 'src/app/interfaces/inter-pensamento';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.scss'],
})
export class CriarPensamentosComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private router: Router, private service: PensamentoService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(2),
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ])],
      autoria: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(2),
      ])],
      modelo: ['modelo2', [Validators.required]],
      favorito: [false]
    })
    console.log(this.formulario.valid)
    console.log(this.formulario.status)
    console.log(this.formulario?.dirty)
  }

  criarPensamento() {
    console.log(this.formulario)
    console.log(this.formulario.invalid)
    console.log(this.formulario.valid)
    console.log(this.formulario.status)
    console.log(this.formulario?.dirty)
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe( ()=> this.router.navigate(['/listarPensamento']) )
    }
    else{
      alert('Error, submissão inválida!')
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}
