import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { GithubService } from '../github.service';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GithubUser } from '../igithub-user';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']

})


export class MyProfileComponent implements OnInit {
    @Input() githubUser: GithubUser;
    @Input() userName: string;
    @Output() userUpdated: EventEmitter<GithubUser> = new EventEmitter<GithubUser>();

    constructor(private _githubService: GithubService) {
      this.githubUser = new GithubUser(false, null, '');
    }

    ngOnInit() {
            this.userName = 'macymuhia';
            this._githubService.updateUser(this.userName);
            this.getDefaultUserInformation();
    }

    getDefaultUserInformation() {
      this._githubService.getUser().subscribe(user => {
                this.githubUser.user = user;
                this.userUpdated.emit(this.githubUser);
            },
                (err) => {
                    console.log('err:' + err);
                    this.githubUser.user = false;
                },
                () => console.log('Done')
            );



            this._githubService.getRepos().subscribe(repos => {
                this.githubUser.repos = repos;
                this.userUpdated.emit(this.githubUser);
            },
                (err) => {
                    console.log('err:' + err);
                    this.githubUser.user = false;
                },
                () => console.log('Done')
            );

    }

}
