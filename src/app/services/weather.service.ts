import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  GetWeatherByCity(city: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('q', city);
    params = params.set('appid', environment.apiKey);
    return this.http.get<any>(`${environment.open_weather_url}/weather`, { params: params });
  }
}
