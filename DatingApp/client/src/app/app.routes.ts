import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { MemberListComponent } from '../features/members/member-list/member-list.component';
import { MemberDetailsComponent } from '../features/members/member-details/member-details.component';
import { ListsComponent } from '../features/lists/lists.component';
import { MessagesComponent } from '../features/messages/messages.component';
import { authGuard } from '../core/services/auth-guard';
import { TestErrorsComponent } from '../features/test-errors/test-errors.component';
import { NotFoundComponent } from '../shared/errors/not-found/not-found.component';
import { ServerErrorsComponent } from '../shared/errors/server-errors/server-errors.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'members/:id', component: MemberDetailsComponent},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'server-errors', component: ServerErrorsComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];
