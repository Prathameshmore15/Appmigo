from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 1400
img = Image.new('RGBA', (W, H), (255, 255, 255, 0))
draw = ImageDraw.Draw(img)

# Colors — Emerald + Gold
EMERALD = (5, 150, 105)
GOLD = (184, 134, 11)
DARK = (26, 26, 26)
MUTED = (120, 120, 114)
BG_WARM = (250, 250, 248, 255)

# Font paths
font_dir = r"C:\Users\PRATHAMESH\.config\opencode\skills\canvas-design\canvas-fonts"
ws_regular = os.path.join(font_dir, "WorkSans-Regular.ttf")
ws_bold = os.path.join(font_dir, "WorkSans-Bold.ttf")

# Background
draw.rectangle([(0, 0), (W, H)], fill=BG_WARM)

# ---- MONOGRAM MARK ----
box_size = 380
box_x = (W - box_size) // 2
box_y = 340
radius = 95

# Subtle shadow beneath the box
draw.rounded_rectangle(
    [box_x + 4, box_y + 6, box_x + box_size + 4, box_y + box_size + 6],
    radius=radius, fill=(0, 0, 0, 15)
)

# Background rounded square with border
draw.rounded_rectangle(
    [box_x, box_y, box_x + box_size, box_y + box_size],
    radius=radius, fill=(255, 255, 255, 255), outline=EMERALD, width=2
)

# ---- THE "A" MONOGRAM ----
pad = 55
top_center_x = box_x + box_size // 2
top_y = box_y + pad + 10
bottom_y = box_y + box_size - pad - 10
bottom_left_x = box_x + pad + 15
bottom_right_x = box_x + box_size - pad - 15

stroke_w = 34

# Left stroke of A
draw.polygon([
    (top_center_x - 6, top_y),
    (bottom_left_x + 25, bottom_y),
    (bottom_left_x + 25 - stroke_w, bottom_y + 5),
    (top_center_x - 6 - stroke_w//2, top_y + 12),
], fill=EMERALD)

# Right stroke of A
draw.polygon([
    (top_center_x + 6, top_y),
    (bottom_right_x - 25, bottom_y),
    (bottom_right_x - 25 + stroke_w, bottom_y + 5),
    (top_center_x + 6 + stroke_w//2, top_y + 12),
], fill=EMERALD)

# Crossbar (gold)
crossbar_y = top_y + 115
draw.rectangle([
    bottom_left_x + 55, crossbar_y - 14,
    bottom_right_x - 55, crossbar_y + 14
], fill=GOLD)

# ---- PLAY TRIANGLE INSIDE A ----
play_center_x = top_center_x
play_center_y = top_y + 40
play_size = 24

draw.polygon([
    (play_center_x - play_size//2 + 2, play_center_y - play_size//2 + 2),
    (play_center_x - play_size//2 + 2, play_center_y + play_size//2 - 2),
    (play_center_x + play_size//2 + 2, play_center_y),
], fill=GOLD)

# ---- SIDE DOTS ----
dot_r = 5
dot_y = box_y + box_size // 2
draw.ellipse([box_x - 28 - dot_r, dot_y - dot_r, box_x - 28 + dot_r, dot_y + dot_r], fill=GOLD)
draw.ellipse([box_x + box_size + 28 - dot_r, dot_y - dot_r, box_x + box_size + 28 + dot_r, dot_y + dot_r], fill=GOLD)

# ---- DIVIDER LINES ----
for ly in [box_y + box_size + 45, box_y + box_size + 58]:
    draw.line([(W//2 - 70, ly), (W//2 + 70, ly)], fill=(210, 208, 200, 255), width=1)

# ---- WORDMARK ----
font_ws_bold = ImageFont.truetype(ws_bold, 52)
wordmark = "appmigo"
bbox = draw.textbbox((0, 0), wordmark, font=font_ws_bold)
tw = bbox[2] - bbox[0]
tx = (W - tw) // 2
ty = box_y + box_size + 90
draw.text((tx, ty), wordmark, font=font_ws_bold, fill=DARK)

# ---- TAGLINE ----
font_ws = ImageFont.truetype(ws_regular, 24)
tagline = "game studio"
bbox = draw.textbbox((0, 0), tagline, font=font_ws)
tw = bbox[2] - bbox[0]
tx = (W - tw) // 2
ty = box_y + box_size + 155
draw.text((tx, ty), tagline, font=font_ws, fill=MUTED)

# Save
output_path = r"C:\Users\PRATHAMESH\appmigo\public\appmigo-logo.png"
img.save(output_path, "PNG")
print(f"Logo saved to {output_path}")
print(f"Size: {img.size}")
