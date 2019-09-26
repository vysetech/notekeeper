<template>
  <div>
    <header id="header" class="header">
      <div class="wr" style="color:#fff;font-weight:400">
        <a id="headerLogo" href="/" class="header__logoImg" style="margin: 0 auto">
          <img src="static/images/logos/wide.png" height="80px" />
        </a>
      </div>
    </header>
    <div
      id="hero"
      class="section section--hero section--left"
      style="background-color:#ffd304;padding-bottom:60px;padding-top:60px"
    >
      <div class="wr heroWr heroWr--left">
        <div class="heroWrapper heroWrapper--left heroWrapper--pd">
          <h1
            class="hero__title"
            style="font-weight:700;font-family:&#x27;Roboto Condensed&#x27;, sans-serif"
          >Easy Note Keeping</h1>
          <h2
            class="hero__subtitle"
            style="font-weight:400;font-size: 1.7rem;"
          >Cross platform, easy to use note taking for all your needs.</h2>
          <div class="hero__ctas">
            <a
              @click="signIn"
              class="btn btn--b btn--primary btn--large"
              style="color:black;background-color:#fff;padding: 1.5em;"
            >Sign in with Blockstack</a>
            <a
              href="https://www.producthunt.com/posts/notekeeper-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-notekeeper-2"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=169272&theme=light"
                alt="Notekeeper - Decentralized Note Keeping App | Product Hunt Embed"
                style="width: 250px; height: 54px;"
                width="250px"
                height="54px"
              />
            </a>
          </div>
        </div>
        <div class="pd pd--right pd--dark">
          <div class="pd__crossPlatform">
            <div class="pd__laptop">
              <div class="pd__laptop__screen">
                <img
                  src="static/images/mockups/laptop.png"
                  srcset="static/images/mockups/laptop.png 2x"
                />
              </div>
            </div>
            <div class="pd__sp pd__sp--small">
              <div class="pd__sp__screen">
                <img
                  src="static/images/mockups/mobile.png"
                  srcset="static/images/mockups/mobile.png 2x"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { UserSession } from 'blockstack'
const userSession = new UserSession()

