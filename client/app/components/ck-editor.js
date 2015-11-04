/* globals CKEDITOR */
import Ember from 'ember';
import layout from '../templates/components/ck-editor';

export default Ember.Component.extend({
  layout: layout,

  toolbar: null,
  bindAttributes: ['toolbar', 'data-validate'],

  _editor: null,

  didInsertElement () {
    let toolbarConfig = [];
    let availableToolbarItems = [
      {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat']},
      {name: 'styles', items: ['Format']},
      {name: 'paragraph', items: ['NumberedList', 'BulletedList']}, // '-', 'Blockquote'
      {name: 'links', items: ['Link', 'Unlink']}
      // {name: 'insert', items: ['Table']}
    ];

    if (this.toolbar) {
      this.toolbar.split(',').forEach(function (item, index, enumerable) {
        toolbarConfig.addObject(availableToolbarItems.findBy('name', item));
      });

    } else {
      toolbarConfig = availableToolbarItems;
    }

    let textarea = this.element.querySelector('.editor');
    let editor = this._editor = CKEDITOR.replace(textarea, {
      language: 'no',
      // Remove elements path in footer
      removePlugins: 'elementspath',
      // Whether to use HTML entities in the output.
      entities: false,
      // Disable resizing to get rid of bottom bar
      resize_enabled: false,

      toolbar: toolbarConfig,
      format_Mellomoverskrift: {element: 'h2', name: 'Mellomoverskrift'},
      format_tags: 'p;Mellomoverskrift' // Really lame (but pragmatic) way to apply custom translation of the h2 el

    });

    editor.on('change', (e) => {
      this.set('value', e.editor.getData());
    });
  },

  willDestroyElement () {
    this._editor.destroy();
    this._editor = null;
  }
});
