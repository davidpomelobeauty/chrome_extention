<script lang="ts">
// Svelte 5 룬(Runes)으로 수집된 데이터를 관리합니다.
let scrapedHeadings = $state<string[]>([]);
let errorMessage = $state('');

// 버튼 클릭 시 작동하는 메인 스크립트 주입 로직
async function func() {
  errorMessage = '';

  try {
    // 1. 사용자가 현재 활성화해서 보고 있는 브라우저 탭의 정보를 가져옵니다.
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      errorMessage = '데이터를 읽어올 활성 탭을 찾을 수 없습니다.';
      return;
    }

    // 2. 중요: scripting API를 사용해 타겟 웹페이지에 위의 스크래퍼 함수를 동적으로 꽂아 넣습니다.
    const injectionResults = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: function () {
        const headings = document.querySelectorAll('h1');
        return Array.from(headings).map((el) => el.innerText.trim() || '내용 없는 제목');
      },
    });

    // 3. 주입된 함수가 return한 결과 데이터를 받아와 Svelte 상태에 바인딩합니다.
    if (injectionResults && injectionResults[0]) {
      scrapedHeadings = injectionResults[0].result as string[];
    }
  } catch (error) {
    console.error('DOM 접근 실패:', error);
    errorMessage = '웹페이지가 완전히 로딩되지 않았거나, 보안 페이지(예: 크롬 설정/웹스토어)입니다.';
  }
}
</script>

<main class="w-[320px] p-4 bg-slate-50 font-sans">
  <h1 class="text-lg font-bold text-slate-800 mb-3">팝업 DOM 스크래퍼</h1>

  <button 
    onclick={func}
    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition mb-3 shadow-sm text-sm"
  >
    현재 페이지 h1 태그 수집
  </button>

  {#if errorMessage}
    <p class="text-xs text-red-500 font-medium mb-3">{errorMessage}</p>
  {/if}

  <div class="bg-white p-3 rounded border border-slate-200 max-h-48 overflow-y-auto shadow-inner">
    <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">결과 목록 ({scrapedHeadings.length})</p>
    
    {#if scrapedHeadings.length === 0}
      <p class="text-xs text-slate-400 italic">버튼을 눌러 데이터를 수집해 보세요.</p>
    {:else}
      <ul class="list-disc pl-4 space-y-1">
        {#each scrapedHeadings as text}
          <li class="text-xs text-slate-700 font-medium break-all">{text}</li>
        {/each}
      </ul>
    {/if}
  </div>
</main>
