<!--
@license GNU AGPL version 3 or any later version

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
-->
<template>
  <div class="cm-loader">
    <div
      class="cm-loader-bar"
      :style="createStyle(width)"
    ></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const width = ref(0)
const createStyle = (size) => {
  return {
    width: `${size}%`,
  }
}
let interval = null
let resetTimeout = null

const clearTimers = () => {
  if (interval !== null) {
    clearInterval(interval)
    interval = null
  }

  if (resetTimeout !== null) {
    clearTimeout(resetTimeout)
    resetTimeout = null
  }
}

const beforeUnloadHandler = () => {
  if (interval !== null) {
    return
  }

  interval = setInterval(() => {
    width.value = Math.min(width.value + 0.2, 100)

    if (width.value === 100) {
      clearTimers()
      resetTimeout = window.setTimeout(() => {
        width.value = 0
        resetTimeout = null
      }, 2000)
    }
  }, 25)
}

onMounted(() => {
  window.addEventListener('beforeunload', beforeUnloadHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeUnloadHandler)
  clearTimers()
})
</script>
