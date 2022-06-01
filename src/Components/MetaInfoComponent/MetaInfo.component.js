import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./style.css";

function MetaInfoComponent(props) {
	const { title, timeOut, info, sign } = props;

	const svgRef = useRef();
	useEffect(() => {
		const percent = info;
		const ratio = percent / 100;

		const w = 100,
			h = 100;

		const outerRadius = w / 2 - 10;
		const innerRadius = outerRadius - 5;

		const color = ["lightblue", "#08cdd7", "#222831"];

		d3.select(svgRef.current).selectAll("*").remove();
		const svg = d3
			.select(svgRef.current)
			.attr("width", w)
			.attr("height", h)
			.attr("class", "shadow")
			.append("g")
			.attr("transform", `translate(${w / 2},${h / 2})`);

		createGradient(svg, "gradient", color[0], color[1]);

		const arc = d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(0)
			.endAngle(2 * Math.PI);

		const arcLine = d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(0);

		svg.append("path").attr("d", arc).attr("fill", color[2]);

		const pathChart = svg
			.append("path")
			.datum({ endAngle: 0 })
			.attr("d", arcLine)
			.style("fill", "url(#gradient)");

		const middleCount = svg
			.append("text")
			.text(function (d) {
				return d;
			})
			.attr("text-anchor", "middle")
			.attr("dy", h / 10)
			.attr("dx", 0)
			.attr("class", "middleText")
			.style("font-size", `${w / 4}px`)
			.style("fill", color[1]);

		svg
			.append("text")
			.text(sign)
			.attr("text-anchor", "middle")
			.attr("dy", h / 30)
			.attr("dx", w / 5)
			.attr("class", "percent")
			.style("font-size", `${w / 5}px`)
			.style("fill", color[1]);

		// animation
		const arcTween = function (transition, newAngle) {
			transition.attrTween("d", function (d) {
				const interpolate = d3.interpolate(d.endAngle, newAngle);
				const interpolateCount = d3.interpolate(0, percent);
				return function (t) {
					d.endAngle = interpolate(t);
					middleCount.text(Math.floor(interpolateCount(t)));
					return arcLine(d);
				};
			});
		};

		const animate = function () {
			pathChart
				.transition()
				.duration(750)
				.ease(d3.easeCubic)
				.call(arcTween, 2 * Math.PI * ratio);
		};

		setTimeout(animate, timeOut);
	}, [timeOut]);

	const createGradient = (svg, id, color1, color2) => {
		const defs = svg.append("svg:defs");

		const red_gradient = defs
			.append("svg:linearGradient")
			.attr("id", id)
			.attr("x1", "0%")
			.attr("y1", "0%")
			.attr("x2", "50%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");

		red_gradient
			.append("svg:stop")
			.attr("offset", "50%")
			.attr("stop-color", color1)
			.attr("stop-opacity", 1);

		red_gradient
			.append("svg:stop")
			.attr("offset", "100%")
			.attr("stop-color", color2)
			.attr("stop-opacity", 1);
	};

	return (
		<div className="widget">
			<div className="header">{title}</div>
			<div className="chart-container">
				<svg ref={svgRef}></svg>
			</div>
		</div>
	);
}

export default MetaInfoComponent;
