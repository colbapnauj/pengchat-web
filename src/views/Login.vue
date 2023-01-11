<template>
    <h2>Login</h2>

    <form @submit.prevent="process">

        <label for="email"><b>Email</b></label>
        <input id="email" v-model.trim="email" type="text" placeholder="Enter Email" name="email" required>

        <label for="psw"><b>Password</b></label>
        <input id="password" v-model.trim="password" type="password" placeholder="Enter Password" name="psd" required>

        <button id="login-button" type="submit">Login</button>
    </form>

</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            email: "jhoselyn.palaco@gmail.com",
            password: "Tumblr98",
        }
    },
    methods: {
        ...mapActions(['logIn']),
        async process() {
            await this.logIn({ email: this.email, password: this.password });
        }


    }

}




</script>