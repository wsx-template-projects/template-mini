/* 官方示例：http://mockjs.com/examples.html */
import createMock from './createMock'
import registerMock from './registerMock'
import myMockData from './modules'
import autoMockData from './data'
import config from "@/config"
console.log("config :>>",config)
const modules = {
    ...autoMockData,
    ...myMockData,
}
const myMock = createMock(config.base_url)

registerMock(myMock, modules)

