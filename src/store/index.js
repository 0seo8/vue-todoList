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
      todos:[],
      order: 0
    }
  },
  mutations : {
    changeLoaingStatus(state, status=true) {
      state.isLoaing = status
    },
    setTodos(state, todos) {
      state.todos = todos
      state.order = Math.max(...todos.map(todo => todo.order))
      console.log(state.order)
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
        console.log(res.data)
        commit('setTodos', res.data)
      } catch (err) {
        console.err(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
    async createTodo({commit}, {title, order}) {
      try {
        commit('changeLoaingStatus')
        const res = await axios({
          url :EDN_POINT,
          method: 'POST',
          headers,
            data: {
              title,
              order
            }
        })
        commit('addTodo', res.data)
      } catch(err) {
        console.error(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },

    async deleteTodo({commit}, id) {
      try {
        // commit('changeLoaingStatus')
        await axios({
          url:`${EDN_POINT}/${id}`,
          method: 'DELETE',
          headers,
        })
          commit('deleteTodo', id)
      } catch(err) {
        console.error(err)
      } finally {
        // commit('changeLoaingStatus', false)
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
        console.error(err)
      } finally {
        commit('changeLoaingStatus', false)
      }
    },
  }
})
