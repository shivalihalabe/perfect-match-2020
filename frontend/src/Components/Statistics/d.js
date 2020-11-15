
		var data; 
		var padding = 50;

		function getSummary(str) {
			var map = new Map();

			for (var i = 0; i < data.length; i++) {
				var key = data[i][str];
				if (!map.has(key)) {
					map.set(key, 1);
				} else {
					map.set(key, map.get(key)+1);
				}
			}

			var sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
			var keys = Array.from(sortedMap.keys());
			for (var i = 0; i < keys.length; i++) {
				console.log(keys[i] + ": " + map.get(keys[i]));
			}
			
		}

		// delete in final version 
		function countFM() {
			var mCount = 0, fCount = 0, nCount = 0;

			for (var i = 0; i < data.length; i++) {
				if (data[i]["gender"] == "female") {
					fCount++;
				} else if (data[i]["gender"] == "male") {
					mCount++;
				} else {
					nCount++;
				}
			}
		}

		const requestData = async () => {
			data = await d3.csv("AnonData.csv");

		};

		requestData();
	
		let totalMale = 1660;
		let totalFemale = 2437;
		let nonBinary = 0;

		let totalFaculty = 3;
		let totalAlum = 69;
		let totalSenior = 787;
		let totalJunior = 919;
		let totalSoph = 1175;
		let totalFreshmen = 969; 

		let totalArts = 1202;
		let totalCals = 1065;
		let totalEngineering = 930;
		let totalHumec = 324;
		let totalIlr = 274;
		let totalHotel = 219;
		let totalAap = 83;

		let totalWillSee = 3088;
		let totalMeetFriends = 630;
		let totalMeetFam = 169;
		let totalMarried = 124;
		let totalOneNight = 72;

		runFinalVersion();

		function createGenderData() {
			return [
				{"key": "male", "value": totalMale}, 
				{"key": "female", "value": totalFemale},
				{"key": "non-binary", "value": 0}
			];
		}


		function createYearData() {
			return [
				{"key": "freshmen", "value": totalFreshmen}, 
				{"key": "soph", "value": totalSoph},
				{"key": "junior", "value": totalJunior},
				{"key": "senior", "value": totalSenior},
				{"key": "alum", "value": totalAlum},
				{"key": "faculty", "value": totalFaculty}
			];
		}

		function createCollegeData() {
			return [
				{"key": "aap", "value": totalAap}, 
				{"key": "arts", "value": totalArts},
				{"key": "cals", "value": totalCals},
				{"key": "engineering", "value": totalEngineering},
				{"key": "hotel", "value": totalHotel},
				{"key": "humec", "value": totalHumec},
				{"key": "ilr", "value": totalIlr}
			];
		}

		function createRelData() {
			return [
				{"value": totalOneNight, "key": "just looking for one night", "emoji": "🌃"},
				{"value": totalWillSee, "key": "we'll see how it goes", "emoji": "🤷"},
				{"value": totalMeetFriends, "key": "you can meet my friends", "emoji": "👯"},
				{"value": totalMeetFam, "key": "you can meet my family", "emoji": "👪"},
				{"value": totalMarried, "key": "let's get married", "emoji": "👰"}
			];
		}

		function createFirstData() {
			return [
				{"key": "restaurant in the Commons", "value": 1007},
				{"key": "boba", "value": 717},
				{"key": "Collegetown Bagels", "value": 658}
			];
		}

		function createWeekendData() {
			return [
				{"key": "Louie's Truck", "value": 1259},
				{"key": "Wings", "value": 1169},
				{"key": "Sushirrito", "value": 643}
			];
		}

		function createBudgetData() {
			return [
				{"key": "Terrace", "value": 892},
				{"key": "Mac's", "value": 808},
				{"key": "Libe Cafe", "value": 735}
			];
		}

        
		function runFinalVersion() {
			drawBarChart();
			drawBarChart2();
			createButtonToggles();
		}

		function getBarX(data, xd) {
			return d3.scaleBand()
				.domain(data.map(function(d) {return d[xd];}))
				.range([padding*2, 600-padding*2]);
		}

		function getBarY(data) {
			return d3.scaleLinear()
				.domain([-10, d3.max(data, function(d) {return d.value;})])
				.range([350-padding, padding]);
		}

		function drawBars(svg, x, y, data, maxBarHeight, barWidth, color) {
			svg.selectAll(".bars")
				.data(data)
				.enter()
				.append("rect")
					.attr("x", function(d) {return x(d.key);})
					.attr("y", function(d) {return y(0);})
					.attr("fill", function(d) {return color;})
					.attr("height", function(d) {return maxBarHeight - y(0);})
					.attr("width", barWidth);
			svg.selectAll("rect")
				.transition()
				.duration(800)
				.attr("y", function(d) {return y(d.value);})
				.attr("height", function(d) {return maxBarHeight - y(d.value);})
				.delay(function(d, i) {return i*100;});
		}

		function drawTotalText(barSvg, x, y, data, barWidth, gutter) {
		    barSvg.selectAll(".total_text")
		    	.data(data)
				.enter()
		    	.append("text")
		    		.attr("class", "total_text")
		    		.text(function(d) {return d.value})
		    		.attr("x", function(d) {return x(d.key) + barWidth/2;})
					.attr("y", function(d) {return y(d.value + gutter);})
					.style("text-anchor", "middle")
					.style('fill', '#f8f8f8')
					.style("font-family", "Inconsolata")
		        	.style("font-size", "0.8vw")
		        	.style("opacity", 0);

		    barSvg.selectAll(".total_text")
		    	.transition()
		    	.duration(900)
		    	.style("opacity", 1)
		    	.delay(function(d, i) {return i*100;});
		}

		function wrap(text, width) {
			text.each(function() {
			var text = d3.select(this),
			    words = text.text().split(/\s+/).reverse(),
			    word,
			    line = [],
			    lineNumber = 0,
			    lineHeight = 1.1,
			    y = text.attr("y"),
			    dy = parseFloat(text.attr("dy")),
			    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
			while (word = words.pop()) {
			  line.push(word);
			  tspan.text(line.join(" "));
			  if (tspan.node().getComputedTextLength() > width) {
			    line.pop();
			    tspan.text(line.join(" "));
			    line = [word];
			    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			  }
			}
			});
		}

		function handleBarLegendChange(d, circle_id) {
			d3.selectAll(circle_id)
				.transition()
				.duration(500)
				.style("fill", "#f8f8f8");

			d3.select("#key_" + d)
				.transition()
				.duration(500)
				.style("fill", "#505050");
		}

		function drawBarChart() {
			var maxBarHeight = 400 - padding*2;
			var barWidth = 80;

			let genderData = createGenderData();
			let yearData = createYearData();
			let collegeData = createCollegeData();
			
			var isGender = false;
			var isYear = false;
			var isCollege = false;

			let barSvg = d3.select('#bar')
				.append('g')
				.attr("transform", "translate(" + padding*1.5 + "," + padding+ ")");

			var x = getBarX(genderData, "key");
			var y = getBarY(genderData);

			drawBars(barSvg, x, y, genderData, maxBarHeight, barWidth, "#A7333F");

			// add x axis
			barSvg.append("g")
				.attr("class", "x_axis")
				.attr("transform", "translate(" + (-1*padding/2) + ", " + (maxBarHeight) + ")")
				.call(d3.axisBottom(x))
				.style('fill', '#f8f8f8')
				.style("font-family", "Inconsolata")
		        .style("font-size", "0.8vw")
		        .select(".domain").remove();

		    drawTotalText(barSvg, x, y, genderData, barWidth, padding);

		    barSvg.append("g")
		    	.attr("class", "notes")
		    	.attr("id", "bar_gender_notes")
		    	.attr("transform", "translate(" + (x("non-binary")-padding+10) + ",0)")
		    	.call(d3.axisLeft(d3.scaleLinear().domain([]).range([y(totalMale), y(totalFemale)])).ticks(2).tickFormat("").tickSize(5))
		    	.style("opacity", 0);
		    barSvg.append("text")
		     	.attr("class", "notes")
            	.attr("id", "bar_gender_notes")
                .attr("x", x("non-binary")-35)
                .attr("y", y((totalFemale+totalMale)/2))
                .text("There are almost 50% more")
                .style('fill', '#f8f8f8')
                .style("font-family", "Inconsolata")
		        .style("font-size", "0.9vw")
		        .style("opacity", 0);
		    barSvg.append("text")
		     	.attr("class", "notes")
            	.attr("id", "bar_gender_notes")
                .attr("x", x("non-binary")-35)
                .attr("y", y((totalFemale+totalMale)/2)+15)
                .text("female participants than male.")
                .style('fill', '#f8f8f8')
                .style("font-family", "Inconsolata")
		        .style("font-size", "0.9vw")
		        .style("opacity", 0);
		    d3.selectAll("#bar_gender_notes")
		    				.transition()
		    				.duration(900)
		    				.style("opacity", 1);

		    var yearX = getBarX(yearData, "key");
		    var yearY = getBarY(yearData);

		    // text for faculty
            barSvg.append("path")
		    	.attr("class", "notes")
		    	.attr("id", "bar_year_notes")
                .attr("transform", "translate(" + (yearX("faculty")+20) + "," + (padding*3.5) + ")")
                .attr('d', ("M"+ (1) +"," + (padding*2) + "V" + (padding+10)).toString())
                .style("stroke", "#f8f8f8")
                .style("opacity", 0);
            barSvg.append("text")
            	.attr("class", "notes")
            	.attr("id", "bar_year_notes")
                .attr("transform", "translate(" + (yearX("faculty")) + "," + (padding*4.25) + ")")
                .text("wonder who the 3")
                .style('fill', '#f8f8f8')
                .style("font-family", "Inconsolata")
		        .style("font-size", "0.9vw")
		        .style("opacity", 0);
		     barSvg.append("text")
		     	.attr("class", "notes")
            	.attr("id", "bar_year_notes")
                .attr("transform", "translate(" + (yearX("faculty")) + "," + (padding*4.25 + 15) + ")")
                .text("faculty members were? 🤔")
                .style('fill', '#f8f8f8')
                .style("font-family", "Inconsolata")
		        .style("font-size", "0.9vw")
		        .style("opacity", 0);

		   	// key for bar chart
		   	let barLegend = ["gender", "year", "college"];

		   	// create legend
		   	d3.select("#bar").append("g")
		   	.selectAll(".key")
		   		.data(barLegend)
		   		.enter()
		   		.append("circle")
		   		.attr("class", "legend_circles")
		   		.attr('id', function(d, i) { return "key_" + d;})
		    	.attr('cx', function(d, i) { return 630;})
		    	.attr('cy', function(d, i) { return 60 + i*30;})
		    	.attr('r', 8)
		    	.style('fill', '#f8f8f8')
		    	.style('stroke', '#505050')
		    	.style('stroke-width', 2)
		    	.on('click', function(d, i) {
		    		if (d == "gender") {
		    			handleBarLegendChange(d, ".legend_circles");

		    			x = getBarX(genderData, "key");
		    			y = getBarY(genderData);

		    			barSvg.selectAll("rect").remove();
		    			barSvg.selectAll(".total_text").remove();
		    			d3.selectAll(".notes")
		    				.transition()
		    				.duration(100)
		    				.style("opacity", 0);

		    			drawBars(barSvg, x, y, genderData, maxBarHeight, barWidth, "#A7333F");
		    			drawTotalText(barSvg, x, y, genderData, barWidth, padding);

		    			d3.selectAll(".x_axis")
		    				.transition()
		    				.duration(0)
		    				.call(d3.axisBottom(x))
		    				.attr("transform", "translate(" + (-1*padding/2) + ", " + (maxBarHeight) + ")")
		    				.select(".domain").remove();

		    			
		    			isGender = true;
		    			isYear = false;
		    			isCollege = false;

		    			d3.selectAll("#bar_gender_notes")
		    				.transition()
		    				.duration(900)
		    				.style("opacity", 1);

		    		} else if (d == "year") {
						handleBarLegendChange(d, ".legend_circles");
		    			
		    			x = getBarX(yearData, "key");
		    			y = getBarY(yearData);

		    			barSvg.selectAll("rect").remove();
		    			barSvg.selectAll(".total_text").remove();
		    			d3.selectAll(".notes")
		    				.transition()
		    				.duration(100)
		    				.style("opacity", 0);

		    			drawBars(barSvg, x, y, yearData, maxBarHeight, barWidth/2, "#A7333F");

		    			d3.selectAll(".x_axis")
		    				.transition()
		    				.duration(0)
		    				.call(d3.axisBottom(x))
		    				.attr("transform", "translate(" + (-1*padding/4) + ", " + (maxBarHeight) + ")")
		    				.style('fill', '#f8f8f8')
		    				.select(".domain").remove();

		    			drawTotalText(barSvg, x, y, yearData, barWidth/2, padding/2);

		    			isGender = false;
		    			isYear = true;
		    			isCollege = false;

		    			d3.selectAll("#bar_year_notes")
		    				.transition()
		    				.duration(900)
		    				.style("opacity", 1);

		    		} else if (d == "college") {
		    			handleBarLegendChange(d, ".legend_circles");

		    			x = getBarX(collegeData, "key");
		    			y = getBarY(collegeData);

		    			barSvg.selectAll("rect").remove();
		    			barSvg.selectAll(".total_text").remove();
		    			d3.selectAll(".notes")
		    				.transition()
		    				.duration(100)
		    				.style("opacity", 0);

		    			drawBars(barSvg, x, y, collegeData, maxBarHeight, barWidth/2, "#A7333F");

		    			d3.selectAll(".x_axis")
		    				.transition()
		    				.duration(0)
		    				.call(d3.axisBottom(x))
		    				.attr("transform", "translate(" + (-8) + ", " + (maxBarHeight) + ")")
		    				.select(".domain").remove();

		    			drawTotalText(barSvg, x, y, collegeData, barWidth/2, padding/2);

		    			isGender = false;
		    			isYear = false;
		    			isCollege = true;
		    		}
		    	});

		   	// create legend labels
		    d3.select("#bar").append("g")
		    .selectAll('.key_labels')
				.data(barLegend)
		    	.enter()
		    	.append('text')
		    	.attr('x', function(d, i) { return 650;})
		    	.attr('y', function(d, i) { return 64 + i*30;})
		    	.text(function(d) {return d;})
		    	.style('fill', '#505050')
		    	.style("font-family", "Inconsolata")
	   			.style("font-size", "0.9vw");
		}

		function drawBarChart2() {
			var maxBarHeight = 400 - padding*2;
			var barWidth = 35;

			let barRelSvg = d3.select('#bar_rel')
				.append('g')
				.attr("transform", "translate(" + padding*1.5 + "," + padding+ ")");

			var relData = createRelData();
			var x = getBarX(relData, "key");
			var xEmoji = getBarX(relData, "emoji");
			var y = getBarY(relData);

			var isEmoji = false;

			drawBars(barRelSvg, x, y, relData, maxBarHeight, barWidth, "#87333F");

			// add x axis
			barRelSvg.append("g")
				.attr("class", "x_axis_rel")
				.attr("id", "no_emoji_axis")
				.attr("transform", "translate(" + (-1*45/2) + ", " + (maxBarHeight) + ")")
				.call(d3.axisBottom(x).tickFormat(function(d) {return "\"" + d + "\"";}))
				.style("font-family", "Inconsolata")
		        .style("font-size", "0.8vw")
		        .selectAll(".tick text")
		        	.call(wrap, 70)
		        .style("opacity", 1);
		    barRelSvg.append("g")
				.attr("class", "x_axis_rel")
				.attr("id", "emoji_axis")
				.attr("transform", "translate(" + (-1*45/2) + ", " + (maxBarHeight) + ")")
				.call(d3.axisBottom(xEmoji).tickPadding(10))
				.style("font-family", "Inconsolata")
		        .style("font-size", "1.5vw")
		        .style("opacity", 0);

		    barRelSvg.select(".domain").remove();

		    drawTotalText(barRelSvg, x, y, relData, barWidth, padding);

		    let rel_keys = ["✨"];
		    // create legend
		   	d3.select("#bar_rel").append("g")
		   	.selectAll(".key")
		   		.data(rel_keys)
		   		.enter()
		   		.append("circle")
		   		.attr("class", "rel_circles")
		   		.attr('id', function(d, i) { return "key_" + d;})
		    	.attr('cx', function(d, i) { return 600;})
		    	.attr('cy', function(d, i) { return 100 + i*30;})
		    	.attr('r', 8)
		    	.style('fill', '#fbfbfb')
		    	.style('stroke', '#505050')
		    	.style('stroke-width', 2)
		    	.on("click", function(d) {
		    		if (d == "✨") {
		    			if (!isEmoji) {
		    				handleBarLegendChange(d, ".rel_circles");
		    				
		    				barRelSvg.selectAll("#no_emoji_axis")
		    					.transition()
		    					.duration(500)
		    					.style("opacity", 0);

		    				barRelSvg.selectAll("#emoji_axis")
		    					.transition()
		    					.duration(500)
		    					.style("opacity", 1);

		    				barRelSvg.select(".domain").remove();
		    			} else {
		    				handleBarLegendChange(".temp", ".rel_circles");

		    				barRelSvg.selectAll("#no_emoji_axis")
		    					.transition()
		    					.duration(500)
		    					.style("opacity", 1);

		    				barRelSvg.selectAll("#emoji_axis")
		    					.transition()
		    					.duration(500)
		    					.style("opacity", 0);

		    				barRelSvg.select(".domain").remove();
		    			}
		    			isEmoji = !isEmoji;
		    		}
		    	});

		    // create legend labels
		    d3.select("#bar_rel").append("g")
		    .selectAll('.key_labels')
				.data(rel_keys)
		    	.enter()
		    	.append('text')
		    	.attr('x', function(d, i) { return 620;})
		    	.attr('y', function(d, i) { return 104 + i*30;})
		    	.text(function(d) {return d;})
		    	.style("font-family", "Inconsolata")
	   			.style("font-size", "1.2vw");
		}

		var budgetData;
		var firstData;
		var weekenedData;

		function setUpToggle(toggle_id) {
			var toggle = document.getElementById(toggle_id);
			toggle.style.cursor = 'pointer';

			toggle.onmouseover = function() {
			    this.style.borderColor = '#FFB899';
			};
			toggle.onmouseleave = function() {
				if (this.style.backgroundColor == 'rgb(255, 209, 173)') {
					this.style.borderColor = '#FFD1AD';
				} else {
					this.style.borderColor = '#f8f8f8';
				}
			};
			toggle.onclick = function() {
				var children = document.getElementsByClassName('toggle');
				children[0].style.borderColor = '#f8f8f8';
				children[1].style.borderColor = '#f8f8f8';
				children[2].style.borderColor = '#f8f8f8';

				children[0].style.backgroundColor = '#f8f8f8';
				children[1].style.backgroundColor = '#f8f8f8';
				children[2].style.backgroundColor = '#f8f8f8';

				if (this.style.backgroundColor != 'rgb(255, 184, 153)') {
					this.style.borderColor = '#FFD1AD';
					this.style.backgroundColor = '#FFD1AD';
				} else {
					this.style.borderColor = '#f8f8f8';
					this.style.backgroundColor = '#f8f8f8';
				}

				if (this == children[0]) {
					d3.selectAll(".stats_text")
						.transition()
						.duration(500)
						.text(function(d, i) { return budgetData[i].value;});

					d3.selectAll(".stats_text_details")
						.transition()
						.duration(500)
						.text(function(d, i) { console.log(d);return "votes for " +budgetData[i].key;});
				} else if (this == children[1]) {
					d3.selectAll(".stats_text")
						.transition()
						.duration(500)
						.text(function(d, i) { return weekenedData[i].value;});

					d3.selectAll(".stats_text_details")
						.transition()
						.duration(500)
						.text(function(d, i) { return "votes for " +weekenedData[i].key;});
				} else if (this == children[2]) {
					d3.selectAll(".stats_text")
						.transition()
						.duration(500)
						.text(function(d, i) { return firstData[i].value;});

					d3.selectAll(".stats_text_details")
						.transition()
						.duration(500)
						.text(function(d, i) { return "votes for " +firstData[i].key;});
				}
			}
		}

		function createButtonToggles() {
			setUpToggle('toggle_budget');
			setUpToggle('toggle_first');
			setUpToggle('toggle_friday');

			budgetData = createBudgetData();
			firstData = createFirstData();
			weekenedData = createWeekendData();

			let statSvg = d3.select("#stats")
				.append('g');

			statSvg.selectAll(".stats_text")
				.data(budgetData)
				.enter()
				.append("text")
					.attr("class", "stats_text")
					.attr("x", function(d, i) {return (800/3)*(i+0.5)})
					.attr("y", 130)
					.text(function(d) {return d.value;})
					.style("text-anchor", "middle")
					.style("fill", "#505050")
					.style("font-family", "Inconsolata")
		        	.style("font-size", "5vw");

		    statSvg.selectAll(".stats_text_details")
				.data(budgetData)
				.enter()	
		        .append("text")
		        	.attr("class", "stats_text_details")
		        	.attr("x", function(d, i) {return (800/3)*(i+0.5)})
					.attr("y", 165)
					.text(function(d) {return "votes for " + d.key;})
					.style("text-anchor", "middle")
					.style("fill", "#f8f8f8")
					.style("font-family", "Inconsolata")
		        	.style("font-size", "1vw");
		}
		
