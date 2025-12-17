import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountServiceService } from '../../app/services/account-service.service';
import { ToastServiceService } from '../../services/toast-service.service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit{
  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme())
  }
  private router = inject(Router);
  private toast = inject(ToastServiceService)
  protected accountService = inject(AccountServiceService);
  protected creds : any = {};
  protected selectedTheme = signal<string>(localStorage.getItem('theme')||'light');
  themes = themes;

  handleSelectedTheme(theme: string){
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const el = document.activeElement as HTMLDivElement;
    if(el) el.blur();
  }

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
