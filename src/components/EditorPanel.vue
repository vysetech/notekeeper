<template>
  <v-dialog
    v-model="show"
    fullscreen
    transition="dialog-bottom-transition"
    id="new_note_dialog"
    @input="v => v || closeDialog()"
  >
    <v-card class="flexcard">
      <v-form class="grow">
        <v-card flat tile key="tc1" color="white">
          <v-container fluid fill-height grid-list-xl>
            <v-layout row wrap>
              <v-flex xs12 class="pa-0">
                <v-toolbar dense flat full-width card color="white">
                  <v-btn icon @click.native="closeDialog">
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <!-- <editor-menu/> -->
                  <v-btn flat color="success" v-if="activeNote.trash" @click="trashNote">
                    <v-icon>mdi-delete-restore</v-icon>
                    <span>Restore</span>
                  </v-btn>
                  <v-btn flat color="error" v-if="activeNote.trash" @click="permDelete">
                    <v-icon>mdi-delete-forever</v-icon>
                    <span>Permanently Delete</span>
                  </v-btn>
                  <saving-indicator v-if="!activeNote.trash" />
                  <v-btn flat icon @click="right = !right" v-if="!activeNote.trash">
                    <v-icon color="gray lighten-3">mdi-settings</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-toolbar dense flat full-width card class="mt-0" :color="activeNote.color">
                  <v-layout row wrap justify-center>
                    <input
                      type="text"
                      id="title-bar"
                      v-model="activeNote.title"
                      placeholder="Title"
                      class="text-xs-center"
                    />
                  </v-layout>
                </v-toolbar>
                <div id="ink-canvas" v-if="draw"></div>
                <editor v-if="activeNote.trash" viewer="true" v-model="activeNote.text"></editor>

                <editor
                  ref="noteEditor"
                  v-model="activeNote.text"
                  :height="pageHeight + 'px'"
                  v-else
                  mode="wysiwyg"
                  :key="activeNote.id"
                  :options="editorOptions"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-form>
      <v-flex xs8>
        <v-chip small v-for="(tag, i) in activeNote.tags" :key="i">
          <v-avatar>
            <v-icon>mdi-label</v-icon>
          </v-avatar>
          {{ tag }}
        </v-chip>
      </v-flex>
    </v-card>
    <v-navigation-drawer v-model="right" right fixed temporary>
      <v-list>
        <v-subheader>Actions</v-subheader>
        <v-list-tile avatar v-if="sharable">
          <v-list-tile-avatar>
            <v-icon>mdi-share-variant</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>Share</v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar @click="download">
          <v-list-tile-avatar>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Download</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar @click="trashNote" v-if="!activeNote.trash">
          <v-list-tile-avatar>
            <v-icon>mdi-delete</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Delete</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-subheader>Properties</v-subheader>
        <v-list-tile avatar @click="toggleFave" v-if="!activeNote.trash">
          <v-list-tile-avatar>
            <v-icon color="red" v-if="activeNote.fave">mdi-heart</v-icon>
            <v-icon v-if="!activeNote.fave">mdi-heart-outline</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Toggle Favorite</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group no-action>
          <v-list-tile avatar slot="activator">
            <v-list-tile-avatar>
              <v-icon>mdi-palette</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>Select a Color</v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="text-xs-center">
            <v-toolbar dense flat color="transparent">
              <v-layout row>
                <v-flex xs12 justify-space-around>
                  <v-icon large @click="setColor('white')" color="black">mdi-minus-circle</v-icon>
                  <v-icon large @click="setColor('red ' + colorModifier)" color="red">mdi-circle</v-icon>
                  <v-icon large @click="setColor('pink ' + colorModifier)" color="pink">mdi-circle</v-icon>
                  <v-icon
                    large
                    @click="setColor('purple ' + colorModifier)"
                    color="purple"
                  >mdi-circle</v-icon>
                </v-flex>
              </v-layout>
            </v-toolbar>
          </v-list-tile>
          <v-list-tile class="text-xs-center">
            <v-toolbar dense flat color="transparent">
              <v-layout row>
                <v-flex xs12 justify-space-around>
                  <v-icon
                    large
                    @click="setColor('deep-purple ' + colorModifier)"
                    color="deep-purple"
                  >mdi-circle</v-icon>
                  <v-icon
                    large
                    @click="setColor('indigo ' + colorModifier)"
                    color="indigo"
                  >mdi-circle</v-icon>
                  <v-icon large @click="setColor('blue ' + colorModifier)" color="blue">mdi-circle</v-icon>
                  <v-icon
                    large
                    @click="setColor('light-blue ' + colorModifier)"
                    color="light-blue"
                  >mdi-circle</v-icon>
                </v-flex>
              </v-layout>
            </v-toolbar>
          </v-list-tile>
          <v-list-tile class="text-xs-center">
            <v-toolbar dense flat color="transparent">
              <v-layout row>
                <v-flex xs12 justify-space-around>
                  <v-icon large @click="setColor('cyan ' + colorModifier)" color="cyan">mdi-circle</v-icon>
                  <v-icon large @click="setColor('teal ' + colorModifier)" color="teal">mdi-circle</v-icon>
                  <v-icon large @click="setColor('green ' + colorModifier)" color="green">mdi-circle</v-icon>
                  <v-icon
                    large
                    @click="setColor('light-green ' + colorModifier)"
                    color="light-green"
                  >mdi-circle</v-icon>
                </v-flex>
              </v-layout>
            </v-toolbar>
          </v-list-tile>
          <v-list-tile class="text-xs-center">
            <v-toolbar dense flat color="transparent">
              <v-layout row>
                <v-flex xs12 justify-space-around>
                  <v-icon large @click="setColor('lime ' + colorModifier)" color="lime">mdi-circle</v-icon>
                  <v-icon
                    large
                    @click="setColor('yellow ' + colorModifier)"
                    color="yellow"
                  >mdi-circle</v-icon>
                  <v-icon large @click="setColor('amber ' + colorModifier)" color="amber">mdi-circle</v-icon>
                  <v-icon
                    large
                    @click="setColor('orange ' + colorModifier)"
                    color="orange"
                  >mdi-circle</v-icon>
                </v-flex>
              </v-layout>
            </v-toolbar>
          </v-list-tile>
          <v-list-tile class="text-xs-center">
            <v-toolbar dense flat color="transparent">
              <v-layout row>
                <v-flex xs12 justify-space-around>
                  <v-icon
                    large
                    @click="setColor('deep-orange ' + colorModifier)"
                    color="deep-oragne"
                  >mdi-circle</v-icon>
                  <v-icon large @click="setColor('brown ' + colorModifier)" color="brown">mdi-circle</v-icon>
                  <v-icon large @click="setColor('grey ' + colorModifier)" color="grey">mdi-circle</v-icon>
                  <v-icon
                    large
                    @click="setColor('blue-grey ' + colorModifier)"
                    color="blue-grey"
                  >mdi-circle</v-icon>
                </v-flex>
              </v-layout>
            </v-toolbar>
          </v-list-tile>
        </v-list-group>
        <v-list-tile avatar>
          <v-combobox
            placeholder="Create or select a label"
            deletable-chips
            multiple
            single-line
            v-model="activeNote.tags"
            id="taginput"
            prepend-inner-icon="mdi-label"
            :items="labels"
            small
            class="pt-0"
            :menu-props="{ closeOnContentClick: true, openOnClick: true }"
          >
            <template slot="selection" slot-scope="data">
              <v-chip
                label
                small
                close
                round
                @input="
                    activeNote.tags.splice(activeNote.tags.indexOf(data.item), 1)
                  "
                :selected="data.text"
              >{{ data.item }}</v-chip>
            </template>
          </v-combobox>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>mdi-calendar-clock</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <div class="caption grey--text">Created: {{ new Date(activeNote.created) }}</div>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon>mdi-calendar-clock</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <div class="caption grey--text">Modified: {{ new Date(activeNote.modified) }}</div>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-dialog>
