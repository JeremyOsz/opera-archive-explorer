'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { LightweightOpera } from '@/app/lib/cache-loader';

interface ComposerBarChartProps {
  works: LightweightOpera[];
}

interface ComposerCount {
  composer: string;
  count: number;
}

export default function ComposerBarChart({ works }: ComposerBarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || works.length === 0) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Process data: count works by composer
    const composerMap = new Map<string, number>();
    
    works.forEach(work => {
      if (!work.creator) return;
      
      // Extract primary composer (first name before comma, or full name if no comma)
      const creator = work.creator.trim();
      const primaryComposer = creator.includes(',') 
        ? creator.split(',')[0].trim() 
        : creator;
      
      // Skip if it looks like a performer/orchestra rather than a composer
      if (
        primaryComposer.toLowerCase().includes('orchestra') ||
        primaryComposer.toLowerCase().includes('baritone') ||
        primaryComposer.toLowerCase().includes('soprano') ||
        primaryComposer.toLowerCase().includes('tenor') ||
        primaryComposer.toLowerCase().includes('conductor') ||
        primaryComposer.toLowerCase().includes('company')
      ) {
        return;
      }
      
      const currentCount = composerMap.get(primaryComposer) || 0;
      composerMap.set(primaryComposer, currentCount + 1);
    });

    // Convert to array and sort by count (descending)
    const composerData: ComposerCount[] = Array.from(composerMap.entries())
      .map(([composer, count]) => ({ composer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 composers

    if (composerData.length === 0) {
      d3.select(svgRef.current)
        .append('text')
        .attr('x', '50%')
        .attr('y', '50%')
        .attr('text-anchor', 'middle')
        .attr('fill', 'currentColor')
        .attr('class', 'text-muted-foreground')
        .text('No composer data available');
      return;
    }

    // Set up dimensions
    const margin = { top: 40, right: 40, bottom: 100, left: 80 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(composerData.map(d => d.composer))
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(composerData, d => d.count) || 0])
      .nice()
      .range([height, 0]);

    // Create color scale
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(composerData, d => d.count) || 1]);

    // Add axes
    const xAxis = d3.axisBottom(xScale)
      .tickSizeOuter(0);
    
    const yAxis = d3.axisLeft(yScale)
      .ticks(10)
      .tickFormat(d => d.toString());

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('dx', '-0.5em')
      .attr('dy', '0.5em')
      .style('font-size', '11px')
      .style('fill', 'currentColor');

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .style('font-size', '11px')
      .style('fill', 'currentColor');

    // Add axis labels
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '500')
      .style('fill', 'currentColor')
      .text('Number of Works');

    g.append('text')
      .attr('x', width / 2)
      .attr('y', height + 80)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '500')
      .style('fill', 'currentColor')
      .text('Composer');

    // Add bars
    const bars = g.selectAll('.bar')
      .data(composerData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.composer) || 0)
      .attr('width', xScale.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .attr('fill', d => colorScale(d.count))
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // Highlight bar
        d3.select(this)
          .attr('opacity', 0.8)
          .attr('stroke', 'currentColor')
          .attr('stroke-width', 2);

        // Show tooltip
        const tooltip = g.append('g')
          .attr('class', 'tooltip')
          .attr('transform', `translate(${(xScale(d.composer) || 0) + xScale.bandwidth() / 2},${yScale(d.count) - 10})`);

        tooltip.append('rect')
          .attr('x', -40)
          .attr('y', -25)
          .attr('width', 80)
          .attr('height', 20)
          .attr('fill', 'rgba(0, 0, 0, 0.8)')
          .attr('rx', 4);

        tooltip.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '-10')
          .attr('fill', 'white')
          .style('font-size', '12px')
          .text(`${d.count} works`);
      })
      .on('mouseout', function() {
        // Reset bar
        d3.select(this)
          .attr('opacity', 1)
          .attr('stroke', 'none');

        // Remove tooltip
        g.selectAll('.tooltip').remove();
      });

    // Animate bars
    bars.transition()
      .duration(800)
      .ease(d3.easeCubicOut)
      .attr('y', d => yScale(d.count))
      .attr('height', d => height - yScale(d.count));

    // Add value labels on bars
    bars.append('title')
      .text(d => `${d.composer}: ${d.count} works`);

    // Add grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale)
          .tickSize(-height)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .style('stroke', 'currentColor')
      .style('stroke-opacity', 0.1)
      .style('stroke-dasharray', '2,2');

    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .style('stroke', 'currentColor')
      .style('stroke-opacity', 0.1)
      .style('stroke-dasharray', '2,2');

  }, [works]);

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={svgRef} className="w-full" style={{ minHeight: '600px' }} />
    </div>
  );
}

