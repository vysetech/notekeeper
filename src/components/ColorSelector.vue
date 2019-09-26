<template>
  <v-menu offset-y bottom right>
    <v-btn icon slot="activator">
      <v-icon>mdi-palette</v-icon>
    </v-btn>
    <v-card>
      <v-flex xs12>
        <v-icon @click="setColor('')" color="black">mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('red ' + colorModifier)"
          :color="'red ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('pink ' + colorModifier)"
          :color="'pink ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('purple ' + colorModifier)"
          :color="'purple ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
      </v-flex>
      <v-flex xs12>
        <v-icon
          @click="setColor('deep-purple ' + colorModifier)"
          :color="'deep-purple ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('indigo ' + colorModifier)"
          :color="'indigo ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('blue ' + colorModifier)"
          :color="'blue ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('light-blue ' + colorModifier)"
          :color="'light-blue ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
      </v-flex>
      <v-flex xs12>
        <v-icon
          @click="setColor('cyan ' + colorModifier)"
          :color="'cyan ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('teal ' + colorModifier)"
          :color="'teal ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('green ' + colorModifier)"
          :color="'green ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('light-green ' + colorModifier)"
          :color="'light-green ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
      </v-flex>
      <v-flex xs12>
        <v-icon
          @click="setColor('lime ' + colorModifier)"
          :color="'lime ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('yellow ' + colorModifier)"
          :color="'yellow ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('amber ' + colorModifier)"
          :color="'amber ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('orange ' + colorModifier)"
          :color="'orange ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
      </v-flex>
      <v-flex xs12>
        <v-icon
          @click="setColor('deep-orange ' + colorModifier)"
          :color="'deep-oragne ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('brown ' + colorModifier)"
          :color="'brown ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('grey ' + colorModifier)"
          :color="'grey ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
        <v-icon
          @click="setColor('blue-grey ' + colorModifier)"
          :color="'blue-grey ' + colorModifier"
        >mdi-circle-slice-8</v-icon>
      </v-flex>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      colorModifier: 'lighten-4'
    }
  },
  methods: {
    setColor (color) {
      this.$emit('set-color', color)
    }
  }
}
</script>
<style scoped>
</style>