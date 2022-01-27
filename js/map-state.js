//format to substitute data with abreviation
var party_abrev = {
    "Bharatiya Janta Party":"BJP", 
    "Suheldev Bhartiya Samaj Party":"SBSP", 
    "Bahujan Samaj Party":"BSP", 
    "Samajwadi Party":"SP", 
    "Independent":"IND", 
    "Indian National Congress":"Congress", 
    "Apna Dal (Soneylal)":"APS", 
    "Rashtriya Lok Dal":"RLD", 
    "Nirbal Indian Shoshit Hamara Aam Dal":"NISHAD"
}

//format to substitute data with color
var partycolors = { 
    "BJP":	"#ff9900",
    "SBSP":	"red",
    "BSP":	"blue",
    "SP":	"red",
    "IND":	"grey",
    "Congress":	"red",
    "AD(S)": "#ff9900",
    "RLD":	"red",
    "NISHAD":	"#ff9900",
    "DDS":	"green",
    "Independent":	"grey",
    "OTH":	"grey",
    "undecided":"grey"
}

function drawAssemblyMap(selector, settings){
    var width = 430, height = 350; 
    var state = settings.statecode;
    var source = settings.mapsource;

    // empty selected container (required for redrawing map)
    d3.select(selector).html(null)

    // create and append svg to selected container with responsive setting
    var svg = d3.select(selector)
        .append("svg")
        .attr("class", settings.vhcode+"map")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .append("g")

    if (settings.type === "generic") {
        // var toolTip4Mob = d3.select(selector)
        //     .append("div")
        //     .attr("class", "tooltip-mobile")

        var tool_tip = d3.tip()
            .attr("class", "map-tooltip2")
            .offset([0, 0])
            .html(function (d) {

                
                var html = '<div class="tooltip-container">'
                html += '<div class="tooltip-header">'
                html += '<p>' + d.properties.ac_name + '</p>'
                html += '</div>'
                html += '</div>'


                // toolTip4Mob.html(html)

                return html;
            });
        svg.call(tool_tip);
        
    } else {

        var toolTip4Mob = d3.select(selector)
            .append("div")
            .attr("class", "tooltip-mobile")

        var tool_tip = d3.tip()
            .attr("class", "map-tooltip")
            .offset([120, 160])
            .html(function (d) {

                var fdFillData = constwisetrenddata2017["mapdata"].filter(function (r, j) {
                    return parseInt(r.constNo) === d.properties.ac;
                })

                var year2017 = fdFillData[0]["party2017"]
                var year2012 = fdFillData[0]["party2012"]
                // return partycolors[fdFillData[0]["party"+settings.year]];
                // var html = "Test" 
                var html = '<div class="tooltip-container">'
                html += '<div class="tooltip-header">'
                html += '<p>' + d.properties.ac_name + '</p>'
                html += '<p>General</p>'
                html += '</div>'
                html += '<div class="tooltip-content">'
                html += '<div class="datapoint">'
                html += '<p>2012</p>'
                html += '<span style="color:' + partycolors[year2012] + '">' + year2012 + '</span>'
                html += '</div>'
                html += '<div class="datapoint">'
                html += '<p>2017</p>'
                html += '<span style="color:' + partycolors[year2017] + '">' + year2017 + '</span>'
                html += '</div>'
                html += '<div class="datapoint">'
                html += '<p>2014 (LS)</p>'
                html += '<span style="color:' + partycolors[year2017] + '">' + year2017 + '</span>'
                html += '</div>'
                html += '</div>'
                html += '<div class="gotoLink">'
                html += '<a href="#">Go to Constituency >></a>'
                html += '</div>'
                html += '</div>'


                toolTip4Mob.html(html)

                return html;
            });
        svg.call(tool_tip);
        
    }

    

    var projection = d3.geoMercator()
        .scale(settings.scale)
        .center(settings.center)
        .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)
    
    d3.json(source, function(error, stateShape){
        
        // Converts and extracts topojson to map
        var stateconst = topojson.feature(stateShape, stateShape.objects.collection).features;
        // console.log(stateconst);

        if(settings.type === "generic"){
            svg.selectAll(".const")
                .data(stateconst).enter()
                .append("a")
                .attr("xlink:href", "#constituency.html")
                .append("path")
                .attr("d", geoPath)
                .attr("class", function (d) {
                    return "const c" + d.properties.ac;
                })
                .attr('stroke', "#fff")
                .attr('stroke-width', "0.4")
                .attr('fill', "#ccc")
                .on('mouseover', tool_tip.show) // to enable d3tip tooltips
                .on('mouseout', tool_tip.hide) // to disable d3tip tooltips
        }else{
            svg.selectAll(".const")
                .data(stateconst).enter()
                .append("a")
                .attr("xlink:href", "#constituency.html")
                .append("path")
                .attr("d", geoPath)
                .attr("class", function (d) {
                    return "const c" + d.properties.ac;
                })
                .attr('stroke', "#fff")
                .attr('stroke-width', "0.4")
                .attr('fill', "#fff")
                .on('mouseover', tool_tip.show) // to enable d3tip tooltips
                .on('mouseout', tool_tip.hide) // to disable d3tip tooltips
                .transition().duration(400)
                .attr('fill', function (d, i) {
                    console.log(d.properties);
                    var fdFillData = constwisetrenddata2017["mapdata"].filter(function (r, j) {
                        return parseInt(r.constNo) === d.properties.ac;
                    })
                    // console.log(fdFillData[0]);
                    return partycolors[fdFillData[0]["party" + settings.year]];
                    // return black;       
                })
        }

        svg.append("rect")
            .attr("class", "inset-rect")
            .attr("x", 0)
            .attr("width", 20)
            .attr("y", 0)
            .attr("height", 20)
            .attr("fill", "transparent")
            .attr("stroke", "black")
            .attr("stroke-width", "2px")
            .attr("stroke-opacity", "0")
            
            var selectBox = d3.select(selector)
                .append("select")
                .attr("class", "dropdown-mobile")
                // .append("option")
                // .html("Test")
                       
            // var selectDropdown = d3.select("#const-list")

            selectBox.html(null);
            
        var remappedList = stateconst.map(function(stateitm){
            return stateitm.properties
        })

        remappedList.unshift({ ac: 0, ac_name: 'Choose Constituency'})

        console.log(remappedList);
        
            var options = selectBox.selectAll('option')
                .data(remappedList).enter()
                .append('option')
                .attr("value", function (d) { 
                    return d.ac; 
                })
                .attr("data-id", function (d) { 
                    return d.ac; 
                })
                .text(function (d) {
                    return d.ac_name;
                }); 
            
        



            // $('#const-list').val(settings.defaultconst).trigger('change')

    }) // Statelevel Source

    
 

} // end of mapfunction
$(document).on('click', '.closeMobTooltip', function(){
    $(".map svg").animate({ 'margin-top': "0" });
    $('.tooltip-mobile').css('display', 'none')
    $(".const").removeClass("active")
})

