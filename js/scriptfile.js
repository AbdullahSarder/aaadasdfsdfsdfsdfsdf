document.getElementById('error-message').style.display = 'none';
document.getElementById('notMatch').style.display = 'none';
document.getElementById('resultFound').style.display = 'none';
const searchField =document.getElementById('searchField');
const SearchBook = () => {
    const searchField =document.getElementById('searchField');
    const searchText =searchField.value;
    searchField.value='';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('notMatch').style.display = 'none';
    document.getElementById('resultFound').style.display = 'none';
    if (searchText === '') {
    document.getElementById('error-message').style.display = 'block';
    }
    else{
        const url=`https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res =>res.json())
        .then(data => displayBook(data.docs))
        .catch(error => displayError(error));
        document.getElementById('resultFound').style.display = 'block';
    }
}
const displayError = error => {
        document.getElementById('notMatch').style.display = 'block';
}
const displayBook = (docs) =>{
    const searchResult= document.getElementById('searchRsult');
    searchResult.textContent = '';
    if (docs.length == 0) {
        document.getElementById('notMatch').style.display = 'block';
    }
    docs.forEach(docs => {
       console.log(docs);
        const div=document.createElement('div') ;
        div.classList.add('col');
        div.innerHTML =`
        <div class="card p-2">
                 <img src="https://covers.openlibrary.org/b/id/${docs.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${docs.title}</h5>
                    <p class="card-text text-primary">${docs.author_name}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${docs.first_publish_year}</li>
                    <li class="list-group-item">${docs.publisher}</li>
                </ul>
       </div>
        `;
        searchResult.appendChild(div);
    });
 }

