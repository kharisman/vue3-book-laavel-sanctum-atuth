<template>
    <div class="container">
      <div id="carouselExampleSlidesOnly" class="carousel" data-bs-ride="carousel">
        <div class="carousel-inner" >
          <div v-for="(image, index) in images" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }">
            <img :src="image.src" class="d-block w-100" :alt="image.alt">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        images: [
          { src: "https://placehold.co/600x400/orange/white", alt: "Orange Image" },
          { src: "https://placehold.co/600x400/red/white", alt: "Red Image" },
          { src: "https://placehold.co/600x400/black/white", alt: "Black Image" }
        ]
      };
    }
  };
  </script>
  