export default {
  name: 'landing',
  mounted() {},
  methods: {
    signIn(e) {
      e.preventDefault()
      const manLoc = window.location.origin + '/manifest.json'
      userSession.redirectToSignIn(window.location.origin, manLoc, [
        'store_write'
      ])
    }
  }
}
</script>
<style scoped>
/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */
.mkd input,
button,
hr,
input {
  overflow: visible;
}
progress,
sub,
sup {
  vertical-align: baseline;
}
body,
html {
  -webkit-text-size-adjust: 100%;
}
.btn--b,
sub,
sup {
  position: relative;
}
.mkd table,
.pricingTable {
  border-collapse: collapse;
}
html {
  line-height: 1.15;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
hr {
  box-sizing: content-box;
  height: 0;
}
.feature,
.inlineForm__input,
.wr,
legend {
  box-sizing: border-box;
}
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
a {
  background-color: transparent;
}
abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}
b,
strong {
  font-weight: bolder;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
img {
  border-style: none;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button,
select {
  text-transform: none;
}
[type='button'],
[type='reset'],
[type='submit'],
button {
  -webkit-appearance: button;
}
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner,
button::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
[type='button']:-moz-focusring,
[type='reset']:-moz-focusring,
[type='submit']:-moz-focusring,
button:-moz-focusring {
  outline: ButtonText dotted 1px;
}
fieldset {
  padding: 0.35em 0.75em 0.625em;
}
legend {
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}
textarea {
  overflow: auto;
}
[type='checkbox'],
[type='radio'] {
  box-sizing: border-box;
  padding: 0;
}
[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}
[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
.btn,
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
}
details {
  display: block;
}
summary {
  display: list-item;
}
[hidden],
template {
  display: none;
}
body {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  font-style: normal;
  color: #24292e;
  background-color: #fff;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.wr {
  max-width: 1030px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}
@media only screen and (max-width: 700px) {
  .wr {
    padding: 0 15px;
  }
}
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin: 0;
  padding: 0 0.7em;
  height: 2.4em;
  line-height: 2.4em;
  border: none;
  outline: 0;
  border-radius: 3px;
  font-weight: 500;
  font-size: 1.05em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.btn--large {
  font-size: 1.2em;
}
.btn--plain {
  background: 0 0;
}
.btn--a {
  background: #fff;
}
.btn--a.btn--primary,
.btn--a.btn--secondary {
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btn--a.btn--primary:hover,
.btn--a.btn--secondary:hover {
  box-shadow: 0 4px 10px rgba(50, 50, 93, 0.226), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: #fefefe;
}
.btn--a.btn--plain {
  background: 0 0;
  text-decoration: underline;
}
.btn--b {
  padding: 0 15px;
  border-radius: 1.2em;
  box-shadow: inset 0 0 0 1px;
  backface-visibility: hidden;
}
.btn--b.btn--primary:hover {
  box-shadow: 0 4px 10px rgba(50, 50, 93, 0.226), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btn--b.btn--secondary:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 1.3em;
  color: inherit;
  transition: box-shadow 0.1s linear;
  box-shadow: inset 0 0 0 0;
}
.btn--b.btn--secondary:hover:after {
  box-shadow: inset 0 0 0 3px;
}
.btn--b.btn--primary {
  box-shadow: none;
}
.btn--b.btn--plain {
  box-shadow: none;
  text-decoration: underline;
}
.btn--c.btn--primary,
.btn--c.btn--secondary {
  transition: box-shadow 0.2s ease;
  backface-visibility: none;
}
.btn--c.btn--primary {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.171);
}
.btn--c.btn--secondary {
  box-shadow: inset 0 0 0 1px, 0 1px 2px rgba(0, 0, 0, 0.171);
}
.btn--c.btn--primary:hover,
.btn--c.btn--secondary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(50, 50, 93, 0.226), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btn--c.btn--secondary:hover {
  box-shadow: inset 0 0 0 1px, 0 4px 10px rgba(50, 50, 93, 0.226),
    0 1px 3px rgba(0, 0, 0, 0.08);
}
.btn--loading {
  cursor: wait;
  pointer-events: none;
}
.btn--loading:after {
  content: '';
  display: inline-block;
  margin-bottom: -0.2em;
  height: 16px;
  width: 16px;
  border: 2px solid hsla(0, 0%, 100%, 0.3);
  border-right-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  margin-left: 0.6em;
  animation: a;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.btn--success {
  color: #fff !important;
  background: #22bc66 !important;
}
.btn--success:after {
  content: '\2713';
  font-size: 1.4em;
  padding-left: 9px;
}
@keyframes a {
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}
.section {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 50px 0;
  overflow: hidden;
}
.section--noPadding {
  padding: 0;
}
.section--light {
  color: #fff;
}
.section--dark {
  color: #000;
}
.section__title {
  margin: 0 0 5px;
  text-align: center;
  font-weight: 700;
  font-size: 2.7em;
  line-height: 1.3em;
}
.section__title.standalone {
  margin-bottom: 50px;
}
.section__subtitle {
  text-align: center;
  margin: 0 0 50px;
  font-weight: 500;
  color: #0000b3;
  font-size: 16pt;
}
.section--titles .section__subtitle {
  margin-bottom: 0;
}
.section__subtitle.left,
.section__title.left {
  text-align: left;
}
.sectionBackdropWrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
}
.sectionBackdrop.video {
  height: auto;
  width: auto;
  min-width: 100%;
  min-height: 100%;
}
.iconWrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.header,
.header .wr,
.header__nav {
  display: flex;
}
.iconWrapper.titleIcon,
.titleIcon {
  display: flex;
  margin-bottom: 15px;
}
.section--center .titleIcon {
  margin: 0 auto 15px;
}
.iconWrapper .backdrop {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
}
.iconWrapper .icon {
  margin: 0 !important;
}
.iconWrapper.hexagon .icon {
  background-size: 50%;
}
.iconWrapper svg.icon {
  max-width: 50%;
  max-height: 50%;
}
.iconWrapper.circle .icon,
.iconWrapper.rounded .icon {
  background-size: 60%;
}
.iconWrapper.circle svg.icon,
.iconWrapper.rounded svg.icon {
  max-width: 60%;
  max-height: 60%;
}
.icon {
  position: relative;
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
}
.media--image {
  width: 100%;
}
.media--image,
.media--video {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
.mediawrapper--cover img {
  object-fit: cover;
}
.header {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  padding: 10px 0;
  z-index: 8;
  height: 50px;
}
.header--fixed {
  position: fixed;
  background: #fff;
}
.header--fixed.header--solid {
  border-bottom: 1px solid #bbb;
}
.header .wr {
  flex-wrap: wrap;
  justify-content: space-between;
}
.headerSpacer {
  height: 70px;
  width: 100%;
}
.header__nav--hidden {
  display: none;
}
.header__nav .btn {
  color: inherit;
  margin: 0 15px;
  font-size: 15px;
}
.header__nav .btn:first-child {
  margin-left: 0;
}
.header__logo {
  margin: 0 40px 0 0;
  padding: 0;
  font-size: 22pt;
  line-height: 50px;
  color: inherit !important;
  text-decoration: none;
  white-space: nowrap;
}
.header__logoImg {
  display: flex;
}
.header__logoImg img {
  margin: auto;
}
.header__navCtas {
  display: flex;
  margin-left: 20px;
}
.header__navCtas:first-child {
  margin-left: 0;
}
.header__nav .btn {
  display: block;
  line-height: 34px;
  margin-top: 7px;
  margin-right: 0;
  white-space: nowrap;
}
.headerMenu {
  position: fixed;
  display: none;
  top: -10px;
  right: 0;
  bottom: 10px;
  left: 0;
}
.headerMenu--visible {
  display: block;
  z-index: 9;
}
.headerMenu__backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: 0 0;
}
.headerMenu__links {
  position: relative;
  max-width: 300px;
  background: #fff;
  border-radius: 5px;
  margin: 50px auto 20px;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.headerMenu__links li {
  border-bottom: 1px solid #eee;
}
.headerMenu__links li:last-child {
  border-bottom: none;
}
.headerMenu__links .btn {
  display: block;
  text-decoration: none;
  font-size: 1.2em;
  text-align: center;
  border-radius: 0;
}
.headerMenu__links .btn:hover {
  box-shadow: none;
  transform: none;
}
.headerMenu__close {
  position: relative;
  display: block;
  width: 140px;
  background: 0 0;
  color: #fff;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  font-size: 1.1em;
  border-radius: 4px;
}
@media only screen and (max-width: 700px) {
  .header__logo {
    font-size: 18pt;
  }
}
.section--hero {
  background-position: 50%;
  background-size: cover;
  min-height: 100vh;
}
.heroWr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}
.heroWr--right {
  justify-content: center;
}
.heroWr--bottom,
.heroWr--center {
  flex-direction: column;
  justify-content: center;
}
.heroWrapper {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  --margin-top-scale: 1;
  --margin-bottom-scale: 1;
  margin-top: 150px;
  margin-top: calc(150px * var(--margin-top-scale));
  margin-bottom: 150px;
  margin-bottom: calc(150px * var(--margin-bottom-scale));
}
.heroWrapper .titleIcon {
  margin-bottom: 20px;
}
.heroWrapper--bottom .titleIcon,
.heroWrapper--center .titleIcon {
  margin: 0 auto 20px;
}
.heroWrapper--left,
.heroWrapper--right {
  max-width: 50%;
  min-width: 320px;
}
.heroWrapper--bottom,
.heroWrapper--center {
  text-align: center;
}
.heroWrapper--bottom {
  margin-top: 60px;
}
.heroWrapper--pd.heroWrapper--bottom,
.heroWrapper--pd.heroWrapper--center {
  margin-top: 80px;
  margin-bottom: 60px;
}
.hero__title {
  margin: 0 0 17px;
  font-weight: 700;
  font-size: 3.5em;
  line-height: 1.2;
  white-space: pre-line;
}
.hero__subtitle {
  font-weight: 500;
  max-width: 500px;
  margin: 0;
  white-space: pre-line;
}
.heroWrapper--bottom .hero__subtitle,
.heroWrapper--center .hero__subtitle {
  margin: 0 auto;
}
.hero__ctas {
  margin-top: 30px;
}
.hero__ctas .btn {
  margin-right: 15px;
  margin-bottom: 15px;
}
.hero__ctas .btn:last-child {
  margin-right: 0;
}
.hero__ctaInfo {
  display: inline;
  max-width: 230px;
  font-size: 0.9em;
  opacity: 0.7;
}
.heroWrapper--bottom .hero__ctaInfo,
.heroWrapper--center .hero__ctaInfo {
  margin: 10px auto;
}
@media only screen and (max-width: 700px) {
  .heroWr {
    flex-direction: column;
  }
  .heroWrapper--left,
  .heroWrapper--right {
    max-width: none;
    margin-top: 80px;
    margin-bottom: 60px;
    text-align: center;
  }
  .heroWrapper--left .titleIcon,
  .heroWrapper--right .titleIcon {
    margin: 0 auto 20px;
  }
  .hero__subtitle {
    margin: 0 auto;
  }
  .hero__ctaInfo {
    margin: 10px auto;
  }
}
@media only screen and (max-width: 400px) {
  .hero__title {
    font-size: 28pt;
  }
  .hero__subtitle {
    font-size: 14pt;
  }
}
.pd {
  position: relative;
  display: flex;
  z-index: 4;
}
@media only screen and (max-width: 500px) {
  .pd {
    display: none;
  }
}
.pd--bottom,
.pd--top {
  align-items: center;
  justify-content: center;
}
.pd--bottom {
  margin-bottom: -60px;
  align-items: normal;
  justify-content: center;
}
.pd--top {
  max-height: 400px;
  margin-top: 50px;
}
.pd--left,
.pd--right {
  margin-top: 30px;
  max-height: 500px;
  align-items: center;
  justify-content: center;
}
.pd--left {
  margin-right: 50px;
}
.pd--right {
  margin-left: 50px;
}
.pd__browser,
.pd__imgBox {
  display: block;
  border-radius: 8px;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 3px 6px #00001a, 0 10px 22px #000003;
  background-color: #fff;
}
.pd__smartphones,
.pd__sp {
  display: flex;
  justify-content: center;
  position: relative;
}
.pd__browser {
  width: 500px;
  height: 350px;
}
.pd__imgBox {
  object-fit: contain;
  border-radius: 0;
}
.pd__imgBox video {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  object-position: left;
}
.galleryItem img,
.pd__browserContent video {
  object-fit: cover;
}
.galleryItem img,
.pd--bottom .pd__imgBox video {
  object-position: center;
}
.pd--left .pd__imgBox,
.pd--right .pd__imgBox {
  max-height: 500px;
}
.pd--bottom .pd__imgBox,
.pd--top .pd__imgBox {
  max-height: 400px;
}
.pd--bottom .pd__imgBox video,
.pd--top .pd__imgBox video {
  max-height: 400px;
  width: auto;
  max-width: 100%;
}
.pd--bottom .pd__browser {
  border-radius: 8px 8px 0 0;
  width: 840px;
  height: 530px;
}
.pd__imgBox--transparent {
  box-shadow: none;
  background-color: transparent;
}
.pd--bottom .pd__imgBox--transparent {
  background-position: top;
}
.pd__browserChrome {
  height: 12px;
  background: #fefefe;
  padding: 12px;
}
.pd__browserActions {
  height: 12px;
  width: 12px;
  background: #fe6058;
  box-shadow: 20px 0 0 #febe2e, 40px 0 0 #29cc42;
  border-radius: 50%;
}
.pd__browserContent {
  height: calc(100% - 36px);
  background-size: cover;
  background-position: 0 0;
}
.pd--bottom .pd__smartphones {
  max-height: 370px;
}
.pd--right .pd__smartphones {
  transform: translateY(20px);
}
.pd__sp {
  align-items: center;
  width: 230px;
  height: 475px;
  background: #fff;
  border-radius: 38px;
  box-shadow: 0 3px 35px #0003, inset 0 2px 5px #0003,
    inset 0 0 10px rgba(0, 0, 0, 0.1);
}
.pd--dark .pd__sp {
  background: #242424;
}
.pd__sp--small {
  width: 161px;
  height: 333px;
  border-radius: 25px;
}
.pd__sp--slanted:first-child {
  transform: rotate(-12deg) scale(0.95) translate(40px, 20px);
}
.pd__sp--slanted:last-child {
  transform: rotate(12deg);
}
.pd__sp__screen {
  border: 2px solid #f9f9f9;
  height: 380px;
  width: 200px;
  overflow: hidden;
}
.pd__sp__screen img {
  display: block;
  width: 100%;
}
.pd--dark .pd__sp__screen {
  border: none;
}
.pd__sp--small .pd__sp__screen {
  height: 266px;
  width: 140px;
}
.pd__crossPlatform {
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 100vw;
}
.pd--bottom .pd__crossPlatform {
  max-height: 370px;
  max-width: 580px;
  margin: 0 auto 50px;
}
.pd--right .pd__crossPlatform {
  transform: translateY(-40px);
}
.pd__crossPlatform .pd__sp {
  position: absolute;
  right: -30px;
  top: 50px;
}
.pd--bottom .pd__crossPlatform .pd__sp {
  top: 33px;
  left: -20px;
}
.pd__laptop {
  position: relative;
  width: 500px;
  height: 350px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 30px 30px 20px 20px;
  box-shadow: 0 3px 35px #0003, inset 0 5px 5px rgba(0, 0, 0, 0.089),
    inset 0 -13px 13px #00000a, inset 0 0 10px #00001a;
}
.pd__laptop:after,
.pd__laptop:before {
  position: absolute;
  left: -36px;
  right: -36px;
  content: '';
}
.pd--dark .pd__laptop {
  background: #242424;
}
.pd__laptop:before {
  bottom: -6px;
  height: 9px;
  background: #e3e8ed;
  border-bottom-left-radius: 25% 100%;
  border-bottom-right-radius: 25% 100%;
}
.pd--dark .pd__laptop:before {
  background: #242424;
}
.pd__laptop:after {
  bottom: 3px;
  height: 5px;
  background: #fff;
  border-radius: 3px 3px 0 0;
}
.pd--dark .pd__laptop:after {
  background: #43494e;
}
.pd__laptop__screen {
  border: 2px solid #f9f9f9;
  height: 290px;
  width: 460px;
  overflow: hidden;
}
.pd__laptop__screen img {
  width: 100%;
  height: 100%;
}
.pd--dark .pd__laptop__screen {
  border: none;
}
@media only screen and (max-width: 930px) {
  .pd--bottom .pd__browser {
    width: 588px;
    height: 371px;
  }
}
@media only screen and (max-width: 700px) {
  .pd--left,
  .pd--right {
    margin-left: 0;
    margin-right: 0;
  }
  .pd--right .pd__imgBox {
    max-height: 400px;
  }
  .pd--left .pd__imgBox video,
  .pd--right .pd__imgBox video {
    max-height: 400px;
    width: auto;
    max-width: 100%;
  }
  .pd--bottom .pd__browser {
    width: 441px;
    height: 300px;
  }
}
@media only screen and (max-width: 441px) {
  .pd--bottom .pd__browser {
    width: calc(100vw - 20px);
    height: 300px;
  }
}
</style>