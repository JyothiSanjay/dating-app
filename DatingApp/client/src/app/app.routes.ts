import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MemberListComponent } from './features/members/member-list/member-list.component';
import { MemberDetailsComponent } from './features/members/member-details/member-details.component';
import { ListsComponent } from './features/lists/lists.component';
import { MessagesComponent } from './features/messages/messages.component';
import { TestErrorsComponent } from './features/test-errors/test-errors.component';
import { NotFoundComponent } from '../shared/errors/not-found/not-found.component';
import { ServerErrorsComponent } from '../shared/errors/server-errors/server-errors.component';
import { MemberProfileComponent } from './features/members/member-profile/member-profile.component';
import { MemberPhotosComponent } from './features/members/member-photos/member-photos.component';
import { MemberMessagesComponent } from './features/members/member-messages/member-messages.component';
import { memberResolverResolver } from './features/members/member-resolver-resolver';
import { authGuard } from './services/auth-guard';
import { preventUnsavedChangesGuard } from './core/guards/prevent-unsaved-changes-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members', component: MemberListComponent
      },
      {
        path: 'members/:id',
        resolve: { member: memberResolverResolver },
        runGuardsAndResolvers: 'always',
        component: MemberDetailsComponent, children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: MemberProfileComponent, title: 'Profile' , canDeactivate: [preventUnsavedChangesGuard]},
          { path: 'photos', component: MemberPhotosComponent, title: 'Photos' },
          { path: 'messages', component: MemberMessagesComponent, title: 'Messages' },
        ]
      },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'errors', component: TestErrorsComponent },
      { path: 'server-errors', component: ServerErrorsComponent },
      { path: '**', component: NotFoundComponent, pathMatch: 'full' }]
  },

];
