import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes-tiempo-real',
  templateUrl: './reportes-tiempo-real.component.html',
  styleUrls: ['./reportes-tiempo-real.component.css']
})
export class ReportesTiempoRealComponent implements OnInit{
  usuario:any;

  constructor() { }



  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    this.usuario = this.getItem('usuario');
  }

}
