
id=2022548738;
fetch('/getMatchData?id='+id,{method:'GET'}) // Send
  .then(response => response.json())
  .then(data => {
    // Access required fields from the JSON data
    console.log(data);
    
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
