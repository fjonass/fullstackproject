document.getElementById("searchButton").addEventListener("click", search_items);

function search_items(event) {
  // javascript:location.href='./itemListPage';
  event.preventDefault();
  let input = document.getElementById("search").value;
  input = input.toLowerCase();
  console.log("input: " + input);

  // get json
  let allData = "./resources/data/data.json";
  fetch(allData)
    .then((res) => res.json())
    .then((data) => {
    // compare input with json data
      for (i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(input)) {
          console.log("yes: " + data[i].name); // todo, display data[i]
        } else {
          console.log("no"); // do nothing
        }
      }
    });
 
}
