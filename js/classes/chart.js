import * as d3 from 'd3';
import L from 'leaflet';
import { formatNumberWithThousandSeparator } from '../utilities';

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
        await this.displayChart();
    }

    async requestData() {
        try {
            const chartResponse = await fetch(this._dataSource);
            this._data = await chartResponse.json();
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    }

    async displayChart() {
        if (this._chartType == "predictionHousingmarket") {
            this.displayPredictionHousingMarketChart();
        } else if (this._chartType == "disposableIncomeMean") {
            this.displayDisposableIncomeMean();
        } else if (this._chartType == "rentalPricesStatesMedian") {
            this.displayRentalPricesStatesMedian();
        } else if (this._chartType == "correlationAgeAveragePopulationDesity") {
            this.displayCorrelationAgeAveragePopulationDesity();
        } else if (this._chartType == "bavariaIncomePrognoses") {
            this.displayBavariaIncomePrognoses();
        } else if (this._chartType == "countiesTop10Chart") {
            await this.displayCountiesTop10Chart();
        } else if (this._chartType == "countyRentalPriceImpact") {
            await this.displayCountyRentalPriceImpact();
        }
    }

    revealChart() {
        this._chartElement.parentElement.classList.remove("hidden");
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
        const data = this._data.map(d => ({
            state: d.state,
            income: +d.disposableincome
        })).sort((a, b) => b.income - a.income); // Sort data in descending order
    
        // Clear existing chart before redrawing
        d3.select(this._chartElement).selectAll("*").remove();
    
        const margin = { top: 40, right: 30, bottom: 60, left: 200 }; // Adjusted bottom margin
        const width = this._chartElement.clientWidth - margin.left - margin.right;
        const height = this._chartElement.clientHeight - margin.top - margin.bottom;
    
        const svg = d3.select(this._chartElement)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.income)])
            .range([0, width])
            .nice();
    
        const y = d3.scaleBand()
            .domain(data.map(d => d.state))
            .range([0, height])
            .padding(0.1);
    
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d => `${d / 1000}k`)) // Use k for the x-axis
            .selectAll("text")
            .style("font-family", "Inter")
            .attr('dy', '1em');
    
        svg.append('g')
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-family", "Inter");
    
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => y(d.state))
            .attr("width", d => x(d.income))
            .attr("height", y.bandwidth())
            .attr("fill", "#1B76FF")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", "#F4D227");
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`Bundesland: ${d.state}<br>Wert: ${formatNumberWithThousandSeparator(d.income)}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("fill", "#1B76FF");
                tooltip.transition().duration(500).style("opacity", 0);
            });
    
        const mean = d3.mean(data, d => d.income);
    
        svg.append('line')
            .attr('x1', x(mean))
            .attr('x2', x(mean))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', 'red')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '4,4');
    
        svg.append('text')
            .attr('x', x(mean))
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .attr('fill', 'red')
            .text(`Durschnitt: ${formatNumberWithThousandSeparator(mean.toFixed(0))}`);
    
        // Adjust position of x-axis label
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom - 10) // Adjusted position to prevent cut-off
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .text('Verfügbares Einkommen pro Kopf (€)');
    
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', -margin.left + 20)
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .text('Bundesland');
    
        // Create a tooltip div that is hidden by default
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("opacity", 0);
    }    

    displayRentalPricesStatesMedian() {
        const data = this._data.map(d => ({
            state: d.state,
            price: +d.pricepersquaremeters
        })).sort((a, b) => b.price - a.price); // Sort data in descending order
    
        // Clear existing chart before redrawing
        d3.select(this._chartElement).selectAll("*").remove();
    
        const margin = { top: 40, right: 30, bottom: 60, left: 200 }; // Adjusted bottom margin
        const width = this._chartElement.clientWidth - margin.left - margin.right;
        const height = this._chartElement.clientHeight - margin.top - margin.bottom;
    
        const svg = d3.select(this._chartElement)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.price)])
            .range([0, width])
            .nice();
    
        const y = d3.scaleBand()
            .domain(data.map(d => d.state))
            .range([0, height])
            .padding(0.1);
    
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("font-family", "Inter")
            .attr('dy', '1em');
    
        svg.append('g')
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-family", "Inter");
    
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => y(d.state))
            .attr("width", d => x(d.price))
            .attr("height", y.bandwidth())
            .attr("fill", "#1B76FF")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", "#F4D227");
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`Bundesland: ${d.state}<br>Wert: ${formatNumberWithThousandSeparator(d.price)}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("fill", "#1B76FF");
                tooltip.transition().duration(500).style("opacity", 0);
            });
    
        const median = d3.median(data, d => d.price);
    
        svg.append('line')
            .attr('x1', x(median))
            .attr('x2', x(median))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', 'red')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '4,4');
    
        svg.append('text')
            .attr('x', x(median))
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .attr('fill', 'red')
            .text(`Median: ${formatNumberWithThousandSeparator(median.toFixed(2))}`);
    
        // Adjust position of x-axis label
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom - 10) // Adjusted position to prevent cut-off
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .text('Preis pro m² (€)');
    
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', -margin.left + 20)
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .text('Bundesland');
    
        // Create a tooltip div that is hidden by default
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("opacity", 0);
    }    

    displayCorrelationAgeAveragePopulationDesity() {
        const data = this._data.map(d => ({
            state: d.state,
            ageAverage: +d.ageaverage,
            populationDensity: +d.populationdesity
        }));

        // Clear existing chart before redrawing
        d3.select(this._chartElement).selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 80, left: 80 };
        const width = this._chartElement.clientWidth - margin.left - margin.right;
        const height = this._chartElement.clientHeight - margin.top - margin.bottom;

        const svg = d3.select(this._chartElement)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.ageAverage))
            .range([0, width])
            .nice();

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.populationDensity)])
            .nice()
            .range([height, 0]);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(formatNumberWithThousandSeparator))
            .selectAll("text")
            .style("font-family", "Inter")
            .attr('dy', '1em');

        svg.append('g')
            .call(d3.axisLeft(y).tickFormat(formatNumberWithThousandSeparator))
            .selectAll("text")
            .style("font-family", "Inter");

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.ageAverage))
            .attr("cy", d => y(d.populationDensity))
            .attr("r", 4)
            .attr("fill", "#1B76FF")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("r", 6).attr("fill", "#F4D227");
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`Bundesland: ${d.state}<br>Durschnittsalter: ${formatNumberWithThousandSeparator(d.ageAverage)}<br>Bevölkerungsdichte: ${formatNumberWithThousandSeparator(d.populationDensity)}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("r", 4).attr("fill", "#1B76FF");
                tooltip.transition().duration(500).style("opacity", 0);
            });

        // Calculate regression line
        const xMean = d3.mean(data, d => d.ageAverage);
        const yMean = d3.mean(data, d => d.populationDensity);
        const numerator = d3.sum(data, d => (d.ageAverage - xMean) * (d.populationDensity - yMean));
        const denominator = d3.sum(data, d => (d.ageAverage - xMean) ** 2);
        const slope = numerator / denominator;
        const intercept = yMean - slope * xMean;

        // Calculate start and end points of the regression line
        const xStart = d3.min(data, d => d.ageAverage);
        const xEnd = d3.max(data, d => d.ageAverage);
        const yStart = slope * xStart + intercept;
        const yEnd = slope * xEnd + intercept;

        // Add regression line using the line element
        svg.append('line')
            .attr('x1', x(xStart))
            .attr('y1', y(yStart))
            .attr('x2', x(xEnd))
            .attr('y2', y(yEnd))
            .attr('stroke', 'red')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5'); // Consistent dot spacing

        svg.append('text')
            .attr('x', width)
            .attr('y', y(intercept) - 10)
            .attr('text-anchor', 'end')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .attr('fill', 'red')
            .text(`Correlation Line`);

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom - 10)
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .text('Durchschnittsalter der Bevölkerung');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', -margin.left + 20)
            .attr('text-anchor', 'middle')
            .style("font-family", "Inter")
            .style('font-weight', 'bold')
            .text('Bevölkerungsdichte (je EW pro km²)');

        // Create a tooltip div that is hidden by default
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("opacity", 0);
    }

    displayBavariaIncomePrognoses() {
        const processedData = this._data.map(d => ({
            year: +d.year,
            income: +d.income
        }));

        // Clear existing chart before redrawing
        d3.select(this._chartElement).selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 60, left: 80 };
        const width = this._chartElement.clientWidth - margin.left - margin.right;
        const height = this._chartElement.clientHeight - margin.top - margin.bottom;

        const svg = d3.select(this._chartElement)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain(d3.extent(processedData, d => d.year))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(processedData, d => d.income)])
            .nice()
            .range([height, 0]);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d => d))
            .selectAll("text")
            .style("font-family", "Inter")
            .attr('dy', '1em');

        svg.append('g')
            .call(d3.axisLeft(y).tickFormat(formatNumberWithThousandSeparator))
            .selectAll("text")
            .style("font-family", "Inter");

        const line = d3.line()
            .x(d => x(d.year))
            .y(d => y(d.income));

        const pastData = processedData.filter(d => d.year <= 2021);
        const futureData = processedData.filter(d => d.year >= 2021);

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
            .text('Einkommen in €');

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
            .attr("cy", d => y(d.income))
            .attr("r", 4)
            .attr("fill", "#1B76FF")
            .attr("stroke", "none")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("r", 6).attr("fill", "#F4D227");
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`Jahr: ${d.year}<br>Einkommen: ${formatNumberWithThousandSeparator(d.income)} €`)
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
            .attr("cy", d => y(d.income))
            .attr("r", 4)
            .attr("fill", "#37C474")
            .attr("stroke", "none")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("r", 6).attr("fill", "#F4D227");
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`Jahr: ${d.year}<br>Einkommen: ${formatNumberWithThousandSeparator(d.income)} €`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this).attr("r", 4).attr("fill", "#37C474");
                tooltip.transition().duration(500).style("opacity", 0);
            });
    }

    async displayCountiesTop10Chart() {
        // Clear existing chart before redrawing
        this._chartElement.innerHTML = "";

        // Initial center coordinates and zoom level
        const initialCenter = [53.0, 9.0];
        const initialZoom = 8;

        // Create a new Leaflet map with a white background
        const map = L.map(this._chartElement, {
            center: initialCenter,
            zoom: initialZoom,
            zoomControl: false,
            attributionControl: false,
            minZoom: 0,
            maxZoom: 8
        });

        // Add zoom control with options to the map
        L.control.zoom({
            position: 'topleft'
        }).addTo(map);

        // Fetch the county data from the endpoint
        let countyData = [];
        try {
            const response = await fetch('/countiestop10s');
            countyData = await response.json();
        } catch (error) {
            console.error('Error fetching county data:', error);
        }

        // Function to get county data by name
        const getCountyData = (countyName) => {
            return countyData.find(county => county.county === countyName);
        };

        // Create a variable to store the first layer
        let firstLayer = null;

        // Add GeoJSON layer to the map
        const geojsonLayer = L.geoJson(null, {
            style: function (feature) {
                const countyData = getCountyData(feature.properties.gen);
                return {
                    color: "#F4F6F8",
                    weight: 0.5,
                    fillColor: countyData ? "#1B76FF" : "#D9D9D9", // Highlight matched counties
                    fillOpacity: 0.6
                };
            },
            onEachFeature: function (feature, layer) {
                const countyData = getCountyData(feature.properties.gen);
                if (countyData) {
                    const popupContent =
                        `<strong>${feature.properties.gen}</strong><br>
                    Mietpreis: ${formatNumberWithThousandSeparator(countyData.pricepersquaremeters)} € pro m²<br>
                    Verfügbares Einkommen: ${formatNumberWithThousandSeparator(countyData.disposableincome)} €<br>
                    Arbeitslosenquote: ${formatNumberWithThousandSeparator(countyData.unemploymentrate)} %<br>
                    Freizeitaktivitäten: ${formatNumberWithThousandSeparator(countyData.percentageleasureperarea)} % pro km²`;
                    layer.bindPopup(popupContent);

                    // Store the first layer
                    if (!firstLayer) {
                        firstLayer = layer;
                    }
                }
            }
        }).addTo(map);

        // Fetch the GeoJSON data and add it to the map
        try {
            const response = await fetch('/data/geodata/K-2023-AIG-24--AI2401--2024-05-09-EPSG-4326.geojson');
            const data = await response.json();
            geojsonLayer.addData(data);

            // Fit the map to the bounds of the GeoJSON layer
            map.fitBounds(geojsonLayer.getBounds());

            // Open the popup for the first layer
            if (firstLayer) {
                firstLayer.openPopup();
            }
        } catch (error) {
            console.error('Error fetching GeoJSON data:', error);
        }

        // Add reset button to the map
        const resetButton = L.control({ position: 'topright' });
        resetButton.onAdd = function (map) {
            const btn = L.DomUtil.create('button', 'reset-button btn btn-primary btn-small');
            btn.innerHTML = 'Karte zurücksetzen';
            btn.onclick = function () {
                // Temporarily change the map view
                map.setView([initialCenter[0] + 0.001, initialCenter[1] + 0.001], initialZoom - 1, { animate: false });

                setTimeout(() => {
                    // Reset to initial zoom and fit bounds
                    map.setView(initialCenter, initialZoom, { animate: true });
                    map.fitBounds(geojsonLayer.getBounds(), { animate: true });

                    // Re-open the popup for the first layer
                    if (firstLayer) {
                        firstLayer.openPopup();
                    }
                }, 0);
            };
            return btn;
        };
        resetButton.addTo(map);
    }

    async displayCountyRentalPriceImpact() {
        // Clear existing chart before redrawing
        this._chartElement.innerHTML = "";

        // Initial center coordinates and zoom level
        const initialCenter = [53.0, 9.0];
        const initialZoom = 8;

        // Create a new Leaflet map with a white background
        const map = L.map(this._chartElement, {
            center: initialCenter,
            zoom: initialZoom,
            zoomControl: false,
            attributionControl: false,
            minZoom: 0,
            maxZoom: 8
        });

        // Add zoom control with options to the map
        L.control.zoom({
            position: 'topleft'
        }).addTo(map);

        // Fetch the rental price impact data from the endpoint
        let rentalImpactData = [];
        try {
            const response = await fetch('/countyrentalpriceimpacts');
            rentalImpactData = await response.json();
        } catch (error) {
            console.error('Error fetching rental price impact data:', error);
        }

        // Fetch the county data from the endpoint
        let countyData = [];
        try {
            const response = await fetch('/counties');
            countyData = await response.json();
        } catch (error) {
            console.error('Error fetching county data:', error);
        }

        // Create a dictionary to store county IDs by name
        const countyIdByName = {};
        countyData.forEach(county => {
            countyIdByName[county.name] = county.id;
        });

        // Create a dictionary to store county names by ID
        const countyNameById = {};
        countyData.forEach(county => {
            countyNameById[county.id] = county.name;
        });

        // Calculate the top 3 counties with the most impact on surrounding counties
        const top3Counties = rentalImpactData
            .map(d => ({ ...d, impact: Math.abs(parseFloat(d.impact)) }))
            .sort((a, b) => b.impact - a.impact)
            .slice(0, 3);

        // Create a set to store the names of the top 3 counties and their adjacent counties
        const top3CountyNames = new Set(top3Counties.map(c => countyNameById[c.id]));
        const adjacentCountyNames = new Set();
        top3Counties.forEach(county => {
            county.adjacentcounties.split(',').forEach(id => {
                adjacentCountyNames.add(countyNameById[id]);
            });
        });

        let currentHighlighted = {
            topCounties: new Set(top3CountyNames),
            adjacentCounties: new Set(adjacentCountyNames)
        };

        function highlightCounties(countyName, adjacentCounties) {
            currentHighlighted.topCounties.clear();
            currentHighlighted.adjacentCounties.clear();
            currentHighlighted.topCounties.add(countyName);
            adjacentCounties.forEach(name => currentHighlighted.adjacentCounties.add(name));
            geojsonLayer.setStyle(styleFeature);
        }

        function styleFeature(feature) {
            const countyName = feature.properties.gen;
            if (currentHighlighted.topCounties.has(countyName)) {
                return {
                    color: "#F4F6F8",
                    weight: 0.5,
                    fillColor: "#1B76FF",
                    fillOpacity: 0.6
                };
            } else if (currentHighlighted.adjacentCounties.has(countyName)) {
                return {
                    color: "#F4F6F8",
                    weight: 0.5,
                    fillColor: "#5C9DFF",
                    fillOpacity: 0.6
                };
            }
            return {
                color: "#F4F6F8",
                weight: 0.5,
                fillColor: "#D9D9D9",
                fillOpacity: 0.6
            };
        }

        // Store layers for the top 3 counties
        const top3Layers = [];

        // Add GeoJSON layer to the map
        const geojsonLayer = L.geoJson(null, {
            style: styleFeature,
            onEachFeature: function (feature, layer) {
                const countyName = feature.properties.gen;
                const countyId = countyIdByName[countyName];
                const countyImpactData = rentalImpactData.find(c => c.id === countyId);
                if (countyImpactData) {
                    const popupContent =
                        `<strong>${countyName}</strong><br>
                        Einfluss: ${formatNumberWithThousandSeparator(countyImpactData.impact)}`;
                    layer.bindPopup(popupContent);

                    // Store layer if it is one of the top 3 counties
                    if (top3CountyNames.has(countyName)) {
                        top3Layers.push(layer);
                    }

                    layer.on('click', function () {
                        const adjacentCounties = new Set(countyImpactData.adjacentcounties.split(',').map(id => countyNameById[id]));
                        highlightCounties(countyName, adjacentCounties);
                    });
                }
            }
        }).addTo(map);

        // Fetch the GeoJSON data and add it to the map
        try {
            const response = await fetch('/data/geodata/K-2023-AIG-24--AI2401--2024-05-09-EPSG-4326.geojson');
            const data = await response.json();
            geojsonLayer.addData(data);

            // Fit the map to the bounds of the GeoJSON layer
            map.fitBounds(geojsonLayer.getBounds());

            // Initially highlight the top 3 counties and their adjacent counties
            currentHighlighted.topCounties = new Set(top3Counties.map(c => countyNameById[c.id]));
            top3Counties.forEach(county => {
                county.adjacentcounties.split(',').forEach(id => {
                    currentHighlighted.adjacentCounties.add(countyNameById[id]);
                });
            });
            geojsonLayer.setStyle(styleFeature);

            // Open the popups for the top 3 counties
            top3Layers.forEach(layer => {
                layer.openPopup();
            });
        } catch (error) {
            console.error('Error fetching GeoJSON data:', error);
        }

        // Add reset button to the map
        const resetButton = L.control({ position: 'topright' });
        resetButton.onAdd = function (map) {
            const btn = L.DomUtil.create('button', 'reset-button btn btn-primary btn-small');
            btn.innerHTML = 'Karte zurücksetzen';
            btn.onclick = function () {
                // Temporarily change the map view
                map.setView([initialCenter[0] + 0.001, initialCenter[1] + 0.001], initialZoom - 1, { animate: false });

                setTimeout(() => {
                    // Reset to initial zoom and fit bounds
                    map.setView(initialCenter, initialZoom, { animate: true });
                    map.fitBounds(geojsonLayer.getBounds(), { animate: true });

                    // Reset highlighting to initial state
                    currentHighlighted.topCounties = new Set(top3Counties.map(c => countyNameById[c.id]));
                    currentHighlighted.adjacentCounties.clear();
                    top3Counties.forEach(county => {
                        county.adjacentcounties.split(',').forEach(id => {
                            currentHighlighted.adjacentCounties.add(countyNameById[id]);
                        });
                    });
                    geojsonLayer.setStyle(styleFeature);

                    // Re-open the popups for the top 3 counties
                    top3Layers.forEach(layer => {
                        layer.openPopup();
                    });
                }, 0);
            };
            return btn;
        };
        resetButton.addTo(map);
    }
}