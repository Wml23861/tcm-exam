#!/bin/bash
# 批量下载中药材图片 - 来源：Wikimedia Commons + Wikipedia
# 需要 VPN/外网访问

DEST="public/images/herbs"

# 解表药
curl -L -o "${DEST}/麻黄.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Ephedra_distachya_Sturm61.jpg/640px-Ephedra_distachya_Sturm61.jpg"
curl -L -o "${DEST}/桂枝.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Cinnamomum_cassia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg/640px-Cinnamomum_cassia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg"
curl -L -o "${DEST}/柴胡.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bupleurum_falcatum_Sturm7.jpg/640px-Bupleurum_falcatum_Sturm7.jpg"
curl -L -o "${DEST}/薄荷.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Mentha_spicata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-096.jpg/640px-Mentha_spicata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-096.jpg"
curl -L -o "${DEST}/菊花.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Chrysanthemum_indicum0.jpg/640px-Chrysanthemum_indicum0.jpg"
curl -L -o "${DEST}/桑叶.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Morus_alba_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-093.jpg/640px-Morus_alba_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-093.jpg"

echo "解表药 done"

# 清热药
curl -L -o "${DEST}/黄芩.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Scutellaria_baicalensis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-177.jpg/640px-Scutellaria_baicalensis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-177.jpg"
curl -L -o "${DEST}/黄连.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Coptis_chinensis_Blanco1.11.png/640px-Coptis_chinensis_Blanco1.11.png"
curl -L -o "${DEST}/黄柏.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Phellodendron_amurense_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-104.jpg/640px-Phellodendron_amurense_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-104.jpg"
curl -L -o "${DEST}/金银花.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Lonicera_japonica_Blanco1.136.png/640px-Lonicera_japonica_Blanco1.136.png"
curl -L -o "${DEST}/连翘.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Forsythia_suspensa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-086.jpg/640px-Forsythia_suspensa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-086.jpg"
curl -L -o "${DEST}/生地黄.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rehmannia_glutinosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-166.jpg/640px-Rehmannia_glutinosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-166.jpg"
curl -L -o "${DEST}/牡丹皮.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Paeonia_suffruticosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-147.jpg/640px-Paeonia_suffruticosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-147.jpg"

echo "清热药 done"

# 补虚药
curl -L -o "${DEST}/人参.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Panax_ginseng_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-128.jpg/640px-Panax_ginseng_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-128.jpg"
curl -L -o "${DEST}/黄芪.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Astragalus_membranaceus_Blanco1.29.png/640px-Astragalus_membranaceus_Blanco1.29.png"
curl -L -o "${DEST}/甘草.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Glycyrrhiza_glabra_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-207.jpg/640px-Glycyrrhiza_glabra_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-207.jpg"
curl -L -o "${DEST}/当归.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Angelica_sinensis_Blanco1.13.png/640px-Angelica_sinensis_Blanco1.13.png"
curl -L -o "${DEST}/白术.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Atractylodes_macrocephala_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-048.jpg/640px-Atractylodes_macrocephala_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-048.jpg"
curl -L -o "${DEST}/白芍.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Paeonia_lactiflora_Blanco1.72-cropped.jpg/640px-Paeonia_lactiflora_Blanco1.72-cropped.jpg"
curl -L -o "${DEST}/熟地黄.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rehmannia_glutinosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-166.jpg/640px-Rehmannia_glutinosa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-166.jpg"

echo "补虚药 done"

# 泻下药
curl -L -o "${DEST}/大黄.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Rheum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-155.jpg/640px-Rheum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-155.jpg"

# 温里药
curl -L -o "${DEST}/附子.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Aconitum_carmichaelii_BotMag_t93.jpg/640px-Aconitum_carmichaelii_BotMag_t93.jpg"
curl -L -o "${DEST}/肉桂.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Cinnamomum_cassia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg/640px-Cinnamomum_cassia_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg"
curl -L -o "${DEST}/干姜.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Zingiber_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-146.jpg/640px-Zingiber_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-146.jpg"

# 利水渗湿药
curl -L -o "${DEST}/茯苓.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Wolfiporia_extensa.jpg/640px-Wolfiporia_extensa.jpg"
curl -L -o "${DEST}/泽泻.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Alisma_plantago-aquatica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-004.jpg/640px-Alisma_plantago-aquatica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-004.jpg"

# 活血化瘀药
curl -L -o "${DEST}/川芎.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ligusticum_chuanxiong_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-127.jpg/640px-Ligusticum_chuanxiong_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-127.jpg"
curl -L -o "${DEST}/丹参.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Salvia_miltiorrhiza_Blanco1.80.png/640px-Salvia_miltiorrhiza_Blanco1.80.png"

# 化痰止咳平喘药
curl -L -o "${DEST}/半夏.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Pinellia_ternata_Blanco1.75.png/640px-Pinellia_ternata_Blanco1.75.png"
curl -L -o "${DEST}/川贝母.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Fritillaria_cirrhosa_BotMag_t89.jpg/640px-Fritillaria_cirrhosa_BotMag_t89.jpg"

echo "All herb images downloaded!"
