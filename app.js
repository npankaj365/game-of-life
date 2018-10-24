var ask_row_col = function(){
    var row = prompt("How many rows?");
    var col = prompt("How many cols?");
    generate_table(row, col);
}

var generate_table = function(r, c){
    var body = document.getElementsByTagName("body")[0];
    var tbl = document.createElement("table");
    var tbl_body = document.createElement("tbody");
    tbl_body.setAttribute("id", "grid_body");
    for(var i=0; i<r; i++){
        var row = tbl_body.insertRow(-1);
        for(var j=0; j<c; j++){
            let cell = row.insertCell(-1);
            cell.className = "inactive";
            cell.addEventListener("click", function(){
                changeState(cell);
            });
        }
    }
    tbl.appendChild(tbl_body);
    body.appendChild(tbl);

    var btn = document.createElement("button");
    btn.innerText = "Next Gen";
    btn.id = "next_gen_btn";
    btn.addEventListener("click", function(){
        next_gen(r, c);
    });
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

//Douglas Crockford's Array Extension
Array.matrix = function(numrows, numcols, initial){
    var arr = [];
    for (var i = 0; i < numrows; ++i){
       var columns = [];
       for (var j = 0; j < numcols; ++j){
          columns[j] = initial;
       }
       arr[i] = columns;
     }
     return arr;
 }

var next_gen = function(r, c){
    var tbl_body = document.getElementById("grid_body");
    var t_row, t_cell;
    var neighbors = Array.matrix(r,c,0);
    for(var i=0; i<r; i++){
        t_row = tbl_body.childNodes[i];
        for(var j=0; j<c; j++){
            t_cell = t_row.childNodes[j];
            neighbors[i][j] = findActiveNeighbors(i, j, r, c);
            // t_cell.innerText = neighbors[i][j]; // Useful to see the number of active neighbors
        }
    }
    for (var i=0; i<r; i++){
        t_row = tbl_body.childNodes[i];
        for(var j=0; j<c; j++){
            t_cell = t_row.childNodes[j];
            
            if (neighbors[i][j] < 2) //Underpopulation
                t_cell.className = "inactive";
            else if (neighbors[i][j] > 3) //Overpopulation
                t_cell.className = "inactive";
            else if (t_cell.className == "active" && (neighbors[i][j] == 2 || neighbors[i][j] == 3)) //Staying in Place
                t_cell.className = t_cell.className;
            else if (t_cell.className == "inactive" && neighbors[i][j] == 3) //Procreation
                t_cell.className = "active";
        }
    }
}

var changeState = function(cell) {
    if (cell.className == "inactive")
        cell.className = "active";
    else
        cell.className = "inactive";
}

var findActiveNeighbors = function(r, c, rr, cc) {
    let count = 0;
    let tbl_body = document.getElementById("grid_body");
    let t_row, t_cell;
    var r_min = (r==0)?r:r-1;
    var r_max = (r==rr-1)?r:r+1;
    var c_min = (c==0)?c:c-1;
    var c_max = (c==cc-1)?c:c+1;
    for(var i=r_min; i<=r_max; i++){
        t_row = tbl_body.childNodes[i];
        for(var j=c_min; j<=c_max; j++){
            t_cell = t_row.childNodes[j];
            if(t_cell.className == "active" && !(i==r && j==c))
            {
                count++;
            }    
        }
    }
    return count;
}