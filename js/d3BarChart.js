export function drawBarChart() {
    var parentDiv = document.getElementById("bar-graph");
    var svg = d3.select(parentDiv).append("svg");

    // Sample data for the bar chart
    var data = [
        { name: "A", value: 30 },
        { name: "B", value: 50 },
        { name: "C", value: 70 },
        { name: "D", value: 90 },
        { name: "E", value: 20 }
    ];

    function redraw(show) {
        // Extract the width and height that was computed by CSS.
        var width = parentDiv.clientWidth;
        var height = parentDiv.clientHeight;

        // Set the dimensions of the SVG element
        svg.attr("width", width).attr("height", height);

        if (show === false) {
            svg.style('visibility', 'hidden');
        } else {
            svg.style('visibility', 'visible');
        }

        // Margins for the axes
        var margin = { top: 20, right: 30, bottom: 30, left: 40 };
        var innerWidth = width - margin.left - margin.right;
        var innerHeight = height - margin.top - margin.bottom;

        // Create scales
        var xScale = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, innerWidth])
            .padding(0.1);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([innerHeight, 0]);

        // Clear the SVG to prevent duplications
        svg.selectAll("*").remove();

        var g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X-axis
        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));

        // Y-axis
        g.append("g")
            .call(d3.axisLeft(yScale));

        // Bars
        g.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.name))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.value))
            .attr("fill", "#10439F");
    }
    // Draw for the first time to initialize.
    redraw(false);
    // Redraw to display after 1000ms
    setTimeout(() => redraw(true), 1000);
}