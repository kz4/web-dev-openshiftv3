(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;

        var websiteId = $routeParams.wid;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.submitted = false;

        function init() {
            WebsiteService
                .findWebsiteById(websiteId)
                .then(function (res) {
                    var website = res.data;
                    if (website.name) {
                        vm.website = website;
                    }
                })
        }
        init();

        function updateWebsite(website) {
            vm.submitted = true;
            WebsiteService
                .updateWebsite(websiteId, website)
                .then(function (res) {
                    var website = res.data;
                    if (website.name) {
                        $location.url("user/" + userId + "/website")
                    } else {
                        vm.error = "Failed to update website, name empty or exists already";
                    }
                })
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function (res) {
                    var result = res.data;
                    if (result) {
                        $location.url("user/" + userId + "/website")
                    } else {
                        vm.error = "Failed to delete website";
                    }
                    
                })
        }
    }
})();