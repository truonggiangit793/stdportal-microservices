export default {
    set_toastify(state, obj) {
        state.toastify = obj;
    },
    set_access_token(state, token) {
        localStorage.setItem("x-access-token", JSON.stringify(token));
        state.accessToken = token;
    },
    set_payload(state, payload) {
        localStorage.setItem("payload", JSON.stringify(payload));
        state.payload = payload;
    },
    set_courseData(state, courseData) {
        state.courseData = courseData;
    },
};
