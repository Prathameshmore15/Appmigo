from PIL import Image, ImageDraw, ImageFont
import os

W, H = 800, 250
img = Image.new('RGBA', (W, H), (250, 250, 248, 0))
draw = ImageDraw.Draw(img)

EMERALD = (5, 150, 105)
GOLD = (184, 134, 11)
DARK = (26, 26, 26)
MUTED = (120, 120, 114)

font_dir = r"C:\Users\PRATHAMESH\.config\opencode\skills\canvas-design\canvas-fonts"

font_main = ImageFont.truetype(os.path.join(font_dir, "BricolageGrotesque-Bold.ttf"), 72)
font_sub = ImageFont.truetype(os.path.join(font_dir, "BricolageGrotesque-Regular.ttf"), 14)

wordmark = "appmigo"
bbox = draw.textbbox((0, 0), wordmark, font=font_main)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
tx = (W - tw) // 2
ty = (H - th) // 2 - 5

draw.text((tx, ty), wordmark, font=font_main, fill=DARK)

# Gold diamond on "i"
m_width = draw.textbbox((0, 0), "appm", font=font_main)[2] - draw.textbbox((0, 0), "appm", font=font_main)[0]
i_x = tx + m_width + 8
i_bbox = draw.textbbox((0, 0), "i", font=font_main)
i_top = ty + i_bbox[1]
dot_s = 8
draw.regular_polygon((i_x + 4, i_top - 14, dot_s // 2), 4, rotation=45, fill=GOLD)

# Gold line beneath
line_y = ty + th + 28
draw.line([(tx + 50, line_y), (tx + tw - 50, line_y)], fill=(GOLD[0], GOLD[1], GOLD[2], 80), width=2)
for cx in [tx + 50, tx + tw - 50]:
    draw.ellipse([cx - 3, line_y - 3, cx + 3, line_y + 3], fill=GOLD)

# Tagline
tagline = "GAME STUDIO"
bbox2 = draw.textbbox((0, 0), tagline, font=font_sub)
tw2 = bbox2[2] - bbox2[0]
tx2 = (W - tw2) // 2
ty2 = line_y + 18
draw.text((tx2, ty2), tagline, font=font_sub, fill=MUTED)

out = r"C:\Users\PRATHAMESH\appmigo\public\appmigo-wordmark.png"
img.save(out, "PNG")
print(f"Saved {out}")
