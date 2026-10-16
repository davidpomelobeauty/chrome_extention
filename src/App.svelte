<script lang="ts">
import cash from 'cash-dom';
import AppDisplay from './AppDisplay.svelte';
let result = $state<string[]>([]);
let errorMessage = $state('');

/*
async function test() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) {
    errorMessage = '데이터를 읽어올 활성 탭을 찾을 수 없습니다.';
    return;
  }

  const response = await chrome.tabs.sendMessage(tab.id, { action: 'TEST', tabId: tab.id });
  alert(response.pageTitle);
}
*/

function logic() {
  const _: typeof cash = cash;

  // const c = _('.product-detail-container');
  alert(_);

  const headings = document.querySelectorAll('h1');
  return Array.from(headings).map((el) => el.innerText.trim() || '내용 없는 제목');
}

async function exec() {
  errorMessage = '';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      errorMessage = '데이터를 읽어올 활성 탭을 찾을 수 없습니다.';
      return;
    }

    const searchResult = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: logic,
    });
    result = searchResult?.[0]?.result ?? [];
  } catch (error) {
    console.error('DOM 접근 실패:', error);
    errorMessage = '웹페이지가 완전히 로딩되지 않았거나, 보안 페이지(예: 크롬 설정/웹스토어)입니다.';
  }
}
</script>

<AppDisplay {exec} {result} {errorMessage} />
