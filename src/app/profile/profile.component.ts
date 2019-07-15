import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GithubUser } from '../igithub-user';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    @Input() githubUser: GithubUser;

    constructor() {
    }

    ngOnInit() { }

}