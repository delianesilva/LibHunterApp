import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Documento } from '../../providers/documentos/documento.model';

declare var google;

@Component({
  selector: 'details-modal',
  templateUrl: 'details-modal.html'
})
export class DetailsModalComponent implements AfterViewInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  documento: Documento = new Documento();

  constructor(
    params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.documento = params.get('doc');
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 16,
      center: { lat: this.documento.biblioteca.lat, lng: this.documento.biblioteca.lng }
    });

    this.directionsDisplay.setMap(this.map);

    const marker = new google.maps.Marker({
      position: { lat: this.documento.biblioteca.lat, lng: this.documento.biblioteca.lng },
      animation: google.maps.Animation.DROP
    });

    marker.setMap(this.map);
  }

  closeModal(): void {
    this.viewCtrl.dismiss();
  }

}
