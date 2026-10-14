<!-- src/App.svelte -->
<script lang="ts">
// Svelte 5 Runes 문법 사용
let count = $state(0);

function increment() {
  console.log('hi');
  count += 1;
}
</script>

<main style="width: 320px; padding: 1.5rem; font-family: system-ui;">
  <h2 style="margin-top: 0;">Svelte 5 Extension 🚀</h2>
  <div style="background: #f4f4f5; padding: 1rem; border-radius: 8px;">
    <p style="font-size: 1.1rem; margin-bottom: 1rem;">클릭 횟수: <strong>{count}</strong></p>
    <button onclick={increment}
      style="width: 100%; padding: 0.5rem; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
      증가시키기!!!
    </button>
  </div>
</main>
