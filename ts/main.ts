// Declaring jQuery variable
declare var $;

(function () {
// Wait for everything to load and then init
    $(function() {
        var today = new Date();
        $("footer").find(".year").html(today.getFullYear());

        var projects = new Projects({
            $container: $(".projects")
        });
        projects.get();
    });
})();