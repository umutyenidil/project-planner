<template>
    <tr class="divide-x-2">
        <td class="p-3">{{ project.id }}</td>
        <td class="p-3">{{ project.title }}</td>
        <td class="p-3 flex items-center justify-center">
            <div class="block px-4 py-2 rounded-full" :class="[project.is_completed ? 'bg-green-500' : 'bg-red-500']">
                <p class="text-white inline-flex justify-center items-center gap-5">
                    <span class="inline-block text-xl">
                        <i class='bx' :class="[project.is_completed ? 'bx-check-circle' : 'bx-x-circle']"></i>
                    </span>
                    <span class="inline-block">
                        {{ project.is_completed ? "Completed" : "Not completed" }}
                    </span>
                </p>
            </div>
        </td>
        <td class="p-3">
            <div class="flex justify-center items-center">
                <p class="inline-flex justify-between gap-x-2 items-center text-xl text-slate-900">
                    <span @click="deleteProject"
                        class="inline-block p-3 cursor-pointer hover:text-red-400 transition duration-150 ease-in-out">
                        <i class='bx bx-trash-alt'></i>
                    </span>
                    <span @click="editProject"
                        class="inline-block p-3 cursor-pointer hover:text-slate-400 transition duration-150 ease-in-out">
                        <i class='bx bx-edit-alt'></i>
                    </span>
                    <span @click="showDetails"
                        class="inline-block p-3 cursor-pointer hover:text-slate-400 transition duration-150 ease-in-out">
                        <i class='bx bx-detail'></i>
                    </span>
                    <span @click="toggleCompletedStatus"
                        :class="[project.is_completed ? 'hover:text-red-400' : 'hover:text-green-400']"
                        class="inline-block p-3 cursor-pointer transition duration-150 ease-in-out">
                        <i class='bx' :class="[project.is_completed ? 'bx-x' : 'bx-check']"></i>
                    </span>
                </p>
            </div>
        </td>
    </tr>
    <tr v-if="isDetailsVisible">
        <td colspan="4" class="p-3">
            {{ project.details }}
        </td>
    </tr>
</template>

<script>
export default {
    props: ['project'],
    data() {
        return {
            isDetailsVisible: false,
        };
    },
    computed: {
        uri: {
            get() {
                return `http://localhost:3000/projects/${this.project.id}`;
            }
        }
    },
    methods: {
        async deleteProject() {
            try {
                const response = await fetch(this.uri, { method: 'DELETE' });
                this.$emit('delete', this.project.id);
            } catch (error) {
                console.log(error);
            }
        },
        editProject() {
            this.$router.push({ name: 'edit-project', params: { id: this.project.id } })
        },
        showDetails() {
            this.isDetailsVisible = !this.isDetailsVisible
        },
        async toggleCompletedStatus() {
            try {
                const response = await fetch(
                    this.uri,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        },
                        body: JSON.stringify({
                            is_completed: !this.project.is_completed,
                        }),
                    }
                );

                this.$emit('complete', this.project.id);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>