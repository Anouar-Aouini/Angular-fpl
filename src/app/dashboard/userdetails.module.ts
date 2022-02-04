import { User } from "../userlist/user.module";

export class UserDetails{
  constructor(
    public id: number,
    public address: string,
    public user:User,
    public age: string,
    public gender: string,
    public phoneNumber: string,
    public githubProfileLink: string,
    public linkedinProfileLink: string,
    public dateOfBirth: string,
    public createdAt: string,
    public updatedAt: string,
  ){}
}
