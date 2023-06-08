//  <reference types="google.maps" />

import { Component, ViewChild, ViewChildren } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { DeepPartial, Meeting } from '@physiotherapist/shared';
import { Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

interface Marker {
  position: google.maps.LatLngLiteral;
  option: google.maps.MarkerOptions;
}

@Component({
  selector: 'physiotherapist-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  @ViewChildren('markerElem') private x: any;

  readonly directionsResults$: Observable<{
    directionResult: google.maps.DirectionsResult | undefined;
    markers: Marker[];
  }>;

  option: google.maps.DirectionsRendererOptions = {
    markerOptions: {
      icon: null,
      opacity: 0,
      clickable: false,
      draggable: false,
      position: { lat: 0, lng: 0 },
    },
  };

  constructor(mapDirectionsService: MapDirectionsService) {
    console.log(this.x);
    const meetings: DeepPartial<Meeting>[] = [
      {
        patient: {
          lastname: 'TEST',
          firstname: 'Test',
          latAddress: 48.756614,
          lonAddress: 2.5522219,
        },
      },
      {
        patient: {
          lastname: 'TEST 2',
          firstname: 'Test',
          latAddress: 48.456614,
          lonAddress: 2.9522219,
        },
      },
      {
        patient: {
          lastname: 'TEST 3',
          firstname: 'Test',
          latAddress: 48.156614,
          lonAddress: 2.3522219,
        },
      },
    ];
    this.directionsResults$ = of(meetings).pipe(
      switchMap((meetingss) => {
        const request: google.maps.DirectionsRequest = {
          destination: { lat: 48.856614, lng: 2.3522219 },
          origin: { lat: 48.856614, lng: 2.3522219 },
          waypoints: meetingss.map(
            (m): google.maps.DirectionsWaypoint => ({
              location: {
                lat: m.patient!.latAddress!,
                lng: m.patient!.lonAddress!,
              },
              stopover: true,
            })
          ),
          optimizeWaypoints: true,

          travelMode: google.maps.TravelMode.DRIVING,
        };
        return forkJoin({
          directionResult: mapDirectionsService.route(request).pipe(
            map((response) => response.result),
            tap(console.log)
          ),
          markers: of(
            meetingss.map(
              (m): Marker => ({
                position: {
                  lat: m.patient!.latAddress!,
                  lng: m.patient!.lonAddress!,
                },
                option: { draggable: false, clickable: false },
              })
            )
          ),
        });
      })
    );

    // google.maps.DirectionsRenderer;
    // this.directionsResults$ = mapDirectionsService.route(request).pipe(
    //   map((response) => response.result),
    //   tap(console.log)
    // );
  }

  openInfo(marker: MapMarker, content: string) {
    console.log({ marker, content });
  }

  log(l: any) {
    console.log(this.x);
    console.log(l);
  }
}
