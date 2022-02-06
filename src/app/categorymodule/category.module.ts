import { Book } from '../booklist/post.module';

export class Category{
  constructor(
    public id: number,
    public user_id: string,
    public books: Book[],
    public categoryName: string,
    public createdAt: string,
    public updatedAt: string,
  ){}
}
