# 易经心理App (I-Change Psychology App)

## 项目概述

易经心理App是一款结合古代易经智慧与现代心理学原理的跨平台应用。通过引导式占卜和心理学分析，帮助用户理解自身状态、缓解生活迷茫与焦虑，提供积极的生活建议。

## 核心功能

### 🔮 引导式占卜
- 通过心理学导向的问题识别用户当前状态
- 将用户状态映射到易经六十四卦
- 提供基于易经哲学和现代心理学的个性化建议

### 🎯 娱乐性占卜
- 基于时间、地点、天气自动生成今日运势
- 轻松愉悦的日常指引体验

### 📚 个人中心
- 占卜历史记录管理
- 个人设置与隐私控制

## 技术架构

### 前端技术栈
- **框架**: Expo React Native
- **平台支持**: iOS, Android, Web
- **UI组件**: React Native Elements / NativeBase
- **导航**: React Navigation
- **状态管理**: Redux Toolkit / Zustand

### 后端技术栈
- **后端**: Node.js (Express) 或 Python (FastAPI)
- **数据库**: MongoDB / PostgreSQL
- **API**: RESTful API
- **外部服务**: 
  - 天气API (OpenWeatherMap)
  - 地理位置服务

### 开发工具
- **版本控制**: Git
- **CI/CD**: GitHub Actions
- **代码质量**: ESLint, Prettier
- **测试**: Jest, React Native Testing Library

## 设计理念

### UI/UX设计
- **风格**: 现代简约 + 东方禅意
- **主色调**: 米白、淡蓝、墨绿
- **字体**: 具有东方韵味的清晰字体
- **动效**: 自然流畅的卦象生成和页面过渡

### 用户体验
- 操作有明确反馈
- 导航层级清晰
- 引导流程简洁易懂

## 项目结构

```
ichange-psychology-app/
├── src/
│   ├── components/        # 公共组件
│   ├── screens/          # 页面组件
│   ├── navigation/       # 导航配置
│   ├── services/         # API服务
│   ├── utils/           # 工具函数
│   ├── constants/       # 常量定义
│   └── assets/          # 静态资源
├── docs/                # 项目文档
├── .github/            # GitHub配置
└── ...
```

## 开发计划

### Version 1.0 (当前)
- [x] 项目初始化和架构搭建
- [ ] 引导式占卜功能
- [ ] 娱乐性占卜功能
- [ ] 个人中心和历史记录
- [ ] 基础UI/UX实现

### Version 1.1 (规划中)
- [ ] 体验优化
- [ ] 易经小课功能
- [ ] 冥想音频功能

### Version 1.2 (长期规划)
- [ ] 情绪记录功能
- [ ] 心理工具箱
- [ ] 成就系统
- [ ] AI语音互动占卜

## 快速开始

### 环境要求
- Node.js 16+
- npm 或 yarn
- Expo CLI
- 移动设备或模拟器

### 安装和运行
```bash
# 克隆项目
git clone https://github.com/AFeiYA/ichange-psychology-app.git
cd ichange-psychology-app

# 安装依赖
npm install

# 启动开发服务器
npm start

# 运行在不同平台
npm run android  # Android
npm run ios       # iOS
npm run web       # Web
```

## 贡献指南

我们欢迎所有形式的贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细信息。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系我们

- 项目地址: https://github.com/AFeiYA/ichange-psychology-app
- 问题反馈: https://github.com/AFeiYA/ichange-psychology-app/issues

---

*通过古今融合的智慧，让生活更美好 🌟*
