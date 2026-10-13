import os
from PIL import Image

# Directories
public_img_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'images')
root_img_dir = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')

# Target configurations:
# For each image, specify max dimensions (3x retina for ultra crisp display on mobile & desktop)
# Display sizes on site:
# - logo.png: 40x40 (navbar), 32x32 (footer). 3x = 120x120
# - gemini.png: 28x28. 3x = 84x84
# - claude.png: 28x28. 3x = 84x84
# - google-antigravity.png: 32x32. 3x = 96x96
# - n8n.png: 38x28. 3x = 114x84
# - whatsapp.png: 36x36. 3x = 108x108
# - favicon.png: 32x32. 3x = 64x64

targets = {
    'logo.png': (128, 128),
    'gemini.png': (84, 84),
    'claude.png': (84, 84),
    'google-antigravity.png': (96, 96),
    'n8n.png': (114, 84),
    'whatsapp.png': (108, 108),
    'favicon.png': (64, 64),
}

def compress_image(src_path, target_size):
    if not os.path.exists(src_path):
        return
    with Image.open(src_path) as im:
        orig_size = os.path.getsize(src_path)
        im = im.convert('RGBA')
        
        # Calculate proportional thumbnail size preserving aspect ratio
        im.thumbnail(target_size, Image.Resampling.LANCZOS)
        
        # Save optimized PNG
        im.save(src_path, format='PNG', optimize=True)
        new_png_size = os.path.getsize(src_path)
        
        # Also create WebP version with lossless transparency & high quality
        webp_path = os.path.splitext(src_path)[0] + '.webp'
        im.save(webp_path, format='WEBP', quality=95, method=6)
        new_webp_size = os.path.getsize(webp_path)
        
        print(f"Compressed {os.path.basename(src_path)}: {orig_size}B -> PNG: {new_png_size}B, WEBP: {new_webp_size}B")

for dir_path in [public_img_dir, root_img_dir]:
    print(f"\nProcessing {dir_path}...")
    for filename, size in targets.items():
        file_path = os.path.join(dir_path, filename)
        compress_image(file_path, size)
