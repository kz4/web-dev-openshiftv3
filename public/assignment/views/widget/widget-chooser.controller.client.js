(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;
        var pageId = $routeParams.pid;
        vm.pageId = pageId;

        vm.createHeaderWidget = createHeaderWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;

        function createHeaderWidget() {
            var widgetId = (new Date()).getTime()+"";
            var widget = {
                _id : widgetId,
                widgetType : "HEADER",
                pageId : pageId
            };
            WidgetService
                .createWidget(pageId, widget)
                .then(function (res) {
                    var result = res.data;
                    if (result._id) {
                        $location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                    } else {
                        vm.error = "Failed to create a header widget";
                    }
                });
        }

        function createImageWidget() {
            var widgetId = (new Date()).getTime()+"";
            var widget = {
                _id : widgetId,
                widgetType : "IMAGE",
                pageId : pageId
            };
            WidgetService
                .createWidget(pageId, widget)
                .then(function (res) {
                    var result = res.data;
                    if (result._id) {
                        $location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                    } else {
                        vm.error = "Failed to create a image widget";
                    }
                });
        }

        function createYoutubeWidget() {
            var widgetId = (new Date()).getTime()+"";
            var widget = {
                _id : widgetId,
                widgetType : "YOUTUBE",
                pageId : pageId
            };
            WidgetService
                .createWidget(pageId, widget)
                .then(function (res) {
                    var result = res.data;
                    if (result._id) {
                        $location.url("user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                    } else {
                        vm.error = "Failed to create a youtube widget";
                    }
                });
        }
    }
})();