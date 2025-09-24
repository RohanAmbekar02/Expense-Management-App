import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeesDeatils {
   private apiUrl = 'http://localhost:8000/api/fees';

  constructor(private http: HttpClient) {}

  getFees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFeeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addFee(fee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, fee);
  }

  updateFee(id: string, fee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, fee);
  }

  deleteFee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
