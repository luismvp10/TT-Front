import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../../../../services/chapter/chapter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-select-chapter',
  templateUrl: './select-chapter.component.html',
  styleUrls: ['./select-chapter.component.css']
})
export class SelectChapterComponent implements OnInit {
  chapters: any[] = [];

  constructor( private chapter: ChapterService) {

    this.chapter.getChapters()
        .subscribe( (data: any) => {
          this.chapters = data;
    });

   }

  ngOnInit() {
  }

}
