setInterval(() => {
    let today = new Date();
    document.getElementById("time").innerHTML = today.toLocaleString('en-IN', { timeZone: "Asia/Kolkata" });
}, 0);


function update() {
    item = document.getElementById("item").value;
    desc = document.getElementById("desc").value;
    dt = document.getElementById("dt").value;

    if (localStorage.getItem('itemlogs') == null) {
        a = [];
        a.push([item, desc, dt]);
        localStorage.setItem('itemlogs', JSON.stringify(a));
    } else if (item == "") {
        alert("Please provide Appropriate To-Do item");
    } else {
        b = localStorage.getItem('itemlogs');
        a = JSON.parse(b);

        a.push([item, desc, dt]);
        localStorage.setItem('itemlogs', JSON.stringify(a));
    }

    document.getElementById("item").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("dt").value = "";

    view();

}


function view() {
    table = document.getElementById("table");
    let s = "";
    if (localStorage.getItem('itemlogs') == null) {
        a = [];
        localStorage.setItem('itemlogs', JSON.stringify(a));
    } else { 
        b = localStorage.getItem('itemlogs');
        a = JSON.parse(b);
    }

    a.forEach((element, index) => {
        s += `<tr>
        <th scope="row ">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td><button id="eb" class="btn btn-sm btn-outline-info" onclick="edit(${index})">Edit</button></td>
        <td><button class="btn btn-sm btn-outline-danger" onclick="del(${index})">Remove</button></td>
        </tr>`
    });
    table.innerHTML = s;
}

view();

add = document.getElementById("add");
add.addEventListener('click', update);


function edit(index_del) {

    b = localStorage.getItem('itemlogs');
    a = JSON.parse(b);

    a.forEach((element, index) => {

        if (index == index_del) {

            $('#alertb').css('display', 'block');

            document.getElementById("item").value = element[0];
            document.getElementById("desc").value = element[1];
            document.getElementById("dt").value = element[2];

            a.splice(index_del, 1);

            localStorage.setItem('itemlogs', JSON.stringify(a));
            view();

        }
    });
};

function del(index_del) {
    if (confirm(`Are you sure to remove item at index: ${index_del + 1} ?`)) {
        b = localStorage.getItem('itemlogs');
        a = JSON.parse(b);
        a.splice(index_del, 1);
        localStorage.setItem('itemlogs', JSON.stringify(a));
        view();
    }
};

function clearing() {
    if (confirm("Are you sure to clear all to-Do items ?")) {
        localStorage.clear();
        view();
    }
}

function searching() {
    var input, filter, table, tr, td1, td2, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName("td")[0];
        td2 = tr[i].getElementsByTagName("td")[1];
        td3 = tr[i].getElementsByTagName("td")[2];
        if (td1 || td2 || td3) {
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            txtValue3 = td3.textContent || td3.innerText;
            if (txtValue1.toUpperCase().indexOf(filter) > -1 ||
                (txtValue2.toUpperCase().indexOf(filter) > -1) ||
                (txtValue3.toUpperCase().indexOf(filter) > -1)) {

                tr[i].style.display = "";

            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("mytable");
    switching = true;

    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

