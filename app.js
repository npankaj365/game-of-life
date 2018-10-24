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
    console.log("Received ", r, c)
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

var next_gen = function(r, c){
    var tbl_body = document.getElementById("grid_body");
    var t_row, t_cell;
    var neighbors  = [[]];
    for(var i=0; i<r; i++){
        t_row = tbl_body.childNodes[i];
        for(var j=0; j<c; j++){
            t_cell = t_row.childNodes[j];
            // changeState(t_cell);
            console.log("Going to count neighbors for " + i + ":" + j);
            neighbors[i][j] = findActiveNeighbors(i, j, r, c);
            console.log("Neighbors counted for " + i + ":" + j);
            // console.log("Neighbors of " + i + ":" + j + " is " + findActiveNeighbors(i, j, r, c));
            // t_cell.innerText = neighbors[i][j];
        }
    }
    console.log("Reached Here");
    for (var i=0; i<r; i++){
        console.log("Reached Here 2");
        for(var j=0; j<c; j++){
            console.log("Reached Here 3");
            //Underpopulation
            if (neighbors[i][j] < 2)
                t_cell.className = "inactive";
            else if (neighbors[i][j] > 3)
                t_cell.className = "inactive";
            else if (neighbors[i][j] == 2 || neighbors[i][j] == 3)
                t_cell.className = t_cell.className;
            else
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
    console.log("Looking for neighbors of Cell " + r + ":" + c);
    let count = 0;
    let tbl_body = document.getElementById("grid_body");
    let t_row, t_cell;
    var r_min = (r==0)?r:r-1;//0
    var r_max = (r==rr-1)?r:r+1;//2
    var c_min = (c==0)?c:c-1;//0
    var c_max = (c==cc-1)?c:c+1;//1
    console.log("Before the loop, we have r_min:" + r_min + " r_max:" + r_max + " c_min:" + c_min + " c_max:" + c_max);
    for(var i=r_min; i<=r_max; i++){
        console.log("Start of Row:" + i);
        t_row = tbl_body.childNodes[i];
        for(var j=c_min; j<=c_max; j++){
            t_cell = t_row.childNodes[j];
            console.log("Currently at cell:" + i + ":" + j);
            if(t_cell.className == "active" && !(i==r && j==c))
            {
                count++;
                console.log("Count increased for cell:"+ i + ":" + j + " to " + count);
            }    
        }
        console.log("Completion of Row:"+i);
    }
    console.log("Returning count for Cell "+ r + ":" + c);
    return count;
}