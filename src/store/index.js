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
    updateTodo(state, todos) {
      const {id, title} = todos
      const index = state.todos.findIndex(todo => todo.id === id)
      state.todos[index].title = title
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
          //목록 조회의 경우 body부분이 필요가 없습니다.
      })   
      console.log(res.data)
      //받아온 자료를 갱신해줘야합니다.
      commit('setTodos', res.data)
    },
    //todoitem을 생성
    //payload=title로 이름 설정
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
     const {id, done, title} = data
     const res = await axios({
      url:`${EDN_POINT}/${id}`,
      method: 'PUT',
      headers,
      data: {
        title,
        id,
        done
      }
    })
      commit('updateTodo', res.data)
    },

  }
})
