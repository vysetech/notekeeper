/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'
import blockstack from 'blockstack'
var values = require('lodash.values')

const STORAGE_FILE = 'notekeeper.json'
const uuidv4 = require('uuid/v4')
const userSession = new blockstack.UserSession()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // data
    notes: [],
    activeNote: {},
    options: {},
    // user
    signedIn: false,
    userData: {},
    user: null,
    name: '',
    username: '',
    userAvatar: '',
    // application
    loadingStatus: false,
    snack: '',
    edit: '',
    saveStatus: 'Saved',
    filterLabel: 'All',
    searchTerm: '',
    showNBModal: false,
    showSearchPage: false
  },
  mutations: {
    SHOW_SEARCH_PAGE(state, status) {
      state.showSearchPage = status
    },
    ADD_NOTE_FROM_SHARE(state, { text, title }) {
      let now = new Date()
      const newNote = {
        id: uuidv4(),
        title: title,
        text: text,
        color: '',
        notebook: '',
        modified: now,
        created: now,
        fave: false,
        trash: false,
        tags: [],
        shares: [],
        attachments: []
      }
      state.notes.push(newNote)
    },
    ADD_NOTE(state) {
      let now = new Date()
      const newNote = {
        id: uuidv4(),
        title: '',
        text: '',
        color: 'white',
        notebook: '',
        modified: now,
        created: now,
        fave: false,
        trash: false,
        tags: [],
        shares: [],
        attachments: []
      }
      state.notes.push(newNote)
      state.activeNote = newNote
    },
    ADD_LIST(state) {
      let now = new Date()
      const newNote = {
        id: uuidv4(),
        title: '',
        text: '* [ ] Item 1\n* [ ] Item 2\n* [ ] Item 3',
        color: 'white',
        notebook: '',
        modified: now,
        created: now,
        fave: false,
        trash: false,
        tags: [],
        shares: [],
        attachments: [],
        list: true
      }
      state.notes.push(newNote)
      state.activeNote = newNote
    },
    EDIT_NOTE(state, e) {
      state.activeNote.text = e.target.value
    },
    SET_NOTE_TEXT(state, text) {
      state.activeNote.text = text
    },
    EDIT_NOTE_COLOR(state, color) {
      state.activeNote.color = color
    },
    EDIT_NOTE_TITLE(state, e) {
      state.activeNote.title = e.target.value
    },
    SET_NOTE_TITLE(state, title) {
      state.activeNote.title = title
    },
    EDIT_NOTE_TAGS(state, tag) {
      state.activeNote.tags.push(tag)
    },
    DELETE_NOTE(state, idx) {
      state.notes.splice(idx, 1)
    },
    TOGGLE_FAVE(state) {
      state.activeNote.fave = !state.activeNote.fave
    },
    TOGGLE_FAVE_BY_ID(state, id) {
      let idx = state.notes.findIndex(note => note.id === id)
      let tmp = state.notes[idx]
      tmp.fave = !tmp.fave
      state.notes.splice(idx, 1, tmp)
    },
    TOGGLE_TRASH(state) {
      state.activeNote.trash = !state.activeNote.trash
    },
    SET_ACTIVE_NOTE(state, note) {
      state.activeNote = note
    },
    SET_SEARCHTERM(state, search) {
      state.searchTerm = search
    },
    SET_FILTER_LABEL(state, label) {
      state.filterLabel = label
    },
    SET_VIEW(state, view) {
      state.options.view = view
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_USER_AVATAR(state, avatar) {
      state.userAvatar = avatar
    },
    SET_USERNAME(state, username) {
      state.username = username
    },
    SET_USER_DATA(state, userData) {
      state.userData = userData
    },
    setSnack(state, snack) {
      state.snack = snack
    },
    SAVE_NOTE(state, incoming) {
      state.notes.push(incoming)
    },
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status
    },
    SET_NOTES(state, notes) {
      state.notes = notes
    },
    SET_OPTIONS(state, options) {
      state.options = options
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_SIGNIN(state, newstate) {
      state.signedIn = newstate
    },
    SET_SAVE_STATUS(state, newSaveStatus) {
      state.saveStatus = newSaveStatus
    }
  },
  actions: {
    showSearchPage(context, status) {
      context.commit('SHOW_SEARCH_PAGE', status)
    },
    setNoteText(context, text) {
      context.commit('SET_NOTE_TEXT', text)
    },
    setNoteTitle(context, title) {
      context.commit('SET_NOTE_TITLE', title)
    },
    setLoadingStatus(context, loading) {
      context.commit('SET_LOADING_STATUS', loading)
    },
    toggleTrash(context) {
      context.commit('TOGGLE_TRASH')
      context.commit('SET_ACTIVE_NOTE', {})
    },
    toggleFaveById(context, id) {
      let idx = context.state.notes.findIndex(note => note.id === id)
      context.state.notes[idx].fave = !context.state.notes[idx].fave
    },
    toggleFave(context) {
      context.commit('TOGGLE_FAVE')
    },
    deleteForever(context) {
      let idx = context.state.notes.findIndex(
        note => note.id === context.state.activeNote.id
      )
      context.commit('DELETE_NOTE', idx)
      context.commit('SET_ACTIVE_NOTE', {})
    },
    setColor(context, color) {
      context.commit('EDIT_NOTE_COLOR', color)
    },
    updateActiveNote(context, note) {
      context.commit('SET_ACTIVE_NOTE', note)
    },
    addNote(context) {
      context.commit('ADD_NOTE')
    },
    addList(context) {
      context.commit('ADD_LIST')
    },
    addNoteFromShare(context, { text, title }) {
      context.commit('ADD_NOTE_FROM_SHARE', { text, title })
    },
    setFilterLabel(context, label) {
      context.commit('SET_FILTER_LABEL', label)
    },
    setSearchTerm(context, search) {
      context.commit('SET_SEARCHTERM', search)
    },
    saveNote({ commit, state }, incoming) {
      let idx = state.notes.findIndex(note => note.id === incoming.id)
      if (idx >= 0) {
        commit('EDIT_NOTE', incoming, idx)
      } else {
        commit('SAVE_NOTE', incoming)
      }
    },
    fetchData(context) {
      context.commit('SET_SIGNIN', true)
      context.commit('SET_LOADING_STATUS', true)
      // var loadnotes = []
      // var loadoptions = {}

      // get options data
      // userSession.getFile(OPTION_FILE, { decrypt: true }).then(optionsData => {
      //   try {
      //     loadoptions = JSON.parse(optionsData)
      //   } catch (e) {
      //     console.log('Error parsing options. ' + e + '\nUsing defaults')
      //     loadoptions['view'] = 'grid'
      //     loadoptions['theme'] = 'default'
      //   }
      //   if (loadoptions === null) {
      //     loadoptions = {
      //       view: 'grid',
      //       theme: 'default'
      //     }
      //   }
      //   context.commit('SET_OPTIONS', loadoptions)
      // })

      // get note data
      userSession.getFile(STORAGE_FILE).then(notesText => {
        let loadnotes = values(JSON.parse(notesText))
        for (let j = 0; j < loadnotes.length; j++) {
          if (!loadnotes[j].id) {
            loadnotes[j].id = uuidv4()
          }
          if (!loadnotes[j].attachments) {
            loadnotes[j].attachments = []
          }
          if (
            !loadnotes[j].color ||
            loadnotes[j].color === 'whitesmoke' ||
            loadnotes[j].color === 'NONE'
          ) {
            loadnotes[j].color = 'white'
          }
          if (!loadnotes[j].tags) {
            loadnotes[j].tags = []
          }
          if (!loadnotes[j].shares) {
            loadnotes[j].shares = []
          }
          if (loadnotes[j].trash === undefined) {
            loadnotes[j].trash = false
          }
          if (loadnotes[j].color.startsWith('is-')) {
            loadnotes[j].color = loadnotes[j].color.substring(3)
            if (loadnotes[j].color === 'danger') {
              loadnotes[j].color = 'error'
            }
            if (loadnotes[j].color === 'link') {
              loadnotes[j].color = 'accent'
            }
          }
        }

        context.commit('SET_NOTES', loadnotes)
      })

      // derive user info
      // let userData = blockstack.loadUserData()
      // let user = new blockstack.Person(userData.profile)
      // // user.avatar = user.avatarUrl()
      // ? user.avatarUrl()
      //   : '/img/account-reverse.png'
      // user.name = user.name() ? user.name() : 'Blockstack User'
      // user.username = userData.username
      let authResponseToken = userSession.loadUserData().authResponseToken
      // let decodedToken = blockstack.decodedToken(authResponseToken)
      let userData = userSession.loadUserData()
      context.commit('SET_USER_DATA', userData)
      let user = new blockstack.Person(userData.profile)
      context.commit('SET_USER', user)
      // user.publicKey = decodedToken.payload.public_keys[0]
      let username = userData.username
      context.commit('SET_USERNAME', username)
      let userAvatar = user.avatarUrl()
        ? user.avatarUrl()
        : 'https://s3.amazonaws.com/onename/avatar-placeholder.png'
      context.commit('SET_USER_AVATAR', userAvatar)
      let tmpname = user.name()
      let name = tmpname || 'Blockstack User'
      context.commit('SET_NAME', name)
      context.commit('SET_LOADING_STATUS', false)
    },
    signIn(context) {
      context.commit('SET_SIGNIN', true)
    },
    signOut(context) {
      context.commit('SET_SIGNIN', false)
      userSession.signUserOut(window.location.origin)
      context.state.user = {}
      context.state.username = ''
      context.state.userData = {}
      context.state.userAvatar = ''
      context.state.notes = []
    },
    setOptions(context, opts) {
      context.commit('SET_OPTIONS', opts)
    },
    setUser(context, user) {
      context.commit('SET_USER', user)
    },
    setUserName(context, username) {
      context.commit('SET_USERNAME', username)
    },
    setUserAvatar(context, avatar) {
      context.commit('SET_USER_AVATAR', avatar)
    },
    setName(context, name) {
      context.commit('SET_NAME', name)
    },
    setUserData(context, userData) {
      context.commit('SET_USER_DATA', userData)
      // let usr = new blockstack.Person(this.userData.profile)
      // context.commit('SET_USER', usr)
      // let usrnm = userData.username
      // context.commit('SET_USERNAME', usrnm)
      // let avatar = usr.avatarUrl() ? usr.avatarUrl() : '/img/account.png'
      // context.commit('SET_USER_AVATAR', avatar)
      // let name = usr.name() ? usr.name() : 'Blockstack User'
      // context.commit('SET_NAME', name)
    },
    setView(context, view) {
      context.commit('SET_VIEW', view)
    }
  },
  getters: {
    getUser: state => state.user,
    name: state => state.name,
    username: state => state.name,
    loadingStatus: state => state.loadingStatus,
    filterLabel: state => state.filterLabel,
    activeNote: state => state.activeNote,
    notes: state => state.notes,
    // newNote: state => state.newNote,
    getActiveNotes: state => state.notes.filter(note => !note.trash),
    isSignedIn: state => state.signedIn,
    getNoteById: state => id => state.notes.find(note => note.id === id),
    getTrash: state => state.notes.filter(note => note.trash),
    getFavorites: state => state.notes.filter(note => note.fave),
    view: state => state.options.view,
    labels: state => {
      let active = state.notes.filter(note => !note.trash)
      let tags = []
      active.forEach(function(note) {
        if (note.tags) {
          for (var i = 0; i < note.tags.length; i++) {
            if (tags.indexOf(note.tags[i]) === -1) {
              tags.push(note.tags[i])
            }
          }
        }
      })
      return tags
    },
    colors: state => {
      let active = state.notes.filter(note => !note.trash)
      let colors = active.map(note => note.color)
      return [...new Set(colors)]
    },
    filterNotesByColor: state => color =>
      state.notes.filter(note => note.color === color),
    filterNotesByLabel: state => label => {
      if (label === 'All') {
        return state.notes.filter(note => !note.trash)
      } else {
        return state.notes.filter(
          note => !note.trash && note.tags.includes(label)
        )
      }
    },
    filterNotes: state => {
      // We have several pre-defined filters, 'All',
      // 'trash', and 'Favorites', as well as color-coded
      // notes.  If "noteFilter" is not one of these
      // then it must be a user generated label.
      // So we have a couple of search conditions:
      // a) a pre-defined filter
      // b) a user generated label
      // c) a search term (text)
      if (state.searchTerm === null) {
        state.searchTerm = ''
      }
      let re = new RegExp(state.searchTerm, 'i')
      // pre-defined filters
      if (state.filterLabel === 'All') {
        return state.notes.filter(
          note => !note.trash && (re.test(note.text) || re.test(note.title))
        )
      } else if (state.filterLabel === 'trash') {
        return state.notes.filter(
          note => note.trash && (re.test(note.text) || re.test(note.title))
        )
      } else if (state.filterLabel === 'Favorites') {
        return state.notes.filter(
          note =>
            note.fave &&
            !note.trash &&
            (re.test(note.text) || re.test(note.title))
        )
      } else if (state.filterLabel.startsWith('Color: ')) {
        return state.notes.filter(
          note =>
            !note.trash &&
            note.color === state.filterLabel.substring(7) &&
            (re.test(note.text) || re.test(note.title))
        )
      } else {
        // user generated label
        return state.notes.filter(
          note =>
            note.tags.includes(state.filterLabel) &&
            (re.test(note.text) || re.test(note.title)) &&
            !note.trash
        )
      }
    }
  }
})
