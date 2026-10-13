import os
from PIL import Image

public_img_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'images')
root_img_dir = os.path.join(os.path.dirname(__file__), '..', 'assets', 'images')

# Target exact dimensions for 2x DPR mobile display to satisfy Lighthouse 100%:
# Displayed dimensions:
# - logo: 40x40 -> 80x80
# - gemini: 28x28 -> 56x56
# - claude: 28x28 -> 56x56
# - google-antigravity: 32x32 -> 64x64
# - n8n: 38x28 -> 76x56
# - whatsapp: 36x36 -> 72x72
# - favicon: 32x32 -> 32x32

targets = {
    'logo': (80, 80),
    'gemini': (56, 56),
    'claude': (56, 56),
    'google-antigravity': (64, 64),
    'n8n': (76, 56),
    'whatsapp': (72, 72),
    'favicon': (32, 32),
}

def compress_to_webp(dir_path):
    print(f"\nProcessing {dir_path}...")
    for name, size in targets.items():
        # Look for PNG or WebP as source
        png_path = os.path.join(dir_path, f"{name}.png")
        webp_path = os.path.join(dir_path, f"{name}.webp")
        
        src_path = png_path if os.path.exists(png_path) else webp_path
        if not os.path.exists(src_path):
            continue
            
        with Image.open(src_path) as im:
            im = im.convert('RGBA')
            im.thumbnail(size, Image.Resampling.LANCZOS)
            
            # Save WebP with high quality compression
            im.save(webp_path, format='WEBP', quality=82, method=6)
            new_size = os.path.getsize(webp_path)
            
            # Also update PNG version
            im.save(png_path, format='PNG', optimize=True)
            new_png = os.path.getsize(png_path)
            
            print(f"  {name}: WebP={new_size}B, PNG={new_png}B, Dimensions={im.size}")

for d in [public_img_dir, root_img_dir]:
    compress_to_webp(d)
