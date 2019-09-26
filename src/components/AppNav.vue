<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      id="sidenav"
      :value="$vuetify.breakpoint.mdAndUp"
      class="white"
    >
      <v-layout column justify-space-between fill-height style="background-color:#ffd304">
        <div>
          <v-list class="pb-2 pt-0">
            <v-list-group>
              <v-list-tile avatar slot="activator">
                <v-list-tile-avatar>
                  <img :src="userAvatar" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                avatar
                @click.native="exportData"
                class="black--text"
                active-class="primary--text"
              >
                <v-list-tile-avatar>
                  <v-icon>mdi-download</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Backup Notes</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                avatar
                @click="signOut"
                class="black--text"
                active-class="primary--text yello"
              >
                <v-list-tile-avatar>
                  <v-icon>mdi-logout</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Sign Out</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile
              @click="labelClick('All')"
              :value="filterLabel === 'All'"
              active-class="primary--text yellow"
            >
              <v-list-tile-avatar>
                <v-icon>mdi-view-dashboard-variant</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>All Notes</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click="labelClick('Favorites')"
              :value="filterLabel === 'Favorites'"
              active-class="primary--text yellow"
            >
              <v-list-tile-avatar>
                <v-icon>mdi-heart</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Favorites</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click="labelClick('trash')"
              :value="filterLabel === 'trash'"
              active-class="primary--text yellow"
            >
              <v-list-tile-avatar>
                <v-icon>mdi-delete</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Trash</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <template v-for="(item, lblIdx) in getLabels">
              <v-list-tile
                avatar
                @click="labelClick(item)"
                :key="lblIdx"
                :value="filterLabel === item"
                active-class="primary--text yellow"
              >
                <v-list-tile-avatar>
                  <v-icon>mdi-label</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-group v-model="colorGrp" key="clrs" v-if="colors.length">
              <v-list-tile avatar slot="activator">
                <v-list-tile-avatar>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Filter By Color</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <template v-for="(color, i) in colors">
                <v-list-tile
                  avatar
                  @click.stop="labelClick('Color: ' + color)"
                  :key="i"
                  active-class="primary--text yellow"
                  :value="filterLabel === 'Color: ' + color"
                >
                  <v-list-tile-avatar>
                    <v-icon :color="color">mdi-circle</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content
                    class="capitalize"
                  >{{ color.substr(0,color.indexOf(' ')) + ' Notes' }}</v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list-group>
          </v-list>
        </div>
        <div class="mb-4">
          <div style="width:100%">
            <img
              src="static/images/logos/wide.png"
              style="max-width: 100%;margin: 0 auto;display: block;"
              class="pa-4"
            />
          </div>
          <a href="https://vyse.in" target="_blank" rel="noopener norefferer">
            <p class="text-xs-center nr-community mb-0">Notekeeper by Vyse</p>
          </a>
        </div>
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar class="white pt-3" light app flat fixed v-if="$vuetify.breakpoint.smAndUp">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="capitalize">{{ titlebarLabel }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchString"
        clearable
        placeholder="Search"
        type="text"
        @input="setSearchTerm"
        @click:clear="$nextTick(() => clearSearch)"
      ></v-text-field>
    </v-toolbar>
    <v-toolbar color="white pt-3" light app flat fixed v-else>
      <v-text-field
        v-model="searchString"
        clearable
        placeholder="Search"
        type="text"
        @input="setSearchTerm"
        @click:clear="$nextTick(() => clearSearch)"
        class="mt-3"
        prepend-inner-icon="mdi-menu"
        @click:prepend-inner="drawer = !drawer"
      ></v-text-field>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      bottomNav: 'all',
      showSearch: false,
      signedIn: false,
      drawer: false,
      expand: false,
      colorGrp: false,
      showUserMenu: false,
      searchString: '',
      colorRows: 0,
      noteCreateOptions: [
        { text: 'Note', action: 'note' },
        // { text: 'Note from Template', action: 'template' },
        { text: 'List', action: 'list' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getLabels: 'labels',
      getLayout: 'layout',
      isSignedIn: 'signedIn',
      notes: 'notes',
      user: 'getUser',
      filterLabel: 'filterLabel',
      colors: 'colors'
    }),
    numberOfColors() {
      this.colorRows = this.colors.length / 5 + 1
      return this.colors.length
    },
    username() {
      return this.$store.state.username
    },
    userAvatar() {
      return this.$store.state.userAvatar
    },
    name() {
      return this.$store.state.user.name()
    },
    titlebarLabel() {
      if (this.filterLabel.startsWith('Color:')) {
        return this.filterLabel.substring(7, this.filterLabel.lastIndexOf(' '))
      } else {
        return this.filterLabel
      }
    }
  },
  methods: {
    ...mapActions([
      'setSearchTerm',
      'setFilterLabel',
      'signIn',
      'signOut',
      'addNote',
      'showSearchPage'
    ]),
    ...mapMutations({
      setSnack: 'setSnack'
    }),
    clearSearch() {
      this.setSearchTerm = ''
      this.searchString = ''
    },
    toggleSearchBar() {
      this.expand = !this.expand
    },
    labelClick(label) {
      this.$router.push('/notes')
      this.setFilterLabel(label)
      if (!this.$vuetify.breakpoint.mdAndDown) {
        this.drawer = false
      }
    },
    showNBModal() {
      this.$store.state.showNBModal = true
    },
    exportData() {
      this.showUserMenu = false
      let name = this.name || ''
      let fileexport = '---\n'
      /* eslint-disable no-unused-vars */
      let tagExport = ''
      let shareExport = ''
      let i = 0
      const self = this
      this.notes.forEach(function(note) {
        if (!note.trash) {
          fileexport += 'title: ' + note.title.replace(/#/g, '').trim() + '  \n'
          fileexport += 'date:'
          if (note.created) {
            fileexport += ' ' + new Date(note.created).toISOString()
          }
          fileexport += '  \n'
          fileexport += 'lastmod:'
          if (note.modified) {
            fileexport += ' ' + new Date(note.modified).toISOString()
          }
          fileexport += '  \n'
          fileexport += 'author: ' + name + '  \n'
          fileexport += 'category: '
          if (note.tags.length > 0) {
            for (i = 0; i < note.tags.length; i++) {
              tagExport += note.tags[i] + ', '
            }
            tagExport = tagExport.substring(0, tagExport.length - 2)
            fileexport += tagExport + '  \n'
          } else {
            fileexport += ' \n'
          }
          fileexport += 'favorite: ' + note.fave + '  \n'
          fileexport += 'color: ' + note.color + '  \n'
          fileexport += 'shared with: '
          if (note.shares.length > 0) {
            for (i = 0; i < note.shares.length; i++) {
              shareExport += note.shares[i] + ', '
            }
            shareExport = shareExport.substring(0, shareExport.length - 2)
            fileexport += shareExport + '  \n\n'
          } else {
            fileexport += ' \n\n'
          }
          fileexport += '---\n'
          fileexport += note.text
          fileexport += '\n---\n\n'
          tagExport = ''
          shareExport = ''
        }
      })
      const FileSaver = require('file-saver')
      let blob = new Blob([fileexport], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, 'Notekeeper.md')
    }
  }
}
</script>

<style scoped>
.v-list__tile__title {
  line-height: 24px;
  height: 20px;
}
a {
  text-decoration: none;
}
.capitalize {
  text-transform: capitalize;
}
</style>