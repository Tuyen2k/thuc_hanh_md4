<!-- components/ContentAssessor.vue -->
<template>
    <div class="content-assessor">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <!-- Các nội dung hoặc logic khác của component -->
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      default: "Default Title",
    },
    description: {
      type: String,
      default: "Default Description",
    },
  });
  </script>
  
  <style scoped>
  .content-assessor {
    /* Các kiểu dáng cho component */
  }
  </style>
  