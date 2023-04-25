<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Account management</h1>
            </div>
            <div>
                <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                    <ThemifyIcon icon="settings" />
                    <p class="ml-2">Create new account manually:</p>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full name</label>
                        <input
                            v-model="fullName"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Fullname"
                            required=""
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                        <select
                            v-model="gender"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="1" selected>Male</option>
                            <option value="0">Female</option>
                        </select>
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Faculty ID</label
                        >
                        <input
                            v-model="id_faculty"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Faculty ID"
                            required=""
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Class ID</label>
                        <input
                            v-model="id_class"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Faculty ID"
                            required=""
                        />
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Phone number</label
                        >
                        <input
                            v-model="phone"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Phone number"
                            required=""
                        />
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                        <input
                            v-model="address"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Address"
                            required=""
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Course Year</label
                        >
                        <input
                            v-model="course_year"
                            type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Address"
                            required=""
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    v-on:click="registerAccountHandler"
                    class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
                >
                    Submit
                </button>
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import DashboardMenu from "@/components/DashboardMenu.vue";

export default {
    components: { ThemifyIcon, Loading, DashboardMenu },
    data() {
        return {
            isLoading: false,
            fullName: "",
            gender: 1,
            id_faculty: "",
            id_class: "",
            address: "",
            phone: "",
            course_year: 0,
        };
    },
    methods: {
        resetState() {
            this.fullName = "";
            this.gender = 1;
            this.id_faculty = "";
            this.role = "FACULTY IT";
            this.address = "";
            this.phone = "";
        },
        async registerAccountHandler() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_GATEWAY}/client-service/v1/student/new`, {
                    fullName: this.fullName,
                    gender: this.gender,
                    id_faculty: this.id_faculty,
                    id_class: this.id_class,
                    address: this.address,
                    phoneNumber: this.phone,
                    course_year: this.course_year,
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                        this.resetState();
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
};
</script>
