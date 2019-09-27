import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../../../services/upload/upload.service';
import Swal from 'sweetalert2';
import { FileItem } from '../../../../models/file-item';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {
  archivos: FileItem[] = [];
  estaSobre = false;
  puedeLimpiar = true;
  constructor(private upload: UploadService) { }

  ngOnInit() {
  }

  cargar() {
    this.puedeLimpiar = false;
    this.esperar(this.archivos[0].archivo, this.archivos.length, 0);
  }

  esperar(file, tam, index) {
    this.archivos[index].estaSubiendo = true;
    this.upload.uploadFile(file).subscribe( (data: any) => {
      this.archivos[index].estaSubiendo = false;
      this.archivos[index].terminoSubir = true;
      this.archivos[index].estado = data.status;
      index++;
      console.log(data);
      if (index < tam) {
        this.esperar(this.archivos[index].archivo, tam, index);
      }
      if (index === tam) {
        this.puedeLimpiar = true;
      }
    });
  }

  limpiarArchivos() {
    this.archivos = [];
  }
}
