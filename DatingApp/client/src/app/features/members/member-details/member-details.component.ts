import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MemberService } from '../../../../services/member.service';
import { AsyncPipe } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Member } from '../../../models/member';
import { AgePipe } from '../../../age-pipe';

@Component({
  selector: 'app-member-details',
  imports: [ RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected member = signal<Member | undefined>(undefined);
  protected title = signal<string | undefined>('Profile');
  constructor() { }

  ngOnInit() {
    this.route.data.subscribe({
      next: data => this.member.set(data['member'])
    })
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
