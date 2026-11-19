# 定稿与审定母片

<a id="master"></a>

## 原生 4K 定稿

| 项目 | 实测 |
| --- | --- |
| 成片文件名 | `world_execute_me_signal_fold_4k60.mp4` |
| 视频 | 3840×2160，H.264 High，BT.709，恒定 60 fps |
| 画面 | 13,014 帧，216.900 秒，含片头 5 秒警告页 |
| 声音 | AAC-LC，44.1 kHz 立体声，与原 WAV 相差 0.00 ms |
| 大小与耗时 | 1,964,043,927 字节，画面捕获与编码 359.2 秒 |
| 闪光 | 一般最差 2.0 次/秒（播放器 1:31.73 起），饱和红 0，无单帧爆闪 |
| 结尾 | 末 72 帧解码后逐像素相同 |

[六张成片实帧](../images/film-frames.jpg) · [4K 与审定片同帧检查](../images/4k-comparison.jpg) · [闪光和同步报告](flash-and-sync.txt) · [逐帧验收](4k-frames.json)

<a id="approved"></a>

## 审定的 1080p 对照片

制作档名 `preview_signal_fold_corridor_1080p60.mp4`。2:58.733 至 3:00.667 重做了连续推进，和硬切稿相比只替换 116 帧。其余 12,898 帧逐像素相同，AAC 码流相同。4K 交付前，以这份审定片逐帧缩图核对。可在[窗内走廊对照图](../images/corridor-comparison.jpg)里从上排硬切看到下排推近，也可查阅[接镜数据](corridor.json)和[播放器实测](playback.json)。

最终版带声 MP4 可从 [v1.0.0 的 Release](https://github.com/mayi661/world-execute-me-making-of/releases/tag/v1.0.0) 下载。SHA-256 为 `97f98ee3de631d626f51a67689ea37a7fbb4ac846ce58c796799b23eb9d148fa`。
