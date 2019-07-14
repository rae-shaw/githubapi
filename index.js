
const searchUrl='https://api.github.com/users/'

//responsible for displaying the results to the user
function displayResults(responseJson) {
	console.log(responseJson);
 	$('#results-list').empty();

 	for (let i = 0; i < responseJson.length ; i++){
 		$('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">"${responseJson[i].name}"</a></h3>
      </li>`
    )};
    console.log(responseJson[0]);

  $('#results').removeClass('hidden');
};
/*function checkQuery(search){
	console.log(search);
}*/

//function formatQueryParams();

function getUserRepos(userName) {
	console.log(userName);
	const urlQuery= `${searchUrl}${userName}/repos`
	
	fetch(urlQuery)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


/*displayResults();*/

//event listener, gets user input data
function watchForm(){
	$('form').submit(event => {
    event.preventDefault();
    const searchUser = $('#js-username-input').val();
	getUserRepos(searchUser);
});
}


$(watchForm);