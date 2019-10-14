import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | sightings/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:sightings/new');
    assert.ok(route);
  });
});
