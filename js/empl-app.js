(function () {
    function init() {
        let router = new Router([
            new Route('search', 'search.html', true),            
            new Route('contacts', 'contacts.html'),
            new Route('new-vacancy', 'new-vacancy.html'),
            new Route('about', 'about.html')
        ]);
    }
    init();
}());
