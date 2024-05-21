import { Component, OnInit } from '@angular/core';
import { NgxChartsModule} from '@swimlane/ngx-charts';
// import { multi } from './data';
import { RestService } from '../service/rest.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { single } from './data';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule,//[중요]HttpClient 사용 위해 추가
    NgxChartsModule],
  providers: [RestService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  
  // dataForChart: any;
  // multi!: any[];
  chartData: any[] = [];
  view: [number, number] = [700, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '거래일';
  yAxisLabel: string = '달러';
  timeline: boolean = true;
  yMin = 0;
  yMax = 0;



  single: any[] = [];
    // options
    showXAxis2: boolean = true;
    showYAxis2: boolean = true;
    gradient2: boolean = false;
    showLegend2: boolean = true;
    showXAxisLabel2: boolean = true;
    yAxisLabel2: string = 'Country';
    showYAxisLabel2: boolean = true;
    xAxisLabel2: string = 'Population';
  colorScheme : any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private restService: RestService) {
  //   Object.assign(this, { multi });
  Object.assign(this, { single });
  }
  // ngOnInit(): void {
  //   this.getTradeDataForChart("AAPL","2023-12-01","2023-12-31");
  //   // console.log(this.dataForChart);
  // }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  ngOnInit() {
    this.getTradeDataForChart("TSLA","2024-01-01","2024-01-31");
    this.yMin=180;
    this.yMax=300;

  }
  getTradeDataForChart(ticker: string, from_date: string, to_date: string): void {
    this.restService.getTradeDataForChart(ticker, from_date, to_date).subscribe(data => {
      this.chartData = data;
      // console.log(this.chartData[0]);

    });
  }
}
