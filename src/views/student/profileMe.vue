<template>
    <div>
        <StudentMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Account management</h1>
            </div>
            <div class="mb-6">
                <div class="mb-6 text-md font-medium text-gray-900 flex items-center">
                    <ThemifyIcon icon="settings" />
                    <p class="ml-2">Detail of account:</p>
                </div>
                <div class="grid gap-6 mb-6 grid-cols-2" v-if="studentData">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User code</label>
                        <input
                            :value="studentData.id_student"
                            disabled
                            class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full name</label>
                        <input
                            disabled
                            v-model="studentData.fullName"
                            placeholder="Fullname"
                            type="text"
                            class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                        <input
                            v-model="studentData.address"
                            placeholder="address"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                        <input
                            disabled
                            v-model="studentData.email"
                            type="email"
                            placeholder="example@example.com"
                            class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Phone number</label
                        >
                        <input
                            type="tel"
                            pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                            placeholder="0123-456-789"
                            v-model="studentData.phoneNumber"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
                    @click="updateHandler()"
                >
                    Update
                </button>
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
// import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import dateFormat from "@/helpers/dateFormat";

import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import StudentMenu from "@/components/StudentMenu.vue";

export default {
    components: { StudentMenu, Loading },
    data() {
        return {
            isLoading: false,
            // fullName: "",
            // password: "",
            // role: "STAFF",
            studentData: null,
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(
                    `${process.env.VUE_APP_API_GATEWAY}/client-service/v1/student/get/${this.payload.username}?token=${this.accessToken}`
                )
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                        this.studentData = res.data.data;
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.data.message);
                });
            this.isLoading = false;
        },
        async updateHandler() {
            this.isLoading = true;
            await axios
                .patch(
                    `${process.env.VUE_APP_API_GATEWAY}/client-service/v1/student/update?token=${this.accessToken}`,
                    {
                        id_student: this.studentData.id_student,
                        fullName: this.studentData.fullName,
                        phoneNumber: this.studentData.phoneNumber,
                        address: this.studentData.address,
                    }
                )
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err.data.message);
                });
            this.isLoading = false;
            this.fetchData();
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
};
</script>
