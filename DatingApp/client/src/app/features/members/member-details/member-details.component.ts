import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MemberService } from '../../../../services/member.service';
import { AgePipe } from '../../../age-pipe';
import { Member } from '../../../models/member';
import { AccountServiceService } from '../../../services/account-service.service';

@Component({
  selector: 'app-member-details',
  imports: [ RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  private accountService = inject(AccountServiceService);
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected title = signal<string | undefined>('Profile');
  protected isCurrentUser = computed(() => {
    const idStr = this.route.snapshot.paramMap.get('id');
    console.log(idStr);

    if (!idStr) return false;
    return this.accountService.currentUser()?.id === idStr;
});
  constructor() { }

  ngOnInit() {

    this.title.set(this.route.firstChild?.snapshot?.title);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title)
      }
    })
  }

  loadMember(){
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    return this.memberService.getMember(id);
  }

}
