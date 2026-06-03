#!/bin/bash
# 下载穴位定位图 - 来源：Wikimedia Commons 针灸穴位图
DEST="public/images/acupoints"

# 手足阳明经穴位 (大肠经/胃经)
curl -L -o "${DEST}/LI4.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/He_Gu_LI4.jpg/640px-He_Gu_LI4.jpg"
curl -L -o "${DEST}/LI11.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Qu_Chi_LI11.jpg/640px-Qu_Chi_LI11.jpg"
curl -L -o "${DEST}/ST36.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Zu_San_Li_ST36.jpg/640px-Zu_San_Li_ST36.jpg"

# 足太阴脾经
curl -L -o "${DEST}/SP6.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/San_Yin_Jiao_SP6.jpg/640px-San_Yin_Jiao_SP6.jpg"

# 足厥阴肝经
curl -L -o "${DEST}/LR3.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tai_Chong_LR3.jpg/640px-Tai_Chong_LR3.jpg"

# 手太阴肺经
curl -L -o "${DEST}/LU7.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Lie_Que_LU7.jpg/640px-Lie_Que_LU7.jpg"

# 手厥阴心包经
curl -L -o "${DEST}/PC6.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Nei_Guan_PC6.jpg/640px-Nei_Guan_PC6.jpg"

# 手少阴心经
curl -L -o "${DEST}/HT7.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Shen_Men_HT7.jpg/640px-Shen_Men_HT7.jpg"

# 足太阳膀胱经
curl -L -o "${DEST}/BL40.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Wei_Zhong_BL40.jpg/640px-Wei_Zhong_BL40.jpg"
curl -L -o "${DEST}/BL23.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Shen_Shu_BL23.jpg/640px-Shen_Shu_BL23.jpg"

# 任脉
curl -L -o "${DEST}/CV4.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Guan_Yuan_CV4.jpg/640px-Guan_Yuan_CV4.jpg"
curl -L -o "${DEST}/CV12.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Zhong_Wan_CV12.jpg/640px-Zhong_Wan_CV12.jpg"

# 督脉
curl -L -o "${DEST}/GV20.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bai_Hui_GV20.jpg/640px-Bai_Hui_GV20.jpg"
curl -L -o "${DEST}/GV14.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Da_Zhui_GV14.jpg/640px-Da_Zhui_GV14.jpg"

echo "All acupoint images downloaded!"
