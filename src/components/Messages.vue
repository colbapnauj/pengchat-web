<template>

    <h3>Messages</h3>

    <span v-for="message in this.messages.list">
        {{ message.mensaje }} <br>
    </span>
</template>

<script>

import { mapState } from 'vuex'
export default {
    props: {
        messages: Object,
    },

    computed: {
        ...mapState(['user']),

    },
    methods: {
       
    },
    created() {
        console.log(this.messages)
    }
}
</script>