import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dnt-photo-manager-uploader', 'Integration | Component | dnt photo manager uploader', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dnt-photo-manager-uploader}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dnt-photo-manager-uploader}}
      template block text
    {{/dnt-photo-manager-uploader}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
