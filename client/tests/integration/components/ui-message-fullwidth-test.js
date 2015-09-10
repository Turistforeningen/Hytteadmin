import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-message-fullwidth', 'Integration | Component | ui message fullwidth', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-message-fullwidth}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-message-fullwidth}}
      template block text
    {{/ui-message-fullwidth}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
