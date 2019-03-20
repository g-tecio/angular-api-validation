import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseUrl = 'http://127.0.0.1:8080'
  jason: any = {};
  constructor(
    private http: Http,
  ) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    let test = {
      metadata_id: '1545412468248DI7',
      metadata_name: 'News Metadata',
      slugline: 'US-Finance-Fed',
      created_on: 'Tue Feb 26 2019 09:05:23 GMT-0600 (Central Standard Time)',
      source: 'ANM',
      author_name: 'Meredith',
      author_last_name: 'Jameson',
      author_email: 'mjameson@gmail.com',
      author_link: 'https://mjameson.com/',
      author_jobtitle: 'Ny Times Reporter',
      headline: 'Fed to halt QE to advert "bubble"',
      date: '26/02/2019',
      categories: ['economy', 'finance', 'business', 'central bank', 'monetary policy'],
      byline: 'By Meredith Jameson',
      body_text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar varius mollis.
                Etiam sed leo non mauris finibus gravida. Cras placerat, nulla nec elementum faucibus,
                turpis nisl vulputate justo, in euismod erat lectus ac ipsum. Vivamus tincidunt turpis et massa sagittis tristique.
                Integer sollicitudin orci non quam rutrum fermentum. Mauris non urna tincidunt, vehicula diam vel, tincidunt arcu.
                Duis consectetur ligula libero. Aenean ultrices elementum ante, sed hendrerit neque porttitor ut. Praesent pharetra vehicula ipsum et lacinia.
                Suspendisse potenti. Pellentesque blandit mi eget mauris sagittis iaculis. Mauris egestas erat quis ligula convallis vulputate.
                Sed malesuada tempus mauris a iaculis. Aliquam sollicitudin ligula ac odio fringilla vestibulum.`,
      location: 'California, USA',
      latest_edit: 'Tue Feb 26 2019 09:05:23 GMT-0600 (Central Standard Time)',
      latest_editor: 'Faruk Muñoz'
    }
    let metadatas = this.http.get(`${this.baseUrl}/metadata/getMetadata?id=5c9251937da4bf591d248cae`, { headers: this.getHeaders() }).subscribe(response => {
      response.json()[0].attributes.forEach(attribute => {
        this.jason[attribute.machine_name] = this.generateType(attribute.type);
      })

      this.jason = JSON.parse(JSON.stringify(this.jason));
      console.log(this.jason);
      console.log(test);
      console.log(this.validateClass(test, this.jason));
    })

    return metadatas;
  }

  private getHeaders() {
    let headers = new Headers();

    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  generateClass(json) {
    return Object.assign(new Object, json)
  }

  validateClass(objectToValidate, parameter) {
    let r = true;
    for (var key in objectToValidate) {
      if (!(typeof objectToValidate[key] == typeof parameter[key])) {
        console.log("False in: " + key);
        console.log("typeof 1 " + key + ": " + typeof objectToValidate[key]);
        console.log("typeof 2 " + key + ": " + typeof parameter[key]);
        r = false;
      }
    }
    return r;
  }

  generateType(type) {
    switch (type) {
      case 'string':
        return "string"
      case 'number':
        return 100
      case 'boolean':
        return true
      case 'array':
        return []
      case 'date':
        return new Date();
      default:
        return new Object();
    }

  }

}

