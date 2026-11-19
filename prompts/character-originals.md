# 角色重画提示词

原始英文提示正文按制作档收录。输入图用原工程文件名标记，可与[服饰对照](../images/costume-comparison.png)和[角色实帧](../images/film-frames.jpg)一同查看。

使用内置 ImageGen，以姿势稿和用户指定的本地影片静帧为图像参考。原始图在 sources/，分墨后装入 assets/character/ 的八个同名 PNG。砖橙是中间墨版的分色标记，成片使用各场景的 me 色。

## 女主五张定稿的共用提示词

Production character redrawing for an animated print music video, a SINGLE isolated character asset, portrait 2:3 except the eye landscape. First image is the blocking and crop guide. Preserve character anatomy, broad silhouette, placement and orientation in that guide for compositing. Other references inform precision of the illustration, specifically the rhythm of large hair masses cut by slender tapered inner wedges, the silhouette of chin and ear, the ribbed horns, believable fingers, and reserved gentle performance. Make a new original drawing, zoom and composition from the first guide. Clean sophisticated limited-color Japanese screenprint, sharp untextured shape edges. Use only flat ink near-black #1d1b19, brick midtone #d97757, ivory #faf9f5 as mask channels; plain flat bright cyan #29abe2 removable background in ALL external/negative spaces. Keep roughly 30% near-black in the dark fabric, underside of hair, right shadow; good ivory-negative spacing. Large legible shapes with designed secondary cuts and fine accents selectively, no gradient, no noise, no code, subtitles, border, set, surface shading, labels or cast shadow. Dress and hair should be in separate masses.

## f_bust

输入图（顺序）　pose_f_bust.png, bust_light_proof.png, study_73.3.jpg

FIRST IMAGE IS THE GESTURE BLOCKING, not a reference for anonymous facelessness. The SECOND image is our final finished facial and costume model. Put her existing RIGHT HAND back in a natural delicate collar-touching pose shown in first and third references: on VIEWER LEFT, the forearm rises from the bottom left, lightly bent wrist, thumb and index elegantly hold the edge of the high cross collar just left of her throat, remaining three fingers lightly curved. Small but definitely visible, ivory hand in front of the midtone chest and dark collar, triangular brick wrist cuff as in first guide. Her viewer-left shoulder slopes naturally down toward the elbow. The full arm and fingers must be legible, use selective flat interior shadow cuts for palm structure, no spidery fingers. It is imperative the hand is in this finished portrait. Face and head and larger hair shapes match second image very closely; big uninterrupted ivory area on cheeks, gentle relaxed eyes. Preserve the dress with collar cross and chest frogs, anchor of right temple knot, head size, two horns and torso crop. Draw the figure as an elegant adult anime character with a reserved expression and correctly proportioned hand touching collar. No text, no UI.

## f_profile

输入图（顺序）　pose_f_profile.png, f_bust 第一稿, study_184.jpg

Three-quarter profile looking to the LEFT of the frame, head inclined slightly down; viewer sees the relaxed eyelid at true profile. Quiet presence and a real anatomical negative silhouette from forehead to nose tip to subtle lip and chin. Facial planes mostly ivory. Two curved ribbed horns in perspective, long flowing hair of varied lock widths, Chinese cross-neck dress, interlaced knot at visible temple with one hanging tassel. Maintain the pose and anchoring of image 1, same girl and dress as image 2. The silhouette and facial anatomy should look deliberately drawn; no hands in this portrait.

## f_reach

输入图（顺序）　pose_f_reach.png, f_bust 第一稿, study_118.6.jpg, study_73.3.jpg

Full nearly waist-high portrait, gently looking down to outstretched hand, ivory skin, only a delicate small lid shape and tiny mouth; same girl from NEW MASTER second photo. Anatomically clear OPEN right palm at lower left x18%, y83%, bare ivory whole palm and all fingers isolated by a narrow dark or brick cuff separating wrist from ivory forearm. One distinct thumb with proper opposition plus four gracefully bent fingers graduated naturally, tangible palm heel, accurate knuckles. Viewer sees a lightly cupped palm from three quarters, with fingertips pointed lower left at x0-15%. Keep generous cyan between fingers/hair and between hand and waist. Other hand gently touches collar strap, half-furled with finger joints natural. Preserve old anchors, including lowest left fingertip near x1%, y86%, knot on viewer right and both curved horns complete. Draw the fingertips as carefully as the face. Costume and hair of second image, pose/crop of first. Use nice rich rhythm of swept locks, correct anatomy.

## cat_paws

输入图（顺序）　pose_cat_paws.png, f_bust 第一稿, study_73.3.jpg

Frontal portrait of the same HORNED girl from NEW MASTER second image. Both delicately drawn HUMAN hands raised in front of the chest. Clean complete separation of all five fingers on each; slight asymmetry in wrists and flexion; gentle rounded finger pads, believable joints, dark skin fold or brick plane under one finger; do not overlap face. Keep both hands at the same level as the pose guide at chest height, enough contrast against bodice. Correct hand scale, gentle half-closed eyelids under long fringe, two backcurved horns, long hair, knot at viewer right temple, dress and collar from master. No animal paws or cat ears; technical asset name only. Keep the two palms ivory, facial skin ivory with a small brick underplane. Crop through lower bust as shown.

