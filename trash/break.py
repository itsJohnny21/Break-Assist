import math

def combine(pairs):
    pair_map = {}
    
    for pair in pairs:
        h, q = pair
        if h not in pair_map:
            pair_map[h] = q
        else:
            pair_map[h] += q
            
    return tuple(pair_map.items())

def pallet_break(x):
    for h in range(6, 0, -1):
        q = x // (9 * h)
        r1 = x % (9 * h)
        r2 = 9 * h - r1
        
        if q > 0:
            if h == 6 and 0 <= r1 <= 9:
                return ((6, 9 * q), (1, r1))
        
            elif (h + 1) < 7 and r1 <= 9 * q:
                return ((h, 9 * q - r1), (h + 1, r1))
            
            elif (h - 1) > 0 and r2 <= 9 * (q + 1):
                return ((h, 9 * (q + 1) - r2), (h - 1, r2))
            
    return ((1, x),)
            
for i in range(0, 400):
    brk = pallet_break(i)
    
    p = 0 if len(brk) == 1 else math.floor((brk[0][1] + brk[1][1]) / 9) if brk[1] != (1, 9) else math.floor(brk[0][1] / 9)
    print(p, i, brk)