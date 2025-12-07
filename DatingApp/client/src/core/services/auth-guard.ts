import { CanActivateFn } from '@angular/router';
import { AccountServiceService } from './account-service.service';
import { inject } from '@angular/core';
import { ToastServiceService } from '../../services/toast-service.service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountServiceService);
  const toast = inject(ToastServiceService);

  if(accountService.currentUser()) return true;
  else{
    toast.error("You shall not pass!!!");
    return false;
  }

};
