import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-dropdown-remote', 'Integration | Component | ui dropdown remote', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-dropdown-remote}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-dropdown-remote}}
      template block text
    {{/ui-dropdown-remote}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
