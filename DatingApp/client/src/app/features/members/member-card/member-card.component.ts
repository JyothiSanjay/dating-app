import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Member } from '../../../models/member';
import { AgePipe } from '../../../age-pipe';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  imports: [RouterLink, AgePipe]
})
export class MemberCardComponent implements OnInit {
  member = input.required<Member>();

  constructor() { }

  ngOnInit() {
  }

}
