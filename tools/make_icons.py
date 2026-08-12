"""GitHub Actions 用：在 CI 上重新生成 PWA 全套 PNG 图标（与本地脚本同一套设计）。"""
import os
import matplotlib
from PIL import Image, ImageDraw, ImageFont

os.makedirs("icons", exist_ok=True)
font_path = os.path.join(matplotlib.get_data_path(), "fonts", "ttf", "DejaVuSerif-Bold.ttf")

TEAL = (38, 70, 83)      # #264653
CREAM = (245, 240, 225)  # #f5f0e1
CORAL = (244, 162, 97)   # #f4a261


def make(size, scale, out):
    img = Image.new("RGB", (size, size), TEAL)
    d = ImageDraw.Draw(img)
    f_big = ImageFont.truetype(font_path, int(size * 0.52 * scale))
    f_slash = ImageFont.truetype(font_path, int(size * 0.34 * scale))
    bb = d.textbbox((0, 0), "æ", font=f_big)
    w_ae = bb[2] - bb[0]
    bbs = d.textbbox((0, 0), "/", font=f_slash)
    w_sl = bbs[2] - bbs[0]
    gap = size * 0.045 * scale
    total = w_sl + gap + w_ae + gap + w_sl
    x = (size - total) / 2
    cy = size / 2
    d.text((x + w_sl + gap - bb[0], cy - (bb[3] + bb[1]) / 2), "æ", font=f_big, fill=CREAM)
    d.text((x - bbs[0], cy - (bbs[3] + bbs[1]) / 2 - size * 0.02), "/", font=f_slash, fill=CORAL)
    d.text((x + w_sl + gap + w_ae + gap - bbs[0], cy - (bbs[3] + bbs[1]) / 2 - size * 0.02), "/", font=f_slash, fill=CORAL)
    img.save(out)
    print(out, img.size)


make(192, 1.0, "icons/icon-192.png")
make(512, 1.0, "icons/icon-512.png")
make(512, 0.72, "icons/icon-maskable-512.png")
make(180, 1.0, "icons/apple-touch-icon.png")
