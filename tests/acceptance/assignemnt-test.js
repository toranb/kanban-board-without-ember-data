import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

var first  = {id: 1, status_code: 1, project: "first"};
var second = {id: 2, status_code: 1, project: "second"};
var third  = {id: 3, status_code: 1, project: "third"};
var last   = {id: 4, status_code: 2, project: "last"};
var json = [first, second, third, last];

var getNotes = function() { return [{id: 9, title: "first"}, {id: 8, title: "second"}, {id: 7, title: "third"}]; };

var stubXhrWithTodos = function(data) {
    var notes = getNotes();
    if(data && data.length === 0) {
        notes = [];
    }
    Ember.$.fauxjax.new({url: "/api/todos/1/notes", responseText: notes});
    return Ember.$.fauxjax.new({
        url: "/api/todos",
        responseText: data
    });
};

module('Acceptance: Assignemnt', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.$.fauxjax.clear();
    Ember.run(application, 'destroy');
  }
});

test('unassigned items are grouped together', function(assert) {
  stubXhrWithTodos(json);
  visit('/');
  andThen(function() {
      var unassigned = find(".unassigned .cards");
      assert.equal(unassigned.length, 3);
      var project = find(".unassigned .cards:eq(0) .todo_project");
      assert.equal(project.text(), "first");
  });
});

test('assigned items are grouped together', function(assert) {
  stubXhrWithTodos(json);
  visit('/');
  andThen(function() {
      var assigned = find(".assigned .cards");
      assert.equal(assigned.length, 1);
      var project = find(".assigned .cards:eq(0) .todo_project");
      assert.equal(project.text(), "last");
  });
});

test('status is shown in plain english', function(assert) {
  stubXhrWithTodos(json);
  visit('/');
  andThen(function() {
      var status = find(".assigned .cards:eq(0) .todo_status");
      assert.equal(status.text(), "Assigned");
  });
});

test('assign button will move item from unassigned to assigned column', function(assert) {
  stubXhrWithTodos(json);
  visit('/');
  andThen(function() {
      var assigned = find(".assigned .cards");
      assert.equal(assigned.length, 1);
      var unassigned = find(".unassigned .cards");
      assert.equal(unassigned.length, 3);
  });
  click(".unassigned .cards:eq(0) .assign_btn");
  andThen(function() {
      var assigned = find(".assigned .cards");
      assert.equal(assigned.length, 2);
      var unassigned = find(".unassigned .cards");
      assert.equal(unassigned.length, 2);
  });
});

test("clicking toggle will show details for given item", function(assert) {
  stubXhrWithTodos(json);
    visit("/");
    andThen(function() {
        var details = find(".details_section");
        assert.ok(details.is(":hidden"));
    });
    click(".unassigned .cards:eq(0) .toggle_link");
    andThen(function() {
        assert.equal(currentURL(), "/todo/1");
        var details = find(".details_section");
        assert.ok(!details.is(":hidden"));
        var projectInput = find(".details_section input.project");
        assert.equal(projectInput.val(), "first");
    });
});

test('loading screen shown before xhr resolves with valid data', function(assert) {
  stubXhrWithTodos(json);
  visitSync('/');
  var loading = find(".loading-gif");
  assert.equal(loading.text(), "Loading...");
  andThen(function() {
      var unassigned = find(".unassigned .cards");
      assert.equal(unassigned.length, 3);
  });
});

test('loading screen shown before xhr resolves with no data', function(assert) {
  stubXhrWithTodos([]);
  visitSync('/');
  var loading = find(".loading-gif");
  assert.equal(loading.text(), "Loading...");
  andThen(function() {
      var no_data = find(".no-data-found");
      assert.equal(no_data.text(), "No data available");
  });
});

test('detail loading screen shown before xhr resolves with valid data', function(assert) {
  stubXhrWithTodos(json);
  visitSync('/todo/1');
  var loading = find(".loading-details-gif");
  assert.equal(loading.text(), "Loading details...");
  var loadingNotes = find(".loading-notes-gif");
  assert.equal(loadingNotes.text(), "Loading notes...");
  andThen(function() {
      var projectInput = find(".details_section input.project");
      assert.equal(projectInput.val(), "first");
      var notes = find(".details_section .note");
      assert.equal(notes.length, 3);
      var firstNote = find(".details_section .note:eq(0)");
      assert.equal(firstNote.text(), "first");
      var lastNote = find(".details_section .note:eq(2)");
      assert.equal(lastNote.text(), "third");
  });
});

test('detail loading screen shown before xhr resolves with no data', function(assert) {
  stubXhrWithTodos([]);
  visitSync('/todo/1');
  var loading = find(".loading-details-gif");
  assert.equal(loading.text(), "Loading details...");
  var loadingNotes = find(".loading-notes-gif");
  assert.equal(loadingNotes.text(), "Loading notes...");
  andThen(function() {
      var no_data = find(".no-detail-data-found");
      assert.equal(no_data.text(), "No detail model data");
      var notes = find(".details_section .note");
      assert.equal(notes.length, 0);
      var no_note_data = find(".no-notes-found");
      assert.equal(no_note_data.text(), "No notes found");
  });
});
