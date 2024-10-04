<script>
export default {
  name: "BasicCard",
  props: {
    title: String,
    content: String
  }
}
</script>

<template>
  <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{title}}</p>
    <p class="font-normal text-gray-700 dark:text-gray-400">{{content}}</p>
    <slot></slot>
  </div>
</template>