function constituencuJumpList(inputdata) {
    console.log("constituencuJumpList", inputdata);
    document.getElementById('const-jump-list').innerHTML = "";
    inputdata.forEach(function (d) {
        var createListEleme = document.createElement("li");
        var createA = document.createElement("a")
        createA.href = "constituency.html";
        createA.innerHTML = d.constName;
        createListEleme.appendChild(createA);
        document.getElementById('const-jump-list').appendChild(createListEleme);
    });
}

$('.alphabeticFilter a').on("click", function (e) {
    e.preventDefault();

    // $('#const-jump-list').css("display", "flex");
    $('.alphabeticFilter a').removeClass("active");
    $(this).addClass("active");

    var getVal = $(this).html()

    var fdList = constList[chosenState].filter(function (obj) {
        return obj.constName[0] === getVal;
    })
    if (fdList.length !== 0) {
        $('#const-jump-list').css("display", "flex");
        $('#noconstdata').css("display", "none");
        constituencuJumpList(fdList)
    } else {
        $('#const-jump-list').css("display", "none");
        $('#noconstdata').css("display", "block");
    }


})