<template>
    <div>
        <div class="flex flex-col items-center justify-center h-screen">
            <a href="/home" class="flex items-center mb-6 text-4xl font-semibold text-gray-900">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" />
                Academic Portal
            </a>
            <div class="w-full max-w-md bg-gray-100 rounded-lg shadow p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 mb-4">
                    Sign in to your account
                </h1>
                <div class="mb-6">
                    <p class="text-lg mb-2">Who you are?</p>
                    <div class="flex justify-center">
                        <div class="px-2">
                            <input
                                class="cursor-pointer mr-1"
                                type="radio"
                                name="role"
                                id="student"
                                value="student"
                                v-model="role"
                                checked
                            />
                            <label class="cursor-pointer" for="student">STUDENT</label>
                        </div>
                        <div class="px-2">
                            <input
                                class="cursor-pointer mr-1"
                                type="radio"
                                name="role"
                                id="admin"
                                value="admin"
                                v-model="role"
                            />
                            <label class="cursor-pointer" for="admin">ADMIN</label>
                        </div>
                    </div>
                </div>
                <form class="space-y-4 md:space-y-6" v-on:submit="handleSubmit">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                            >Your user account</label
                        >
                        <input
                            v-model="userCode"
                            name="email"
                            id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="User account"
                            required=""
                        />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                            v-model="password"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Sign in
                    </button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">Welcome to login to the system!</p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { mapState } from "vuex";

export default {
    components: {},
    data() {
        return {
            role: "student",
            userCode: "",
            password: "",
        };
    },
    methods: {
        handleSubmit(e) {
            const url = this.role == "admin" ? "/account-service/v1/user-login" : "/account-service/v1/student-login";
            e.preventDefault();
            axios
                .post(`${process.env.VUE_APP_API_GATEWAY}${url}`, { username: this.userCode, password: this.password })
                .then((res) => {
                    if (!res.data.status) {
                        this.$store.state.toastify.error(res.data.message);
                    } else {
                        this.$store.state.toastify.success(res.data.message);
                        this.$store.commit("set_access_token", res.data.data.token);
                        this.$store.commit("set_payload", res.data.data.payload);
                        if (this.payload.role == "student") {
                            router.push("/student");
                        } else {
                            router.push("/system/account/all");
                        }
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.$store.state.toastify.error(err.message);
                    this.$store.state.toastify.error(err.response.data.message);
                });
        },
    },
    computed: { ...mapState(["payload"]) },
};
</script>
