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
      isLoaing:false,
      todos:[]
    }
  },
  mutations : {
    changeLoaingStatus(state, status=true) {
      state.isLoaing = status
    },
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
      try {
        commit('changeLoaingStatus')
        const res = await axios({
          url :EDN_POINT,
          method: 'GET',
          headers,
        })   
        commit('setTodos', res.data)
      } catch (err) {
        console.err(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async createTodo({commit}, {title}) {
      try {
        commit('changeLoaingStatus')
        const res = await axios({
          url :EDN_POINT,
          method: 'POST',
          headers,
            data: {
              title,
            }
        })
        commit('addTodo', res.data)
      } catch(err) {
        console.err(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },

    async deleteTodo({commit}, id) {
      try {
        commit('changeLoaingStatus')
        await axios({
          url:`${EDN_POINT}/${id}`,
          method: 'DELETE',
          headers,
        })
          commit('deleteTodo', id)
      } catch(err) {
        console.err(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async updateTodo({commit}, data) {
     const {id, done, title, order} = data
      try {
        commit('changeLoaingStatus')
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
      } catch(err) {
        console.err(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
  }
})
