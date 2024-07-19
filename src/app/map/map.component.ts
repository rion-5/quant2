import { Component, AfterViewInit  } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

  private svg: any;
  private width = 800;
  private height = 600;
  private projection: any;
  private path: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.createSvg();
    this.drawMap();
  }

  private createSvg(): void {
    this.svg = d3.select("svg")
      .attr("width", this.width)
      .attr("height", this.height);
  }

  private drawMap(): void {
    this.projection = d3.geoMercator()
      .center([127.7669, 35.9078]) // 한국의 중심 좌표
      .scale(5000) // 확대 비율
      .translate([this.width / 2, this.height / 2]);

    this.path = d3.geoPath().projection(this.projection);

    d3.json("assets/TL_SCCO_CTPRVN.json").then((geojson: any) => {
      this.svg.append("g")
        .selectAll("path")
        .data(geojson.features)
        .enter().append("path")
        .attr("class", "region")
        .attr("d", this.path)
        .on("mouseover", (event: any, d: any) => {
          d3.select(event.currentTarget).attr("fill", "#f00");
        })
        .on("mouseout", (event: any, d: any) => {
          d3.select(event.currentTarget).attr("fill", "#ddd");
        });
    }).catch((error: any) => {
      console.log(error);
    });
  } 

}
