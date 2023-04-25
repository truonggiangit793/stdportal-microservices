<template>
    <div class="left-menu">
        <div class="flex text-white justify-center items-center p-4" style="background: rgb(57 57 57)">
            <img class="w-8 h-8" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" />
            <h1 class="font-bold text-2xl ml-3">Academic Portal</h1>
        </div>
        <div class="w-full p-6 main-content-menu" v-if="payload && payload.role == 'ADMIN'">
            <h1 class="text-2xl text-center">{{ payload ? `Hi, ${payload.fullName}` : "Welcome!" }}</h1>
            <div class="menu-list mt-8" v-if="payload && accessToken">
                <ul class="mb-3">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold">Account Management</h1>
                    </div>
                    <router-link to="/system/account/all">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="user" />
                            <li class="p-1 pl-2">Account List</li>
                        </div>
                    </router-link>
                    <router-link to="/system/account/new">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="plus" />
                            <li class="p-1 pl-2">Create</li>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
                <ul class="mb-3">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold">Faculty Management</h1>
                    </div>
                    <router-link to="/system/department/all">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="harddrives" />
                            <li class="p-1 pl-2">List and Create</li>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
                <ul class="mb-3">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold">Academic Management</h1>
                    </div>
                    <router-link to="/system/academic/analysis">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="bar-chart" />
                            <li class="p-1 pl-2">Academic analysis</li>
                        </div>
                    </router-link>
                    <router-link to="/system/academic/student">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="agenda" />
                            <li class="p-1 pl-2">Student academic</li>
                        </div>
                    </router-link>
                    <router-link to="/system/course/data/all">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="archive" />
                            <li class="p-1 pl-2">Course data</li>
                        </div>
                    </router-link>
                    <router-link to="/system/course/data/new">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="plus" />
                            <li class="p-1 pl-2">Course create</li>
                        </div>
                    </router-link>
                    <router-link to="/system/schedule/student">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="book" />
                            <li class="p-1 pl-2">Student schedule</li>
                        </div>
                    </router-link>
                    <router-link to="/system/schedule/new">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="plus" />
                            <li class="p-1 pl-2">New Schedule</li>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
                <ul class="mb-3">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold">Class Management</h1>
                    </div>
                    <router-link to="/system/class/all">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="comments" />
                            <li class="p-1 pl-2">Class list</li>
                        </div>
                    </router-link>
                    <router-link to="/system/class/new">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="plus" />
                            <li class="p-1 pl-2">Create</li>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
                <ul class="mb-3">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold">Student Management</h1>
                    </div>
                    <router-link to="/system/student/all">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="user" />
                            <li class="p-1 pl-2">Student list</li>
                        </div>
                    </router-link>
                    <router-link to="/system/student/new">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="plus" />
                            <li class="p-1 pl-2">Create</li>
                        </div>
                    </router-link>
                </ul>
                <hr class="my-4 opacity-50" />
                <ul class="mb-3">
                    <div class="flex items-center mb-1 text-white">
                        <ThemifyIcon icon="arrow-circle-right" />
                        <h1 class="ml-2 font-bold">Semester Management</h1>
                    </div>
                    <router-link to="/system/semester/all">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="bookmark" />
                            <li class="p-1 pl-2">List and Create</li>
                        </div>
                    </router-link>
                </ul>
            </div>
        </div>

        <div class="bottom-container">
            <div class="logout-btn py-1 hover:bg-red-500 transition-all bg-red-400 flex justify-center items-center cursor-pointer" v-on:click="handleSignOut">
                <ThemifyIcon icon="power-off" />
                <button class="ml-4">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import { mapState } from "vuex";

export default {
    props: { menu: Array },
    methods: {
        handleSignOut() {
            this.$store.commit("set_access_token", null);
            this.$store.commit("set_payload", null);
            localStorage.removeItem("x-access-token");
            localStorage.removeItem("payload");
            this.$router.push("/login");
        },
    },
    components: { ThemifyIcon },
    computed: {
        ...mapState(["accessToken", "payload"]),
    },
};
</script>

<style scope>
.main-content-menu {
    height: 100%;
    overflow: hidden scroll;
    padding-bottom: 10.5rem;
}
.left-menu {
    position: fixed;
    width: 300px;
    top: 0;
    bottom: 0;
    background: #515577;
    color: white;
    box-shadow: 8px 0 10px 0 #0000001f;
    z-index: 10;
}
.left-menu-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #458b69;
    color: #79bda1;
}
a.is-active div {
    background: white;
    color: black;
    border-radius: 100px;
}
.category-item:hover {
    cursor: pointer;
    background: #bdaed181;
}
.logout-btn {
    font-size: 20px;
    border-radius: 100px;
    bottom: 20px;
}
.bottom-container {
    position: fixed;
    bottom: 0;
    background: rgb(57 57 57);
    width: 300px;
    padding: 20px;
}
</style>
