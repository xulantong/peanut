import Vue from "vue"
import './styles/index.scss';
import PeanutComponents from "./components"
import PeanutLayoutComponents from "./layouts/components"
import peanutBsBase from "./plugins/peanutBase"
import  "./plugins/premisson"
import dayjs from 'dayjs'

Vue.use(PeanutComponents)
Vue.use(PeanutLayoutComponents)
Vue.use(peanutBsBase)
