import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import TradeData from '../dto/TradeData';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from "../dto/User";
import { Login } from "../dto/Login";
import { LoginParam } from "../dto/LoginParam";
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const restUrl = environment.restUrl;
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private authService: AuthService) {
   }

   jwt_httpOptions = {
    headers: new HttpHeaders({ Authorization: `Bearer ${this.authService.token}` })
  };


  public getTradeData(ticker: string, start_date: string, end_date: string): Observable<TradeData[]> {
    const r_string = `${restUrl}/tradeData?symbol=${ticker}&start_date=${start_date}&end_date=${end_date}`;
    console.log(r_string);
    return this.http.get<TradeData[]>(r_string, this.jwt_httpOptions
    ).pipe(catchError(this.handleErrorObservable));;
  }

  public getTradeDataForChart(ticker: string, start_date: string, end_date: string): Observable<TradeData[]> {
    const r_string = `${restUrl}/tradeDataForChart?symbol=${ticker}&start_date=${start_date}&end_date=${end_date}`;
    console.log(r_string);
    return this.http.get<TradeData[]>(r_string, httpOptions
    ).pipe(catchError(this.handleErrorObservable));;
  }


  newSignUp(signUp: User): Observable<User> {
    return this.http.post<User>(`${restUrl}/signup`, signUp, httpOptions).pipe(catchError(this.handleErrorObservable));

  }

  loginCheck(loginParam: LoginParam): Observable<Login> {
    return this.http.post<Login>(`${restUrl}/login`, loginParam, httpOptions).pipe(catchError(this.handleErrorObservable));
  }

  emailDuplicateCheck(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${restUrl}/email/${email}`).pipe(catchError(this.handleErrorObservable));
  }

  updateUser(user: User): Observable<number> {
    return this.http.put<number>(`${restUrl}/user/update`, user,this.jwt_httpOptions).pipe(catchError(this.handleErrorObservable));
  }

  deleteUser(id: number): Observable<number> {
    return this.http.delete<number>(`${restUrl}/user/${id}`,this.jwt_httpOptions).pipe(catchError(this.handleErrorObservable));
  }

  // deleteUser(id: number): Observable<number> {
  //   return this.http.delete<number>(`${restUrl}/user/${id}`).pipe(catchError(this.handleErrorObservable));
  // }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return throwError(() => error.message || error);
  }
}
