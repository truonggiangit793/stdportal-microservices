<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Course data create:</h1>
            </div>
            <div>
                <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                    <ThemifyIcon icon="settings" />
                    <p class="ml-2">Create new data for course:</p>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course code</label>
                        <input
                            v-model="code"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Course code"
                            required=""
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course name</label>
                        <input
                            v-model="name"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Course name"
                            required=""
                        />
                    </div>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course credits</label>
                        <input
                            v-model="credits"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Course credits"
                            required=""
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prerequisite</label>
                        <select v-model="prerequisite" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <template v-for="item in courseDataList">
                                <option :value="item._id" :key="item">{{ item.name }}</option>
                            </template>
                        </select>
                    </div>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Department Allowed</label>
                    <input
                        v-model="departmentAllowed"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Department allowed"
                        required=""
                    />
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                    <input
                        v-model="description"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Description"
                        required=""
                    />
                </div>

                <button
                    type="submit"
                    v-on:click="registerCourseHandler"
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
            code: "",
            name: "",
            credits: 3,
            description: "",
            prerequisite: [],
            departmentAllowed: "",
            courseDataList: [],
        };
    },
    async mounted() {
        this.fetchCourseData();
    },
    methods: {
        resetState() {
            this.code = "";
            this.name = "";
            this.credit = 3;
            this.description = "";
            this.prerequisite = [];
            this.departmentAllowed = "";
        },
        async fetchCourseData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/course/get-all`)
                .then((res) => {
                    if (res.data.status) {
                        this.courseDataList = res.data.data.list;
                    }
                })
                .catch(() => {
                    this.courseDataList = [];
                });
            this.isLoading = false;
        },
        async registerCourseHandler() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/course/new`, {
                    code: this.code,
                    name: this.name,
                    credits: this.credits,
                    description: this.description,
                    prerequisite: [this.prerequisite],
                    departmentAllowed: this.departmentAllowed,
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
                    this.toastify.error(err.response.data.message);
                });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
};
</script>
