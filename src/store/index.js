import {createStore} from 'vuex'
import axios from 'axios'

const EDN_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const headers = {
  'Content-Type': 'application/json',
  'apikey': 'FcKdtJs202204',
  'username': 'KDT2_Rohyoungseo'
}

export default createStore({
  state() {
    return {
      todos:[]
    }
  },
  mutations : {
    setTodos(state, todos) {
      state.todos = todos
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter(todo=> todo.id != id)
    },
    updateTodo(state, newtodos) {
      const {id} = newtodos
      const index = state.todos.findIndex(todo => todo.id === id)
      const todo = state.todos[index]
      for(const key in todo){
        if(newtodos[key]!==undefined) {
          todo[key] = newtodos[key]
        }
      }
    },
    clearTodo(state) {
      state.todos = []
    }
  },
  actions: {
    async readTodos({commit}) {
      const res = await axios({
        url :EDN_POINT,
        method: 'GET',
        headers,
      })   
      commit('setTodos', res.data)
    },
    async createTodo({commit}, {title}) {
     const res = await axios({
        url :EDN_POINT,
        method: 'POST',
        headers,
          data: {
            title,
          }
      })
      commit('addTodo', res.data)
    },

    async deleteTodo({commit}, id) {
      await axios({
        url:`${EDN_POINT}/${id}`,
        method: 'DELETE',
        headers,
      })
        commit('deleteTodo', id)
    },
    async updateTodo({commit}, data) {
     const {id, done, title, order} = data
     const res = await axios({
      url:`${EDN_POINT}/${id}`,
      method: 'PUT',
      headers,
      data: {
        title,
        id,
        done,
        order
      }
    })
      commit('updateTodo', res.data)
    },
  }
})
