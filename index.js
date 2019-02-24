class Warehouse {
    constructor (bookmarks = []) {
        this.bookmarks = bookmarks;
    }

    saveBookmark(name, url) {

        let bookmark = {
            name,
            url
        }

        this.bookmarks.push(bookmark);

        this.updateStorage();
        this.fetchBookmarks();

        document.getElementById("myForm").reset();
    }

    deleteBookmark(url) {
        for(let i = 0; i < this.bookmarks.length; i++) {
            if(this.bookmarks[i].url == url){
                this.bookmarks.splice(i, 1);
            }
        }

        this.updateStorage();
        this.fetchBookmarks();
    }

    fetchBookmarks() {
        let bookmarksResults = document.getElementById('bookmarksResults');

        bookmarksResults.innerHTML = '';
        for (let i = 0; i < this.bookmarks.length; i++) {
            let {name, url} = this.bookmarks[i];

            bookmarksResults.innerHTML += `<div class="bookmark">
                                            <span class="title">${name}</span>
                                            <a class="btn btn-default" target="_blank" href=${addhttp(url)}>Visit</a>
                                            <a onclick=warehouse.deleteBookmark('${url}') class="btn btn-danger" href="#">Delete</a>
                                            </div>`;
        }
    }

    updateStorage() {
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }
}

var warehouse = new Warehouse(JSON.parse(localStorage.getItem('bookmarks')) || undefined);

document.getElementById('myForm').addEventListener('submit', () => {
    let name = document.getElementById('siteName').value;
    let url = document.getElementById('siteUrl').value;

    if(!validateForm(name, url)) {
        return false;
    }

    warehouse.saveBookmark(name, url);
});



// Additional functions

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = `http://${url}`;
    }
    return url;
}
