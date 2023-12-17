<template>
	<div class="relative inline-block text-left">
		<div>
			<button @click="toggleVisiblity" type="button"
				class="capitalize inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				id="menu-button" aria-expanded="true" aria-haspopup="true">
				{{ items.find((item) => item.value === this.value).name }}
				<svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path fill-rule="evenodd"
						d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
						clip-rule="evenodd" />
				</svg>
			</button>
		</div>
		<div :class="[isVisible ? invisibleClass : visibleClass]"
			class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100"
			role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
			<div class="py-1" role="none">
				<template v-for="item in items">
					<a @click="onItemPressed(item.value)" href="#" class="capitalize text-gray-700 block px-4 py-2 text-sm" role="menuitem"
						tabindex="-1" id="menu-item-0">
						<span>{{ item.name }}</span>
					</a>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DropdownButton',
	props: ['items'],
	data() {
		return {
			value: 0,
			isVisible: false,
			visibleClass: 'transform opacity-0 scale-95',
			invisibleClass: 'transform opacity-100 scale-100',
		};
	},
	methods: {
		toggleVisiblity() {
			this.isVisible = !this.isVisible;
		},
		onItemPressed(value) {
			this.value = value;
			this.$emit('onValueChanged', value);
			this.isVisible = false;
		}
	}
};
</script>