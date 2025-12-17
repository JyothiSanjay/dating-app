import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink, RegisterComponent]
})
export class HomeComponent {

  protected registerMode = signal(false);

  showRegisterMode(value: boolean) {
    this.registerMode.set(value);
  }

}
