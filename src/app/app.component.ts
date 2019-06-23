import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ModalController, Platform } from 'ionic-angular';
import { DetailsModalComponent } from '../components/details-modal/details-modal';
import { TabsPage } from '../pages/tabs/tabs';
import { Documento } from '../providers/documentos/documento.model';
import { DocumentosProvider } from '../providers/documentos/documentos';
import { FilterModalComponent } from '../components/filter-modal/filter-modal';


declare var google;

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  search: string = '';
  filtro = 1;
  documentos: Documento[] = [];

  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    private service: DocumentosProvider,
    private geolocation: Geolocation
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  setAndOrderByDistance(docs: Documento[]) {
    setTimeout(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        docs.forEach(doc => {
          doc.biblioteca.distance = this.getDistance(
            resp.coords.latitude,
            resp.coords.longitude,
            doc.biblioteca.lat,
            doc.biblioteca.lng
          );
        });
        this.documentos = docs;
        this.orderList();

      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }, 1000);
  }

  getDistance(startLat, startLng, endLat, endLng): number {
    return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(startLat, startLng), new google.maps.LatLng(endLat, endLng));
  }

  orderList(): void {
    this.documentos = this.documentos.sort((n1, n2) => {
      if (n1.biblioteca.distance > n2.biblioteca.distance) {
        return 1;
      }

      if (n1.biblioteca.distance < n2.biblioteca.distance) {
        return -1;
      }

      return 0;
    });
  }

  ngOnInit(): void { }

  getSearch(): void {
    switch (this.filtro) {
      case 1:
        this.searchByAll();
        break;

      case 2:
        this.searchByTitulo();
        break;

      case 3:
        this.searchByAutor();
        break;

      case 4:
        this.searchByAssunto();
        break;
    }
  }

  searchByAll(): void {
    this.service.getByAll(this.search).subscribe(
      success => {
        this.setAndOrderByDistance(success);
      }
    );
  }

  searchByAutor(): void {
    this.service.getByAutor(this.search).subscribe(
      success => {
        this.setAndOrderByDistance(success);
      }
    );
  }

  searchByTitulo(): void {
    this.service.getByTitulo(this.search).subscribe(
      success => {
        this.setAndOrderByDistance(success);
      }
    );
  }

  searchByAssunto(): void {
    this.service.getByAssunto(this.search).subscribe(
      success => {
        this.setAndOrderByDistance(success);
      }
    );
  }

  presentDetailsModal(doc: Documento) {
    const detailsrModal = this.modalCtrl.create(DetailsModalComponent, { doc: doc });
    detailsrModal.present();
  }

  presentMapModal() {
    const mapsModal = this.modalCtrl.create(FilterModalComponent);
    mapsModal.present();
  }
}
