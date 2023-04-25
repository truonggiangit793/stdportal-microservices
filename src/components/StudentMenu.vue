<template>
    <div class="left-menu">
        <div class="flex text-white justify-center items-center p-4" style="background: rgb(71 69 139)">
            <img src="@/assets/logo.png" width="25px" />
            <h1 class="font-bold text-2xl ml-4">Academic Portal</h1>
        </div>
        <div class="w-full p-6 main-content-menu" v-if="payload && payload.role == 'student'">
            <h1 class="text-2xl text-center">{{ payload ? `Hi, ${payload.fullName}` : "Welcome!" }}</h1>
            <div class="menu-list mt-8" v-if="payload && accessToken">
                <ul>
                    <router-link to="/student">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <li class="p-1 pl-2">PROFILE</li>
                        </div>
                    </router-link>
                    <router-link to="/student/academic">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <li class="p-1 pl-2">ACADEMIC</li>
                        </div>
                    </router-link>
                    <!-- <router-link to="/system/academic/list">
                            <div class="flex items-center w-full pl-6 transition-all">
                                <li class="p-1 pl-2">REGISTER ACADEMIC</li>
                            </div>
                        </router-link> -->
                    <router-link to="/student/enroll">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <li class="p-1 pl-2">ENROLL</li>
                        </div>
                    </router-link>
                    <router-link to="/system/account/new">
                        <div class="flex items-center w-full pl-6 transition-all">
                            <ThemifyIcon icon="plus" />
                            <li class="p-1 pl-2">Timetable</li>
                        </div>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="bottom-container">
            <div
                class="logout-btn py-1 hover:bg-red-500 transition-all bg-red-400 flex justify-center items-center cursor-pointer"
                v-on:click="handleSignOut"
            >
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
    background: #797cbd;
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
    background: rgb(71, 69, 139);
    width: 300px;
    padding: 20px;
}
</style>
