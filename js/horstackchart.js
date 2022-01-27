// votesharedata = 



function drawHorizontalStackChart(selection, stackdata, props) {
    // console.log(stackdata);

    var hordivcont = d3.select(selection)
    hordivcont.html(null)

    var addContainer = hordivcont.append("div")
        .attr("class", "horbarchart")

    if (props.suffix !== "" && props.type === "Voteshare") {
        addContainer.attr("data-label", props.type + " (" + props.suffix + ")")
    } else {
        addContainer.attr("data-label", props.type)
    }

    console.log(props.suffix);

    if (props.type === "Seats") {
        addContainer.attr("data-label", props.type + " (" + props.suffix + ")")
    }

    var addLegend = hordivcont.append("div")
        .attr("class", "horbarchart-legend")
        .style("width", "fit-content")
        .style("margin", "0 auto")

    var block = addContainer.selectAll(".block")
        .data(stackdata).enter()
        .append("div").attr("class", "block")
        .style("display", "inline-block")
        .style("height", "28px")

    block.transition().duration(800)
        .style("background-color", function (d, i) {
            if (d[props["label"]] !== "undecided") {
                return partycolors[d[props["label"]]];
            } else {
                return "#e8e8e8"
            }
        })
        .style("width", function (d, i) {
            return d[props["valueper"]] + "%";
        })


    if (props.legend === true) {

        addLegend.selectAll(".legend-block")
            .data(stackdata).enter()
            .append("div").attr("class", "legend-block")
            .style("background-color", function (d, i) {
                if (d[props["label"]] !== "undecided") {
                    return partycolors[d[props["label"]]];
                } else {
                    return "#e8e8e8"
                }
            })
            .style("width", "25px")
            .style("height", "8px")
            .style("text-align", "center")
            .style("font-size", "14px")
            .style("display", "inline-block")
            .html(function (d, i) {
                if (props.suffix !== "" && props.type === "Voteshare") {
                    var html = '<span class="partylabel" style="display:block;font-weight:bold;margin: 10px 0 0 0;">' + d[props["label"]] + '</span> <span class="value">' + d[props["value"]] + props.suffix + '</span>'
                } else {
                    var html = '<span class="partylabel" style="display:block;font-weight:bold;margin: 10px 0 0 0;">' + d[props["label"]] + '</span> <span class="value">' + d[props["value"]] + '</span>'
                }

                return html;
            })
            .style("margin", "0 15px 0 15px")
            .style("transform", "translateY(-20px)")
            .style("opacity", 0)
            .transition().duration(800)
            .style("transform", "translateY(0)")
            .style("opacity", 1)

    }





} // end of horstackchart

// function progressChart(selection, inputdata, props) {

//     var container = d3.select(selection)
//     container.html(null)

//     var addRootDiv = container.append("div")
//         .attr("class", "progress-chart")
//         .html(function (d) {
//             var html = '<div class="progress-chart-inner" style="width:' + inputdata + '%;background-color: ' + props.color + ';">'
//             html += inputdata + props.suffix
//             html += '</div>'

//             return html
//         })


// }


