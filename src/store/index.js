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
      isLoaing: false,
      todos:[],
      order: ''
    }
  },
  mutations : {
    changeLoaingStatus(state, status=true) {
      state.isLoaing = status
    },
    setTodos(state, todos) {
      state.todos = todos
      state.order = Math.max(...todos.map(todo => todo.order))
      console.log('order',state.order)
    },
    createTodo(state, todo) {
      state.todos.push(todo)
      state.order = todo.order
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
    reorderTodos(state, {oldIndex, newIndex}) {
      const clone = { ...state.todos[oldIndex] }
      state.todos.splice(oldIndex, 1)
      state.todos.splice(newIndex, 0, clone)
    },
  },
  actions: {
    async readTodos({commit}) {
      try {
        console.log('changeLoaingStatus')
        commit('changeLoaingStatus')
        const res = await axios({
          url :EDN_POINT,
          method: 'GET',
          headers,
        })   
        console.log(res.data)
        commit('setTodos', res.data)
      } catch (err) {
        console.err(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async createTodo({commit}, data) {
      try {
        commit('changeLoaingStatus')
        const res = await axios({
          url :EDN_POINT,
          method: 'POST',
          headers,
            data,
        })
        console.log(res.data)
        commit('createTodo', res.data)
      } catch(err) {
        console.error(err)
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
        console.error(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async updateTodo({commit}, data) {
     const {id} = data
      try {
        commit('changeLoaingStatus')
        const res = await axios({
          url:`${EDN_POINT}/${id}`,
          method: 'PUT',
          headers,
          data,
        })
          commit('updateTodo', res.data)
      } catch(err) {
        console.error(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async reorderTodo({commit, state}, event) {
      console.log('event', event)
      if (event !== undefined) {
        commit('reorderTodos', event)
      }
      const todoIds = state.todos.map(todo => todo.id)
      await axios({
        url: `${EDN_POINT}/reorder`,
        method: 'PUT',
        headers,
        data: {
          todoIds
        }
      })
    }
  }
})
