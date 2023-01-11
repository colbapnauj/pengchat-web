<template>
    <router-view />
</template>

<script>
import { mapActions } from 'vuex';
export default {
    components: {

    },
    methods: {
      ...mapActions(['loadLocalStorage']),
    },
    created() {
        this.loadLocalStorage();
    }
}
</script>