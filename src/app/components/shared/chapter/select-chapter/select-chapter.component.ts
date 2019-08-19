import { Component, OnInit, Input } from '@angular/core';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    });


   }

  ngOnInit() {
   // console.log(this.childMessage);
  }

}
