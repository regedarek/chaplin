// Generated by CoffeeScript 1.3.3

define(['jquery', 'chaplin/mediator', 'chaplin/lib/router', 'chaplin/controllers/controller', 'chaplin/views/layout', 'chaplin/views/view'], function($, mediator, Router, Controller, Layout, View) {
  'use strict';
  return describe('Layout', function() {
    var layout, router, startupControllerContext, testController;
    layout = testController = startupControllerContext = router = null;
    beforeEach(function() {
      layout = new Layout({
        title: 'Test Site Title'
      });
      testController = new Controller();
      testController.view = new View();
      testController.title = 'Test Controller Title';
      startupControllerContext = {
        previousControllerName: 'null',
        controller: testController,
        controllerName: 'test',
        params: {}
      };
      return router = new Router({
        root: '/test/'
      });
    });
    afterEach(function() {
      layout.dispose();
      testController.dispose();
      return router.dispose();
    });
    it('should hide the view of an inactive controller', function() {
      testController.view.$el.css('display', 'block');
      mediator.publish('beforeControllerDispose', testController);
      return expect(testController.view.$el.css('display')).toBe('none');
    });
    it('should show the view of the active controller', function() {
      var $el;
      testController.view.$el.css('display', 'none');
      mediator.publish('startupController', startupControllerContext);
      $el = testController.view.$el;
      expect($el.css('display')).toBe('block');
      expect($el.css('opacity')).toBe('1');
      return expect($el.css('visibility')).toBe('visible');
    });
    it('should set the document title', function() {
      runs(function() {
        return mediator.publish('startupController', startupControllerContext);
      });
      waits(100);
      return runs(function() {
        var title;
        title = "" + testController.title + " \u2013 " + layout.title;
        return expect(document.title).toBe(title);
      });
    });
    it('should set logged-in/logged-out body classes', function() {
      var $body;
      $body = $(document.body).attr('class', '');
      mediator.publish('loginStatus', true);
      expect($body.attr('class')).toBe('logged-in');
      mediator.publish('loginStatus', false);
      return expect($body.attr('class')).toBe('logged-out');
    });
    it('should route clicks on internal links', function() {
      var args, passedCallback, passedPath, path, spy;
      spy = jasmine.createSpy();
      mediator.subscribe('!router:route', spy);
      path = '/an/internal/link';
      $("<a href='" + path + "'>Hello World</a>").appendTo(document.body).click().remove();
      args = spy.mostRecentCall.args;
      passedPath = args[0];
      passedCallback = args[1];
      expect(passedPath).toBe(path);
      return expect(typeof passedCallback).toBe('function');
    });
    it('should correctly pass the query string', function() {
      var args, passedCallback, passedPath, path, spy;
      spy = jasmine.createSpy();
      mediator.subscribe('!router:route', spy);
      path = '/another/link?foo=bar&baz=qux';
      $("<a href='" + path + "'>Hello World</a>").appendTo(document.body).click().remove();
      args = spy.mostRecentCall.args;
      passedPath = args[0];
      passedCallback = args[1];
      expect(passedPath).toBe(path);
      expect(typeof passedCallback).toBe('function');
      return mediator.unsubscribe('!router:route', spy);
    });
    it('should not route links without href attributes', function() {
      var spy;
      spy = jasmine.createSpy();
      mediator.subscribe('!router:route', spy);
      $('<a name="foo">Hello World</a>').appendTo(document.body).click().remove();
      expect(spy).not.toHaveBeenCalled();
      mediator.unsubscribe('!router:route', spy);
      spy = jasmine.createSpy();
      mediator.subscribe('!router:route', spy);
      $('<a>Hello World</a>').appendTo(document.body).click().remove();
      expect(spy).not.toHaveBeenCalled();
      return mediator.unsubscribe('!router:route', spy);
    });
    it('should not route links with empty href', function() {
      var spy;
      spy = jasmine.createSpy();
      mediator.subscribe('!router:route', spy);
      $('<a href="">Hello World</a>').appendTo(document.body).click().remove();
      expect(spy).not.toHaveBeenCalled();
      return mediator.unsubscribe('!router:route', spy);
    });
    it('should not route links to document fragments', function() {
      var spy;
      spy = jasmine.createSpy();
      mediator.subscribe('!router:route', spy);
      $('<a href="#foo">Hello World</a>').appendTo(document.body).click().remove();
      expect(spy).not.toHaveBeenCalled();
      return mediator.unsubscribe('!router:route', spy);
    });
    it('should not route links with a noscript class', function() {
      var spy;
      spy = jasmine.createSpy();
      mediator.subscribe('!router:route', spy);
      $('<a href="/leave-the-app" class="noscript">Hello World</a>').appendTo(document.body).click().remove();
      expect(spy).not.toHaveBeenCalled();
      return mediator.unsubscribe('!router:route', spy);
    });
    it('should not route clicks on external links', function() {
      var path, spy;
      spy = jasmine.createSpy();
      mediator.subscribe('!router:route', spy);
      path = 'http://www.example.org/';
      $("<a href='" + path + "'>Hello World</a>").appendTo(document.body).click().remove();
      expect(spy).not.toHaveBeenCalled();
      return mediator.unsubscribe('!router:route', spy);
    });
    return it('should be disposable', function() {
      expect(typeof layout.dispose).toBe('function');
      layout.dispose();
      expect(layout.disposed).toBe(true);
      if (Object.isFrozen) {
        return expect(Object.isFrozen(layout)).toBe(true);
      }
    });
  });
});