<template>
    <div>
        <StudentMenu />
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
                        v-on:click="handleFetchAcademicOpening"
                        class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
                    >
                        GET LIST ACADEMIC
                    </button>
                    <button
                        type="submit"
                        v-on:click="handleFetchCourse"
                        class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
                    >
                        GET LIST COURSE
                    </button>
                </div>
            </div>
            <!-- <div class="mb-2 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">List of faculties:</p>
            </div> -->
            <div class="flex items-center mb-4 text-gray-700 font-bold uppercase">
                <h1 class="ml-2">Total academic in semester: {{ semesterAlias }}</h1>
            </div>
            <div class="overflow-x-auto relative" v-if="acadademicCourseList && acadademicCourseList.length > 0">
                <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">id student</th>
                            <th scope="col" class="py-3 px-6">Course code</th>
                            <th scope="col" class="py-3 px-6">Semester</th>
                            <th scope="col" class="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="acadademicCourseList && acadademicCourseList.length > 0">
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            v-for="(academic, i) in acadademicCourseList"
                            :key="i"
                        >
                            <th class="py-4 px-6">{{ academic.studentId }}</th>
                            <td
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ academic.courseCode }}
                            </td>
                            <td class="py-4 px-6">{{ academic.semesterAlias }}</td>
                            <td>
                                <button
                                    class="text-white py-2 w-full my-4 rounded-md transition-all bg-red-400 hover:bg-red-500 cursor-pointer"
                                    @click="handleRemoveAcademicItem(academic)"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div
                    v-if="!acadademicCourseList || acadademicCourseList.length == 0"
                    class="flex w-full justify-center p-8"
                >
                    <h1 class="">Empty list, there is no data!</h1>
                </div>
            </div>
            <div class="overflow-x-auto relative" v-if="courseList && courseList.length > 0">
                <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">Course code</th>
                            <th scope="col" class="py-3 px-6">Course name</th>
                            <th scope="col" class="py-3 px-6">credits</th>
                            <th scope="col" class="py-3 px-6">description</th>
                            <th scope="col" class="py-3 px-6">prerequisite</th>
                            <th scope="col" class="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="courseList && courseList.length > 0">
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            v-for="(course, i) in courseList"
                            :key="i"
                        >
                            <th class="py-4 px-6">{{ course.code }}</th>
                            <td class="py-4 px-6">{{ course.name }}</td>
                            <td
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {{ course.credits }}
                            </td>
                            <td
                                scope="row"
                                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-sm"
                            >
                                {{ course.description }}
                            </td>
                            <td>
                                <button
                                    class="text-white py-2 w-full my-4 rounded-md transition-all bg-blue-400 hover:bg-blue-500 cursor-pointer"
                                    @click="handleShowPrerequisite(course.prerequisite)"
                                >
                                    Show
                                </button>
                            </td>

                            <td>
                                <button
                                    class="text-white py-2 w-full my-4 rounded-md transition-all bg-green-400 hover:bg-green-500 cursor-pointer"
                                    @click="registerCourse(course.code)"
                                >
                                    register
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div
                    v-if="!acadademicCourseList || acadademicCourseList.length == 0"
                    class="flex w-full justify-center p-8"
                >
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
            acadademicCourseList: [],
            courseList: [],
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
                    console.log(res);
                    if (res.data.status) {
                        this.semesterAliasList = res.data.data.list;
                    }
                })
                .catch(() => {
                    this.semesterAliasList = [];
                });
            this.isLoading = false;
        },
        async handleFetchAcademicOpening() {
            this.isLoading = true;
            await axios
                .get(
                    `${process.env.VUE_APP_API_GATEWAY}/course-service/v1/academic/get?studentId=${this.payload.username}&semesterAlias=${this.semesterAlias}`
                )
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                        this.acadademicCourseList = res.data.data.list;
                        this.courseList = [];
                    } else {
                        this.toastify.error(res.data.message);
                        this.acadademicCourseList = [];
                        this.courseList = [];
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                    this.acadademicCourseList = [];
                    this.courseList = [];
                });
            this.isLoading = false;
        },
        async handleRemoveAcademicItem(academic) {
            this.isLoading = true;
            console.log(this.payload.username);
            await axios
                .delete(
                    `${process.env.VUE_APP_API_GATEWAY}/course-service/v1/academic/remove`,

                    {
                        data: {
                            studentId: this.payload.username,
                            courseCode: academic.courseCode,
                            semesterAlias: academic.semesterAlias,
                        },
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
                    console.log(err);
                });
            this.isLoading = false;
        },
        async handleFetchCourse() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_GATEWAY}/course-service/v1/course/get-all`)
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                        this.courseList = res.data.data.list;
                        this.acadademicCourseList = [];
                    } else {
                        this.toastify.error(res.data.message);
                        this.courseList = [];
                        this.acadademicCourseList = [];
                    }
                })
                .catch((err) => {
                    if (!err.response?.data.message) return this.toastify.error(err.message);
                    this.toastify.error(err.response.data.message);
                    this.acadademicCourseList = [];
                    this.courseList = [];
                });
            this.isLoading = false;
        },
        handleShowPrerequisite(list) {
            const a = [];
            if (list.length > 0) {
                list.forEach((element) => {
                    const isCorrect = this.courseList.filter((item) => item._id == element);
                    if (isCorrect.length > 0) {
                        console.log(isCorrect[0].name);
                        a.push(isCorrect[0].name);
                    }
                });
            }
            if (a.length > 0) {
                const pre = a.map((item) => `${item} `);
                this.toastify.success(`Course prerequisite is:${pre}`);
            } else {
                this.toastify.success(`Course does not have any prerequisite`);
            }
        },
        async registerCourse(courseCode) {
            this.isLoading = true;
            console.log(this.payload.username);
            await axios
                .post(
                    `${process.env.VUE_APP_API_GATEWAY}/course-service/v1/academic/new`,

                    {
                        studentId: this.payload.username,
                        courseCode: courseCode,
                        semesterAlias: this.semesterAlias,
                    }
                )
                .then((res) => {
                    console.log(res);
                    if (res.data.status) {
                        this.toastify.success(res.data.message);
                    } else {
                        this.toastify.error(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { ThemifyIcon, Loading, StudentMenu },
};
</script>

<style></style>
