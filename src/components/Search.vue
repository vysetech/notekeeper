<template>
  <v-dialog v-model="show" fullscreen transition="dialog-bottom-transition" id="searchPage">
    <v-card>
      <v-toolbar card color="primary" dense dark>
        <v-btn icon @click.native="closeSearchPage">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Search</v-toolbar-title>
      </v-toolbar>
      <v-container grid-list-xs fluid fillheight>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              v-model="search"
              clearable
              placeholder="Search"
              type="text"
              class="pt-5"
              prepend-inner-icon="mdi-magnify"
              ref="searchBar"
              label=""
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <div class="lead">Search By Label</div>
            <v-container grid-list-xl>
              <v-layout row wrap>
                <v-flex xs3 v-for="(label, index) in labels" :key="index">
                  <v-card height="128px" width="128px">
                    <v-icon>mdi-label</v-icon>
                    <div class="justify-center">{{label}}</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
      <v-list>
        <v-subheader>Open in</v-subheader>
        <v-list-tile v-for="tile in tiles" :key="tile.title" @click="sheet = false">
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                :alt="tile.title"
              />
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Search',
  data() {
    return {
      search: '',
      show: false
    }
  },
  created: function() {
    this.$store.watch(
      state => state.showSearchPage,
      () => {
        this.show = this.$store.state.showSearchPage
      }
    )
  },
  computed: {
    ...mapGetters(['labels'])
  },
  methods: {
    closeSearchPage() {
      this.$store.state.showSearchPage = false
    }
  }
}
</script>

<style>
/* .v-input__slot {
  border: none !important;
  margin: 0;
} */
</style>