## f_eye

输入图（顺序）　pose_f_eye.png, f_bust 第一稿, study_169.1.jpg

Horizontal 3:2 extreme closeup for the near-end of the solitude shot. Treat it as a refined original cut-paper crop of the SAME girl's face as second master image. Use the first guide for framing and alignment ONLY: extreme crop through the face at top and bottom, one eye only, its iris centre at x42% y69%, eye corners about x28 to 60%, layered ivory-tipped bangs from forehead to cheek. At far RIGHT may show part of the rosette, black undersides, one cream lock in front. Tender calm attentive eye in profile-facing-left, a softly arched slightly lowered upper eyelid, relaxed outer corner, very short tapered lashes, no frown, no sharp wings, no angry upward tilt. A SINGLE solid midtone iris with small nearblack pupil softened under top lid. Forehead stays relaxed; underbrow minimal. Ivory skin, thirds of hair / flat color; make long curves immaculate, particularly the upper lash, at 4k zoom. Do not show nose/mouth or the second eye. No sparkle, registration, UI, code or captions. Eye alone on an otherwise tightly cropped face.


## 变体三张末轮提示词

[cat_bust]
Reference 1 (before replacement): out/mine/character_redraw/sources/cat_bust.png
Reference 2: out/mine/character_redraw/sources/f_bust.png
transparent_background: false
Prompt:
Perform the smallest possible edit to image 1, the specific portrait of both cat ears, NO horns. The cat ear inner fur color stays terracotta. Preserve the hand at the collar. Its framing, shape and all painted detail is locked. Image 2 is only a swatch for SKIN COLOR on the illuminated face. Edit image 1's FACE from a fully terracotta face to a porcelain OFF-WHITE skin base #faf9f5 to match image 2. Recolor main facial skin from the forehead underneath the bangs through brow, cheeks, temples, bridge of nose, entire chin and partially visible side ears in OFF-WHITE. Small orange iris and a tiny warm shadow detail, dark lashes, delicate mouth/eyebrows and a solid orange shadow immediately BELOW the jaw remain. Do not change character anatomy, expression, eye shape, hair, ornaments, clothing, scale, position or crop. Duplicate exact layout, same portrait 2:3 at 1024x1536, same clean three ink print illustration, same uniform cyan background. Image 2 must NOT introduce any of its pose, clothing, hair, horns, accessories or hand. All existing body, composition and rendering outside the face of image 1 should read exactly as image 1. Preserve a solid off-white face even in the wide expanse of both cheeks; compare with image 2.

[boy_bust]
Reference 1 (before replacement): out/mine/character_redraw/sources/boy_bust.png
Reference 2: out/mine/character_redraw/sources/f_bust.png
transparent_background: false
Prompt:
Perform the smallest possible edit to image 1, the specific portrait of two small short straight horns, short hair, thicker neck, no rosette, no hand. Its framing, shape and all painted detail is locked. Image 2 is only a swatch for SKIN COLOR on the illuminated face. Edit image 1's FACE from a fully terracotta face to a porcelain OFF-WHITE skin base #faf9f5 to match image 2. Recolor main facial skin from the forehead underneath the bangs through brow, cheeks, temples, bridge of nose, entire chin and partially visible side ears in OFF-WHITE. Small orange iris and a tiny warm shadow detail, dark lashes, delicate mouth/eyebrows and a solid orange shadow immediately BELOW the jaw remain. Do not change character anatomy, expression, eye shape, hair, ornaments, clothing, scale, position or crop. Duplicate exact layout, same portrait 2:3 at 1024x1536, same clean three ink print illustration, same uniform cyan background. Image 2 must NOT introduce any of its pose, clothing, hair, horns, accessories or hand. All existing body, composition and rendering outside the face of image 1 should read exactly as image 1. Preserve a solid off-white face even in the wide expanse of both cheeks; compare with image 2.

[man_bust]
Reference 1 (before replacement): out/mine/character_redraw/sources/man_bust.png
Reference 2: out/mine/character_redraw/sources/f_bust.png
transparent_background: false
Prompt:
Perform the smallest possible edit to image 1, the specific portrait of adult man with two huge horns, long hair, rosette, square jaw, no hand. Its framing, shape and all painted detail is locked. Image 2 is only a swatch for SKIN COLOR on the illuminated face. Edit image 1's FACE from a fully terracotta face to a porcelain OFF-WHITE skin base #faf9f5 to match image 2. Recolor main facial skin from the forehead underneath the bangs through brow, cheeks, temples, bridge of nose, entire chin and partially visible side ears in OFF-WHITE. Small orange iris and a tiny warm shadow detail, dark lashes, delicate mouth/eyebrows and a solid orange shadow immediately BELOW the jaw remain. Do not change character anatomy, expression, eye shape, hair, ornaments, clothing, scale, position or crop. Duplicate exact layout, same portrait 2:3 at 1024x1536, same clean three ink print illustration, same uniform cyan background. Image 2 must NOT introduce any of its pose, clothing, hair, horns, accessories or hand. All existing body, composition and rendering outside the face of image 1 should read exactly as image 1. Preserve a solid off-white face even in the wide expanse of both cheeks; compare with image 2.
