<script lang="ts">
  import { onMount } from 'svelte'
  import {
    drawImageScaled,
    loadImageFromFile,
    loadImageFromSrc
  } from './lib/utils'

  let downloadImageData: string | undefined
  let downloadImageName = 'skiercon-overlay-2022.jpg'

  onMount(async () => {
    // Load overlay to canvas
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
    const ctx = canvas.getContext('2d')
    const overlayImage = await loadImageFromSrc(
      'https://argeento.github.io/skiercon-overlay/overlay-2022.png'
    )

    ctx.drawImage(overlayImage, 0, 0)

    // Handle user input
    const userInput = document.querySelector('#userFileInput')

    userInput.addEventListener('change', async (event: any) => {
      const file = event.target?.files[0]
      if (!file) return

      const userImage = await loadImageFromFile(file)
      drawImageScaled(userImage, canvas)
      ctx.drawImage(overlayImage, 0, 0)
      downloadImageData = canvas.toDataURL('image/jpeg', 1.0)
    })
  })

  function downloadImage(): void {
    const a = document.createElement('a')
    a.href = downloadImageData
    a.download = downloadImageName
    document.body.appendChild(a)
    a.click()
  }
</script>

<h1>Skiercon Overlay</h1>
<label for="userFileInput">Dodaj swoje zdjęcie profilowe: </label>
<input type="file" id="userFileInput" />
<canvas id="canvas" class="canvas" width="1000" height="1000" />
<button on:click={downloadImage} disabled={!downloadImageData} class="btn">
  Pobierz zdjęcie
</button>

<style>
  .canvas {
    display: block;
    width: 500px;
    height: 500px;
    margin: 20px 0;
    border: 1px solid gray;
  }
  .btn {
    cursor: pointer;
  }
  :global(body) {
    margin: 50px;
  }
</style>
