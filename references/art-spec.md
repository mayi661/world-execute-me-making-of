# 剪影素材规格（换成 ChatGPT 拟人角色）

**设定表服饰修订（2026-11-15）。** `f_bust`、`f_profile`、`f_reach`、`cat_bust`、`cat_paws` 穿同款浅色立领长裙。米白前襟顺着肋骨垂下，紫色侧片交代衣褶，露肩处接独立垂袖。播放器 1:13 的伸手稿画到腰下，可以看见两侧绳结、腰链和垂坠。头部和颌线沿用上一版的配准；爱心位置跟随 `f_reach` 的 `palm`，心尖悬在掌心上方约 11 px（1080p）。少年和成年男性保留各自的衣装。

**2026-11-15 角色与服饰定稿。** 正片使用七张角色姿势。脸部保留轻垂的眼睑、简洁的鼻尖和很轻的嘴线，侧脸可以闭眼。受光的脸和手落米白版，虹膜与阴影跟随镜头墨色。交领有双层压边，衣褶顺着盘扣或手抓住衣料的位置收拢。伸手稿的腕口分开掌心与前臂，供镜头单独取掌。播放器 2:09.75 起的离线记录右栏留空，单眼素材留作旧版存档。数数后的回复栏仍是常亮光标。下文的无脸要求、旧角色说明和示例时刻均属首版记录。

现有 8 张：`assets/character/{f_bust,f_profile,f_reach,f_eye,boy_bust,man_bust,cat_bust,cat_paws}.png`
它们是原作作者为 Claude 拟人做的三墨剪影（CC BY-NC-SA，署名 Nyankomint）。换角色 = 换这 8 张同名文件，**代码零改动**。

## 一、生成规格（每张都照这个）

| 项 | 要求 |
|---|---|
| 风格 | **三色平涂剪影**：仅三种墨（近黑 `#1d1b19`、她 `#d97757`、米白 `#faf9f5`），无渐变、无描边小线、无高光点 |
| 形态 | 大块面；黑版是主体阴影，米白只作高光与"你"的呼应；脸部不画五官（无脸） |
| 背景 | 纯色或透明（脚本会抠）；不要投影、不要环境、不要纹理 |
| 尺度 | 高 ≥ 1449 px（`f_bust` 基准）；`f_eye` 特写要 1800+ |
| 构图 | 被切掉的边必须与画面/面板边重合（胸像下缘直接切在画布底边） |
| 角色特征 | 长直白发、**两个角**、高领、额前齐刘海、发饰是一个小花结（可用影片标志）；不要翅膀、不要尾巴（剪影里读不出来） |

**反例（必须避免）**：彩色插画、白毛白裙的明暗稿、线稿、带背景的立绘、有五官的脸、渐变阴影。这些进片后会糊成一团或在米白纸上消失。

## 二、五张的生成提示词

通用前缀（中英各一版，模型认哪个用哪个）：

```
中文：三色平涂剪影，只用近黑/砖橙/米白三种墨，无渐变无描边；无脸；大块面；
      长直白发、两个角、高领长裙；纯色背景；全身不出现翅膀与尾巴。
English: three-ink flat silhouette, only near-black / brick orange / cream, no gradients,
      no line art, faceless, large flat masses; long straight white hair, two horns, high collar;
      plain background; no wings, no tail.
```

| 键名 | 用途（片中出现处） | 姿态要求 |
|---|---|---|
| `f_bust` | 全片基准、玻璃后的人影（A/E 段） | 正面胸像，胸像下缘切在画布底边，与 `f_bust` 同一构图 |
| `f_profile` | 低头侧脸（E 段） | 侧 3/4，低头，完整胸像可悬浮 |
| `f_reach` | 一手伸出、一手抚胸（H 段最后一帧） | 底边被切，必须贴画面/面板底边；`palm` 区域要能单独抠出 |
| `f_eye` | 眼部特写（DISHEARTENED 那一拍，161.88 起） | 睁一只眼，上下被裁切，只能满版或用形状裁切 |
| `cat_bust` → 改名建议 `horn_bust` | 主歌二"猫"那一镜（C 段） | 原作用猫耳；新角色用**角**代替，姿势与 `f_bust` 几乎重合 |

可选（第二批）：`boy_bust`（导歌二"性别"）、`man_bust`（淡重影）、`cat_paws`（双手版）。

## 三、出图之后：三步进管线

```powershell
cd <项目根目录>
$py = (Get-Command python).Source

# 1) 归一化 + 出检查图（不改素材）
& $py tools\prep_silhouette.py 你的图.png --key f_bust --dry

# 2) 看 out\mine\art_check_f_bust.png 的三格：暗底 / 米白纸 / 20%
#    暗底看不清轮廓 → 加重黑版；米白纸上消失 → 黑版不够

# 3) 过关就写进素材目录（覆盖同名文件，旧图先备份）
Copy-Item assets\character\f_bust.png .probe\f_bust.old.png
& $py tools\prep_silhouette.py 你的图.png --key f_bust
```

替换后必须过的三关：

```
node export/export.mjs --sheet out/mine/art_dark.png  --times 12.0,120.0 --cols 2 --width 1280 --height 720
node export/export.mjs --sheet out/mine/art_paper.png --times 161.9 --cols 1 --width 1920 --height 1080
node export/export.mjs --sheet out/mine/art_4k.png    --times 161.9 --cols 1 --width 3840 --height 2160
```

- 第一张：暗底上轮廓是否成立、黑版会不会吃掉造型；
- 第二张：米白纸上人物是否还看得见（这是最容易失败的一关）；
- 第三张：4K 下边缘有没有锯齿、糊边（`f_eye` 会被放大到 3.5 倍）。

## 四、配准与区域

- `f_bust` 是配准基准：其他几张按缩放 s、位移 t 对齐到它（原作记录：`cat_bust` s 1.00 t(−28,−49)）。
- `src/engine/regions.json` 里 `f_reach` 的 `palm` 区域坐标要按新图重标，否则"从她手里抠出手"会抠错位置。
- 全部替换完再动 C/D/E 段；A/B 段不依赖人物剪影，可以先不动。
