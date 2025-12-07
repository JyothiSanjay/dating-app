import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountServiceService } from '../../core/services/account-service.service';
import { ToastServiceService } from '../../services/toast-service.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private router = inject(Router);
  private toast = inject(ToastServiceService)
  protected accountService = inject(AccountServiceService);
  protected creds : any = {};

  login(){
    console.log(this.creds);
    this.accountService.login(this.creds).subscribe(() => {
      this.router.navigateByUrl('/members');
      this.toast.success("Logged in successfully");
        this.creds = {};
    }, error => {
      this.toast.error(error.error);
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
