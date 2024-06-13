import * as d3 from 'd3';

export default class Chart {
    constructor(chartId, dataSource, chartType) {
        this._chartId = chartId;
        this._dataSource = dataSource;
        this._chartType = chartType;
        this._chartElement;
        this._data;
    }

    get chartId() {
        return this._chartId;
    }

    get dataSource() {
        return this._dataSource;
    }

    get chartType() {
        return this._chartType;
    }

    async initializeChart() {
        await this.requestData();
        this._chartElement = document.getElementById(this._chartId);
        this.displayChart();
    }

    async requestData() {
        try {
            const chartResponse = await fetch(this._dataSource);
            this._data = await chartResponse.json();
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    }

    displayChart() {
        if (this._chartType == "predictionHousingmarket") {
            this.displayPredictionHousingMarketChart();
        } else if (this._chartType == "disposableIncomeMean") {
            this.displayDisposableIncomeMean();
        }
    }

    revealChart() {
        this._chartElement.classList.remove("hidden");
    }

    displayPredictionHousingMarketChart() {
        const data = this._data.map(d => ({
            year: +d.year,
            value: +d.newappartmentsper1000citizens
        }));

        // Clear existing chart before redrawing
        d3.select(this._chartElement).selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 60, left: 60 }; // Increase left margin
        const width = this._chartElement.clientWidth - margin.left - margin.right;
        const height = this._chartElement.clientHeight - margin.top - margin.bottom;

        const svg = d3.select(this._chartElement)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.year))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .nice()
            .range([height, 0]);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d")))
            .selectAll("text")
            .style("font-family", "Inter")
            .attr('dy', '1em'); // Move text down

        svg.append('g')
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-family", "Inter");

        const line = d3.line()
            .x(d => x(d.year))
            .y(d => y(d.value));

        const pastData = data.filter(d => d.year <= 2023);
        const futureData = data.filter(d => d.year >= 2023);

        // Draw the past line
        svg.append('path')
            .datum(pastData)
            .attr('fill', 'none')
            .attr('stroke', '#1B76FF')
            .attr('stroke-width', 2)
            .attr('d', line);

        // Draw the future line
        svg.append('path')
            .datum(futureData)
            .attr('fill', 'none')
            .attr('stroke', '#37C474')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '4,4')
            .attr('d', line);

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom)
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .text('Jahr');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', -margin.left + 20)
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .text('Neue Wohnungen pro 1.000 Bürger');

        // Create a tooltip div that is hidden by default
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("opacity", 0);

        // Add circles for past data points and interactions
        svg.selectAll("circle.past")
            .data(pastData)
            .enter().append("circle")
            .attr("class", "past")
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(d.value))
            .attr("r", 4)
            .attr("fill", "#1B76FF")
            .attr("stroke", "none")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("r", 6).attr("fill", "#F4D227");
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`Jahr: ${d.year}<br>Wert: ${d.value}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("r", 4).attr("fill", "#1B76FF");
                tooltip.transition().duration(500).style("opacity", 0);
            });

        // Add circles for future data points and interactions
        svg.selectAll("circle.future")
            .data(futureData)
            .enter().append("circle")
            .attr("class", "future")
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(d.value))
            .attr("r", 4)
            .attr("fill", "#37C474")
            .attr("stroke", "none")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("r", 6).attr("fill", "#F4D227");
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`Jahr: ${d.year}<br>Wert: ${d.value}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("r", 4).attr("fill", "#37C474");
                tooltip.transition().duration(500).style("opacity", 0);
            });
    }

    displayDisposableIncomeMean() { 
        console.log("displayDisposableIncomeMean")
    }
}
