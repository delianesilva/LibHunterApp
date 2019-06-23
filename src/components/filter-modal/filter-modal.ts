import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ViewController } from 'ionic-angular';
import { Documento } from '../../providers/documentos/documento.model';
import { result } from '../../providers/documentos/documentos';

declare var google;

@Component({
  selector: 'filter-modal',
  templateUrl: 'filter-modal.html'
})
export class FilterModalComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  range = 10000;
  markers: any[] = [];
  lat = 0;
  lng = 0;

  constructor(
    public viewCtrl: ViewController,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.getLocation();
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

  getDistance(startLat, startLng, endLat, endLng): number {
    return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(startLat, startLng), new google.maps.LatLng(endLat, endLng));
  }

  initMap(center: any) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 11,
      center: center
    });

    this.directionsDisplay.setMap(this.map);

    const marker = new google.maps.Marker({
      position: center,
      icon: 'assets/icon/map-icon.png'
    });

    marker.setMap(this.map);

    this.setRangeMarkers();
  }

  getLocation(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.initMap({ lat: resp.coords.latitude, lng: resp.coords.longitude });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  setRangeMarkers(): void {
    this.clearMap();
    result.forEach(
      (res: Documento) => {
        if (this.getDistance(this.lat, this.lng, res.biblioteca.lat, res.biblioteca.lng) <= this.range) {
          const marker = new google.maps.Marker({
            position: { lat: res.biblioteca.lat, lng: res.biblioteca.lng },
            animation: google.maps.Animation.DROP,
            // label: res.biblioteca.nome
          });
          this.markers.push(marker);
          marker.setMap(this.map);
        }
      });
  }

  clearMap(): void {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
  }

}
