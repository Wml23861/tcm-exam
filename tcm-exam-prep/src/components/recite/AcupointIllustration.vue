<template>
  <div class="acupoint-illustration" :class="`region--${region}`">
    <!-- ========================================================= -->
    <!-- 手部区域 (Hand / Forearm) -->
    <!-- ========================================================= -->
    <svg
      v-if="region === 'hand'"
      viewBox="0 0 220 280"
      class="illustration-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Meridian path hints (dotted) -->
      <!-- 肺经 (LU) - radial side -->
      <path d="M 85,22 C 82,60 80,95 78,125 C 76,155 74,185 72,215 C 70,235 72,248 76,260" class="meridian-line lu-meridian" />
      <!-- 心包经 (PC) - center -->
      <path d="M 100,22 C 100,60 98,95 96,125 C 94,155 94,185 96,215 C 98,235 100,248 102,260" class="meridian-line pc-meridian" />
      <!-- 心经 (HT) - ulnar side -->
      <path d="M 125,22 C 126,60 124,95 122,125 C 120,155 118,185 120,215 C 122,235 124,248 126,260" class="meridian-line ht-meridian" />
      <!-- 大肠经 (LI) - radial dorsal -->
      <path d="M 115,22 C 118,60 120,95 118,125 C 116,155 114,185 116,215 C 118,235 116,248 114,260" class="meridian-line li-meridian" />
      <!-- 三焦经 (TE) - center dorsal -->
      <path d="M 130,22 C 132,60 130,95 128,125 C 126,155 128,185 130,215 C 132,235 130,248 128,260" class="meridian-line te-meridian" />

      <!-- Shoulder -->
      <ellipse cx="110" cy="20" rx="36" ry="20" class="body-fill" />
      <circle cx="110" cy="20" r="4" class="joint-dot" />
      <!-- Upper arm -->
      <path d="M 74,20 C 68,40 66,60 68,80 C 70,100 72,110 70,120 C 68,128 72,140 70,155 C 68,168 72,180 74,195 C 76,210 78,220 80,235 L 138,235 C 140,220 142,210 144,195 C 146,180 150,168 148,155 C 146,140 150,128 148,120 C 146,110 148,100 150,80 C 152,60 150,40 144,20 Z" class="body-outline" />
      <!-- Humerus bone -->
      <line x1="110" y1="22" x2="110" y2="110" class="bone-line" stroke-width="1.2" />
      <!-- Elbow joint detail -->
      <circle cx="110" cy="110" r="5" class="joint-dot" />
      <line x1="72" y1="110" x2="148" y2="110" class="landmark-line" />
      <!-- Radius -->
      <line x1="96" y1="112" x2="88" y2="218" class="bone-line" />
      <!-- Ulna -->
      <line x1="124" y1="112" x2="130" y2="218" class="bone-line" />
      <!-- Wrist crease detail -->
      <line x1="66" y1="220" x2="152" y2="220" class="landmark-line" />
      <line x1="70" y1="222" x2="148" y2="222" class="landmark-line" stroke-width="0.4" />
      <!-- Hand / Fingers -->
      <line x1="72" y1="222" x2="68" y2="268" class="bone-line" />
      <line x1="88" y1="222" x2="86" y2="270" class="bone-line" />
      <line x1="104" y1="222" x2="104" y2="272" class="bone-line" />
      <line x1="120" y1="222" x2="120" y2="270" class="bone-line" />
      <line x1="136" y1="222" x2="138" y2="268" class="bone-line" />
      <!-- Thumb -->
      <line x1="76" y1="222" x2="60" y2="240" class="bone-line" />

      <!-- Acupoint marker -->
      <template v-if="dotPosition">
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="13" class="point-glow" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="6" class="point-dot" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="2.5" class="point-core" />
        <!-- Label with background -->
        <rect :x="labelX - labelWidth / 2 - 4" :y="labelY - 9" :width="labelWidth + 8" :height="14" rx="6" class="label-bg" />
        <text :x="labelX" :y="labelY" class="point-label" text-anchor="middle">{{ pointName }}</text>
      </template>

      <!-- Minimap -->
      <g class="minimap" transform="translate(180, 230)">
        <rect x="0" y="0" width="32" height="42" rx="3" class="minimap-bg" />
        <ellipse cx="16" cy="10" rx="8" ry="8" class="minimap-body" />
        <path d="M 12,18 C 12,24 10,30 10,34 L 22,34 C 22,30 20,24 20,18" class="minimap-body" />
        <rect x="0" y="4" width="32" height="38" rx="3" class="minimap-highlight" />
        <text x="16" y="14" class="minimap-label" text-anchor="middle">手</text>
      </g>
    </svg>

    <!-- ========================================================= -->
    <!-- 腿部区域 (Leg / Foot) -->
    <!-- ========================================================= -->
    <svg
      v-else-if="region === 'leg'"
      viewBox="0 0 190 300"
      class="illustration-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Meridian paths -->
      <!-- 胃经 (ST) - anterior lateral -->
      <path d="M 100,10 C 105,40 108,70 106,100 C 104,130 106,160 104,190 C 102,220 100,245 98,265 C 96,275 94,282 92,288" class="meridian-line st-meridian" />
      <!-- 脾经 (SP) - medial -->
      <path d="M 68,10 C 66,40 64,70 62,100 C 60,130 58,160 60,190 C 62,220 60,245 58,265 C 56,275 58,282 60,288" class="meridian-line sp-meridian" />
      <!-- 膀胱经 (BL) - posterior -->
      <path d="M 84,10 C 84,40 84,80 84,110 C 84,145 84,175 84,205 C 84,235 84,255 84,275" class="meridian-line bl-meridian" />
      <!-- 肾经 (KI) - medial posterior -->
      <path d="M 56,10 C 54,40 52,70 54,100 C 56,130 54,160 56,190 C 58,220 56,245 54,265 C 52,275 54,282 56,288" class="meridian-line ki-meridian" />
      <!-- 胆经 (GB) - lateral -->
      <path d="M 124,10 C 126,40 128,70 126,100 C 124,130 126,160 124,190 C 122,220 124,245 126,265 C 128,275 126,282 124,288" class="meridian-line gb-meridian" />
      <!-- 肝经 (LR) - medial anterior -->
      <path d="M 56,10 C 58,45 60,75 58,105 C 56,135 58,165 56,195 C 54,225 56,255 58,275 C 60,285 58,292 56,295" class="meridian-line lr-meridian" />

      <!-- Hip -->
      <circle cx="84" cy="10" r="5" class="joint-dot" />
      <!-- Leg outline -->
      <path d="M 68,10 C 60,25 56,50 58,75 C 60,100 62,120 60,135 C 58,148 52,165 54,190 C 56,215 58,235 56,250 C 54,262 58,272 62,280 L 66,288 L 74,290 L 80,282 L 92,286 L 100,278 L 110,286 L 118,278 L 124,286 L 126,275 C 130,262 134,250 132,235 C 130,215 128,190 130,165 C 132,148 126,135 124,120 C 122,100 126,75 124,50 C 122,25 116,15 108,10 Z" class="body-outline" />
      <!-- Femur -->
      <line x1="84" y1="12" x2="82" y2="105" class="bone-line" stroke-width="1.2" />
      <!-- Knee joint -->
      <circle cx="82" cy="105" r="5" class="joint-dot" />
      <ellipse cx="82" cy="100" rx="13" ry="8" class="joint-fill" />
      <line x1="56" y1="106" x2="128" y2="106" class="landmark-line" />
      <!-- Tibia -->
      <line x1="82" y1="106" x2="78" y2="248" class="bone-line" />
      <!-- Fibula -->
      <line x1="108" y1="106" x2="112" y2="228" class="bone-line" />
      <!-- Ankle -->
      <line x1="50" y1="250" x2="128" y2="250" class="landmark-line" />
      <!-- Foot bones hint -->
      <line x1="62" y1="252" x2="60" y2="292" class="bone-line" />
      <line x1="74" y1="252" x2="72" y2="294" class="bone-line" />
      <line x1="88" y1="252" x2="90" y2="295" class="bone-line" />
      <line x1="100" y1="252" x2="102" y2="294" class="bone-line" />
      <line x1="112" y1="252" x2="114" y2="292" class="bone-line" />

      <template v-if="dotPosition">
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="13" class="point-glow" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="6" class="point-dot" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="2.5" class="point-core" />
        <rect :x="labelX - labelWidth / 2 - 4" :y="labelY - 9" :width="labelWidth + 8" :height="14" rx="6" class="label-bg" />
        <text :x="labelX" :y="labelY" class="point-label" text-anchor="middle">{{ pointName }}</text>
      </template>

      <!-- Minimap -->
      <g class="minimap" transform="translate(148, 248)">
        <rect x="0" y="0" width="34" height="44" rx="3" class="minimap-bg" />
        <ellipse cx="17" cy="10" rx="8" ry="8" class="minimap-body" />
        <path d="M 12,18 C 12,26 10,34 10,38 L 24,38 C 24,34 22,26 22,18" class="minimap-body" />
        <rect x="0" y="18" width="34" height="26" rx="3" class="minimap-highlight" />
        <text x="17" y="33" class="minimap-label" text-anchor="middle">腿</text>
      </g>
    </svg>

    <!-- ========================================================= -->
    <!-- 头部区域 (Head / Face / Neck) -->
    <!-- ========================================================= -->
    <svg
      v-else-if="region === 'head'"
      viewBox="0 0 220 240"
      class="illustration-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Neck meridian hints -->
      <!-- 胃经 (ST) -->
      <path d="M 72,210 C 72,200 70,190 72,180 C 74,165 72,155 76,148" class="meridian-line st-meridian" />
      <path d="M 148,210 C 148,200 150,190 148,180 C 146,165 148,155 144,148" class="meridian-line st-meridian" />
      <!-- 大肠经 (LI) - to nose -->
      <path d="M 110,22 C 108,35 104,50 106,65 C 108,80 104,95 106,110 C 105,118 104,124 102,128" class="meridian-line li-meridian" />
      <!-- 小肠经 (SI) - to ear -->
      <path d="M 68,210 C 66,200 60,185 58,170 C 56,155 54,140 52,125 C 50,110 48,100 50,92" class="meridian-line si-meridian" />
      <!-- 三焦经 (TE) - around ear -->
      <path d="M 152,210 C 154,200 160,185 162,170 C 164,155 166,140 168,125 C 170,110 172,100 170,92" class="meridian-line te-meridian" />
      <!-- 胆经 (GB) - temple/side -->
      <path d="M 148,210 C 150,198 152,182 150,165 C 148,148 150,135 148,120 C 146,105 144,90 142,75 C 140,60 142,48 140,35" class="meridian-line gb-meridian" />
      <!-- 膀胱经 (BL) - inner eye -->
      <path d="M 98,210 C 98,198 96,182 96,165 C 96,148 94,130 94,115 C 94,100 92,85 92,72 C 90,60 92,50 94,40" class="meridian-line bl-meridian" />
      <!-- 督脉 (GV) - midline -->
      <path d="M 100,210 L 100,140 C 100,128 102,112 100,95 C 98,78 100,60 100,45 C 100,30 100,18 100,12" class="meridian-line gv-meridian" />

      <!-- Neck -->
      <path d="M 78,220 C 78,205 74,190 72,175 C 70,162 72,150 76,140 L 144,140 C 148,150 150,162 148,175 C 146,190 142,205 142,220 Z" class="body-outline" />
      <!-- Head outline -->
      <ellipse cx="110" cy="85" rx="58" ry="72" class="body-outline" />
      <!-- Hairline -->
      <path d="M 54,58 C 60,22 162,22 166,58 C 164,50 148,30 112,28 C 76,30 58,50 54,58 Z" class="hair-line" />
      <!-- Ears -->
      <ellipse cx="52" cy="90" rx="9" ry="16" class="body-fill" />
      <ellipse cx="168" cy="90" rx="9" ry="16" class="body-fill" />
      <!-- Eyebrows -->
      <path d="M 76,66 C 84,62 92,62 98,66" class="feature-line" stroke-width="1.2" />
      <path d="M 122,66 C 128,62 136,62 144,66" class="feature-line" stroke-width="1.2" />
      <!-- Eyes -->
      <ellipse cx="87" cy="76" rx="9" ry="4.5" class="feature-line" />
      <ellipse cx="133" cy="76" rx="9" ry="4.5" class="feature-line" />
      <circle cx="87" cy="76" r="2.8" class="pupil" />
      <circle cx="133" cy="76" r="2.8" class="pupil" />
      <!-- Nasion - bridge landmark -->
      <circle cx="110" cy="78" r="2" class="joint-dot" />
      <!-- Nose -->
      <path d="M 110,78 L 106,108 C 106,112 110,116 110,116 C 110,116 114,112 114,108 Z" class="feature-line" />
      <!-- Mouth -->
      <path d="M 92,134 C 98,142 122,142 128,134" class="feature-line" />
      <!-- Jaw line -->
      <path d="M 68,120 C 78,136 98,148 110,148 C 122,148 142,136 152,120" class="bone-line" stroke-width="0.8" />

      <template v-if="dotPosition">
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="13" class="point-glow" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="6" class="point-dot" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="2.5" class="point-core" />
        <rect :x="labelX - labelWidth / 2 - 4" :y="labelY - 9" :width="labelWidth + 8" :height="14" rx="6" class="label-bg" />
        <text :x="labelX" :y="labelY" class="point-label" text-anchor="middle">{{ pointName }}</text>
      </template>

      <!-- Minimap -->
      <g class="minimap" transform="translate(180, 195)">
        <rect x="0" y="0" width="32" height="38" rx="3" class="minimap-bg" />
        <ellipse cx="16" cy="12" rx="9" ry="10" class="minimap-body" />
        <path d="M 12,22 C 12,28 10,34 10,36 L 22,36 C 22,34 20,28 20,22" class="minimap-body" />
        <rect x="0" y="0" width="32" height="24" rx="3" class="minimap-highlight" />
        <text x="16" y="14" class="minimap-label" text-anchor="middle">头</text>
      </g>
    </svg>

    <!-- ========================================================= -->
    <!-- 腹部区域 (Abdomen / Chest / Torso Front) -->
    <!-- ========================================================= -->
    <svg
      v-else-if="region === 'abdomen'"
      viewBox="0 0 190 300"
      class="illustration-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Ren meridian (CV) - midline -->
      <line x1="95" y1="14" x2="95" y2="268" class="meridian-line cv-meridian" />
      <!-- Kidney meridian (KI) -->
      <path d="M 80,28 C 78,50 75,78 76,110 C 77,145 75,180 76,215 C 77,240 78,255 80,268" class="meridian-line ki-meridian" />
      <path d="M 110,28 C 112,50 115,78 114,110 C 113,145 115,180 114,215 C 113,240 112,255 110,268" class="meridian-line ki-meridian" />
      <!-- Stomach meridian (ST) -->
      <path d="M 72,26 C 70,52 65,80 66,110 C 67,145 65,180 64,215 C 63,240 65,255 66,268" class="meridian-line st-meridian" />
      <path d="M 118,26 C 120,52 125,80 124,110 C 123,145 125,180 126,215 C 127,240 125,255 124,268" class="meridian-line st-meridian" />
      <!-- Spleen meridian (SP) -->
      <path d="M 60,38 C 58,62 55,90 56,120 C 57,150 55,185 54,210 C 53,230 55,248 56,260" class="meridian-line sp-meridian" />
      <!-- Liver meridian (LR) -->
      <path d="M 130,38 C 132,62 135,90 134,120 C 133,150 135,185 136,210 C 137,230 135,248 134,260" class="meridian-line lr-meridian" />

      <!-- Torso outline -->
      <path d="M 58,14 C 52,32 48,55 52,80 C 56,105 60,125 62,145 C 64,168 60,195 62,225 C 64,248 68,262 74,272 L 116,272 C 122,262 126,248 128,225 C 130,195 126,168 128,145 C 130,125 134,105 138,80 C 142,55 138,32 132,14 Z" class="body-outline" />
      <!-- Neck -->
      <path d="M 76,14 L 74,-4 C 74,-8 78,-10 80,-8 L 110,-8 C 112,-10 116,-8 116,-4 L 114,14" class="body-outline" />
      <!-- Clavicles -->
      <path d="M 60,28 C 72,24 80,22 95,20 C 110,22 118,24 130,28" class="bone-line" stroke-width="1.2" />
      <!-- Sternum -->
      <line x1="95" y1="14" x2="95" y2="78" class="bone-line" stroke-width="0.8" />
      <!-- Ribcage hints -->
      <path d="M 64,50 C 72,54 88,56 95,56 C 102,56 118,54 126,50" class="bone-line" stroke-width="0.7" />
      <path d="M 62,62 C 70,66 88,68 95,68 C 102,68 120,66 128,62" class="bone-line" stroke-width="0.7" />
      <path d="M 62,74 C 70,78 88,80 95,80 C 102,80 120,78 128,74" class="bone-line" stroke-width="0.7" />
      <!-- Chest/nipple line -->
      <line x1="62" y1="64" x2="128" y2="64" class="landmark-line" stroke-width="0.5" />
      <!-- Xiphoid -->
      <circle cx="95" cy="90" r="2" class="joint-dot" />
      <!-- Waist -->
      <path d="M 52,198 C 60,194 80,190 95,190 C 110,190 130,194 138,198" class="landmark-line" />
      <!-- Navel -->
      <circle cx="95" cy="162" r="5" class="joint-dot" />
      <circle cx="95" cy="162" r="2.5" fill="#8B7355" />
      <!-- Midline -->
      <line x1="95" y1="16" x2="95" y2="268" class="landmark-line" stroke-dasharray="6 4" />
      <!-- Hip / pubic landmarks -->
      <path d="M 60,230 C 68,226 84,222 95,222 C 106,222 122,226 130,230" class="landmark-line" />
      <!-- Iliac crest hints -->
      <path d="M 54,210 C 60,206 78,200 95,200 C 112,200 130,206 136,210" class="bone-line" />

      <template v-if="dotPosition">
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="13" class="point-glow" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="6" class="point-dot" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="2.5" class="point-core" />
        <rect :x="labelX - labelWidth / 2 - 4" :y="labelY - 9" :width="labelWidth + 8" :height="14" rx="6" class="label-bg" />
        <text :x="labelX" :y="labelY" class="point-label" text-anchor="middle">{{ pointName }}</text>
      </template>

      <!-- Minimap -->
      <g class="minimap" transform="translate(150, 248)">
        <rect x="0" y="0" width="32" height="44" rx="3" class="minimap-bg" />
        <ellipse cx="16" cy="10" rx="8" ry="8" class="minimap-body" />
        <path d="M 12,18 C 12,26 10,34 10,38 L 22,38 C 22,34 20,26 20,18" class="minimap-body" />
        <rect x="0" y="10" width="32" height="34" rx="3" class="minimap-highlight" />
        <text x="16" y="30" class="minimap-label" text-anchor="middle">腹</text>
      </g>
    </svg>

    <!-- ========================================================= -->
    <!-- 背部区域 (Back / Spine) -->
    <!-- ========================================================= -->
    <svg
      v-else-if="region === 'back'"
      viewBox="0 0 190 320"
      class="illustration-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Du meridian (GV) - midline -->
      <line x1="95" y1="-8" x2="95" y2="298" class="meridian-line gv-meridian" />
      <!-- Bladder meridian (BL) - lines 1.5 cun lateral -->
      <path d="M 66,10 C 64,35 62,60 64,85 C 66,110 68,135 66,160 C 64,185 62,210 64,235 C 66,260 64,280 66,298" class="meridian-line bl-meridian" />
      <path d="M 124,10 C 126,35 128,60 126,85 C 124,110 122,135 124,160 C 126,185 128,210 126,235 C 124,260 126,280 124,298" class="meridian-line bl-meridian" />

      <!-- Neck -->
      <path d="M 74,12 L 72,-6 C 72,-10 76,-12 78,-10 L 112,-10 C 114,-12 118,-10 118,-6 L 116,12" class="body-outline" />
      <!-- Back outline -->
      <path d="M 64,12 C 58,28 54,50 56,75 C 58,100 60,125 58,150 C 56,175 52,200 54,225 C 56,250 60,270 64,288 C 68,300 74,306 82,312 L 108,312 C 116,306 122,300 126,288 C 130,270 134,250 136,225 C 138,200 134,175 132,150 C 130,125 132,100 134,75 C 136,50 132,28 126,12 Z" class="body-outline" />
      <!-- Spine line -->
      <line x1="95" y1="-10" x2="95" y2="310" class="bone-line" stroke-width="1.2" />
      <!-- Vertebrae markers (C7-T12-L5) -->
      <line v-for="(vy, i) in vertebras" :key="vy" :x1="i === 0 ? 82 : 80" :y1="vy" :x2="i === 0 ? 108 : 110" :y2="vy" class="landmark-line" />
      <!-- Vertebra labels hint for C7/T1/T3/T5/T7/T9/T11/L2/L4 -->
      <text v-for="v in vertebraLabels" :key="v.y" :x="72" :y="v.y + 3" class="vertebra-label-text">{{ v.label }}</text>
      <!-- Scapulae -->
      <path d="M 66,30 C 58,48 54,68 56,88 C 58,102 64,108 70,104 C 74,100 76,85 74,60 C 72,45 70,36 66,30 Z" class="scapula" />
      <path d="M 124,30 C 132,48 136,68 134,88 C 132,102 126,108 120,104 C 116,100 114,85 116,60 C 118,45 120,36 124,30 Z" class="scapula" />
      <!-- Posterior ribs -->
      <path d="M 68,56 C 72,58 80,60 84,59" class="bone-line" stroke-width="0.5" />
      <path d="M 66,68 C 70,70 80,72 84,71" class="bone-line" stroke-width="0.5" />
      <path d="M 122,56 C 118,58 110,60 106,59" class="bone-line" stroke-width="0.5" />
      <path d="M 124,68 C 120,70 110,72 106,71" class="bone-line" stroke-width="0.5" />
      <!-- Waist -->
      <path d="M 50,208 C 58,202 80,198 95,198 C 110,198 132,202 140,208" class="landmark-line" />
      <!-- Sacrum hint -->
      <path d="M 82,268 C 86,264 90,262 95,262 C 100,262 104,264 108,268 C 104,280 100,295 95,305 C 90,295 86,280 82,268 Z" class="bone-line" stroke-width="0.6" />

      <template v-if="dotPosition">
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="13" class="point-glow" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="6" class="point-dot" />
        <circle :cx="dotPosition.x" :cy="dotPosition.y" r="2.5" class="point-core" />
        <rect :x="labelX - labelWidth / 2 - 4" :y="labelY - 9" :width="labelWidth + 8" :height="14" rx="6" class="label-bg" />
        <text :x="labelX" :y="labelY" class="point-label" text-anchor="middle">{{ pointName }}</text>
      </template>

      <!-- Minimap -->
      <g class="minimap" transform="translate(148, 265)">
        <rect x="0" y="0" width="34" height="46" rx="3" class="minimap-bg" />
        <ellipse cx="17" cy="10" rx="8" ry="8" class="minimap-body" />
        <path d="M 12,18 C 12,28 10,36 10,40 L 24,40 C 24,36 22,28 22,18" class="minimap-body" />
        <rect x="0" y="20" width="34" height="26" rx="3" class="minimap-highlight" />
        <text x="17" y="36" class="minimap-label" text-anchor="middle">背</text>
      </g>
    </svg>

    <!-- Fallback for unknown regions -->
    <div v-else class="illustration-fallback">
      <span class="fallback-text">{{ region }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: string
  name: string
  region: string
}>()

