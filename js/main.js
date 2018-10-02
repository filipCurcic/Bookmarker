document.getElementById("myForm").addEventListener("submit", bookmarkFunct);

function bookmarkFunct(e) {

    let siteName = document.getElementById("siteName").value;
    let siteAdress = document.getElementById("siteAdress").value;
    if(!validate(siteName, siteAdress)) {
        return false;
    }
    

    let bookmark = {
        name: siteName,
        url: siteAdress
    };

    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById("myForm").reset();

    fetchBookmarks();
    e.preventDefault();
    
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';
    for(let i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_blank" href="#">Delete</a> '
                                      '</h3>'+
                                      '</div';

    }


}
function validate(siteName, siteAdress) {
    if(!siteName || !siteAdress) {
        alert("Fill in the form");
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteAdress.match(regex)) {
        alert("Enter a valid url");
        document.getElementById("siteAdress").value = '';
        return false;
    }
    return true;
}


function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i<bookmarks.length; i++) {
        if(bookmarks[i].url == url ) {
            bookmarks.splice(i, 1);

        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}