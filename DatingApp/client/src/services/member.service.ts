import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { EditableMember, Member } from '../app/models/member';
import { Photo } from '../app/models/photo';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl
  editMode = signal(false);
  member = signal<Member | null>(null);

  getMembers() {
    return this.httpClient.get<Member[]>(this.baseUrl + 'members');
  }

  getMember(id: string) {
    return this.httpClient.get<Member>(this.baseUrl + 'members/' + id).pipe(
      tap(member => this.member.set(member))
    );
  }

  getMemberPhotos(id: string) {
    return this.httpClient.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');
  }

  updateMember(member: EditableMember) {
    return this.httpClient.put(this.baseUrl + 'members', member);
  }
}