const pointName = computed(() => props.name)

// Vertebra y-positions in back SVG (C7, T1-T12, L1-L5)
const vertebras = [22, 35, 50, 65, 80, 95, 110, 125, 140, 155, 170, 188, 206, 224, 242, 260, 278, 295]

// Corresponding vertebra labels for key landmarks
const vertebraLabels = [
  { y: 22, label: 'C7' },
  { y: 50, label: 'T3' },
  { y: 80, label: 'T5' },
  { y: 110, label: 'T7' },
  { y: 140, label: 'T9' },
  { y: 170, label: 'T11' },
  { y: 206, label: 'L2' },
  { y: 242, label: 'L4' },
]

// Estimated label width based on Chinese character count
const labelWidth = computed(() => pointName.value.length * 10)

// ============================================================
// Per-region coordinate maps for acupoint dot placement
// ============================================================
const handPositions: Record<string, { x: number; y: number }> = {
  // 手太阴肺经
  LU5:  { x: 82, y: 110 },  // 尺泽 - elbow crease, radial
  LU6:  { x: 76, y: 160 },  // 孔最 - forearm, radial
  LU7:  { x: 72, y: 212 },  // 列缺 - wrist, radial
  LU9:  { x: 74, y: 222 },  // 太渊 - wrist crease, radial
  LU10: { x: 78, y: 242 },  // 鱼际 - thenar area
  LU11: { x: 64, y: 272 },  // 少商 - thumb tip
  // 手阳明大肠经
  LI1:  { x: 96, y: 274 },  // 商阳 - index finger
  LI4:  { x: 112, y: 238 }, // 合谷 - back of hand
  LI5:  { x: 128, y: 214 }, // 阳溪 - wrist back, radial
  LI10: { x: 136, y: 148 }, // 手三里 - forearm radial
  LI11: { x: 140, y: 110 }, // 曲池 - elbow lateral
  LI15: { x: 126, y: 24 },  // 肩髃 - shoulder
  // 手少阴心经
  HT3:  { x: 126, y: 110 }, // 少海 - elbow ulnar
  HT5:  { x: 124, y: 160 }, // 通里 - forearm ulnar
  HT7:  { x: 128, y: 222 }, // 神门 - wrist ulnar
  // 手太阳小肠经
  SI1:  { x: 142, y: 272 }, // 少泽 - little finger
  SI3:  { x: 134, y: 238 }, // 后溪 - hand ulnar side
  // 手厥阴心包经
  PC3:  { x: 108, y: 110 }, // 曲泽 - elbow center
  PC6:  { x: 102, y: 160 }, // 内关 - forearm center
  PC7:  { x: 104, y: 222 }, // 大陵 - wrist center
  PC8:  { x: 104, y: 250 }, // 劳宫 - palm
  // 手少阳三焦经
  TE5:  { x: 118, y: 148 }, // 外关 - forearm back
  TE6:  { x: 120, y: 170 }, // 支沟 - forearm back
  // 经外奇穴
  'EX-UE11': { x: 110, y: 272 },
}

