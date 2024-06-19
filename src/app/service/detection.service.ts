// src/app/services/detection.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetectionService {

  private apiUrl = 'http://localhost:8181/api/employees/detections'; 

  constructor(private http: HttpClient) {}

  getDetectionsByEmployeeName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?name=${name}`);
  }
}
