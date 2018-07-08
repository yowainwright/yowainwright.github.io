const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new Adapter() })

global.shallow = enzyme.shallow
global.render = enzyme.render
global.mount = enzyme.mount
