<template>
  <v-menu offset-y top nudge-left="25">
    <v-btn icon slot="activator">
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile avatar @click="toggleFave" v-if="!activeNote.trash">
        <v-list-tile-avatar>
          <v-icon color="red" v-if="activeNote.fave">mdi-heart</v-icon>
          <v-icon v-if="!activeNote.fave">mdi-heart-outline</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Add Favorite</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile avatar @click="exportData">
        <v-list-tile-avatar>
          <v-icon color="primary">mdi-cloud-download</v-icon>
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
    </v-list>
  </v-menu>
</template>

<script>
import { putFile } from 'blockstack'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import axios from 'axios'

const { encryptECIES } = require('blockstack/lib/encryption')
const SPRINGROLE_PK = 'pk.txt'
const GRAPHITE_PK = 'key.json'
const XORDRIVE_PK = 'key.json'
// const GRAPHITE_EXPORT_INDEX_FILE = 'GraphiteExportIndex.json'
// const SPRINGROLE_EXPORT_INDEX_FILE = 'StealthyExportIndex.json'

export default {
  name: 'Share',
  data () {
    return {
      blockstack: window.blockstack,
      alert: false
    }
  },
  computed: {
    ...mapGetters(['activeNote', 'getUser'])
  },
  methods: {
    ...mapActions(['toggleTrash']),
    ...mapMutations({
      setSnack: 'setSnack'
    }),
    trashNote () {
      this.toggleTrash()
    },
    xordrive () {
      this.setSnack('Coming Soon')
    },
    graphite () {
      this.setSnack('Coming Soon')
    },
    springrole () {
      this.setSnack('Coming Soon')
    },
    exportData () {
      this.showUserMenu = false
      var fileexport = '---\n'
      /* eslint-disable no-unused-vars */
      var tagExport = ''
      var shareExport = ''
      var i = 0
      const self = this
      let note = this.activeNote
      let exportTitle = note.title.replace(/#/g, '').trim()
      if (!note.trash) {
        fileexport += 'title: ' + exportTitle + '  \n'
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
        fileexport += 'author: ' + self.getUser.name().trim() + '  \n'
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
        var FileSaver = require('file-saver')
        var blob = new Blob([fileexport], { type: 'text/plain;charset=utf-8' })
        FileSaver.saveAs(blob, exportTitle + '.md')
      }
    },
    exportToGraphite () {
      this.setSnack('Coming Soon!')
      let graphiteUrl = ''
      console.log('export to graphite')
      // find graphite url
      this.blockstack
        .getUserAppFileUrl(
          GRAPHITE_PK,
          this.$store.state.username,
          'https://app.graphitedocs.com'
        )
        .then(response => {
          graphiteUrl = response.body
          console.log('graphite pk url:')
          console.log(response)
          console.log('username:' + this.$store.state.username)
          // call loadkey
          var pk = this.loadKey(graphiteUrl)
          // encrypt with public key
          this.fileName = 'graphiteIndex.json'
          this.encryptData(pk)
          // write file
          this.exportEncryptedData()
          // reset component data
        })
        .catch(err => {
          console.log(err)
        })
      this.cleanup()
    },
    exportToXORDrive () {
      // public key location  {xordrivegaiaurl}/public.json
      // The content of the file is a json object { pk: ‘ghdbbhhhdjnd’ }.
      console.log('export to xordrive')
      let xordriveUrl = ''
      this.setSnack('Coming Soon!')
      this.blockstack
        .getUserAppFileUrl(
          XORDRIVE_PK,
          this.$store.state.username,
          'https://xordrive.io'
        )
        .then(response => {
          xordriveUrl = response
          console.log('xordrive pk url:')
          console.log(response)
          console.log('username:' + this.$store.state.username)
          // call loadkey
          var pk = this.loadKey(xordriveUrl)
          console.log(
            'xordrive public key for ' + this.$store.state.username + ':' + pk
          )
          // encrypt with public key
          this.fileName = 'xordriveIndex.json'
          let encryptedFile = this.encryptData(pk, this.note)
          // write file
          this.exportEncryptedData(encryptedFile)
          // reset component data
        })
        .catch(err => {
          console.log(err)
        })
      this.cleanup()
    },
    exportToStealthy () {
      console.log('export to springrole')
      // // find stealty url
      var springroleUrl = this.blockstack.getUserAppFileUrl(
        SPRINGROLE_PK,
        'dantrevino.id',
        'https://www.springrole.im'
      )
      console.log('springrole pk url: ' + springroleUrl)
      // // call loadkey
      var pk = this.loadKey(springroleUrl)
      console.log()
      // // encrypt with public key
      this.fileName = 'springroleIndex.json'
      var encData = this.encryptData(pk)
      // // write file
      this.exportEncryptedData(encData)
      // // reset component data
      this.cleanup()
    },
    loadKey (url) {
      console.log('loadkey')
      console.log('note: ' + JSON.stringify(this.note))
      var pubKey = ''
      axios
        .get(url)
        .then(response => {
          // target app gaia hub url and public key
          pubKey = response.body
        })
        .catch(error => {
          this.$eventHub.$emit('missing_public_key')
          console.log('error:', error)
        })
      return pubKey
    },
    encryptData (key, data) {
      // encrypt data
      const encryptedData = JSON.stringify(
        encryptECIES(key, JSON.stringify(data))
      )
      return encryptedData
    },
    exportEncryptedData (encryptedData) {
      // export encrypted data
      // each integration partner gets a unique "index" filename/path
      // 1. create filenames for each export filter & add to "index"
      // 1. export an "index" file
      // 3. export note(s)

      putFile(this.fileName, encryptedData, { encrypt: false })
        .then(() => {
          if (window.location.pathname === '/integrations') {
            console.log('Integration updated')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    cleanup () {
      this.exportedNote = null
      this.filename = ''
    }
  }
}
</script>

<style scoped>
</style>