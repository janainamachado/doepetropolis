$(document).ready(function(){
    $("#city-search").on("keyup", (e) => {
        let cityQuery = e.target.value;
        searchTable(cityQuery)
    })
});

function searchTable(filter) {
  let table, tr; 
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      let txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}