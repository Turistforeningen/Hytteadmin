import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dnt-hytteadmin-editor-section-adkomst', 'Integration | Component | dnt hytteadmin editor section adkomst', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dnt-hytteadmin-editor-section-adkomst}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dnt-hytteadmin-editor-section-adkomst}}
      template block text
    {{/dnt-hytteadmin-editor-section-adkomst}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
