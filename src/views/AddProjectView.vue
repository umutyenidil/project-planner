<template>
  <div id="addProject" class="mx-48 my-12">
    <h2 class="text-4xl font-semibold mb-6">
      <span
        class="text-slate-500 hover:border-b-2 hover:border-slate-500 pb-2 cursor-pointer transition duration-150 ease-out">
        Add New Project
      </span>
    </h2>

    <form @submit.prevent="onSubmit">
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="col-span-full">
          <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div class="mt-2">
            <input v-model="titleInput" type="text" name="street-address" id="street-address"
              autocomplete="street-address"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">The title of your project</p>
        </div>

        <div class="col-span-full">
          <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Details</label>
          <div class="mt-2">
            <textarea v-model="detailsInput" id="about" name="about" rows="3"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">The details of your project</p>
        </div>

        <button class="col-span-full py-2 rounded-xl bg-blue-500 hover:bg-blue-700 transition duration-150 ease-in-out">
          <span class="text-white text-extrabold">
            Add this project
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'AddProjectView',
  data() {
    return {
      titleInput: '',
      detailsInput: '',
    };
  },
  computed: {
    uri: {
      get() {
        return `http://localhost:3000/projects`;
      }
    }
  },
  methods: {
    async onSubmit() {
      const project = {
        title: this.titleInput,
        details: this.detailsInput,
        is_completed: false,
      };

      try {
        const response = await fetch(
          this.uri,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(project),
          }
        );

        this.$router.push('/');
      } catch (error) {

      }
    }
  }
};

</script>
