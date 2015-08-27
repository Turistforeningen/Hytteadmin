import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dnt-hytteadmin-editor-section-fasiliteter', 'Integration | Component | dnt hytteadmin editor section fasiliteter', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dnt-hytteadmin-editor-section-fasiliteter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dnt-hytteadmin-editor-section-fasiliteter}}
      template block text
    {{/dnt-hytteadmin-editor-section-fasiliteter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
