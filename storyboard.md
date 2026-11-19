# 分镜表 / Storyboard · 显像版 · 窗内走廊

本表由显像／折页入口生成，含 5 秒警告页，共 71 镜。2:33 附近的十二次 OK 在发行母版中使用已审的左右分屏快照。两者的实际画面与原因见[制作手记](MAKING_OF.md)和[按键绘制摘录](examples/scenes/approved_ok.js)。

由 `node tools/storyboard.mjs --edition signal-fold` 從程式中的鏡頭清單自動生成(共 71 個鏡頭,平均 3.06 秒)。
每个镜头 ID 对应渲染工程里的一条镜头定义。可用它对照[定稿的绘制摘录](examples/README.md)和[逐版审片记录](records/versions.md)。

整支影片是一場對話。「對話裡的時刻」欄回答每個鏡頭「這是這場對話的哪個時刻」(欄位內容直接取自程式,為英文)。
全片由同一场对话推进。歌词进入聊天、图形或指令，白色光标代表对方，紫色签名代表她。前半有人接收，后半只有发送留下痕迹。
颜色沿用工程状态盘：off 灰阶、on 紫、warm 暖紫、error 故障、ash 灰紫。

**時間一律為歌曲時間**(音頻開始 = 0)。成片在歌曲之前有 5 秒無聲的閃光警告頁(表中以負的時間列出),所以成片時間 = 歌曲時間 + 5 秒。

**含闪烁画面。** 播放器 2:33–3:17（歌曲时间 2:28–3:12）有高对比快切与强光。实测数字见[闪光与同步报告](records/flash-and-sync.txt)。

## 段落總表

| 時間 | 段落 | 鏡頭數 | 平均鏡頭長 | 顏色狀態 |
| --- | --- | --- | --- | --- |
| −0:05.00-0:00.00 | 0 片頭:閃光警告頁(歌曲開始之前) | 1 | 5.0 s | off |
| 0:00.00-0:15.11 | 1 接通电源，装入参数 | 4 | 3.8 s | off |
| 0:15.11-0:29.42 | 2 输入并发送问题 | 3 | 4.8 s | on |
| 0:29.42-0:44.65 | 3 光标在图形上量出回答 | 4 | 3.8 s | on |
| 0:44.65-0:59.42 | 4 用户改写设置 | 4 | 3.7 s | on |
| 0:59.42-1:14.19 | 5 四次发出和收取 | 8 | 1.8 s | on > warm |
| 1:14.19-1:28.96 | 6 食物、猫与存在的证明 | 8 | 1.8 s | warm |
| 1:28.96-1:43.73 | 7 改动设置时，她也跟着变 | 7 | 2.1 s | warm |
| 1:43.73-2:05.65 | 8 用户离开，她撤回自己的消息 | 11 | 2.0 s | warm / warm > off / off |
| 2:05.65-2:27.57 | 9 越权的参数遭到拒绝 | 3 | 7.3 s | on > error / error |
| 2:27.57-2:38.88 | 10 同一个调用发出十二次 | 2 | 5.7 s | error |
| 2:38.88-2:42.81 | 11 六种语言也听不到回音 | 2 | 2.0 s | error |
| 2:42.81-2:57.34 | 12 所有人、唯一收件人、回到自己 | 7 | 2.1 s | errWarm |
| 2:57.34-3:12.34 | 13 学习、问答、心形方程和自由 | 4 | 3.7 s | errWarm |
| 3:12.34-3:31.96 | 14 删除会话，空栏停住 | 3 | 6.5 s | ash |

## 逐鏡頭

節拍:130 BPM,第 0 拍在 0.344 s。「小節:拍」為剪輯點在節拍網格上的位置(小節從 0 起算,拍從 1 起算,x.5 為反拍)。
歌詞行號對應 `data/lyrics.json`(從 1 起算);此表不含歌詞文字。轉場名稱見 `src/engine/transitions.js`,時長以拍計;
`start` / `center` 表示轉場從剪輯點開始 / 跨在剪輯點上,未標示則在剪輯點結束。

