import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../response/user-response'
import { RunResponse } from '../response/run-response'
import { RunMapResponse } from '../response/run-map-response'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { HasAccountResponse } from '../response/has-account-response'
import { map } from 'rxjs/operators';

/**
 * Service for making all calls to our backend api
**/
@Injectable({
  providedIn: 'root'
})
export class BackendApiServiceService {

  constructor(private http: HttpClient) { }

  /**
   * makes a call to the /users/:id end point to get the users information
   * @param {string} userId the id of the user we are looking for
   * @return{Observable<UserResponse>} the user data returned by the request
  **/
  getUser(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(environment.api_url + "/user/" + userId)
  }

  /**
   * makes a call to the /users/:id/runs/:runId end point to get infromation
   * about a particular run
   * @param {string} userId the id of the user we are looking for
   * @param {string} runId the id of the run we are looing for
   * @return{Observable<RunResponse>} the run data returned by the request
  **/
  getRun(userId: string, runId: string): Observable<RunResponse> {
    return this.http.get<RunResponse>(environment.api_url + "/user/" + userId + "/run/" + runId)
  }

  /**
   * makes a call to the /users/:id/runMaps/:mapId end point to get infromation
   * about a particular runMap
   * @param {string} userId the id of the user we are looking for
   * @param {string} runMapId the id of the map we are looing for
   * @return{Observable<RunMapResponse>} the map data returned by the request
  **/
  getRunMap(userId: string, runMapId: string): Observable<RunMapResponse> {
    return this.http.get<RunMapResponse>(environment.api_url + "/user/" + userId + "/run_map/" + runMapId)
  }

  /**
   * makes a call to the /users/:id/runMaps/:mapId end point to get infromation
   * about a particular runMap
   * @param {string} userId the id of the user we are looking for
   * @return{Observable<boolean>} returns true if the user has the account
  **/
  hasAccount(userId: string): Observable<boolean> {
    return this.http.get<HasAccountResponse>(environment.api_url + "/user/"
      + userId + "/has_account").pipe(map(res => res.has_account))
  }
}
