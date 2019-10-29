import { Component, OnInit } from '@angular/core';
declare let L;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
        const map = L.map('map').setView([39.8333,-98.58333], 3);

        L.tileLayer( 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
                {
                  "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
                  "detectRetina": false,
                  "maxZoom": 18,
                  "minZoom": 1,
                  "noWrap": false,
                  "subdomains": "abc"
}).addTo(map);
    }

}