const legPositions: Record<string, { x: number; y: number }> = {
  // 足阳明胃经
  ST34: { x: 80, y: 80 },   // 梁丘 - thigh above knee
  ST36: { x: 104, y: 142 }, // 足三里 - upper calf lateral
  ST37: { x: 104, y: 168 }, // 上巨虚 - mid-calf lateral
  ST40: { x: 108, y: 190 }, // 丰隆 - calf lateral
  ST44: { x: 96, y: 282 },  // 内庭 - foot 2nd/3rd toes
  // 足太阴脾经
  SP1:  { x: 64, y: 288 },  // 隐白 - big toe
  SP3:  { x: 68, y: 274 },  // 太白 - foot medial
  SP4:  { x: 68, y: 268 },  // 公孙 - foot medial
  SP6:  { x: 60, y: 190 },  // 三阴交 - calf medial
  SP9:  { x: 58, y: 112 },  // 阴陵泉 - knee medial
  SP10: { x: 60, y: 66 },   // 血海 - thigh medial
  // 足太阳膀胱经
  BL40: { x: 86, y: 112 },  // 委中 - knee back center
  BL57: { x: 86, y: 180 },  // 承山 - calf back
  BL60: { x: 120, y: 250 }, // 昆仑 - ankle lateral back
  BL67: { x: 118, y: 292 }, // 至阴 - little toe
  // 足少阴肾经
  KI1:  { x: 88, y: 280 },  // 涌泉 - sole
  KI3:  { x: 58, y: 250 },  // 太溪 - ankle medial back
  KI6:  { x: 52, y: 258 },  // 照海 - ankle medial below
  KI7:  { x: 58, y: 206 },  // 复溜 - calf medial
  // 足少阳胆经
  GB30: { x: 86, y: 12 },   // 环跳 - hip
  GB34: { x: 116, y: 128 }, // 阳陵泉 - knee lateral below
  GB39: { x: 122, y: 210 }, // 悬钟 - calf lateral
  GB40: { x: 126, y: 256 }, // 丘墟 - ankle lateral front
  GB41: { x: 120, y: 272 }, // 足临泣 - foot lateral
  // 足厥阴肝经
  LR1:  { x: 70, y: 294 },  // 大敦 - big toe lateral
  LR2:  { x: 78, y: 282 },  // 行间 - foot 1st/2nd toes
  LR3:  { x: 86, y: 274 },  // 太冲 - foot MC1/2
}

