import store from "@/store";
import router from "@/router";

export default async function (to, from, next) {
    if (!store.state.accessToken) {
        return router.push({ path: "/login" });
    } else {
        return next();
    }
}
