export function loadImageFromSrc(src: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = src
  })
}

export function loadImageFromFile(file: Blob): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = e => {
      const img = new Image()
      img.src = e.target.result as string
      img.onload = () => resolve(img)
    }
  })
}

export function drawImageScaled(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext('2d')
  const hRatio = canvas.width / img.width
  const vRatio = canvas.height / img.height
  const ratio = Math.max(hRatio, vRatio)
  const centerShift_x = (canvas.width - img.width * ratio) / 2
  const centerShift_y = (canvas.height - img.height * ratio) / 2
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  )
}

function downloadImage(
  data: string,
  filename = 'skiercon-overlay-2022.png'
): void {
  const a = document.createElement('a')
  a.href = data
  a.download = filename
  document.body.appendChild(a)
  a.click()
}