const headPositions: Record<string, { x: number; y: number }> = {
  // 足阳明胃经
  ST1:  { x: 96, y: 92 },   // 承泣 - below eye
  ST4:  { x: 92, y: 142 },  // 地仓 - mouth corner
  ST6:  { x: 78, y: 142 },  // 颊车 - jaw
  ST7:  { x: 70, y: 104 },  // 下关 - zygomatic
  ST8:  { x: 60, y: 56 },   // 头维 - forehead corner
  // 手阳明大肠经
  LI20: { x: 102, y: 112 }, // 迎香 - beside nose
  // 手太阳小肠经
  SI19: { x: 66, y: 98 },   // 听宫 - in front of ear
  // 足太阳膀胱经
  BL1:  { x: 92, y: 84 },   // 睛明 - inner canthus
  BL2:  { x: 90, y: 76 },   // 攒竹 - eyebrow medial
  // 足少阳胆经
  GB2:  { x: 60, y: 106 },  // 听会 - in front of ear
  GB14: { x: 74, y: 58 },   // 阳白 - above eyebrow
  GB20: { x: 68, y: 180 },  // 风池 - skull base
  // 手少阳三焦经
  TE17: { x: 58, y: 122 },  // 翳风 - behind ear
  // 任脉
  CV24: { x: 110, y: 164 }, // 承浆 - chin
  // 督脉
  GV20: { x: 110, y: 18 },  // 百会 - crown
  GV26: { x: 110, y: 130 }, // 水沟 - philtrum
  // 经外奇穴
  'EX-HN1': { x: 110, y: 28 },
  'EX-HN5': { x: 56, y: 76 },
}

