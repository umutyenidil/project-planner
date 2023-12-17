<template>
  <div id="home" class="mx-48 my-12">
    <div class="w-full flex items-center justify-between">
      <div>
        <h2 class="text-4xl font-semibold mb-6">
          <span
            class="text-slate-500 hover:border-b-2 hover:border-slate-500 pb-2 cursor-pointer transition duration-150 ease-out">
            Projects
          </span>
        </h2>
      </div>

      <div class="mb-2">
        <DropdownButton :items="dropdownButtonItems" @onValueChanged="onDropdownValueChanged" />
      </div>
    </div>

    <table class="w-full bg-slate-300 table-fixed divide-y-2 rounded-xl">
      <thead class="">
        <tr class="divide-x-2">
          <th>Id</th>
          <th>Title</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="divide-y-2">
        <template v-for="project in filteredProjects" :key="project.id">
          <ProjectListItem :project="project" @delete="handleDelete" @complete="handleComplete" />
        </template>
      </tbody>
    </table>

  </div>
</template>

<script>
import ProjectListItem from '@/components/ProjectListItem.vue';
import DropdownButton from '@/components/DropdownButton.vue';

export default {
  name: 'HomeView',
  components: {
    ProjectListItem,
    DropdownButton,
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:3000/projects');

      const data = await response.json();

      this.projects = data;
    } catch (error) {
      console.log(error);
    }

  },
  data() {
    return {
      projects: [],
      dropdownButtonItems: [
        {
          name: 'not completed',
          value: -1,
        },
        {
          name: 'all',
          value: 0,
        },
        {
          name: 'completed',
          value: 1,
        },
      ],
      selectedCategoryValue: 0,
    };
  },
  methods: {
    handleDelete(id) {
      this.projects = this.projects.filter((project) => project.id !== id);
    },
    handleComplete(id) {
      const project = this.projects.find((p) => p.id === id);
      project.is_completed = !project.is_completed;
    },
    onDropdownValueChanged(value) {
      this.selectedCategoryValue = value;
    },
  },
  computed: {
    filteredProjects() {
      console.log('test');
      if (this.selectedCategoryValue === -1) {
        return this.projects.filter((project) => project.is_completed === false);
      } else if (this.selectedCategoryValue === 1) {
        return this.projects.filter((project) => project.is_completed === true);
      } else {
        return this.projects;
      }
    }
  }
}
</script>
