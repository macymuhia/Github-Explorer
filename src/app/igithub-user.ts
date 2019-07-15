// export interface IGithubUser {
//     constructor(
//         public user: any,
//         public repos: any,
//         public userName: string
//     ) { }
// }
export class GithubUser {
    constructor(
        public user: any,
        public repos: any,
        public userName: string
    ) { }
}