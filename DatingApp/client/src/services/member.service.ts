import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Member } from '../app/models/member';
import { Photo } from '../app/models/photo';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl

  getMembers() {
    return this.httpClient.get<Member[]>(this.baseUrl + 'members');
  }

  getMember(id: string) {
    return this.httpClient.get<Member>(this.baseUrl + 'members/' + id);
  }

  getMemberPhotos(id: string) {
    return this.httpClient.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');
  }
}