const abdomenPositions: Record<string, { x: number; y: number }> = {
  // 手太阴肺经
  LU1:  { x: 62, y: 30 },   // 中府 - upper chest lateral
  // 足阳明胃经
  ST21: { x: 114, y: 128 }, // 梁门 - upper abdomen lateral
  ST25: { x: 114, y: 164 }, // 天枢 - navel level lateral
  ST29: { x: 114, y: 218 }, // 归来 - lower abdomen lateral
  // 任脉
  CV3:  { x: 95, y: 222 },  // 中极 - lower abdomen
  CV4:  { x: 95, y: 206 },  // 关元 - lower abdomen
  CV6:  { x: 95, y: 186 },  // 气海 - below navel
  CV8:  { x: 95, y: 162 },  // 神阙 - navel
  CV12: { x: 95, y: 128 },  // 中脘 - upper abdomen
  CV17: { x: 95, y: 58 },   // 膻中 - chest center
  // 足厥阴肝经
  LR14: { x: 62, y: 102 },  // 期门 - rib area
}

const backPositions: Record<string, { x: number; y: number }> = {
  // 足太阳膀胱经 (1.5 cun lateral)
  BL13: { x: 66, y: 50 },   // 肺俞 - T3
  BL15: { x: 66, y: 80 },   // 心俞 - T5
  BL17: { x: 66, y: 110 },  // 膈俞 - T7
  BL18: { x: 66, y: 140 },  // 肝俞 - T9
  BL20: { x: 66, y: 170 },  // 脾俞 - T11
  BL23: { x: 66, y: 206 },  // 肾俞 - L2
  BL25: { x: 66, y: 242 },  // 大肠俞 - L4
  // 手太阳小肠经
  SI11: { x: 64, y: 72 },   // 天宗 - scapula
  // 足少阳胆经
  GB21: { x: 64, y: 30 },   // 肩井 - shoulder
  // 督脉
  GV3:  { x: 95, y: 242 },  // 腰阳关 - L4 center
  GV4:  { x: 95, y: 206 },  // 命门 - L2 center
  GV9:  { x: 95, y: 110 },  // 至阳 - T7 center
  GV14: { x: 95, y: 22 },   // 大椎 - C7 center
  // 经外奇穴
  'EX-B1': { x: 70, y: 22 },   // 定喘
  'EX-B2': { x: 74, y: 140 },  // 夹脊 rep
}

