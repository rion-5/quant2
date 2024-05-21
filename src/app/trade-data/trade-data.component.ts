import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, NgForm } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import 'moment/locale/ko'; //날짜 한글 format설정시 중요
import TradeData from '../dto/TradeData';
import { RestService } from '../service/rest.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-trade-data',
  standalone: true,
  imports: [CommonModule, HttpClientModule,//[중요]HttpClient 사용 위해 추가
    MatFormFieldModule,
    MatInputModule, //[중요] mat-form-field must contain a MatFormFieldControl.
    MatDatepickerModule,
    FormsModule, // ngForm에서 에러와 관련
    MatTableModule, // [dataSource]="dataSource" 에러와 관련
    MatPaginatorModule,
    MatIconModule,
    NgxChartsModule

  ],
  providers: [RestService, //[중요]HttpClient 사용 위해 추가
    { provide: MAT_DATE_LOCALE, useValue: 'ko-KR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  templateUrl: './trade-data.component.html',
  styleUrl: './trade-data.component.css'
})
export class TradeDataComponent {

  displayedColumns: string[] = ['Trade-Date', 'SYMBOL', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'VOLUME', 'ADJUSTED', 'Insert-Date'];
  dataSource: any = new MatTableDataSource<TradeData>();
  // @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  constructor(private restService: RestService) {
  }

  getTradeData(ticker: string, from_date: string, to_date: string): void {
    this.restService.getTradeData(ticker, from_date, to_date).subscribe(data => {
      this.dataSource.data = data;
      console.log(data);

    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onSubmit(form: NgForm) {
    this.getTradeData(form.value.ticker, this.formatDate(form.value.from_date), this.formatDate(form.value.to_date));
  }

  formatDate(date: Date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return year + "-" + month + "-" + day;
  }
  // onSave(): void {
  //   const ws = utils.json_to_sheet(this.dataSource.data);
  //   const wb = utils.book_new();
  //   utils.book_append_sheet(wb, ws, "Data");
  //   const today = this.nowdateToString();
  //   writeFileXLSX(wb, `gatelog_${today}.xlsx`);
  // }







}
