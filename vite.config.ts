import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json' with { type: 'json' };
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    crx({ manifest }),
    tailwindcss(),
  ],
  build: {
    // 2. 크롬 확장 프로그램(MV3) 규격에 맞게 빌드 타겟을 지정하고 폴더를 비웁니다.
    target: 'es2022',
    emptyOutDir: true,
  },
  /*
  resolve: {
  // 앞서 deno.json에서 설정한 경로 별칭(#lib)을 Vite 빌드 타임에도 매핑해 줍니다.
    alias: {
      '#lib': path.resolve(__dirname, './src/lib/index.ts'),
      '@': path.resolve(__dirname, './src'),
    }
  }
   */
  server: {
    watch: {
      // ⚡ 무거운 캐시 및 노드 폴더를 감시 대상에서 완전히 제외합니다.
      ignored: ['**/node_modules/**', '**/.deno/**'],
    },
    // 1. Vite의 HMR 연결이 끊겼을 때 브라우저가 스스로 풀 리로드하는 것을 방지
    hmr: {
      overlay: false, // 에러 오버레이 끄기 (선택)
    },
  },
});