const regionMaps: Record<string, Record<string, { x: number; y: number }>> = {
  hand: handPositions,
  leg: legPositions,
  head: headPositions,
  abdomen: abdomenPositions,
  back: backPositions,
}

const dotPosition = computed(() => {
  const map = regionMaps[props.region]
  if (!map) return null
  return map[props.code] ?? null
})

const labelX = computed(() => {
  if (!dotPosition.value) return 0
  const { x } = dotPosition.value
  return Math.max(30, Math.min(185, x + 22))
})

const labelY = computed(() => {
  if (!dotPosition.value) return 0
  const { y } = dotPosition.value
  return y - 12
})
</script>

<style scoped>
.acupoint-illustration {
  width: 100%;
  max-width: 220px;
  margin: 0 auto 12px;
  position: relative;
}

.illustration-svg {
  width: 100%;
  height: auto;
  display: block;
}

/* ===== Body outline ===== */
.body-outline {
  fill: #F5EDDA;
  stroke: #8B7355;
  stroke-width: 1.5;
  stroke-linejoin: round;
}

.body-fill {
  fill: #F5EDDA;
  stroke: #8B7355;
  stroke-width: 1.2;
}

/* ===== Hair ===== */
.hair-line {
  fill: #D4C5B9;
  stroke: #8B7355;
  stroke-width: 1.2;
}

