import Vue from "vue";
import Router from "vue-router";

import HomePage from "../components/HomePage";
import EditPage from "../components/EditPage";
import NotFound from "../components/NotFound";

Vue.use(Router);

export default new Router({
  routes: [
    { name: "home", path: "/", component: HomePage },
    { name: "edit", path: "/edit/:id", component: EditPage },
    { name: "notFound", path: "*", component: NotFound },
  ],
});
