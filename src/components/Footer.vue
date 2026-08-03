<script setup lang="ts">
import { ref, onMounted } from 'vue'
// Ensure this path is correct for your project structure
import { fetchFooterGroups, type FooterGroup } from '@/services/FooterPageService'

// 1. A reactive variable to hold the footer data, initialized as an empty array.
//    `ref()` makes it reactive. Vue will watch this for changes.
const footerGroups = ref<FooterGroup[]>([])

// 2. Reactive variables for loading and error states to provide user feedback.
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

// 3. `onMounted` is a lifecycle hook that runs when the component is first added to the page.
//    This is the perfect place to fetch the data.
onMounted(async () => {
  try {
    // 4. Call your service and wait for the data to return.
    const data = await fetchFooterGroups()

    // 5. THIS IS THE KEY STEP: Assign the fetched data to the .value of the reactive variable.
    //    This assignment triggers Vue's reactivity system, which updates the template.
    footerGroups.value = data

    // Log the fetched and processed data to the console for verification
    console.log('SUCCESS: Data assigned to footerGroups reactive variable.', footerGroups.value)

  } catch (e) {
    // If the fetch fails, store an error message to display to the user.
    console.error('Failed to fetch footer data:', e)
    errorMessage.value = 'Could not load footer content at this time.'
  } finally {
    // 6. Once fetching is complete (success or fail), set isLoading to false.
    isLoading.value = false
  }
})
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">
      <!-- You can have other static columns here, e.g., an "About" section -->
      <div class="footer-column about">
        <h3 class="logo-text">MACHINERY GENIUS AI</h3>
        <p>Building the AI infrastructure layer for the machinery industry. Connecting machine owners, shops, manufacturers, repair technicians, schools, OEMs, dealers, and industrial service providers through one intelligent support platform.</p>
      </div>

      <!-- 7. DYNAMICALLY RENDERED SECTIONS -->
      <!-- The `v-if` directive ensures we only try to render this block once loading is complete. -->
      <!-- DEBUGGING: This will log the value of footerGroups right before the v-for loop -->
      {{ console.log('TEMPLATE RENDER: footerGroups value is:', footerGroups) }}

      <template v-if="!isLoading">
        <!-- The `v-for` directive loops through the `footerGroups` array. -->
        <!-- For each `group` object in the array, it creates a new column. -->
        <div v-for="group in footerGroups" :key="group.key" class="footer-column">
          <h3>{{ group.label }}</h3>
          
          <!-- Check if there are items (links) within the group before rendering the list -->
          <ul v-if="group.items && group.items.length > 0">
            <!-- A nested `v-for` loops through the links (`items`) in each group. -->
            <li v-for="item in group.items" :key="item.id">
              <!-- We use `:href` (v-bind:href) for dynamic attributes. -->
              <!-- `:target` and `:rel` are added for external links for security and best practice. -->
              <a :href="item.href" :target="item.external ? '_blank' : '_self'" :rel="item.external ? 'noopener noreferrer' : undefined">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </template>

      <!-- 8. LOADING AND ERROR STATES -->
      <!-- Show a loading message while the data is being fetched. -->
      <div v-if="isLoading" class="footer-column">
        <p>Loading footer links...</p>
      </div>
      <!-- Show an error message if the fetch failed. -->
      <div v-if="errorMessage" class="footer-column">
        <p class="text-red-500">{{ errorMessage }}</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Machinery Genius AI. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
/* Add your footer styling here */
/* These styles are based on your previous examples */
.site-footer {
  background-color: #111827;
  color: #9CA3AF;
  font-size: 0.875rem;
  line-height: 1.6;
}
.footer-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
}
.footer-column {
  flex: 1;
  min-width: 220px; /* Adjusted for better responsiveness */
}
.footer-column.about {
  flex: 2;
  min-width: 320px;
}
.footer-column .logo-text {
    font-weight: 700;
    font-size: 1.5rem;
    color: #FFFFFF;
    margin-bottom: 1rem;
    line-height: 1.2;
}
.footer-column h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #F9FAFB;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.footer-column p {
  margin-top: 0;
  margin-bottom: 1rem;
}
.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-column ul li {
  margin-bottom: 0.75rem;
}
.footer-column ul a {
  color: #9CA3AF;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}
.footer-column ul a:hover {
  color: #FFFFFF;
}
.footer-bottom {
  background-color: #000000;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 0.75rem;
}
</style>