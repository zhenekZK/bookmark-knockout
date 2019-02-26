// Here's my data model
var ViewModel = function(bookmarks) {
    this.name = ko.observable();
    this.url = ko.observable();
    this.bookmarks = ko.observableArray(bookmarks);

    this.formIsValid = ko.computed(function() {
        if(!this.name() || !this.url()){
            return false;
        }

        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        if(!this.url().match(regex)){
            return false;
        }

        return true;
    }, this);

    this.saveBookmark = function () {

        var bookmark = {
            name: this.name(),
            url: this.url()
        };

        this.bookmarks.push(bookmark);

        this.updateStorage();
        this.resetForm();
    };

    this.resetForm = function () {
        this.name('');
        this.url('');
    };

    this.updateStorage = function () {
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks()));
    };

    function addhttp(bookmark) {
        if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
            url = `http://${url}`;
        }

    return url;
}
};

ko.applyBindings(new ViewModel(localStorage.getItem('bookmarks') != "undefined" ? JSON.parse(localStorage.getItem('bookmarks')) : undefined));

