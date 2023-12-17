<template>
    <nav class="sticky top-0 w-100 bg-slate-500 py-5 px-4 flex items-center gap-5 justify-center">
        <router-link :to="{ name: 'home' }" :class="[this.activeRouteName === 'home' ? 'bg-blue-400 hover:text-white' : 'bg-slate-400']"
            class="rounded-xl text-slate-50 hover:text-slate-400 transition duration-150 ease-out px-5 py-2">
            <span>Projects</span>
        </router-link>
        <router-link :to="{ name: 'add-project' }"
            :class="[this.activeRouteName === 'add-project' ? 'bg-blue-400 hover:text-white' : 'bg-slate-400']"
            class="rounded-xl hover:bg-slate-50 text-slate-50 hover:text-slate-400 transition duration-150 ease-out px-5 py-2">Add
            <span>Add New Project</span>
        </router-link>
    </nav>
</template>
 
<script>
import { useRoute } from 'vue-router';

export default {
    name: 'NavigationBar',
    computed: {
        activeRouteName: {
            get() {
                console.log(useRoute().name);
                return useRoute().name;
            }
        }
    }

}
</script>