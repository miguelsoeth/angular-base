import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private userService: UserService) { }
  
  public username: string = this.userService.getUsername().toUpperCase();
  
  userPrompt(): void {
    var newUsername: string | null = prompt("Digite o seu nome de usuário:");
    console.log("Usuário alterado para: " + newUsername);
    if (newUsername !== null) {
      while (newUsername == '') {
        newUsername = prompt("Nome inválido! Digite o seu nome de usuário:");
      }
      this.userService.setUsername(newUsername);
      this.username = newUsername.toUpperCase();
    }
    
  } 

}
