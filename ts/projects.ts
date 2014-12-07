class Projects {

    /**
     * The list of active games will be stored in this array
     *
     * @type {Array}
     */
    private activeRepos:string[] = [
        "switcher"
    ];
    private repos = {};
    private perPage:number = 100;
    private page:number = 1;
    private reposURL:string = "https://api.github.com/users/iCodeHigh/repos";
    private JSONPCallback:string = "callback=?";
    private $container;
    private mainPage:string = "http://icodehigh.github.io/";

    constructor(opc:ProjectsOptions) {
        this.$container = opc.$container;
    }

    /**
     * Gets the URL to request a user repository in Github
     *
     * @returns {string}
     */
    getURI():string {
        return this.reposURL + "?" + this.JSONPCallback +
            "&per_page=" + this.perPage +
            "&page=" + this.page;
    }

    /**
     * Makes the request for the user repositories in Github
     *
     * @returns {any}
     */
    get() {
        return $.getJSON(this.getURI(), $.proxy(this.parse, this));
    }

    $(selector) {
        return this.$container.find(selector);
    }

    parse(projects) {
        projects = projects.data;
        //console.info(projects);
        for (var i = 0; i < projects.length; i++) {
            if (this.activeRepos.indexOf(projects[i].name) > -1) {
                this.repos[projects[i].name] = projects[i];
            }
        }
        this.print();
    }

    print() {
        for(var i = 0; i < this.activeRepos.length; i++) {
            var project:Project = this.repos[this.activeRepos[i]];
            if (project) {
                var html = "<li><div class='project'><h3><a href='" +
                this.mainPage + this.activeRepos[i] + "' target='_blank'>" + project.name +
                "</a></h3><p>" + project.description + "</p></div></li>";
                this.$(".projects").append(html);
            }
            else {
                throw Error("Project '" + this.activeRepos[i] + "' does not exist")
            }
        }
        if(this.activeRepos.length) {
            this.$(".title").removeClass("hidden");
            this.$(".projects").removeClass("hidden");
            this.$(".loading").addClass("hidden");
        }
        else {
            this.$(".loading").html(":'( There's no games to show right now. Code monkeys are working as you read to create awesome games. Sooner than later there will be an endless scrolling site full of games.");
        }
    }
}

interface ProjectsOptions {
    $container;
}

interface Project {
    html_url;
    name;
    description;
}