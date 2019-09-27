
export class FileItem {

    public archivo: File;
    public nombre: string;
    public estado: string;
    public estaSubiendo: boolean;
    public terminoSubir: boolean;

    constructor(archivo: File) {
        this.archivo = archivo;
        this.nombre = archivo.name;
        this.estaSubiendo = false;
        this.terminoSubir = false;
        this.estado = '';
    }
}
