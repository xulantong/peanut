import Vue from "vue"
import './styles/index.scss';
import PeanutComponents from "./components"
import PeanutLayoutComponents from "./layouts/components"
import peanutBsBase from "./plugins/peanutBase"
import baseUtils from "./plugins/baseUtils"
import  "./plugins/premisson"
import htmlToPdf from "./utils/htmlToPdf"
import dayjs from 'dayjs'

Vue.use(PeanutComponents)
Vue.use(PeanutLayoutComponents)
Vue.use(peanutBsBase)
Vue.use(baseUtils)
Vue.use(htmlToPdf)
