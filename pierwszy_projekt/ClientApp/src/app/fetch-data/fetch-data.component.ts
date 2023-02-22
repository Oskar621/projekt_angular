import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  @ViewChild('forecastForm', { static: false }) forecastForm: NgForm = new NgForm();
  summary: string = "";
  temperatureC: number = 0;
  summary2: string = "";
  temperatureF: number = 0;
  date: string = "";
  public summaries: string[] = []
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getData();
  }

  ngOnInit() {
    this.getSummaries();
  }

  getData() {
    this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
  getSummaries() {
    this.http.get<string[]>(this.baseUrl + 'weatherforecast/getSummaries').subscribe(result => {
      this.summaries = result;
    }, error => console.error(error));
  }

  addSummary() {
    var summary = {
      summaryDesc: this.summary
    }
    this.http.post<string[]>(this.baseUrl + 'weatherforecast/addSummaries', summary).subscribe(result => {
      this.getSummaries();
    }, error => console.error(error));
  }

  addToTable() {
    var forecast = {
      summary: this.summary,
      date: this.date,
      temperatureC: this.temperatureC,
      temperatureF: this.temperatureF
    } as WeatherForecast

    this.http.post<string[]>(this.baseUrl + 'weatherforecast/addToTable', forecast).subscribe(result => {
      this.getData();
    }, error => console.error(error));

    console.log(forecast)
  }
}
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Summary {
  summaryDesc: string;
}
