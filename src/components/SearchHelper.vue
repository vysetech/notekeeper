<template>
  <v-card flat full-width>
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-center text-xs-center flexbox>
          <span class="headline">{{ heading }}</span>
          <br>
          <span class="subheading" v-html="searchText"></span>
        </v-flex>
      </v-layout>
    </v-container>
    <v-img
      height="400"
      src="/static/images/empty.png"
      contain
      lazy-src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    ></v-img>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      heading: 'No Notes Found!',
      searchText:
        'Check your filters and/or add a note by clicking the <v-btn color="accent" fab small><v-icon color="white">add</v-icon></v-btn> button below!'
    }
  },
  computed: {
    ...mapGetters(['notes', 'getActiveNotes'])
  }
}
</script>
