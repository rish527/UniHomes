console.log("data");

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const id = getQueryParam('id');
// const id='2022548738';
console.log(id);




// Fetch JSON data from the API
fetch('/getUserData?id='+id,{method:'GET'}) // Send
  .then(response => response.json())
  .then(data => {
    // Access required fields from the JSON data
    console.log(data);
    const name = data.Name;
    const location = data.State;
    const gender = 'Male';
    const dob = '2002';
    const course = data.Course;
    
    document.getElementById('UserName').innerHTML=name;

    // Update profile and basic info sections
    document.querySelector('.name h2').innerHTML = name;
    document.querySelector('.location p').innerHTML = location;
    document.querySelector('.gender p').innerHTML = gender;
    document.querySelector('.dob p').innerHTML = dob;
    document.querySelector('.course p').innerHTML = course;



    document.querySelector('.nf1 .value').innerHTML = data.Year;
    document.querySelector('.nf2 .value').innerHTML = data.Sleep === 'before12' ? 'Before 12AM' : 'After 12AM';
    document.querySelector('.nf3 .value').innerHTML = data.Food;
    document.querySelector('.nf4 .value').innerHTML = data.Smoke_Drink === 'yes' ? 'Yes' : 'No';
    document.querySelector('.nf5 .value').innerHTML = data.State;
    document.querySelector('.nf6 .value').innerHTML = data.Branch;
    document.querySelector('.nf6 .value').innerHTML = data.Cleanliness === 'yes' ? 'Yes' : 'No';
    document.querySelector('.nf6 .value').innerHTML = data.Language;
    document.querySelector('.nf6 .value').innerHTML = data.Shared_Room_Before === 'yes' ? 'Yes' : 'No';
    
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


fetch('/getMatchData?id='+id,{method:'GET'}) // Send
  .then(response => response.json())
  .then(data => {
    console.log("Data found");
    // Access required fields from the JSON data
    console.log(data);
    // var index=0;
    data.forEach((match,index) => {
      const matchCard = document.getElementById(`match${index+1}`);
      if (matchCard) {
        matchCard.querySelector('.name h2').textContent = match.Name;
        matchCard.querySelector('.location p').textContent = `${match.State}`;
        matchCard.querySelector('.course p').textContent = `${match.Course}`;
        // Fill other fields similarly
        console.log("Index:",index);
        // index++;
      }
    });
    
    console.log('data filled');
    
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
