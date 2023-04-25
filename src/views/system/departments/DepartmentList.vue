<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Faculties list</h1>
            </div>
            <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">Create new faculty:</p>
            </div>
            <div class="mb-6">
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Faculty name</label>
                    <input
                        v-model="faculty_name"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Faculty name"
                        required=""
                    />
                </div>
                <button
                    type="submit"
                    v-on:click="registerFacultyHandler"
                    class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
                >
                    Submit
                </button>
            </div>
            <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">List of faculties:</p>
            </div>
            <div class="flex items-center mb-4 text-gray-700 font-bold uppercase">
                <h1 class="ml-2">Total faculty: {{ totalFaculties }}</h1>
            </div>
            <div class="overflow-x-auto relative">
                <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">ID</th>
                            <th scope="col" class="py-3 px-6">Faculty name</th>
                            <th scope="col" class="py-3 px-6">Created At</th>
                            <th scope="col" class="py-3 px-6">Last modified</th>
                            <th scope="col" class="py-3 px-6" v-if="payload.role == 'ADMIN'">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="facultyList && facultyList.length > 0">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(faculty, i) in facultyList" :key="i">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ faculty.id_faculty }}</th>
                            <td class="py-4 px-6">{{ faculty.faculty_name }}</td>
                            <td class="py-4 px-6">{{ dateFormat(faculty.createdAt) }}</td>
                            <td class="py-4 px-6">{{ dateFormat(faculty.updatedAt) }}</td>
                            <td class="py-4 px-6" v-on:click="facultyRemoveHandler()" v-if="payload.role == 'ADMIN'">
                                <div class="text-red-500 cursor-pointer"><ThemifyIcon icon="trash" />Delete</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!facultyList" class="flex w-full justify-center p-8">
                    <h1 class="">Empty list, there is no data!</h1>
                </div>
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
import dateFormat from "@/helpers/dateFormat";
import DashboardMenu from "@/components/DashboardMenu.vue";

export default {
    data() {
        return {
            isLoading: true,
            faculty_name: "",
            facultyList: null,
            totalFaculties: 0,
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
                .get(`${process.env.VUE_APP_API_GATEWAY}/client-service/v1/faculty/get-all`)
                .then((res) => {
                    if (res.data.status) {
                        this.facultyList = res.data.data;
                        this.totalFaculties = res.data.data.length;
                    }
                })
                .catch(() => {
                    this.facultyList = null;
                });
            this.isLoading = false;
        },
        async facultyRemoveHandler() {},
        async registerFacultyHandler() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_GATEWAY}/client-service/v1/faculty/new`, { faculty_name: this.faculty_name })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                        this.faculty_name = "";
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                });
            this.isLoading = false;
            this.fetchData();
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { ThemifyIcon, Loading, DashboardMenu },
};
</script>

<style></style>
