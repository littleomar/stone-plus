import { observable, computed, action } from 'mobx'

export default class AppState {
  constructor({count,name}={count:1,name:'omar'}) {
    this.count = count
    this.name = name
  }

  @observable count
  @observable name
  @computed get msg() {
    return `${this.name} said i have ${this.count} apple`
  }

  @action fetchData() {
    this.count++
  }
  toJson() {
    return {
      count: this.count,
      name: this.name
    }
  }
}



