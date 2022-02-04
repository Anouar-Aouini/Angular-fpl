export class User{
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public account: { id: number, password: string },
    public position: { p_id: number, p_name: string },
    public roles:any
  ){}
}
