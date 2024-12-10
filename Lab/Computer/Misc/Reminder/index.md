% #remind_for_mech21
%
%


<div id="maintable"></div>
<script>
fetch("https://kanade-k-1228.github.io/remind-for-mech21/data.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const table = timetable(data);
        document.getElementById("maintable").appendChild(table);
    });
function timetable(json) {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    const keys = ["date", "time", "tweet"];
    keys.forEach((key) => {
        var th = document.createElement("th");
        th.textContent = key;
        tr.appendChild(th);
    });
    table.appendChild(tr);
    json.forEach((item) => {
        var tr = document.createElement("tr");
        keys.forEach((key) => {
            var td = document.createElement("td");
            td.textContent = item[key];
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    return table;
}
</script>
