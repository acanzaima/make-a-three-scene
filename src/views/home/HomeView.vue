<script setup lang="ts">
import { toRef } from "vue";
import { useThemeStore } from "@/stores/modules/theme";

// 主题
const useTheme = toRef(useThemeStore(), "theme");
</script>

<template>
  <div class="home-wrapper" :class="useTheme">
    <h1 class="home-title">制作一个 three.js 场景</h1>
    <p class="home-subtitle">
      可直接复用的 <strong><em>three.js</em></strong> 场景收藏夹
    </p>
    <p class="home-enter-scene">
      <button @click.stop="$router.push('/scene')">
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>进入场景</span>
      </button>
    </p>
    <footer class="home-footer">Write By StarrySky</footer>
  </div>
</template>

<style lang="less" scoped>
.home-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 170px;
}

.home-title {
  margin: 20px 0 10px !important;
  font-size: 50px;
  font-weight: 700;
  letter-spacing: 5px;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home-subtitle {
  font-size: 16px;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.home-enter-scene button {
  font-family: inherit;
  font-size: 20px;
  background: royalblue;
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  > span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }
  > svg {
    display: block;
    transform-origin: center center;
  }
}

.home-enter-scene button:hover {
  .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }
  svg {
    transition: transform 0.5s ease-in-out;
    transform: translateX(2em) rotate(45deg) scale(1.1);
  }
  span {
    transform: translateX(5em);
  }
}

.home-enter-scene button:active {
  transform: scale(0.95);
}

.home-footer {
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
  height: 25px;
  line-height: 25px;
  text-align: center;
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}
</style>
