import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-chart',
  standalone: true,
  imports: [],
  templateUrl: './d3-chart.component.html',
  styleUrl: './d3-chart.component.css'
})
export class D3ChartComponent implements OnInit{
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    const data = [10, 20, 30, 40, 50];

    const svg = d3.select(element).append('svg')
      .attr('width', 500)
      .attr('height', 300);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 30)
      .attr('y', d => 300 - d * 5)
      .attr('width', 25)
      .attr('height', d => d * 5)
      .attr('fill', 'steelblue');
  }
}
