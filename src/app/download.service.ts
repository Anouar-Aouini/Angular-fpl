import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
    public url: string ="http://localhost:8080/api/v1/download/";

  constructor(public http:HttpClient) { }

  getAllDownloads() {
   return this.http.get(this.url);
  }
  downloadBook(id:number) {
   return this.http.post(this.url + id, "");
  }

}
