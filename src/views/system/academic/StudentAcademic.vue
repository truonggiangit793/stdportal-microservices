<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Student academic:</h1>
            </div>
            <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">Please enter a specific student for academic information by providing student ID:</p>
            </div>
            <div class="mb-6">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Student ID</label>
                        <input
                            v-model="studentId"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Student ID"
                            required=""
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Semester</label>
                        <select v-model="semesterAlias" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <template v-for="(semester, index) in semesterAliasList">
                                <option :value="semester.alias" :key="index">{{ semester.alias }}</option>
                            </template>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    v-on:click="handleFetchStudentAcademic"
                    class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
                >
                    Submit
                </button>
            </div>
            <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">List of academic:</p>
            </div>
            <div class="overflow-x-auto relative">
                <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">Student ID</th>
                            <th scope="col" class="py-3 px-6">Course code</th>
                            <th scope="col" class="py-3 px-6">Semester</th>
                            <th scope="col" class="py-3 px-6">Submitted on</th>
                        </tr>
                    </thead>
                    <tbody v-if="studentAcademicData && studentAcademicData.length > 0">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(academic, i) in studentAcademicData" :key="i">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ academic.studentId }}</th>
                            <td class="py-4 px-6">{{ academic.courseCode }}</td>
                            <td class="py-4 px-6">{{ academic.semesterAlias }}</td>
                            <td class="py-4 px-6">{{ dateFormat(academic.createdAt) }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!studentAcademicData || studentAcademicData.length == 0" class="flex w-full justify-center p-8">
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
            studentId: "",
            semesterAlias: "",
            semesterAliasList: [],
            studentAcademicData: [],
        };
    },
    async mounted() {
        this.fetchSemesterAlias();
    },
    methods: {
        dateFormat,
        async fetchSemesterAlias() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/semester/get-all`)
                .then((res) => {
                    if (res.data.status) {
                        this.semesterAliasList = res.data.data.list;
                    }
                })
                .catch(() => {
                    this.semesterAliasList = [];
                });
            this.isLoading = false;
        },
        async handleFetchStudentAcademic() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/academic/get/?studentId=${this.studentId}&semesterAlias=${this.semesterAlias}`)
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                        this.studentAcademicData = res.data.data.list;
                    } else {
                        this.toastify.error(res.data.message);
                        this.studentAcademicData = [];
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                    this.studentAcademicData = [];
                });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { ThemifyIcon, Loading, DashboardMenu },
};
</script>

<style></style>
