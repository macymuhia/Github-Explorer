import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { GithubService } from '../github.service';

import { GithubUser } from '../igithub-user';
import { from } from 'rxjs';

@Component({
    selector: 'app-searchform',
    templateUrl: './searchform.component.html',
    styleUrls: ['./searchform.component.css']

})


export class SearchformComponent implements OnInit {
    @Input() githubUser: GithubUser;
    @Output() userUpdated: EventEmitter<GithubUser> = new EventEmitter<GithubUser>();

    constructor(private _githubService: GithubService) {
        
    }

    ngOnInit() {

        if (this.githubUser) {
            this.githubUser.user = false;
            this.getUserInformation();
        }

    }

    searchUser() {
        if (this.githubUser.userName && this.githubUser.userName.length > 0) {
            this._githubService.updateUser(this.githubUser.userName);
            this.getUserInformation();
        } else {
            this.githubUser.user = false;
        }
    }

    getUserInformation() {
        if (this.githubUser.userName && this.githubUser.userName.length > 0) {

            this._githubService.getUser().pipe(debounceTime(2000)).subscribe(user => {
                this.githubUser.user = user;
                this.userUpdated.emit(this.githubUser);
            },
                (err) => {
                    console.log('err:' + err);
                    this.githubUser.user = false;
                },
                () => console.log('Done')
            );



            this._githubService.getRepos().pipe(debounceTime(2000)).subscribe(repos => {
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
}
