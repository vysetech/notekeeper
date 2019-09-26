<template>
  <v-container fluid grid-list-lg>
    <v-progress-circular indeterminate color="primary" v-if="loadingStatus"></v-progress-circular>
    <search-helper v-if="filterNotes.length === 0" />
    <v-layout row wrap class="justify-center">
      <v-flex xs12 sm6 md4 lg3 xl2 v-for="note in sortedNotes" :key="note.id" class="mt-3">
        <note :data="note" style="height: 200px;"></note>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Note from '@/components/Note'
import { mapGetters, mapActions } from 'vuex'
import SearchHelper from '@/components/SearchHelper'

const orderBy = require('lodash.orderby')

const ColorSelector = () => import('@/components/ColorSelector')
const SavingIndicator = () => import('@/components/SavingIndicator')
const moment = require('moment')

export default {
  name: 'Notes',
  components: {
    Note,
    ColorSelector,
    SavingIndicator,
    SearchHelper
  },
  data() {
    return {
      dialogTitle: 'Create Note',
      // md: md,
      moment: moment,
      searchString: '',
      dialog: false,
      configs: {
        spellChecker: false,
        autofocus: true,
        linewrapping: true,
        toolbar: [
          'bold',
          'italic',
          'strikethrough',
          'heading',
          '|',
          'code',
          'quote',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          'image',
          'table',
          'horizontal-rule',
          '|',
          'side-by-side',
          'fullscreen',
          'preview',
          'guide'
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'getActiveNotes',
      'activeNote',
      'getFavorites',
      'getTrash',
      'filterNotes',
      'getNoteById',
      'view',
      'labels',
      'loadingStatus'
    ]),
    editorHeight() {
      return window.innerHeight - 348 + 'px'
    },
    sortedNotes() {
      return orderBy(this.filterNotes, 'modified', 'desc')
    }
  },
  methods: {
    ...mapActions([
      'saveNote',
      'setColor',
      'addNote',
      'toggleTrash',
      'toggleFave',
      'deleteForever',
      'setLoadingStatus',
      'setFilterLabel'
    ]),
    selectNote() {
      this.dialogTitle = 'Edit Note'
      this.dialog = true
    },
    borderColor(noteColor) {
      if (!noteColor || ['', 'light', 'whitesmoke'].includes(noteColor)) {
        return 'white'
      } else {
        return this.$vuetify.theme[noteColor]
      }
    },
    closeDialog() {
      this.dialog = false
    }
  }
}
</script>
<style scoped>
@import '~github-markdown-css';
@import '~codemirror/lib/codemirror.css';
@import '~highlight.js/styles/atom-one-dark.css';

CodeMirror,
.cm-s-paper,
.CodeMirror-wrap {
  height: 67vh;
}
.CodeMirror {
  height: 67vh !important;
}
</style>