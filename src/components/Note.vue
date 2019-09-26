<template>
  <v-card
    flat
    ripple
    hover
    :color="data.color || 'white'"
    :id="data.id"
    style="max-height:100%;overflow: hidden; border-radius: 4px; border: 1px solid lightgrey !important"
    @click.native="noteClick"
  >
    <v-img
      lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWQAAADICAMAAADobGszAAAAjVBMVEXUzs5GGVtzU39dN25UKmaOdZWXgZ2una5IHF1ZMWrKwcXQycuEao5lQXRWLWjRystwTn1pRXfGvMK/tL1RJ2RPJGKHbJCDZ4zTzM3NxchiPnJLH1/CuL+7rrm1prW4q7ermq2ij6abhqCVf5uAY4prSXlgOnCwobF4WIOgi6OSepiolqqJb5B9X4dtS3tEj5O+AAADmUlEQVR42uzQsREAEBQFsP/cobb/so7OBopkhBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8J+VtLpGkuKYSbrkl+TNrr3uqAmEARj+3g5ahHJYBKvg+bja1fu/vHZXZ8AgjZvUNCvz/JMwbPJGB2bYL8hGvuHrRLZs5L+xkb+gpsiTt9xxM7WeXx/tbBy3COPuSKqiRRy6TrDy/hp5+CvuuWnQ8a6G7s9DR/LEbkf2jmjBxERa5GjZXkr9XB+d377x/QBHxvqsdCfGZKsPzp/4R3AzcqIoZVM5m1J1KBs7aO6uMXISohV90zitDG1X5GEApKu+nyy2QJaYyPFy5kXebu0Cur2vgN4+8cfdFGfbFDkgPfR9b54DGz20B6jFn6HLEGfbqsgrQHnyLnoFYvkwOyZyMc3gRc4OwMaXd56Chsiw9c5hA6AvHzpAfBmaQ5siRyEUY/M9NU2qFuZo5EA60jOH2xg501ecmrnGT8HRQ5OiVZHnwEC0X+ZT1dCBpTl7JdrPxsjlNUJ4NZdeijZoVeQ3YCJalEIgNd9gbc5ORJs2Rp6JFkNgsnqizVoVeQPZUKpNXPPRWMNJ3p2gJ0bkNkR2I9GOoPQfuhrapshbyMWoft+G08EmzLgI5J2CWEqqIXIqxk/o3RzapsghbKTUMfe4WUCVKmfYUtAQ2alFrg+1kUV2BTbyg6eLkQO8dKfJKDrPyeoz04Vjp4srJ8ikfuPbX62lX0Hdf+OrR67f+IZFmyI3PMIdIRyKpkDd/QhXj9z6R7iGxUhcnar7gLp7MVKP3PrFyNWyOjLL6m+VH/cwNpEjp7I2HrufieynELZ0WS0rYFvbIOoA+0v5NSayHICT2SC6N7K55Lfz0FHQrg2iy1Znd+wni7zc6uwDHKeeP14qipOJ7CtAfWx1Ojjb+yK3b6vzilvbtN+ZSbO0WINq2LS/P7JMMjT3+3Nv2tcii/d66/WTqZz9kkpk6efl8c9Flokq31zlcJSnVI9sXqSmbqaOc6mYrVXhhi9dT3Rk8yLV0S9SPxdZ/P1JD+3BQKyHGgFLsR5qD8zEeqSRgnAo1j+3OPi6cQx0xPr3lqSDXRJ5s4MD9J7634j+myUVqZ2RH2L0VqC99MV6DG8Vh4Xr5D92YlmWZVmWZVmWZf1mDw4EAAAAAID8XxtBVVVVVVVVVVVVVVVVVVVpDw4EAAAAAAT5W4+wQAUAAAAAAAAAAADwApRfN4IlHal2AAAAAElFTkSuQmCC"
      :src="link"
      height="150"
      v-if="data.attachments[0]"
    >
      <v-toolbar flat card dense color="transparent" v-if="!data.trash">
        <v-spacer></v-spacer>
        <v-btn small icon @click.stop="toggleFaveById(data.id)">
          <v-icon small :color="data.fave ? 'red' : 'grey lighten-2'">mdi-heart</v-icon>
        </v-btn>
      </v-toolbar>
    </v-img>
    <div v-else>
      <v-toolbar flat card dense color="transparent" v-if="!data.trash">
        <div class="font-weight-bold">{{formatTitle()}}</div>
        <v-spacer></v-spacer>
        <v-btn small icon @click.stop="toggleFaveById(data.id)">
          <v-icon small :color="data.fave ? 'red' : 'grey lighten-2'">mdi-heart</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <div v-if="data.attachments[0]" class="font-weight-bold">{{formatTitle()}}</div>
    <viewer :value="data.text" :options="editorOptions" class="px-4" @click.native="noteClick" />
  </v-card>
</template>
<script>
import 'tui-editor/dist/tui-editor-extScrollSync'
import 'tui-editor/dist/tui-editor-extColorSyntax'
import 'tui-editor/dist/tui-editor-extUML'
import 'tui-editor/dist/tui-editor-extChart'
import 'tui-editor/dist/tui-editor-extTable'

import 'tui-editor/dist/tui-editor-contents.css'
import 'highlight.js/styles/github.css'
import Viewer from '@toast-ui/vue-editor/src/Viewer.vue'

// import 'highlight.js/styles/github.css'
// import hljs from 'highlight.js'
import { mapActions, mapGetters } from 'vuex'
import { UserSession } from 'blockstack'

const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'))
  .use(require('markdown-it-task-checkbox'))
  .use(require('markdown-it-emoji'))

// window.hljs = hljs

export default {
  props: ['data'],
  components: { Viewer },
  data() {
    return {
      userSession: new UserSession(),
      // hljs: window.hljs,
      link: '',
      editorOptions: {
        usageStatistics: false,
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
      }
    }
  },
  created() {
    this.getImage()
  },
  computed: {
    ...mapGetters(['filterLabel'])
  },
  methods: {
    ...mapActions([
      'updateActiveNote',
      'toggleTrash',
      'toggleFave',
      'toggleFaveById'
    ]),
    getImage() {
      if (this.data.attachments[0]) {
        this.userSession.getFile(this.data.attachments[0]).then(dataUrl => {
          this.link = dataUrl
        })
      }
    },
    formatTitle() {
      if (this.data.title) {
        if (this.data.title.length >= 20) {
          return this.data.title.substring(0, 18) + '...'
        } else {
          return this.data.title
        }
      } else {
        return 'Untitled Note'
      }
    },
    formatNote(input) {
      if (input) {
        return md.render(input)
        // return marked(input)
      }
    },
    noteClick() {
      this.updateActiveNote(this.data)
    },
    faveNote() {
      this.toggleFave()
    },
    trashNote() {
      this.toggleTrash()
    }
  }
}
</script>
<style>
/* @import '~github-markdown-css'; */
/* @import '~highlight.js/styles/atom-one-dark.css'; */
/* @import '~codemirror/lib/codemirror.css'; */

.v-card--hover:hover {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 1px 3px 1px rgba(60, 64, 67, 0.149);
}

.card__text {
  overflow: hide;
}
.task-list-item {
  list-style-type: none;
}
</style>