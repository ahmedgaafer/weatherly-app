import React, { useCallback, useEffect, useRef, useState } from "react";
import { dashboardWeather } from "../../app/appSlice";
import { useSelector } from "react-redux";
import { selectImperial } from "../Switch/switchSlice";
import * as d3 from "d3";
import * as d3Legend from "d3-svg-legend";

function HeatGraph() {
	const imperial = useSelector(selectImperial);
	const svgRef = useRef();
	const [client, setClient] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const handleResize = () => {
		setClient({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	const createGradientHeatGraph = useCallback(
		(hourlyData, options) => {
			const timeMap = {
				0: 0,
				300: 3,
				600: 6,
				900: 9,
				1200: 12,
				1500: 15,
				1800: 18,
				2100: 21,
			};

			let dataObject = hourlyData.map((hour) => {
				return {
					time: timeMap[hour.time],
					temp: imperial ? Number(hour.tempF) : Number(hour.tempC),
				};
			});

			dataObject = [
				...dataObject,
				{
					title: `Temperature ${imperial ? "F" : "C"}`,
					y: `${imperial ? "F" : "C"}`,
				},
			];

			const margin = { top: 20, right: 30, bottom: 20, left: 40 };
			const pushHeight = 80;
			const svg = d3
				.select(svgRef.current)
				.attr("viewBox", [
					-15,
					0,
					options.width,
					options.height + pushHeight + 5,
				])
				.attr("id", "svg-heat-graph")
				.style("background-color", "#393E46")
				.style("border-radius", "10px")
				.style("margin-top", "20px")
				.style("padding", "10px");

			svg.selectAll("*").remove();

			const y = d3
				.scaleLinear()
				.domain(d3.extent(dataObject, (d) => d.temp))
				.range([options.height - margin.bottom, margin.top - pushHeight]);

			const x = d3
				.scaleLinear()
				.domain(d3.extent(dataObject, (d) => d.time))
				.range([margin.left, options.width - margin.right]);

			const yAxis = (g) =>
				g
					.attr("transform", `translate(${margin.left},${pushHeight})`)
					.call(d3.axisLeft(y))
					.call((g) => g.select(".domain").remove())
					.call((g) =>
						g
							.select(".tick:last-of-type text")
							.append("tspan")
							.text(dataObject.y),
					);

			const xAxis = (g) =>
				g
					.attr(
						"transform",
						`translate(0,${options.height - margin.bottom + pushHeight})`,
					)
					.style("padding", "10px")
					.call(
						d3
							.axisBottom(x)
							.ticks(options.width / 80)
							.tickSizeOuter(0),
					)
					.call((g) => g.select(".domain").remove());

			svg.append("g").call(xAxis);
			svg.append("g").call(yAxis);
			const color = d3.scaleSequential(y.domain(), d3.interpolateTurbo);
			const line = d3
				.line()
				.x((d) => x(d.time))
				.y((d) => y(d.temp))
				.curve(d3.curveStep);

			svg
				.append("linearGradient")
				.attr("gradientUnits", "userSpaceOnUse")
				.attr("id", "grad")
				.attr("x1", 0)
				.attr("y1", options.height - margin.bottom)
				.attr("x2", 0)
				.attr("y2", margin.top)
				.selectAll("stop")
				.data(d3.ticks(0, 1, 10))
				.join("stop")
				.attr("offset", (d) => d)
				.attr("stop-color", color.interpolator());

			svg
				.selectAll(".line")
				.data([dataObject])
				.join("path")
				.attr("transform", `translate(0,${pushHeight - 5})`)
				.attr("d", (d) => line(d))
				.attr("fill", "none")
				.attr("stroke", "url(#grad)");

			svg
				.append("g")
				.attr("class", "legendSizeLine")
				.attr("transform", "translate(40, -20)")
				.style("font-size", "12px");

			const legend = d3Legend
				.legendColor()
				.orient("horizontal")
				.cells(10)
				.shapeHeight(5)
				.shapeWidth(30)
				.labelAlign("start")
				.scale(color)
				.labelFormat(d3.format(".0f"))
				.title(`Temperature ${imperial ? "F" : "C"}`);

			svg.select(".legendSizeLine").style("color", "white").call(legend);

			svg
				.append("text")
				.attr("class", "x label")
				.attr("text-anchor", "end")
				.attr("x", options.width + 50)
				.attr("y", options.height + 10)
				.text("(Hour)");

			svg
				.append("text")
				.attr("class", "y label")
				.attr("text-anchor", "end")
				.attr("y", -80)
				.attr("x", -options.height / 2)

				.attr("dy", pushHeight)
				.attr("transform", "rotate(-90)")
				.attr("padding", "10px")
				.text(`Degrees in ${imperial ? "Fahrenheit " : "Celsius"}`);
		},
		[imperial],
	);

	const weatherData = useSelector(dashboardWeather);

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		if (weatherData && !weatherData.error) {
			console.log(weatherData);
			createGradientHeatGraph(weatherData?.weather[0]?.hourly, {
				width: Math.max(
					document.documentElement.clientWidth || 0,
					window.innerWidth || 0,
				),
				height:
					Math.max(
						document.documentElement.clientHeight || 0,
						window.innerHeight || 0,
					) * 0.2,
			});
			console.log("data");
		} else {
			console.log(weatherData);
			weatherData &&
				alert(weatherData.error[0].msg + "  Please pick another date");
		}

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [weatherData, imperial, createGradientHeatGraph, client]);
	return (
		<>
			<div id="headGradient">
				<svg ref={svgRef} />
			</div>
		</>
	);
}

export default HeatGraph;
