const app = new Vue({
  el: "#app",
  data: {
    url: "",
    CustomId: "",
    error: "",
    formVisible: true,
    created: null,
  },
  methods: {
    async createUrl() {
      this.error = "";
      const response = await fetch("/url", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          url: this.url,
          CustomId: this.CustomId || undefined,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.formVisible = false;
        this.created = `${result.CustomId}`;
      } else {
        const result = await response.json();
        this.error = `url in use`;
      }
    },
  },
});
