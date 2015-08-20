/* globals CKEDITOR */
import Ember from 'ember';
import layout from '../templates/components/ck-editor';

export default Ember.Component.extend({
  layout: layout,

  _editor: null,

  didInsertElement() {
    let textarea = this.element.querySelector('.editor');
    let editor = this._editor = CKEDITOR.replace(textarea, {
      language: 'no',
      // Remove elements path in footer
      removePlugins: 'elementspath',
      // Whether to use HTML entities in the output.
      entities: false,

      toolbar: [
        {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat']},
        {name: 'styles', items: ['Format']},
        {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Blockquote']},
        {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
        {name: 'insert', items: ['Table']}
      ],

      format_tags: 'p;h2;h3'

    });

    editor.on('change', (e) => {
      this.set('value', e.editor.getData());
    });
  },

  willDestroyElement() {
    this._editor.destroy();
    this._editor = null;
  }
});
