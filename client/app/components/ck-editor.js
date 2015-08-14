/* globals CKEDITOR */
import Ember from 'ember';
import layout from '../templates/components/ck-editor';

export default Ember.Component.extend({
  layout: layout,

  _editor: null,

  didInsertElement() {
    let textarea = this.element.querySelector('.editor');
    let editor = this._editor = CKEDITOR.replace(textarea);
    editor.on('change', (e) => {
      this.set('value', e.editor.getData());
    });
  },

  willDestroyElement() {
    this._editor.destroy();
    this._editor = null;
  }
});
