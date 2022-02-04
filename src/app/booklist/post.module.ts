import { User } from "../userlist/user.module";

export class Book{
  constructor(
    public id: number,
    public title: string,
    public user:User,
    public description: string,
    public content: string,
    public author: string,
    public createdAt: string,
    public updatedAt: string,
  ){}
}
