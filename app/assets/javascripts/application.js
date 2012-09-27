//= require jquery
//= require jquery_ujs
//= require handlebars
//= require vendor/ember
//= require vendor/ember-data
//= require init
//= require data
//= require_self
//= require_tree ./templates

Contacts.ApplicationController = Ember.Controller.extend({});
Contacts.ApplicationView = Ember.View.extend({
  templateName: 'application'
})

Contacts.IndexController = Ember.ArrayController.extend({});
Contacts.IndexView = Ember.View.extend({
  templateName: 'index'
})

Contacts.ShowController = Ember.ObjectController.extend({});
Contacts.ShowView = Ember.View.extend({
  templateName: 'show'
})

Contacts.Router = Ember.Router.extend({
  location: 'hash',
  root: Ember.Route.extend({
    goToIndex: Ember.Route.transitionTo('index'),
    showContact: Ember.Route.transitionTo('show'),
    index: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router){
        router.get('applicationController').connectOutlet({
          name: 'index',
          context: Contacts.Data.all()
        });
      }
    }),
    show: Ember.Route.extend({
      route: '/show/:name',
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet({
          name: 'show',
          context: context
        })
      },
      deserialize: function(router, urlParams){
        return Contacts.Data.findByName(urlParams.name);
      }
    })
  })
})

Contacts.initialize();
