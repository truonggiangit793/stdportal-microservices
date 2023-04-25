<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Academic analyzing:</h1>
            </div>
            <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">Select semester for analyzing:</p>
            </div>
            <div class="mb-6">
                <div class="mb-6">
                    <select v-model="semesterAlias" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                        <template v-for="(semester, index) in semesterAliasList">
                            <option :value="semester.alias" :key="index">{{ semester.alias }}</option>
                        </template>
                    </select>
                </div>
                <button
                    type="submit"
                    v-on:click="handleFetchAcademicAnalyzing"
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
                            <th scope="col" class="py-3 px-6">Course code</th>
                            <th scope="col" class="py-3 px-6">Course name</th>
                            <th scope="col" class="py-3 px-6">Semester</th>
                            <th scope="col" class="py-3 px-6">Registration Count</th>
                        </tr>
                    </thead>
                    <tbody v-if="academicAnalyzing && academicAnalyzing.length > 0">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(academic, i) in academicAnalyzing" :key="i">
                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ academic.courseCode }}</th>
                            <td class="py-4 px-6">{{ academic.name }}</td>
                            <td class="py-4 px-6">{{ academic.semesterAlias }}</td>
                            <td class="py-4 px-6">{{ academic.registrationCount }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!academicAnalyzing || academicAnalyzing.length == 0" class="flex w-full justify-center p-8">
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
            semesterAliasList: [],
            semesterAlias: "",
            academicAnalyzing: [],
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
        async handleFetchAcademicAnalyzing() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/academic/statistics/${this.semesterAlias}`)
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                        this.academicAnalyzing = res.data.data;
                    } else {
                        this.toastify.error(res.data.message);
                        this.academicAnalyzing = [];
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                    this.academicAnalyzing = [];
                });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { ThemifyIcon, Loading, DashboardMenu },
};
</script>

<style></style>
