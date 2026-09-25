import zlib
import struct
import math

def create_png(width, height, pixel_generator):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        for x in range(width):
            r, g, b, a = pixel_generator(x, y, width, height)
            raw_data.extend([r, g, b, a])
            
    compressed = zlib.compress(bytes(raw_data), 9)
    
    png = bytearray(b'\x89PNG\r\n\x1a\n')
    
    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    png.extend(struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc))
    
    # IDAT
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    png.extend(struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc))
    
    # IEND
    iend_crc = zlib.crc32(b'IEND')
    png.extend(struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc))
    
    return bytes(png)

def draw_java_icon(x, y, w, h, is_maskable=False):
    # Normalized coordinates (-1.0 to 1.0)
    nx = (x / (w - 1)) * 2 - 1
    ny = (y / (h - 1)) * 2 - 1
    
    # Scale for maskable safe margin (padding 15%)
    if is_maskable:
        scale = 0.72
    else:
        scale = 0.88
        
    sx = nx / scale
    sy = ny / scale
    
    # Background color: #020617 (slate-950)
    bg_r, bg_g, bg_b, bg_a = 2, 6, 23, 255
    
    # Subtle rounded corner border for non-maskable
    dist_box = max(abs(nx), abs(ny))
    corner_dist = math.hypot(max(0, abs(nx) - 0.7), max(0, abs(ny) - 0.7))
    if not is_maskable and corner_dist > 0.3:
        return 0, 0, 0, 0
        
    # Border glow
    if not is_maskable and (0.26 < corner_dist <= 0.3 or (0.95 < dist_box <= 0.99)):
        return 245, 158, 11, 255 # amber-500
        
    # Cup dimensions
    # Cup center at (0, 0.15)
    # Steam at (-0.2 to 0.2, -0.6 to -0.1)
    
    # Steam waves
    is_steam = False
    for steam_cx in [-0.2, 0.0, 0.2]:
        wave_y = sy - (-0.4)
        if -0.35 <= sy <= -0.05:
            offset_x = 0.04 * math.sin(sy * 15.0 + steam_cx * 10)
            if abs(sx - (steam_cx + offset_x)) < 0.035:
                is_steam = True
                break
                
    if is_steam:
        return 251, 191, 36, 220 # amber-400
        
    # Cup body: top at sy=-0.02, bottom at sy=0.45
    # width tapers from top (0.45) to bottom (0.32)
    if -0.02 <= sy <= 0.45:
        top_half_w = 0.44
        bot_half_w = 0.32
        t = (sy - (-0.02)) / 0.47
        curr_half_w = top_half_w * (1 - t) + bot_half_w * t
        
        # Inside cup
        if abs(sx) <= curr_half_w:
            # Code bracket glyph </> in center
            if 0.12 <= sy <= 0.32 and abs(sx) <= 0.2:
                # Bracket or slash
                # slash line
                slash_x = -(sy - 0.22) * 1.2
                if abs(sx - slash_x) < 0.025:
                    return 254, 243, 199, 255
                # < bracket
                if sx < -0.06:
                    if abs(abs(sy - 0.22) * 1.3 + (sx + 0.14)) < 0.03:
                        return 254, 243, 199, 255
                # > bracket
                if sx > 0.06:
                    if abs(abs(sy - 0.22) * 1.3 - (sx - 0.14)) < 0.03:
                        return 254, 243, 199, 255
                        
            # Cup fill gradient (amber-500 to amber-600)
            return 217, 119, 6, 255
            
    # Cup handle (on right: 0.35 <= sx <= 0.58, 0.05 <= sy <= 0.35)
    handle_cx = 0.44
    handle_cy = 0.19
    dist_handle = math.hypot((sx - handle_cx) * 1.2, sy - handle_cy)
    if 0.11 <= dist_handle <= 0.18 and sx > 0.32:
        return 245, 158, 11, 255
        
    # Saucer / Base plate (sy between 0.48 and 0.55)
    if 0.48 <= sy <= 0.54:
        saucer_w = 0.55
        if abs(sx) <= saucer_w:
            return 180, 83, 9, 255
            
    # Default dark background
    return bg_r, bg_g, bg_b, bg_a

# Generate files
icons = [
    ("public/pwa-512x512.png", 512, 512, False),
    ("public/pwa-192x192.png", 192, 192, False),
    ("public/apple-touch-icon.png", 180, 180, False),
    ("public/favicon.ico", 64, 64, False),
    ("public/pwa-maskable-512x512.png", 512, 512, True)
]

for filename, w, h, maskable in icons:
    data = create_png(w, h, lambda x, y, width, height: draw_java_icon(x, y, width, height, maskable))
    with open(filename, "wb") as f:
        f.write(data)
    print(f"Generated {filename} ({w}x{h})")
