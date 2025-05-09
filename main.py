import cv2
import nltk
from nltk.tokenize import sent_tokenize
from diffusers import StableDiffusionPipeline
import torch

# -------- 1. تحميل الصورة --------
image_path = "input.jpg"
image = cv2.imread(image_path)
if image is None:
    print("خطأ: لم يتم تحميل الصورة.")
    exit()

# -------- 2. قراءة النص --------
text_path = "story.txt"
with open(text_path, "r", encoding="utf-8") as f:
    story = f.read()

# -------- 3. تحليل النص وتحويله لمشاهد --------
nltk.download('punkt')
sentences = sent_tokenize(story)
scenes = []
for sentence in sentences:
    scenes.append(sentence.strip())

# -------- 4. توليد الصور من النصوص --------
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe.to("cuda")

images = []
for scene in scenes:
    image = pipe(scene).images[0]
    images.append(image)

# -------- 5. حفظ الصور --------
for i, image in enumerate(images):
    image.save(f"scene_{i}.jpg")

print("تم توليد الصور بنجاح.")
