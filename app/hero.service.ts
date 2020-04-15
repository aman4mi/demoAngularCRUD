import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';
// import 'rxjs/add/operator/map'

@Injectable({ providedIn: 'root' })
export class HeroService {

  // private heroesUrl = 'api/heroes';  // URL to web api (In Memory Server)
  // private heroesUrl = 'http://192.168.43.239:8000/hello';  // URL to web api (Text, use this alongside url, {responseType: 'text'})
  private heroesUrl = 'http://localhost:8000';  // URL to web api (Real server JSON data)



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // headers: new HttpHeaders({
    //   'Content-Type'  : 'application/x-www-form-urlencoded'
    //  })
  };


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getPeopleList(): Observable<any> {  
    return this.http.get(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<any>('getPeopleList', ''))
    );  
  }  

  getHeroes (): Observable<any> {
    const url = `${this.heroesUrl}/api/heroes2`;

    return this.http.get<any>(url)
      .pipe(
        map(result=>result.queryList),
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/api/${id}`;
    console.log("Hero Service Url "+url)

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/api/save`;
    console.log("Hero Service Url (add): "+url)
    // debugger

    return this.http.post<Hero>(url, JSON.stringify(hero), this.httpOptions)
    .pipe(
      map(result=>{
        debugger
        result}),

      // map((response: any) => {console.log(response)}),
      // tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}, name= ${newHero.name}`)),
      // catchError(this.handleError<Hero>('addHero'))
    );
  }

    /** DELETE: delete the hero from the server */
    deleteHero (hero: Hero | number): Observable<any> {
      const id = typeof hero === 'number' ? hero : hero.id;
      const url = `${this.heroesUrl}/api/delete/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }

  // /** DELETE: delete the hero from the server */
  // deleteHero (hero: Hero | number): Observable<Hero> {
  //   const id = typeof hero === 'number' ? hero : hero.id;
  //   const url = `${this.heroesUrl}/api/delete/${id}`;

  //   return this.http.delete<Hero>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/api/save`;
    return this.http.post(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

    /* GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Hero[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
           this.log(`found heroes matching "${term}"`) :
           this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    }
  
    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404<Data>(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/?id=${id}`;
      return this.http.get<Hero[]>(url)
        .pipe(
          map(heroes => heroes[0]), // returns a {0|1} element array
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} hero id=${id}`);
          }),
          catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}