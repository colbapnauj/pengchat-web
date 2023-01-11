<template>
    <h3>Chat</h3>

    <Messages :messages="this.messages" />

    <h4>{{ contact.nombre }}</h4>

    <ul id="messages"></ul>

    <input type=text v-model.trim="input" autocomplete="off" /><button @click="sendMessage">Send</button>

</template>

<script>
// ES6 import
import io from 'socket.io-client';
import { mapState } from 'vuex';
import Messages from './../components/Messages.vue'

export default {
    name: 'Chat',
    components: {
        Messages,
    },
    props: {
        contact: Object,
    },
    data() {
        return {
            socket: null,
            input: "",
            messages: {
                list: [],
            }

        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        init() {
            console.log('connecting');
            const socket = io('http://localhost:3002/',
                {
                    'transports': ['websocket', 'polling'],
                    'autoConnect': true,
                    'forceNew': true,
                    'extraHeaders': {
                        'x-token': this.user.token
                    },
                    'query': {
                        'x-token': this.user.token
                    }
                },

            );
            socket.on("connect", () => {
                console.log(socket.id); // x8WIv7-mJelg7on_ALbx
            });

            socket.on("disconnect", () => {
                console.log('dsconnect');
                console.log(socket.id); // undefined
            });

            socket.on('chat message', function (msg) {
                console.log(msg);
                // var item = document.createElement('li');
                // item.textContent = msg;
                // messages.appendChild(item);
                // window.scrollTo(0, document.body.scrollHeight);
            });

            socket.on('mensaje-personal', function (msg) {
                console.log(msg);

            });

            this.socket = socket;
            this.getMessages();

        },
        async getMessages() {
            const { uid } = this.contact;
            const { token } = this.user;

            try {
                const res = await fetch(`http://localhost:3002/api/mensajes/${uid}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-token': token,
                        }
                    }
                );

                const messagesData = await res.json();
                console.log(messagesData);
                
                this.messages.list = messagesData.mensajes;
                console.log(this.messages.list);
            } catch (e) {
                console.log(e);
            }
        },
        sendMessage() {
            if (this.input) {
                this.socket.emit('mensaje-personal',
                    {
                        de: this.user.usuario.uid,
                        para: this.contact.uid,
                        mensaje: this.input
                    }
                );
                this.input = '';
            }

        }

    },

    created() {
        this.init();


    },
}

</script>