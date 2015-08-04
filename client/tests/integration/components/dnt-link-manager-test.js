import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('dnt-link-manager', 'Integration | Component | dnt link manager', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dnt-link-manager}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#dnt-link-manager}}
      template block text
    {{/dnt-link-manager}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
