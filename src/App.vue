<template>
  <v-app id="app" class="white">
    <Snackbar v-if="signedIn"/>
    <search v-if="signedIn"/>
    <editor-panel :title="dialogTitle" v-if="signedIn"/>
    <!-- <add-notebook v-if="signedIn"/> -->
    <app-nav v-if="signedIn && $route.name !== 'landing'"/>
    <v-content transition="v-slide-x-reverse-transition" app>
      <router-view/>
      <confirm ref="confirm"></confirm>
    </v-content>
    <v-layout column class="fab-container" v-if="signedIn & $route.name === 'notes'">
      <v-fab-transition>
        <v-speed-dial v-model="fab" bottom right transition="fade-transition">
          <template v-slot:activator>
            <v-btn v-model="fab" color="primary" dark fab large>
              <v-icon>mdi-plus</v-icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <v-tooltip left value="fab">
            <template v-slot:activator="{ on }">
              <v-btn fab dark color="accent" @click.stop="newNote">
                <v-icon>mdi-note-plus</v-icon>
              </v-btn>
            </template>
            <span>New Note</span>
          </v-tooltip>
          <v-tooltip left value="fab">
            <template v-slot:activator="{ on }">
              <v-btn fab dark color="green lighten-1" @click.stop="newCheckList">
                <v-icon dark>mdi-checkbox-marked</v-icon>
              </v-btn>
            </template>
            <span>New List</span>
          </v-tooltip>
        </v-speed-dial>
      </v-fab-transition>
    </v-layout>
  </v-app>
</template>
<script>
/* eslint-disable */

import router from './router.js'
import AppNav from '@/components/AppNav'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Confirm from '@/components/Confirm'

const Snackbar = () => import('@/components/Snackbar')
const EditorPanel = () => import('@/components/EditorPanel')
const Search = () => import('@/components/Search')

const STORAGE_FILE = 'notekeeper.json'
// const OPTION_FILE = 'options.json'

const debounce = require('lodash.debounce')

export default {
  data() {
    return {
      fab: false,
      blockstack: window.blockstack,
      // options: {
      //   theme: 'default',
      //   view: 'loading'
      // },
      dialog: false,
      dialogTitle: '',
      signedIn: false,
      noteFilter: 'All',
      showLoading: false,
      viewPref: ''
    }
  },
  name: 'App',
  components: {
    Snackbar,
    AppNav,
    Confirm,
    EditorPanel,
    Search
  },
  watch: {
    notes: {
      handler: debounce(
        function(notes) {
          const self = this
          this.$store.commit('SET_SAVE_STATUS', 'Saving encrypted note...')
          const blockstack = this.blockstack
          blockstack
            .putFile(STORAGE_FILE, JSON.stringify(notes), { encrypt: true })
            .then(function() {
              self.$store.commit('SET_SAVE_STATUS', 'Saved')
              console.log('save success')
            })
        },
        1000,
        { maxWait: 10000 }
      ),
      deep: true
    }
    // options: {
    //   handler: function (options) {
    //     const blockstack = this.blockstack
    //     if (Object.keys(options).length === 0) {
    //       options = { layout: 'grid', theme: 'default' }
    //     }
    //     blockstack
    //       .putFile(OPTION_FILE, JSON.stringify(options), { encrypt: true })
    //       .then(function () {
    //         console.log('options saved: ' + JSON.stringify(options))
    //       })
    //       .catch(function () {
    //         console.log('save options failed')
    //       })
    //   },
    //   deep: true
    // }
  },
  mounted() {
    // router.push(this.viewPref || 'grid')
    this.$root.$confirm = this.$refs.confirm.open
  },
  computed: {
    ...mapGetters([
      'view',
      'labels',
      'getNoteById',
      'notes',
      'isSignedIn',
      'activeNote'
    ]),
    editorHeight() {
      return window.innerHeight - 348 + 'px'
    }
  },
  created() {
    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      this.signedIn = true
      this.fetchData()
      router.push('notes')
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(userData => {
        window.location = window.location.href.split('&')[0]
      })
    }

    this.$eventHub.$on('input', this.resetFields)
    this.$eventHub.$on('updateNote', this.updateNote)
    this.$eventHub.$on('filter', this.setFilter)
    this.$eventHub.$on('update', this.updates)
    this.$store.watch(
      state => state.loadingStatus,
      () => {
        const loading = this.$store.state.loadingStatus
        if (loading === true) {
          this.showLoading = true
        } else {
          this.showLoading = false
        }
      }
    )
  },
  beforeDestroy() {
    this.$eventHub.$off('input')
    this.$eventHub.$off('updateNote')
    this.$eventHub.$off('filter')
    this.$eventHub.$off('update')
  },
  methods: {
    ...mapActions([
      'fetchData',
      'setView',
      'toggleTrash',
      'toggleFave',
      'addNote',
      'addList'
    ]),
    ...mapMutations({
      setSnack: 'setSnack',
      setNotes: 'SET_NOTES'
    }),
    newNote() {
      this.addNote()
      this.dialogTitle = 'Create Note'
      this.fab = false
    },
    newCheckList() {
      this.addList()
      this.dialogTitle = 'Create List'
      this.fab = false
    },
    setFilter(list) {
      if (list === undefined) {
        list = 'All'
      }
      this.noteFilter = list
    }
  }
}
</script>
<style>
.fab-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
a {
  text-decoration: none;
}
</style>