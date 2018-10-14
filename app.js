var ask_row_col = function(){
    var row = prompt("How many rows?");
    var col = prompt("How many cols?");
    generate_table(row, col);
}

var generate_table = function(r, c){
    var body = document.getElementsByTagName("body")[0];
    var tbl = document.createElement("table");
    var tbl_body = document.createElement("tbody");
    console.log("Received ", r, c)
    for(var i=0; i<r; i++){
        var row = tbl_body.insertRow(-1);
        for(var j=0; j<c; j++){
            var cell = row.insertCell(-1);
            cell.className = "inactive";
            cell.addEventListener("click", function(){
                if(this.className == "inactive")
                    this.className = "active";
                else
                    this.className = "inactive";
            });
        }
    }
    tbl.appendChild(tbl_body);
    body.appendChild(tbl);

    var btn = document.createElement("button");
    btn.innerText = "Next Gen";
    btn.id = "next_gen_btn";
    body.appendChild(btn);

    var btn2 = document.createElement("button");
    btn2.innerText = "Clear";
    btn2.id = "clear_btn";
    btn2.addEventListener("click", function(){
        var cells = document.getElementsByTagName("td");
        for(var i=0; i<cells.length; i++)
            cells[i].className = "inactive";
    });
    body.appendChild(btn2);
}