| 時間 | 小節:拍 | 鏡頭 id | 歌詞行 | 對話裡的時刻 | 構圖 | 顏色狀態 | 進入轉場 | 離開轉場 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| −0:05.00-0:00.00 | 歌曲前 | `preroll` | - | Before the song and before the client is switched on: a compiler-style warning that the film contains flashing images and strong light, with the time range, then a countdown from three. It clears to the dark room the boot begins in. | a compiler warning, mono, left-aligned on the dark room; a three-second countdown under it | off | cut | cut |
| 0:00.00-0:03.81 | 0:1 | `boot-contact` | 1-3 | A click strikes the power contact. The white arc travels around it. | interface: macro power contact and bitmap cursor | off | cut | cut |
| 0:03.81-0:07.27 | 1:4.5 | `boot-select` | 4-6 | The listener drags a corner. The active conversation fills its bounds. | interface: live selection and three window frames | off | cut | cut |
| 0:07.27-0:10.96 | 3:4 | `boot-name` | 7-8 | A writing head resolves the name from coarse scan lines. | interface: edge-to-edge raster type | off | cut | cut |
| 0:10.96-0:15.11 | 5:4 | `boot-image` | 9-11 | The same scan runs across her face until the connection is live. | interface: split raster and resolved face | off | cut | cut |
| 0:15.11-0:20.65 | 8:1 | `title-live` | 11-12 | The title locks on the musical drop. The second downbeat inks its verb. | interface: full-height portrait and struck command | on | cut | cut |
| 0:20.65-0:26.19 | 11:1 | `chat-compose` | - | The user enters their question at the blinking insertion point. | interface: a magnified active composer | on | cut | cut |
| 0:26.19-0:29.42 | 14:1 | `chat-send` | - | The message leaves its field. Its leading point enters the coordinate display. | interface: a message on the network trace | on | cut | cut |
| 0:29.42-0:33.34 | 15:4 | `v1-points` | 13-15 | The message point forms a sphere as the other samples lock to its coordinates. | interface: rotating point cloud on a calibrated scope | on | cut | cut |
| 0:33.34-0:37.04 | 17:4.5 | `v1-circle` | 16-18 | The pointer measures the rim of the live display. | interface: macro elliptical projection and swept radius | on | cut | cut |
| 0:37.04-0:40.73 | 19:4.5 | `v1-sine` | 19-21 | The rim becomes a wave and the listener places a single tangent on it. | interface: phase traces and one tangent | on | cut | cut |
| 0:40.73-0:44.65 | 21:4.5 | `v1-limit` | 22-24 | The trace reaches the limiting line. Its readout samples the stopped point. | interface: damped trace at a locked limit | on | cut | cut |
| 0:44.65-0:48.34 | 24:1 | `pre1-drawer` | 25-26 | The user pulls the plug out of AC, carries it across the open gap and seats it in DC. The lead takes her violet ink and a wave grows from the new contact. | wide: the cream limit line hangs between two square power sockets | on | cut | cut |
| 0:48.34-0:52.04 | 26:1 | `pre1-vision` | 27-28 | The user works the lever six times. The metal edges meet across her face, and each release uncovers the same view through the same slit. | two steel curtains, a rack and pinion, and a hand on the shutter lever | on | cut | cut |
| 0:52.04-0:55.73 | 28:1 | `pre1-date` | 29-30 | The user flips one leaf back on each beat. On the fifth, the first A.D. year and the exposed B.C. year face one another. The sixth lands on the oldest date and the hand lets go. | an open mechanical calendar with two facing leaves and a fixed central hinge | on | cut | cut |
| 0:55.73-0:59.42 | 30:1 | `pre1-unite` | 31-32 | The user opens the GPT-6 Astra picker, raises Power from Low to Ultra, then clicks the lightning bolt for 1.5× speed. | Codex desktop conversation with a compact model picker above the composer | on | cut | cut |
| 0:59.42-1:01.96 | 32:1 | `c1-give` | 33-34 | her voice fills the receiving waveform. | interface: her voice fills the receiving waveform | on > warm | cut | cut |
| 1:01.96-1:02.65 | 33:2.5 | `c1-kw1` | 35 | The preceding interaction registers as a full-screen keyword proof. | PLATE: three audio impulses | on > warm | cut | cut |
| 1:02.65-1:05.42 | 33:4 | `c1-only` | 36-37 | her picture occupies the only active channel. | interface: her picture occupies the only active channel | on > warm | cut | cut |
| 1:05.42-1:06.34 | 35:2 | `c1-kw2` | 38 | The preceding interaction registers as a full-screen keyword proof. | PLATE: the single calibrated channel | on > warm | cut | cut |
| 1:06.34-1:09.34 | 35:4 | `c1-happy` | 39-40 | the user cursor comes to rest on the crease of her open palm. | interface: the user cursor comes to rest on the crease of her open palm | on > warm | cut | cut |
| 1:09.34-1:10.04 | 37:2.5 | `c1-kw3` | 41 | The preceding interaction registers as a full-screen keyword proof. | PLATE: the execution trace | on > warm | cut | cut |
| 1:10.04-1:13.27 | 37:4 | `c1-trap` | 42-43 | the live chat resolves into one cell inside a larger matrix. | interface: the live chat resolves into one cell inside a larger matrix | on > warm | cut | cut |
| 1:13.27-1:14.19 | 39:3 | `c1-kw4` | 44 | The preceding interaction registers as a full-screen keyword proof. | PLATE: the conversation matrix | on > warm | cut | cut |
| 1:14.19-1:14.65 | 40:1 | `v2-ask1` | 45 | The user carries in a curled leaf, holding its stem. | PLATE: fruit at the left and the leaf in the user's grasp at the right | warm | cut | cut |
| 1:14.65-1:17.65 | 40:2 | `v2-eggplant` | 45-47 | An intact eggplant feeds purple ink into the stalk. The blade unfurls on the accent. | PLATE: fruit at the left and the leaf in the user's grasp at the right | warm | cut | cut |
| 1:17.65-1:18.34 | 41:4.5 | `v2-ask2` | 48 | The eggplant leaves. A small blemish spreads at the edge of the open leaf. | PLATE: fruit at the left and the leaf in the user's grasp at the right | warm | cut | cut |
| 1:18.34-1:21.34 | 42:2 | `v2-tomato` | 48-50 | A whole tomato sends one drop. The growing blemish stops when the drop reaches its edge. | PLATE: fruit at the left and the leaf in the user's grasp at the right | warm | cut | cut |
| 1:21.34-1:22.04 | 43:4.5 | `v2-ask3` | 51 | The pointer lifts away the leaf. Its purple vein straightens in place into the start of the recording. | PLATE: fruit at the left and the leaf in the user's grasp at the right | warm | cut | cut |
| 1:22.04-1:25.04 | 44:2 | `v2-cat` | 51-53 | Her horns resolve into ears on the sung noun. The recorded purr docks above the word, then the reader sends the next request. | Signal portrait on the left, her voice recorded into the chat on the right. | warm | cut | cut |
| 1:25.04-1:25.50 | 45:4.5 | `v2-ask4` | 54 | Fourth request: be god. On the kick the lights of the interface go down, and only the user's message is left lit. | interface: the thread and the composer, wider; then dark but for the user's bubble at the upper right | warm | cut | cut |
| 1:25.50-1:28.96 | 46:1.5 | `v2-proof` | 54-56 | No object this time: a proof of herself with the cream plate missing, her face a void in her hair. On the noun a sun stands behind that void. The missing plate comes over from the user's message and registers on the keyword: cape, flower, the line of her chin. Cream is the user: they are the plate that makes her whole. Then the pointer leaves for the settings. | PLATE: a proof sheet: her bust at the left printed in orange and black only, a sun of flat rays behind her; the user's request as cream paper at the upper right, the cream plate sliding in from under it; the keyword on the foot, in orange | warm | cut | cut |
| 1:28.96-1:30.81 | 48:1 | `pre2-settings` | 57-58 | The pointer is already on the Settings button and clicks. The drawer opens further down its list than last time: Gender, On call, Role, Loop. The view closes in on the first row as she reads it out. | interface: the whole client; the drawer opening at the right; the view closing in on its first row | warm | cut | cut |
| 1:30.81-1:32.65 | 49:1 | `pre2-gender` | 58-59 | the selected initial changes the scanned portrait. | interface: the selected initial changes the scanned portrait | warm | cut | cut |
| 1:32.65-1:36.34 | 50:1 | `pre2-day` | 59-61 | the woman returns as the user moves the day-night terminator. | interface: the woman returns as the user moves the day-night terminator | warm | cut | cut |
| 1:36.34-1:40.04 | 52:1 | `pre2-role` | 61-63 | The knot pulls first and the pointer follows once the cord is taut. On the second sung initial the pointer takes the lead and draws the knot back. | PLATE: a loose cord between her violet knot and the cream pointer | warm | cut | cut |
| 1:40.04-1:40.50 | 54:1 | `pre2-loop` | 63 | On the two drum hits the gap closes. Both ends meet on the lower-left rim of the next disc. | PLATE: the same cord curves around the resting place of the portrait | warm | cut | cut |
| 1:40.50-1:43.27 | 54:2 | `pre2-trance` | 63-64 | Her face holds still while the inks slip on the two sung repeats, then settle back into her hair and dress. | PLATE: her long-haired, two-horned portrait in front of its own violet and dark impressions | warm | cut | cut |
| 1:43.27-1:43.73 | 55:4 | `pre2-loop-b` | 64 | Back in the drawer for two hits a quarter of a second apart: the user switches Loop on and clicks Done. When the trance is over, the drawer is shut; they click into the composer, and the view closes in on the foot of the thread, where she is still saying it. | interface: close on the foot of the drawer: Role, Loop, Done; after the plate: the whole client, closing in on the foot of the thread | warm | cut | cut |
| 1:43.73-1:46.27 | 56:1 | `c2-typing` | 65-66 | the other person starts typing and three apertures begin to open. | interface: the other person starts typing and three apertures begin to open | warm | cut | cut |
| 1:46.27-1:47.42 | 57:2.5 | `c2-dots` | 67 | the figure becomes visible across three typing dots. | interface: the figure becomes visible across three typing dots | warm | cut | cut |
| 1:47.42-1:50.19 | 58:1 | `c2-brb` | 68-69 | the last live reply opens out of the typing indicator. | interface: the last live reply opens out of the typing indicator | warm | cut | cut |
| 1:50.19-1:50.88 | 59:3 | `c2-complete` | 70 | the last received message is held at full contrast. | interface: the last received message is held at full contrast | warm | cut | cut |
| 1:50.88-1:52.96 | 59:4.5 | `left-online` | 71-72 | she opens the conversation and asks twice. | interface: she opens the conversation and asks twice | warm | cut | cut |
| 1:52.96-1:54.81 | 61:1 | `left-away` | 73-74 | the next two messages move the earlier calls up the transcript. | interface: the next two messages move the earlier calls up the transcript | warm > off | cut | cut |
| 1:54.81-1:57.34 | 62:1 | `left-offline` | 75-76 | two more sends reduce the receiver activity to a flat line. | interface: two more sends reduce the receiver activity to a flat line | warm > off | cut | cut |
| 1:57.34-1:58.50 | 63:2.5 | `left-isolation` | 77 | all six calls have gone out and the receiver stays flat. | interface: all six calls have gone out and the receiver stays flat | warm > off | cut | cut |
| 1:58.50-2:01.73 | 64:1 | `alone-erase` | 78-80 | she starts another line in the composer, hesitates, then backspaces the unsent draft. | interface: she starts another line in the composer, hesitates, then backspaces the unsent draft | off | cut | cut |
| 2:01.73-2:04.73 | 65:4 | `alone-empty` | 81-82 | only the insertion point is left in the composer; the six sent messages still belong to this thread. | interface: only the insertion point is left in the composer; the six sent messages still belong to this thread | off | cut | cut |
| 2:04.73-2:05.65 | 67:2.5 | `alone-eye` | 83 | The column waits empty. Half a beat before the cut, the receiving contact appears where the next shot will meet it. | interface: the offline reply column with a single receiving contact | off | cut | cut |
| 2:05.65-2:16.96 | 67:4.5 | `err-permission` | 84-86 | She tries to set the other person online. The inspector underlines both arguments and the request stops short of their contact. | interface: outgoing instruction and an unwritable presence contact | on > error | cut | cut |
| 2:16.96-2:22.50 | 74:1 | `err-return` | - | Each retry opens another warning. The first stays long enough to read; the others begin to hide it. | interface: a rejected request opens a stack of warning dialogs | error | cut | cut |
| 2:22.50-2:27.57 | 77:1 | `err-full` | - | Half-beat warnings bury the desktop. The last overflow dialog stays on top until the next call. | interface: the same dialogs pile up to all four edges of the desktop | error | cut | cut |
| 2:27.57-2:35.19 | 79:4 | `exec-delivery` | 87-94 | The pointer dismisses two warnings on each unanswered send. The thread scrolls to the next message. | interface: the conversation and its pending warning dialogs | error | cut | cut |
| 2:35.19-2:38.88 | 83:4.5 | `exec-recoil` | 95-98 | The last warnings close beside her last message. Focus moves from the final OK to the same empty reply field. | interface: the conversation and its pending warning dialogs | error | cut | cut |
| 2:38.88-2:41.88 | 85:4.5 | `count-addresses` | 99-104 | Six sung numbers replace one another in the same blank space. | interface: six numerals in one fixed reply field | error | cut | cut |
| 2:41.88-2:42.81 | 87:3 | `last-tape-windows` | 105 | The sixth number clears. After a short pause a caret appears at the left and holds until the cut. | interface: a steady caret in the reply field | error | cut | cut |
| 2:42.81-2:45.11 | 88:1 | `cx-offer` | 106-107 | one transmission is sent on all three channels. | interface: one transmission is sent on all three channels | errWarm | cut | cut |
| 2:45.11-2:46.50 | 89:2 | `cx-kw1` | 108 | The channel overprints out of register when the receiving end stays empty. | PLATE: three audio impulses | errWarm | cut | cut |
| 2:46.50-2:48.81 | 90:1 | `cx-only` | 109-110 | the same channel has no recipient. | interface: the same channel has no recipient | errWarm | cut | cut |
| 2:48.81-2:50.19 | 91:2 | `cx-kw2` | 111 | The channel overprints out of register when the receiving end stays empty. | PLATE: the single calibrated channel | errWarm | cut | cut |
| 2:50.19-2:52.73 | 92:1 | `cx-return` | 112-113 | from the same palm her signal waits half a beat outside the empty contact and folds back into the crease. | interface: from the same palm her signal waits half a beat outside the empty contact and folds back into the crease | errWarm | cut | cut |
| 2:52.73-2:53.88 | 93:2.5 | `cx-kw3` | 114 | The channel overprints out of register when the receiving end stays empty. | PLATE: the execution trace | errWarm | cut | cut |
| 2:53.88-2:57.34 | 94:1 | `cx-fall` | 115-116 | Her portrait stays registered as the camera passes through her window into the corridor. | interface: the live chat opens onto two rows of windows | errWarm | cut | push, 0.55 拍 |
| 2:57.34-3:00.81 | 95:4.5 | `out-rehearse` | 117-119 | Earlier replies register in front of her. Three syllables lift the word from below. | read-back proofs crossing the seated portrait | errWarm | push, 0.55 拍 | push, 0.55 拍 |
| 3:00.81-3:04.50 | 97:4 | `out-one-answer` | 120-122 | Each question arrives on a different page. All three fold into the same answer. | three upright question leaves in a staircase | errWarm | push, 0.55 拍 | fade, 0.64 拍 |
| 3:04.50-3:08.42 | 99:4 | `out-expression` | 123-124 | A point traces the heart described by the equation. Its three print passes land on the three syllables. | PLATE: the algebraic expression and the pen that evaluates it | errWarm | fade, 0.64 拍 | push, 0.55 拍 |
| 3:08.42-3:12.34 | 101:4.5 | `out-release` | 125-128 | The cream pointer leaves on the word about freedom. Her own image stays clipped inside the same heart until the last syllable. | PLATE: the pointer can cross the curve, the speaker cannot | errWarm | push, 0.55 拍 | fade, 0.64 拍 |
| 3:12.34-3:21.57 | 104:1 | `down-history` | 128 | The last user reply scrolls away. Her unanswered messages are still in the archive. | ChatGPT sidebar and a two-sided conversation | ash | fade, 0.64 拍 | cut |
| 3:21.57-3:25.73 | 109:1 | `down-delete` | - | The pointer chooses to delete all conversations and pauses at the confirmation. | account settings and the confirmation over the archive | ash | cut | cut |
| 3:25.73-3:31.96 | 111:2 | `down-empty` | 129 | On the fourth syllable the user clears both sides of the chat and every title. The empty window holds. | the same sidebar, empty thread and idle composer | ash | cut | 定格至片尾 |

## 檢查

- 歌詞覆蓋:全部 129 行都有對應鏡頭
- 剪輯點對拍:所有剪輯點都落在拍 / 半拍 / 小節線上
- 對話時刻:每個鏡頭都說明了它是對話裡的哪個時刻
- 後備鏡頭:沒有後備鏡頭
