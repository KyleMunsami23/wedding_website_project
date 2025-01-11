const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const TOTAL = 20
const petalArray = []

const petalImg = new Image()
petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png'
petalImg.addEventListener('load', () => {
  for (let i = 0; i < TOTAL; i++) {
    petalArray.push(new Petal())
  }
  render()
})

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  petalArray.forEach(petal => petal.animate())
  window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

let mouseX = 0
function touchHandler(e) {
  mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth
}
window.addEventListener('mousemove', touchHandler)
window.addEventListener('touchmove', touchHandler)

// Petal class
class Petal {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = (Math.random() * canvas.height * 2) - canvas.height
    this.w = 25 + Math.random() * 15
    this.h = 20 + Math.random() * 10
    this.opacity = this.w / 40
    this.flip = Math.random()

    this.xSpeed = 0.5 + Math.random() * 1
    this.ySpeed = 0.4 + Math.random() * .5
    this.flipSpeed = Math.random() * 0.03
  }

  draw() {
    if (this.y > canvas.height || this.x > canvas.width) {
      this.x = -petalImg.width
      this.y = (Math.random() * canvas.height * 2) - canvas.height
      this.xSpeed = 1.5 + Math.random() * 2
      this.ySpeed = 1 + Math.random() * 1
      this.flip = Math.random()
    }
    ctx.globalAlpha = this.opacity
    ctx.drawImage(
      petalImg, 
      this.x, 
      this.y, 
      this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)), 
      this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
    )
  }

  animate() {
    this.x += this.xSpeed + mouseX * 5
    this.y += this.ySpeed + mouseX * 2
    this.flip += this.flipSpeed
    this.draw()
  }
}

function openPopup(buttonNumber) {
  const popup = document.getElementById('popup');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');

  // Set image and text based on the button clicked
  if (buttonNumber === 1) {
      popupImage.src = "./images/date.jpg";
      popupText.textContent = "01-June-2025";
  } else if (buttonNumber === 2) {
      popupImage.src = "./images/time.jpg";
      popupText.textContent = "14h00";
  } else if (buttonNumber === 3) {
      popupImage.src = "./images/venue.jpg";
      popupText.textContent = "FNB Stadium";
  }

  popup.style.display = "flex";
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = "none";
}

function goBack() {
  closePopup();  // Close the popup (or you can use window.history.back() for navigation)
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  
  console.log(distance); // Check if the distance is correct

  if (distance <= 0) {
      document.getElementById('countdown').innerHTML = "The Big Day has arrived!";
      return;
  }
}
