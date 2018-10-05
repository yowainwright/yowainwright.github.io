import { configure, shallow, render, mount } from 'enzyme'
import { Adapter } from 'enzyme-adapter-preact'

// const enzyme = require('enzyme')
// const Adapter = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })

global.shallow = shallow
global.render = render
global.mount = mount
global.graphql = () => ''
