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
            // this.githubUser.user = false;
            this._githubService.updateUser(this.userName);
            this.getDefaultUserInformation();
    }

    getDefaultUserInformation() {
      // console.log("username="+userName);
      console.log(this._githubService);

      this._githubService.getUser().subscribe(user => {
                console.log("default user fetched...");
                console.log(this.githubUser);
                this.githubUser.user = user;
                console.log(this.githubUser);
                this.userUpdated.emit(this.githubUser);
            },
                (err) => {
                    console.log('err:' + err);
                    this.githubUser.user = false;
                },
                () => console.log('Done')
            );



            this._githubService.getRepos().subscribe(repos => {
                console.log(repos);
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

    // getDefaultUserInformation(userName) {
    //     if (userName.length > 0) {

    //         this._githubService.getUser().subscribe(user => {
    //             console.log("default user fetched...");
    //             this.githubUser.user = user;
    //             this.userUpdated.emit(this.githubUser);
    //         },
    //             (err) => {
    //                 console.log('err:' + err);
    //                 this.githubUser.user = false;
    //             },
    //             () => console.log('Done')
    //         );



    //         this._githubService.getRepos().subscribe(repos => {
    //             // console.log(repos);
    //             this.githubUser.repos = repos;
    //             this.userUpdated.emit(this.githubUser);
    //         },
    //             (err) => {
    //                 console.log('err:' + err);
    //                 this.githubUser.user = false;
    //             },
    //             () => console.log('Done')
    //         );

    //     }
    // }
}