$(document).on('change', '.dropdown-mobile', function(){
    var getThisData = $(this).val()
    // alert(getThisData);
    $(".const").removeClass("active")
    $(".c" + getThisData).addClass("active")
    var groupElement = document.querySelector(".c" + getThisData).getBBox();
    d3.select(".inset-rect").transition().duration(1500)
        .attr("x", groupElement.x)
        .attr("y", groupElement.y)
        .attr("width", groupElement.width)
        .attr("height", groupElement.height)
        .attr("stroke-opacity", 1);

     var fdFillData = constwisetrenddata2017["mapdata"].filter(function(r, j){
            return parseInt(r.constNo) === parseInt(getThisData);
     })

    // var year2022 = fdFillData[0]["party2022"]
    var year2017 = fdFillData[0]["party2017"]
    var year2012 = fdFillData[0]["party2012"]
        // return partycolors[fdFillData[0]["party"+settings.year]];
    // var html = "Test" 
    var html = '<div class="tooltip-container">'
            html += '<div class="tooltip-header">'
            html +=     '<p>'+fdFillData[0]["constituency"]+'</p>'
            html +=     '<p>General</p>'
            html +=     '<button class="closeMobTooltip">x</button>'
            html += '</div>'
            html += '<div class="tooltip-content">'
            html +=     '<div class="datapoint">'
            html +=         '<p>2012</p>'
            html +=         '<span style="color:'+partycolors[year2012]+'">'+year2012+'</span>'
            html +=     '</div>'
            html +=     '<div class="datapoint">'
            html +=         '<p>2017</p>'
            html +=         '<span style="color:'+partycolors[year2017]+'">'+year2017+'</span>'
            html +=     '</div>'
            html +=     '<div class="datapoint">'
            html +=         '<p>2014 (LS)</p>'
            html +=         '<span style="color:'+partycolors[year2017]+'">'+year2017+'</span>'
            html +=     '</div>'
            html += '</div>'
            html += '<div class="gotoLink">'
            html +=     '<a href="#">Go to Constituency >></a>'
            html += '</div>'
            html += '</div>'

//    $('.map svg').css('margin-top', '160px').fadeIn()
    $(".map svg").animate({ 'margin-top': "160px" });
   d3.select(".tooltip-mobile").html(html).style("display", "block")
   
});


// function displayConstituency(){

//     var chosenOption = $("#const-list").val();

//     d3.selectAll(".const").attr("stroke", "#fff").attr("stroke-width", "0.5")
    
//     d3.select(".c"+chosenOption).attr("stroke", "black").attr("stroke-width", "5")

//     filterNDisplay2017(parseInt(chosenOption));

// }


// function filterNDisplay2017(acno){
    
//     var fdTrendData2017 = constwisetrenddata2017.filter(function(obj){
//         return obj["constNo"] === acno;
//     })

//     d3.select(".const_name").html(fdTrendData2017[0]["constituency"])
//     d3.select(".status").html(fdTrendData2017[0]["status"])
//     d3.select(".leadCandName").html(fdTrendData2017[0]["leadingCandidate"] + " <span>("+party_abrev[fdTrendData2017[0]["leadingParty"]]+")</span>")
//     d3.select(".trailingCandName").html(fdTrendData2017[0]["trailingCandidate"] + " <span>("+party_abrev[fdTrendData2017[0]["trailingParty"]]+")</span>")
//     d3.select(".margin").html(fdTrendData2017[0]["margin"].toLocaleString('en-IN'))
// }

