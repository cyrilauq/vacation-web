<script>
export default {
  name: "ImageCard",
  props: {
    image: String,
    title: String,
    content: String
  }
}
</script>

<template>
  <div class="block w-52 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{title}}<img :src="image" alt="Card Picture"></p>
    <p class="font-normal text-gray-700 dark:text-gray-400">{{content}}</p>
    <slot></slot>
  </div>
</template>
