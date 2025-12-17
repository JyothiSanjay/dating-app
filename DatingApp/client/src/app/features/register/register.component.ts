import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCred, User } from '../../models/user';
import { AccountServiceService } from '../../services/account-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  private accountService = inject(AccountServiceService)
  protected creds = {} as RegisterCred;
  cancelRegister = output<boolean>();

  register(){
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
