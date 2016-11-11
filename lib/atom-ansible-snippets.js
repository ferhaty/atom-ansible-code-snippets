'use babel';

import AtomAnsibleSnippetsView from './atom-ansible-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomAnsibleSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomAnsibleSnippetsView = new AtomAnsibleSnippetsView(state.atomAnsibleSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomAnsibleSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-ansible-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomAnsibleSnippetsView.destroy();
  },

  serialize() {
    return {
      atomAnsibleSnippetsViewState: this.atomAnsibleSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomAnsibleSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
