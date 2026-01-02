import { DatePipe } from '@angular/common';
import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MemberService } from '../../../../services/member.service';
import { ToastServiceService } from '../../../../services/toast-service.service';
import { EditableMember, Member } from '../../../models/member';
import { AccountServiceService } from '../../../services/account-service.service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {

  @HostListener('window: beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  private accountService = inject(AccountServiceService);
  @ViewChild('editForm') editForm?: NgForm;
  protected memberService = inject(MemberService);
  protected editableMember: EditableMember = {
    displayName: '',
    description: '',
    city: '',
    country: ''
  }
  private toast = inject(ToastServiceService);


  ngOnInit() {

    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || ''
    }
  }
  updateProfile() {
    if (!this.memberService.member()) return;
    const updatedMember = { ...this.memberService.member(), ...this.editableMember };
    this.memberService.updateMember(this.editableMember).subscribe(() => {
      const currentUser = this.accountService.currentUser();
      if(currentUser && updatedMember.displayName !== currentUser?.displayName){
        currentUser.displayName = updatedMember.displayName;
        this.accountService.setCurrentUser(currentUser);
      }
      this.toast.success('Profile updated successfully!');
      this.memberService.editMode.set(false);
      this.memberService.member.set(updatedMember as Member);
      this.editForm?.reset(updatedMember);
    });
  }

  ngOnDestroy() {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }
}
