import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';

Ember.Test.registerHelper("visitSync", function(app, url) {
    var router = app.__container__.lookup('router:main');
    router.location.setURL(url);

    if (app._readinessDeferrals > 0) {
      router['initialURL'] = url;
      Ember.run(app, 'advanceReadiness');
      delete router['initialURL'];
    } else {
      Ember.run(app.__deprecatedInstance__, 'handleURL', url);
    }

    return app.testHelpers.wait();
});

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
