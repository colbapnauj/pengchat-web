// require('dotenv').config()

import { createStore } from "vuex";
import router from "../router"

export default createStore({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async logIn({ commit }, data) {
            const { email, password } = data;

            try {
                const res = await fetch('http://localhost:3002/api/login',
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password: password
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const userData = await res.json();
                console.log(userData);
                if (userData.ok) {
                    console.log('todo bien');
                } else {
                    console.log('error');

                }

                // TODO error

                commit('setUser', userData);

                router.push('/');
                localStorage.setItem('user', JSON.stringify(userData));

            } catch (e) {
                // TODO
            }



        },
        async loadLocalStorage({ commit }) {
            if (localStorage.getItem('user')) {
                commit("setUser", JSON.parse(localStorage.getItem('user')));
            } else {
                return commit("setUser", null);
            }
        }
    },

    getters: {
        authenticatedUser(state) {
            return !!state.user;
        }
    },
    modules: {}
})