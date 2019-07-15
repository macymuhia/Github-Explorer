import { Component } from '@angular/core';
import { GithubUser } from '../app/igithub-user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'explore';

    public githubUser1: GithubUser;

    constructor() {
        this.githubUser1 = new GithubUser(false, null, '');
    }
}