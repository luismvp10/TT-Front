import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any ) {
    this._prevenirDetener(event);
    this.mouseSobre.emit( true );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any ) {
    const tranferencia = this._getTransferencia( event );
    if (!tranferencia) {
      return;
    }
    this.extraerArchivos(tranferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit( false );
  }

  private _getTransferencia( event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos(archivosLista: FileList) {
    // tslint:disable-next-line:forin
    for (const propiedad in Object.getOwnPropertyNames( archivosLista )) {
      const archivoTemporal = archivosLista[propiedad];
      if (this._archivoValido(archivoTemporal)) {
        this.archivos.push(new FileItem(archivoTemporal));
      }
      }
    console.log(this.archivos);
  }

  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoValido(archivo: File) {
    if (this._archivoExiste(archivo.name) && this._tipoValido(archivo.type)) {
      return true;
    }
    return false;
  }

  private _archivoExiste( nombre: string ) {
    for (const archivo of this.archivos) {
      if (archivo.nombre === nombre) {
        archivo.terminoSubir = false;
        archivo.estaSubiendo = false;
        archivo.estado = '';
        return false;
      }
    }
    return true;
  }

  private _tipoValido(tipo) {
    if (tipo === 'application/vnd.ms-excel') {
      return true;
    }
    return false;
  }
}
