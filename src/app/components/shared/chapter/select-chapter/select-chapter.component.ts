import { Component, OnInit, Input } from '@angular/core';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-select-chapter',
  templateUrl: './select-chapter.component.html',
  styleUrls: ['./select-chapter.component.css']
})
export class SelectChapterComponent implements OnInit {
  chapters: any[] = [];
  SelectedChapter: string;
  //@Input () childMessage: string;

  constructor( private chapter: ChapterService) {
    //this.SelectedChapter = '0';

    this.chapter.getChapters()
        .subscribe( (data: any) => {
          this.chapters = data;
    }, ( errorService ) => {


      if( errorService.status === 0) {

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'warning',
          title: 'Error de conexión con el servidor'
        });

      }

    });


   }

  ngOnInit() {
   // console.log(this.childMessage);
  }

}
