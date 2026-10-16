<script lang="ts">
const { exec, result, errorMessage } = $props();
</script>

<main class="w-[320px] p-4 bg-slate-50 font-sans">
  <h1 class="text-lg font-bold text-slate-800 mb-3">DOM 스크래퍼</h1>

  <button 
    onclick={exec}
    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition mb-3 shadow-sm text-sm"
  >
    실행
  </button>

  {#if errorMessage}
    <p class="text-xs text-red-500 font-medium mb-3">{errorMessage}</p>
  {/if}

  <div class="bg-white p-3 rounded border border-slate-200 max-h-48 overflow-y-auto shadow-inner">
    <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">결과 목록 ({result.length})</p>
    
    {#if result.length === 0}
      <p class="text-xs text-slate-400 italic">버튼을 눌러 데이터를 수집해 보세요.</p>
    {:else}
      <ul class="list-disc pl-4 space-y-1">
        {#each result as text}
          <li class="text-xs text-slate-700 font-medium break-all">{text}</li>
        {/each}
      </ul>
    {/if}
  </div>
</main>