</template>
<script>
import 'tui-editor/dist/tui-editor-extScrollSync'
import 'tui-editor/dist/tui-editor-extColorSyntax'
import 'tui-editor/dist/tui-editor-extUML'
import 'tui-editor/dist/tui-editor-extChart'
import 'tui-editor/dist/tui-editor-extTable'

import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import 'highlight.js/styles/github.css'
import { Editor } from '@toast-ui/vue-editor'
import { mapGetters, mapActions } from 'vuex'
import EditorMenu from '@/components/EditorMenu'
import SavingIndicator from '@/components/SavingIndicator'
import ColorSelector from '@/components/ColorSelector'

const $ = require('jquery')
const removeMd = require('remove-markdown')

export default {
  name: 'EditorPanel',
  props: {
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      blockstack: window.blockstack,
      colorModifier: 'lighten-4',
      right: false,
      tag: '',
      show: false,
      draw: false,
      editorOptions: {
        usageStatistics: false,
        hideModeSwitch: true,
        exts: [
          {
            name: 'chart',
            minWidth: 100,
            maxWidth: 600,
            minHeight: 100,
            maxHeight: 300
          },
          'scrollSync',
          'colorSyntax',
          'uml',
          'mark',
          'table'
        ]
      },
      dialogTitle: ''
    }
  },
  components: { Editor, EditorMenu, SavingIndicator, ColorSelector },
  created: function() {
    this.$store.watch(
      state => state.activeNote,
      () => {
        if (this.$store.state.activeNote.id) {
          // if (!isEmpty(this.$store.state.activeNote)) {
          this.show = true
        } else {
          this.show = false
        }
      }
    )
  },
  computed: {
    ...mapGetters(['activeNote', 'labels', 'notes']),
    pageHeight() {
      return window.innerHeight - 196
    },
    sharable() {
      return navigator.share
    }
  },
  mounted() {
    const ui = this.$refs.noteEditor.invoke('getUI')
    const toolbar = ui.getToolbar()
    toolbar.addDivider()
    const toolbarLength = toolbar.getItems().length

    toolbar.addButton(
      {
        name: 'Fullscreen',
        tooltip: 'Fullscreen',
        $el: $(
          '<button type="button" class="tui-editor-defaultUI-toolbar"><svg style="width:17px;height:16px" viewBox="0 0 24 24"><path fill="#000000" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" /></svg></button></button>'
        )
      },
      17
    )
  },
  methods: {
    ...mapActions([
      'saveNote',
      'setColor',
      'addNote',
      'toggleTrash',
      'toggleFave',
      'deleteForever',
      'updateActiveNote'
    ]),
    closeDialog() {
      if (!this.activeNote.text && !this.activeNote.title) {
        this.deleteForever()
      } else {
        this.activeNote.modified = Date.now()
        this.updateActiveNote({})
      }
    },
    trashNote() {
      this.toggleTrash()
    },
    async permDelete() {
      if (
        await this.$root.$confirm(
          'Warning',
          'This action cannot be undone. Are you sure that you want to delete this note forever?',
          { color: 'orange' }
        )
      ) {
        this.deleteForever()
        this.closeDialog()
      }
    },
    attachFile() {
      alert('TODO')
    },
    download() {
      var fileexport = '---\n'
      let userData = this.blockstack.loadUserData()
      let user = new this.blockstack.Person(userData.profile)
      let name = user.name() || ''
      let tagExport = ''
      let shareExport = ''
      let i = 0
      fileexport +=
        'title: ' + this.activeNote.title.replace(/#/g, '').trim() + '  \n'
      fileexport +=
        'date: ' + new Date(this.activeNote.created).toISOString() + '  \n'
      fileexport +=
        'lastmod: ' + new Date(this.activeNote.modified).toISOString() + '  \n'
      fileexport += 'author: ' + name + '  \n'
      fileexport += 'category: '
      if (this.activeNote.tags.length > 0) {
        for (i = 0; i < this.activeNote.tags.length; i++) {
          tagExport += this.activeNote.tags[i] + ', '
        }
        tagExport = tagExport.substring(0, tagExport.length - 2)
        fileexport += tagExport + '  \n'
      } else {
        fileexport += ' \n'
      }
      fileexport += 'notebook: ' + this.activeNote.notebook.trim() + '  \n'
      fileexport += 'favorite: ' + this.activeNote.fave + '  \n'
      fileexport += 'color: ' + this.activeNote.color + '  \n'
      fileexport += 'shared with: '
      if (this.activeNote.shares.length > 0) {
        for (i = 0; i < this.activeNote.shares.length; i++) {
          shareExport += this.activeNote.shares[i] + ', '
        }
        shareExport = shareExport.substring(0, shareExport.length - 2)
        fileexport += shareExport + '  \n\n'
      } else {
        fileexport += ' \n\n'
      }
      fileexport += '---\n'
      fileexport += this.activeNote.text
      fileexport += '\n---\n\n'
      var FileSaver = require('file-saver')
      var blob = new Blob([fileexport], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, this.activeNote.title + '.md')
    }
  }
}
</script>
<style scoped>
input[type='text'],
input[type='text']:hover,
input[type='text']:focus,
input[type='text']:active {
  border: 0;
  outline: none;
  outline-offset: 0;
}
button.tui-toolbar-icons:after {
  content: '';
  display: block;
  position: fixed; /* could also be absolute */
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
}
#title-bar {
  height: 80px;
  font-size: 2em;
  font-weight: 400;
  color: #2a2a2a;
}
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>