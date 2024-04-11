import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getCountryList(): Observable<any> {
    return this.http.get('/api/countries');
  }

  getCarDetails(): Observable<any> {
    return this.http.get('/api/car-details');
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'Reason was escape press';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Backdrop was clicked';
    } else {
      return `with: ${reason}`;
    }
  }
}