/* ===== Joints ===== */
.joint-dot {
  fill: #D4C5B9;
  stroke: #8B7355;
  stroke-width: 0.8;
}

.joint-fill {
  fill: #EDE0D0;
  stroke: #C4B5A5;
  stroke-width: 0.8;
}

/* ===== Landmark / crease lines ===== */
.landmark-line {
  stroke: #C4B5A5;
  stroke-width: 0.8;
  stroke-dasharray: 3 2;
}

/* ===== Bone lines ===== */
.bone-line {
  stroke: #D4C5B9;
  stroke-width: 0.6;
}

/* ===== Face features ===== */
.feature-line {
  fill: none;
  stroke: #8B7355;
  stroke-width: 1;
  stroke-linecap: round;
}

.pupil {
  fill: #8B7355;
}

/* ===== Scapula ===== */
.scapula {
  fill: #EDE0D0;
  stroke: #C4B5A5;
  stroke-width: 0.6;
  stroke-dasharray: 2 2;
}

/* ===== Vertebra labels ===== */
.vertebra-label-text {
  font-family: var(--tcm-font-family, sans-serif);
  font-size: 6px;
  fill: #C4B5A5;
}

/* ===== Meridian path lines ===== */
.meridian-line {
  fill: none;
  stroke-width: 0.8;
  stroke-dasharray: 3 3;
  opacity: 0.5;
}

