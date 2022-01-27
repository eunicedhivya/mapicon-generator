function progressChart(selection, inputdata, props) {

    var container = d3.select(selection)
    container.html(null)

    var addRootDiv = container.append("div")
        .attr("class", "progress-chart")
        .html(function (d) {
            var html = '<div class="progress-chart-inner" style="width:' + inputdata + '%;background-color: ' + props.color + ';">'
            html += inputdata + props.suffix
            html += '</div>'

            return html
        })


}


