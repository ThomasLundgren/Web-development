import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | sighting', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:sighting');
    assert.ok(route);
  });
});