.lu-meridian { stroke: #B0BEC5; }   /* 肺经 - white/gray */
.li-meridian { stroke: #90A4AE; }   /* 大肠经 - lighter gray */
.st-meridian { stroke: #FFCC80; }    /* 胃经 - orange/yellow */
.sp-meridian { stroke: #FFCC80; }    /* 脾经 - same */
.ht-meridian { stroke: #EF9A9A; }    /* 心经 - red */
.si-meridian { stroke: #EF9A9A; }    /* 小肠经 - same */
.bl-meridian { stroke: #9FA8DA; }    /* 膀胱经 - blue */
.ki-meridian { stroke: #9FA8DA; }    /* 肾经 - same */
.pc-meridian { stroke: #CE93D8; }    /* 心包经 - purple */
.te-meridian { stroke: #CE93D8; }    /* 三焦经 - same */
.gb-meridian { stroke: #A5D6A7; }    /* 胆经 - green */
.lr-meridian { stroke: #A5D6A7; }    /* 肝经 - same */
.cv-meridian { stroke: #D7CCC8; }    /* 任脉 - brown */
.gv-meridian { stroke: #D7CCC8; }    /* 督脉 - brown */

/* ===== Acupoint marker ===== */
.point-glow {
  fill: none;
  stroke: var(--tcm-gold-500, #EAB308);
  stroke-width: 1.5;
  opacity: 0.3;
  animation: pulse-ring 2s ease-in-out infinite;
}

.point-dot {
  fill: var(--tcm-gold-500, #EAB308);
  stroke: #FFF;
  stroke-width: 2;
}

.point-core {
  fill: #FFF;
}

/* ===== Label styles ===== */
.label-bg {
  fill: rgba(255, 255, 255, 0.92);
  stroke: var(--tcm-gold-300, #FCD34D);
  stroke-width: 0.8;
}

.point-label {
  font-family: var(--tcm-font-family, sans-serif);
  font-size: 10px;
  fill: var(--tcm-text-primary, #333);
  font-weight: 700;
  pointer-events: none;
  user-select: none;
}

@keyframes pulse-ring {
  0%, 100% {
    r: 13;
    opacity: 0.3;
  }
  50% {
    r: 18;
    opacity: 0.08;
  }
}

/* ===== Minimap ===== */
.minimap {
  opacity: 0.85;
}

.minimap-bg {
  fill: rgba(255, 255, 255, 0.88);
  stroke: #C4B5A5;
  stroke-width: 0.8;
}

.minimap-body {
  fill: #F5EDDA;
  stroke: #8B7355;
  stroke-width: 0.7;
}

.minimap-highlight {
  fill: none;
  stroke: var(--tcm-gold-500, #EAB308);
  stroke-width: 1.2;
  stroke-dasharray: 2 1;
  opacity: 0.8;
}

.minimap-label {
  font-family: var(--tcm-font-family, sans-serif);
  font-size: 7px;
  fill: var(--tcm-gold-600, #CA8A04);
  font-weight: 700;
}

/* ===== Fallback ===== */
.illustration-fallback {
  width: 100%;
  aspect-ratio: 1;
  background: var(--tcm-bg-base);
  border-radius: var(--tcm-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fallback-text {
  font-family: var(--tcm-font-decorative);
  font-size: 14px;
  color: var(--tcm-text-disabled);
}
</style>
