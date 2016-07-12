window.name = 'NG_DEFER_BOOTSTRAP!';

require.config({
    baseUrl: '/js',
    paths: {
        angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular'
    },
    shim: {
        angular: {
            exports: 'angular'
        }
    }
});
require(['angular', 'app'], function(ng, app) {
    ng.element(document.getElementsByTagName('html')[0]);
    ng.element().ready(function() {
        ng.resumeBootstrap([app.name]);
    });
});
