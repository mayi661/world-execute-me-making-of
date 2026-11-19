# 定稿使用的绘制和捕获摘录

这些文件保持制作时的函数和导入方式，供阅读手记时对照。代码块中的运行命令使用完整渲染工程的目录结构，所需歌曲与词时文件由制作者本地提供。

| 对照内容 | 摘录 |
| --- | --- |
| 圆、波、极限点和同源读数 | [signal_geometry.js](scenes/signal_geometry.js) |
| 两次掌心的同机位和回复折返 | [signal_hand.js](scenes/signal_hand.js) · [掌心坐标](regions.json) |
| 十二声的审定 OK 镜头 | [approved_ok.js](scenes/approved_ok.js)，原快照名为 `.probe/signal_impact/signal_fault.js` |
| 从唯一有人物的窗格进入走廊 | [signal_fold.js](scenes/signal_fold.js) |
| 清空双方会话与静止片尾 | [ending_history.js](scenes/ending_history.js) |
| 输入剪影的分墨与颜色 | [prep_silhouette.py](art/prep_silhouette.py) · [调色和时间配置](config.json) |
| 4K 捕获及复用审定音轨 | [逐帧捕获](export/gpucapture.mjs) · [加载审定快照](export/session.mjs) · [封装](export/mux.py) |

[上游渲染工程](https://github.com/Nyankomintsu/world-execute-me-lyric-mv) · [本版的完整过程](../MAKING_OF.md)
