# 英语音标教室 · IPA Classroom

点一点就能听的英语音标教学 PWA：48 个国际音标（DJ 音标体系）、示范单词点读、发音要点、记忆小窍门、元音舌位图、最小对立对辨音练习与听音小测验。

## 特性

- 🔊 点击音标 / 单词即可发音（浏览器语音合成，无需音频文件）
- 🗺️ 互动元音舌位图
- 📱 PWA：可"添加到主屏幕"，支持 iPad 全屏离线使用
- 🔠 大字号模式（投屏教学）
- 🎯 听音辨词小测验

## 本地开发

```bash
npm run dev   # 零依赖静态服务器，默认 http://localhost:7100/
```

## 部署

静态站点，任意静态托管（GitHub Pages / Cloudflare Pages 等）直接发布根目录即可。
图标由 GitHub Actions 自动生成（见 `tools/make_icons.py`）。
