<template>
    <div>
        <StudentMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Enroll course list:</h1>
            </div>
            <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">Select semester for enroll course list:</p>
            </div>
            <div class="mb-6">
                <div class="mb-6">
                    <select
                        v-model="semesterAlias"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    >
                        <template v-for="(semester, index) in semesterAliasList">
                            <option :value="semester.alias" :key="index">{{ semester.alias }}</option>
                        </template>
                    </select>
                </div>
                <div class="flex justify-between w-full">
                    <button
                        type="submit"
                        v-on:click="handleFetchEnrollOpening"
                        class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
                    >
                        GET LIST CLASS
                    </button>
                    <button
                        type="submit"
                        v-on:click="handleFetchEnrolled"
                        class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
                    >
                        GET LIST CLASS ENROLLED
                    </button>
                </div>
            </div>

            <div class="flex items-center mb-4 text-gray-700 font-bold uppercase">
                <h1 class="ml-2">Total academic in semester: {{ semesterAlias }}</h1>
            </div>
            <div class="overflow-x-auto relative" v-if="enrollList && enrollList.length > 0">
                <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">Course name</th>
                            <th scope="col" class="py-3 px-6">Class Id</th>
                            <th scope="col" class="py-3 px-6">groupId</th>
                            <th scope="col" class="py-3 px-6">day</th>
                            <th scope="col" class="py-3 px-6">limit</th>
                            <th scope="col" class="py-3 px-6">number of member</th>
                            <th scope="col" class="py-3 px-6">periods</th>
                            <th scope="col" class="py-3 px-6">weeks</th>
                            <th scope="col" class="py-3 px-6">action</th>
                        </tr>
                    </thead>
                    <tbody v-if="enrollList && enrollList.length > 0">
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            v-for="(enrollClass, i) in enrollList"
                            :key="i"
                        >
                            <th class="py-4 px-6">{{ enrollClass.courseName }}</th>
                            <td class="py-4 px-6">{{ enrollClass.classId }}</td>
                            <td
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ enrollClass.groupId }}
                            </td>
                            <td class="py-4 px-6">{{ enrollClass.day }}</td>
                            <td class="py-4 px-6">{{ enrollClass.limit }}</td>
                            <td class="py-4 px-6">{{ enrollClass.memberNum }}</td>
                            <td class="py-4 px-6">{{ enrollClass.periods }}</td>
                            <td class="py-4 px-6">{{ enrollClass.weeks }}</td>

                            <td>
                                <button
                                    class="text-white py-2 w-full my-4 rounded-md transition-all bg-green-400 hover:bg-green-500 cursor-pointer"
                                    @click="handleEnrollClass(enrollClass)"
                                >
                                    Enroll
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!enrollList || enrollList.length == 0" class="flex w-full justify-center p-8">
                    <h1 class="">Empty list, there is no data!</h1>
                </div>
            </div>

            <div class="overflow-x-auto relative" v-if="enrollmentList && enrollmentList.length > 0">
                <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">Course name</th>
                            <th scope="col" class="py-3 px-6">Class Id</th>
                            <th scope="col" class="py-3 px-6">groupId</th>
                            <th scope="col" class="py-3 px-6">day</th>
                            <th scope="col" class="py-3 px-6">number of member</th>
                            <th scope="col" class="py-3 px-6">periods</th>
                            <th scope="col" class="py-3 px-6">weeks</th>
                            <th scope="col" class="py-3 px-6">action</th>
                        </tr>
                    </thead>
                    <tbody v-if="enrollmentList && enrollmentList.length > 0">
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            v-for="(enrollClass, i) in enrollmentList"
                            :key="i"
                        >
                            <th class="py-4 px-6">{{ enrollClass.courseName }}</th>
                            <td class="py-4 px-6">{{ enrollClass.classId }}</td>
                            <td
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ enrollClass.groupId }}
                            </td>
                            <td class="py-4 px-6">{{ enrollClass.schedule.day }}</td>
                            <td class="py-4 px-6">{{ enrollClass.schedule.memberNum }}</td>
                            <td class="py-4 px-6">{{ enrollClass.schedule.periods }}</td>
                            <td class="py-4 px-6">{{ enrollClass.schedule.weeks }}</td>

                            <td>
                                <button
                                    class="text-white py-2 w-full my-4 rounded-md transition-all bg-red-400 hover:bg-red-500 cursor-pointer"
                                    @click="handleRemoveEnrollmentClass(enrollClass)"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="enrollList.length == 0 && enrollmentList.length == 0" class="flex w-full justify-center p-8">
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
import StudentMenu from "@/components/StudentMenu.vue";

export default {
    data() {
        return {
            isLoading: true,
            semesterAliasList: [],
            semesterAlias: "",
            enrollList: [],
            enrollmentList: [],
            courseList: [],
        };
    },
    async mounted() {
        this.fetchCourseData();
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
        async handleFetchEnrolled() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/schedule/enrollment/semester`, {
                    studentId: this.payload.username,
                    semesterAlias: this.semesterAlias,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        res.data.data.list.forEach((element) => {
                            const isCorrect = this.courseData.filter((item) => element.courseCode == item.code);
                            // console.log(isCorrect);
                            if (isCorrect.length > 0) {
                                element.courseName = isCorrect[0].name;
                            }
                        });
                        this.enrollmentList = res.data.data.list;
                        this.enrollList = [];
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch(() => {
                    this.enrollmentList = [];
                });
            this.isLoading = false;
        },
        async fetchCourseData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/course/get-all`)
                .then((res) => {
                    // console.log(res);
                    if (res.data.status) {
                        this.$store.commit("set_courseData", res.data.data.list);

                        // this.toastify.success(res.data.message);
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                    this.acadademicCourseList = [];
                });
            this.isLoading = false;
        },
        async handleFetchEnrollOpening() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/schedule/all/`, {
                    semesterAlias: this.semesterAlias,
                })
                .then((res) => {
                    // console.log(res);
                    if (res.data.status) {
                        res.data.data.list.forEach((element) => {
                            const isCorrect = this.courseData.filter((item) => element.courseCode == item.code);
                            // console.log(isCorrect);
                            if (isCorrect.length > 0) {
                                element.courseName = isCorrect[0].name;
                            }
                        });
                        this.enrollList = res.data.data.list;
                        this.enrollmentList = [];
                        this.toastify.success(res.data.message);
                    } else {
                        this.toastify.error(res.data.message);
                        this.enrollList = [];
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                    this.enrollList = [];
                });
            this.isLoading = false;
        },
        async handleEnrollClass(enrollClass) {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/schedule/enroll`, {
                    studentId: this.payload.username,
                    courseCode: enrollClass.courseCode,
                    semesterAlias: enrollClass.semesterAlias,
                    groupId: enrollClass.groupId,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                    this.enrollList = [];
                });
            this.isLoading = false;
        },
        async handleRemoveEnrollmentClass(enrollClass) {
            this.isLoading = true;
            await axios
                .delete(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/schedule/delete-enroll`, {
                    data: {
                        studentId: this.payload.username,
                        courseCode: enrollClass.courseCode,
                        semesterAlias: enrollClass.semesterAlias,
                        groupId: enrollClass.groupId,
                    },
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                    this.enrollList = [];
                });
            this.handleFetchEnrolled();
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify", "courseData"]) },
    components: { ThemifyIcon, Loading, StudentMenu },
};
</script>

<style></style>
