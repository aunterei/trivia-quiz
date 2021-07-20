import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseDialogBox from "./components/ui/BaseDialogBox.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseInputText from "./components/ui/BaseInputText.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("base-dialog", BaseDialogBox);
app.component("base-button", BaseButton);
app.component("base-input-text", BaseInputText);

app.mount("#app");
