function progressiveMenu(itemList, selector, type, dataselector) {
    document.getElementById(selector).innerHTML = "";
    document.getElementById(selector).innerHTML = '<option value="#">Change ' + type + '</option>';
    itemList.forEach(function (obj) {
        console.log("progressiveMenu", obj);
        var createListEleme = document.createElement("option");
        createListEleme.value = "#";
        createListEleme.innerHTML = obj[dataselector];
        document.getElementById(selector).appendChild(createListEleme);
    });
}

// progressiveMenu(itemList, 'constituency_search_list')