const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

const images = [
  "https://picsum.photos/id/1011/200/200",
  "https://picsum.photos/id/1012/200/200",
  "https://picsum.photos/id/1015/200/200",
  "https://picsum.photos/id/1025/200/200",
  "https://picsum.photos/id/1035/200/200",
];
const duplicateImg = images[Math.floor(Math.random() * images.length)];
const allImages = [...images, duplicateImg];
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const shuffled = shuffle(allImages);
shuffled.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;
  container.appendChild(img);
});

let selectedImages = [];
container.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;

  const img = e.target;
  if (img.classList.contains("selected")) {
    img.classList.remove("selected");
    selectedImages = selectedImages.filter((el) => el !== img);
  } else {
    if (selectedImages.length < 2) {
      img.classList.add("selected");
      selectedImages.push(img);
    }
  }
  resetBtn.style.display = selectedImages.length > 0 ? "inline-block" : "none";
  verifyBtn.style.display = selectedImages.length === 2 ? "inline-block" : "none";
});
resetBtn.addEventListener("click", () => {
  selectedImages.forEach((img) => img.classList.remove("selected"));
  selectedImages = [];
  result.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
});

// verify button
verifyBtn.addEventListener("click", () => {
  if (selectedImages.length === 2) {
    const [img1, img2] = selectedImages;
    if (img1.src === img2.src) {
      result.textContent = "You are a human. Congratulations!";
      result.style.color = "green";
    } else {
      result.textContent =
        "We can't verify you as a human. You selected the non-identical tiles.";
      result.style.color = "red";
    }
    verifyBtn.style.display = "none";
  }
});
