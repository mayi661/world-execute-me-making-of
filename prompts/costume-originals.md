# 服饰精修稿

原始英文提示正文按制作档收录。输入图用原工程文件名标记，可与[服饰对照](../images/costume-comparison.png)和[角色实帧](../images/film-frames.jpg)一同查看。

内置 ImageGen。三张主要姿势的每次输入依次为上一版同名源图（out/mine/character_redraw/sources）、所给参考视频 73.3 秒和 184 秒的服饰参考。正片在原透明墨版上局部套入新衣服，用场景的紫墨显示。

## 共用提示词

Use case: precise-object-edit, film wardrobe continuity. Image 1 is the approved production drawing. Edit the CLOTHING ONLY, on its existing silhouette; preserve exact pose, head including hair/horns/flower, face, hands, skin, and the original size, crop, proportions, spatial anchor and cyan background. Images 2 and 3 are stills from the user-provided creative reference: study the costume construction (layered edged collar, knotted frog fastenings, a diamond attachment for falling ribbon or folded sleeve, deliberate tapered fold wedges); do not take their color, camera view, text, watermark or composition. Make the current clothing visibly more tailored, graceful and fine at 240-pixel video size. Keep the cross-collar high dress but clarify OVER-under order: broad black stand-up collar with one firm ivory piping, original terracotta cross front framed with a slim ivory inset; small woven four-loop knot at neckline; at chest replace the crude buttons with two beautifully shaped interwoven cord frogs and a hollow diamond end tab. Show the fabric hanging and turning with two or three tapered, flat near-black or middle-tone folds that FOLLOW the body and converge locally toward fastening, not arbitrary ink stripes. Include a second, more delicate edge where the cuff or armband turns, small woven lozenge to match the front. Control density: clear details at the collar and cuffs, broad areas of clean cloth between. The drawing of the garment should feel genuinely finished and use details grounded in seams, closures, and gravity; avoid ornate repeating patterns, armor, random jewelry, lettering, textures or gradients. Strict 3 flat inks with same near-black #1d1b19, brick #d97757, ivory #faf9f5 on original opaque cyan #29abe2 production key. Exact pose and hands untouched.

### f_bust

The viewer-left hand already touches the collar; keep its complete outline exactly as it is. Make the collar closure peek from the OTHER side of the crossing instead of overlapping knuckles. Show a folded cuff beneath the approved wrist and give the chest a tailored edge and inset. Preserve the hand-to-collar gesture in its precise location.

### f_profile

Low face in left 3/4 profile. Rotate the collar fastening and lozenge chain coherently with the torso and retain the dark slim vertical neck; near upper arm has the garment band with a small cord knot and banded hem, and the pleat falls back in perspective. All of the light bare upper arm must stay clean. Only refine fabric on the torso or its existing cuff, not hair, sky or silhouette.

### f_reach

The outstretched viewer-left hand and wrist including its isolating ink cuff, and the right hand holding cloth over the chest, stay exactly in their current positions. Show what the holding hand is holding: a layered lapel with narrow clean piping lifted by two converging fabric folds below the knuckles. Refine the bands in their existing positions on the upper arm. Add a short overlapping three-pleat fabric lining INSIDE the larger original orange body silhouette below these cuffs, not outside in cyan. Same collar and front fastening all the way.


# Four costume edits

Built-in ImageGen, single edit per costume, transparent_background false. The full prompt of each job is the common text followed by its variant text below, separated by one ASCII space.

## Common text

Edit only the COSTUME on the first provided image; this is a registered animation cel and the entire drawing above the throat must stay identical. The companion reference video frame 2 is solely for reading how its collar turnbacks, braided fastenings, inset fabric and angular fold shadows are drawn. Create a newly designed costume inside the ORIGINAL outer silhouette. Use the existing coral/brick fabric, near-black folds, and ivory facings in broad flat cut-paper shapes, perfectly smooth edges. A conspicuous well-made fitted high X collar with double piping: a black folded underside behind the diagonal overlap, broad brick facing, and narrow continuous ivory welt along one edge of each diagonal. A real, compact woven frog clasp with a coil at the crossing and almond cord loops that show their own negative space; a small stepped diamond-woven inset beneath/along the closure instead of a string of printed icons. A long elegant flat dark fold at one side of the chest, one at the sleeve join, giving fabric direction while preserving the proportions and exact shoulder/neck placement. This should look finely constructed and recognizable from a thumbnail, not a sprinkling of random ornaments. No floral wallpaper, no embroidery texture, no metallic rendering, no gradients, no extra belts, no captions. Keep EXACTLY the canvas dimensions, scale, crop and matte color, whole head and face pixels, air gaps, outside silhouette, pose and anatomy, hair strands and hands of image 1. Key background cyan must still be flat #29abe2. Three printing inks near-black #1d1b19, coral #d97757 and cream #faf9f5, no green from reference. One full portrait 2:3.

## boy_bust

Reference 1: `out/mine/character_redraw/sources/boy_bust.png`

Reference 2: `.probe/character_reference/study_97.3.jpg`

Keep the youthful cropped ivory hair, two short horns, neutral face, bare neck and asymmetric young man's tunic silhouette exactly. His reference suggests neat masculine tailored lapel folds. Place double-layered seam at the two shoulders and a tapering inset along the placket. At center keep his ONE existing cord fastener with a clean self-crossed loop on each side; its diamond pendant stays below. Same original head, flat chest and squared shoulders.

## man_bust

Reference 1: `out/mine/character_redraw/sources/man_bust.png`

Reference 2: `.probe/character_reference/study_97.3.jpg`

Keep the mature angular face, expression, hair ribbons falling on the tunic, tall horns, long dark hair, strong square chest and crop. Paint only the broad uncovered shoulder triangles, high crossed collar and exposed central panel. His stronger silhouette supports heavier collar binding, sharper creases under the overlapping collar and a larger accurately braided placket fastener. Keep existing ONE frog and open diamond pendant. The two long cream hair locks OVER the clothing remain intact.

## cat_bust

Reference 1: `out/mine/character_redraw/sources/cat_bust.png`

Reference 2: `.probe/character_reference/study_73.3.jpg`

Keep the two furry cat ears exactly, long hair/knot/tassel, peaceful face, bare fingers and curved right hand holding the neck exactly as image 1. Only refine cloth: the crossed collar and visible center of the tunic behind the hand, updated two woven frog closures separated by stitches, existing panel colors, shoulder/sleeve band and cuff immediately BELOW the wrist. Never draw over the hand. Preserve arm's outer outline. Her diamond-shaped cuff trim and placket echo each other.

## cat_paws

Reference 1: `out/mine/character_redraw/sources/cat_paws.png`

Reference 2: `.probe/character_reference/study_73.3.jpg`

Keep the two curved horns (do not add cat ears), eyes, expression, hair and BOTH delicately splayed human hands EXACTLY in front of her chest. Paint only the visible cloth in between her hands, the upper collar just below the chin, the broad open bodice BELOW the hands, and BOTH sleeve cuffs immediately below the wrists. Two balanced angular double-piped sleeves; leave all fingers, arms and wrists completely untouched. Her truly woven center cord fasteners and open diamond stay legible between the two hands. Large simple cloth folds below only.
