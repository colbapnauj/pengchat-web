<template>
    <h2>Users</h2>
    <div v-for="item in users" :key="item.uid">
        <button @click="selectUser(item)">
            <span>{{ item.nombre }}</span>
        </button>
    </div>

    <div v-if="this.userSelected != null">
        <Chat :contact="this.userSelected" />

    </div>
    <div v-else>

        <span>Usuario no seleccionado</span>
    </div>


</template>

<script>

import { mapState } from 'vuex'
import Chat from './../components/Chat.vue'
export default {
    name: 'Users',
    components: {
        Chat,
    },
    data() {
        return {
            users: [],
            userSelected: null
        }

    },
    computed: {
        ...mapState(['user']),
    },

    methods: {
        async getUsers() {
            const { token } = this.user;

            try {
                const res = await fetch('http://localhost:3002/api/usuarios',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-token': token,
                        }
                    }
                );

                const usersData = await res.json();
                console.log(usersData);
                this.users = usersData.usuarios;
            } catch (e) {
                console.log();
            }

        },
        selectUser(user) {
            console.log(`user Selected ${user.nombre}`);
            this.userSelected = user;
        }
    },
    created() {
        this.getUsers();
    }
}
</script>