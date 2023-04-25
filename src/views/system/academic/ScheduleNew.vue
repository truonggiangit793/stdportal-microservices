<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Schedule data:</h1>
            </div>
            <div>
                <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                    <ThemifyIcon icon="settings" />
                    <p class="ml-2">Create new data for schedule:</p>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course code</label>
                        <input
                            v-model="courseCode"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Course code"
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
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Group ID</label>
                        <input
                            v-model="groupId"
                            type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Course credits"
                            required=""
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Limit number</label>
                        <input
                            v-model="limit"
                            type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Limit number"
                            required=""
                        />
                    </div>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Day</label>
                    <select v-model="day" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Periods</label>
                    <select v-model="periods" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                        <option :value="[1, 2, 3]">Shift 1</option>
                        <option :value="[4, 5, 6]">Shift 2</option>
                        <option :value="[7, 8, 9]">Shift 3</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Weeks</label>
                    <select v-model="weeks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                        <option :value="[52, 1, 2, 3, 4, 5]">January</option>
                        <option :value="[5, 6, 7, 8, 9]">February</option>
                        <option :value="[9, 10, 11, 12, 13]">March</option>
                        <option :value="[13, 14, 15, 16, 17]">April</option>
                        <option :value="[18, 19, 20, 21, 22]">May</option>
                        <option :value="[22, 23, 24, 25, 26]">June</option>
                        <option :value="[26, 27, 28, 29, 30, 31]">July</option>
                        <option :value="[31, 32, 33, 34, 35]">August</option>
                        <option :value="[35, 36, 37, 38, 39]">September</option>
                        <option :value="[39, 40, 41, 42, 43, 44]">October</option>
                        <option :value="[44, 45, 46, 47, 48]">November</option>
                        <option :value="[48, 49, 50, 51, 52]">December</option>
                    </select>
                </div>
                <button
                    type="submit"
                    v-on:click="registerScheduleHandler"
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
            courseCode: "",
            semesterAlias: "",
            groupId: 1,
            limit: 0,
            day: "Monday",
            periods: [],
            weeks: [],
            semesterAliasList: [],
        };
    },
    async mounted() {
        this.fetchSemesterAlias();
    },
    methods: {
        resetState() {
            this.courseCode = null;
            this.semesterAlias = null;
            this.groupId = null;
            this.limit = null;
            this.periods = [];
            this.weeks = [];
            this.day = "Monday";
        },
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
        async registerScheduleHandler() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/schedule/new`, {
                    courseCode: this.courseCode,
                    semesterAlias: this.semesterAlias,
                    groupId: this.groupId,
                    limit: this.limit,
                    periods: this.periods,
                    weeks: this.weeks,
                    day: this.day,
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
