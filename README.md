# 德语语音综合练习 · 点词发音

一个可离线使用的德语发音练习页：点任意单词即发声，含听辨训练与遮音标自测。

- 快速访问（国内推荐）：https://deutsch-phonetik-63137.app.workbuddy.host/?sharecode=EH56IH4BBA
- GitHub Pages：https://enzo-river.github.io/deutsch-phonetik/

## 内容

| 模块 | 内容 | 数量 |
|---|---|---|
| 一 | 元音长短音对比（a / e / i / o / u / ö / ä） | 12 组 · 24 词 |
| 二 | 复合元音与变元音（au、ei·ai·ey·ay、eu·äu，ä / ö / ü 长短） | 6 组 · 15 词 |
| 三 | 辅音字母组合（ch[x] · ch[ç]、sch、sp、st、qu、pf、ng、-ig） | 9 条 · 20 词 |
| 四 | 朗读练习 | 8 词 |
| 五 | 听辨训练（随机播放，判断长音 / 短音，即时判分） | 10 题 / 轮 |

## 用法

- **点词** → 朗读该词，卡片同步高亮
- **每行右侧 ▶** → 按「先长音、后短音」对比连读
- **语速** 慢 0.75 / 中 1.0 / 快 1.2（只改速度，不变调）
- **遮音标** → 隐藏所有音标，先自己读，点词后才揭示该词音标
- **听辨训练** → 听发音判断长短，答后标出正确答案并累计得分
- **测试** → 朗读 *Haus* 并显示诊断信息

## 为什么发音一定可靠

页面**不调用** Web Speech API，也**不依赖**任何在线 TTS 服务。

57 个词的德语发音由 macOS 系统德语语音 **Anna（de_DE）** 预先生成，合并为**一条音频精灵**（37.09 秒、约 151 KB），以 base64 内嵌在 `index.html` 中，运行时通过 `<audio>` 播放并用 `currentTime` 定位。

- 离线可用，断网也能读
- 不受设备是否安装德语语音影响，**发音必然是德语**
- 微信内置浏览器、Safari、Chrome 表现一致

播放链路三级回退：内嵌音频 → 系统德语语音 → 在线合成。

## 离线安装（PWA）

在 Safari / Chrome 中打开后「添加到主屏幕」，即可像 App 一样启动。首次加载后由 Service Worker 缓存，断网可用。

> PWA 需要 http/https 环境；直接用 `file://` 打开网页时 Service Worker 不注册（其余功能不受影响）。

## 文件结构

```
index.html              页面本体（含内嵌音频，约 240 KB）
manifest.webmanifest    PWA 清单
sw.js                   Service Worker（离线缓存）
icon-192.png            图标 192
icon-512.png            图标 512
icon-maskable.png       Android 遮罩图标
apple-touch-icon.png    iOS 主屏图标
```

## 技术说明

- 无构建、无依赖、无后端
- 响应式布局，适配 375 px 起的手机屏幕与桌面
- 语速通过 `audio.playbackRate` 控制（浏览器默认保持音高）
- 首词在点击的同步调用栈内起播，规避移动端自动播放策略
- Service Worker 采用「缓存优先 + 后台更新」，更新后刷新两次即生效

## 体积说明

`index.html` 约 240 KB，其中约 200 KB 是 base64 编码的音频精灵。把 57 段音频合并为单条后，省掉了 57 份重复的 m4a 容器头，比逐段内嵌减少约 53%。

## 许可

内容整理自课堂语音练习材料，仅供学习使用。
