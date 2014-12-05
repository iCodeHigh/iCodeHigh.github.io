class Projects {

    //private activeRepos:string[] = [];
    private perPage:number = 100;
    private page:number = 1;
    private reposURL:string = "https://api.github.com/users/iCodeHigh/repos";
    private JSONPCallback:string = "callback=?";
    private $container;

    constructor(opc:ProjectsOptions) {
        this.$container = opc.$container;
    }

    getURI():string {
        return this.reposURL + "?" + this.JSONPCallback +
            "&per_page=" + this.perPage +
            "&page=" + this.page;
    }

    get() {
        var self = this;
        return $.getJSON(this.getURI(), function (res) {
            self.parse(res.data);
        });
    }

    parse(projects) {
        //console.info(projects);
        this.$container.html("");
        for (var i = 0; i < projects.length; i++) {
            var html = "<li><h3><a href='" + projects[i].html_url +
                "' target='_blank'>" + projects[i].name +
                "</a></h3><p>" + projects[i].description + "</p></li>";
            this.$container.append(html);
        }
    }
}

interface ProjectsOptions {
    $container;
}