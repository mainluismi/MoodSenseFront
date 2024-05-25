import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  questions: string[];
  generatedForm!: string; // Agregar el operador de aserción de no nulo
  question!: string;

  constructor(private usuarioService: UsuarioService) {
    this.questions = [];
  }

  addQuestion(question: string) {
    this.questions.push(question);
  }

  generateForm() {
    this.usuarioService.generateForm(this.questions).subscribe(form => {
      this.generatedForm = form;
    });
  }
}
