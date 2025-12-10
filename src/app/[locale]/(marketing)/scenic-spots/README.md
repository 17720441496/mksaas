# 景点展示页面

这个页面实现了一个具有背景切换、卡片3D动效和动态路由功能的景点展示网站。

## 功能特性

### 1. 背景切换
- 使用 `useState` 存储当前背景图片
- 使用 `useEffect` 加定时器定时更换背景图片
- TypeScript 给状态设置了 `string` 类型

### 2. 卡片3D动效
- CSS 中使用 `transform` 和 `transition` 实现 3D 效果
- 使用 Next.js 的 `.module.css` 文件管理样式
- TypeScript 确保样式类名正确

### 3. 交互逻辑
- 点击卡片使用 `useState` 改变选中状态
- 触发相应的动画效果
- TypeScript 检查状态类型为 `boolean`

### 4. 动态路由
- 实现动态路由展示不同景点详情
- TypeScript 定义了路由参数类型

### 5. 加载优化
- 使用 Next.js 的预渲染功能
- 实现了简单的懒加载效果
- 确保页面流畅运行

## 文件结构

```
scenic-spots/
├── page.tsx              # 主页面，景点列表
├── scenic-spots.module.css  # 样式文件
├── [spotId]/            # 动态路由目录
│   └── page.tsx         # 景点详情页
└── README.md            # 说明文档
```

## 使用说明

1. **查看景点列表**：访问 `/scenic-spots` 页面
2. **切换分类**：点击页面上方的分类按钮过滤景点
3. **查看景点详情**：点击任意景点卡片进入详情页
4. **返回列表**：在详情页点击返回按钮回到列表

## 数据结构

### ScenicSpot 接口
```typescript
export interface ScenicSpot {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  category: string;
}
```

## 技术栈

- Next.js 13 (App Router)
- React 18
- TypeScript
- Motion (动画库)
- Tailwind CSS

## 图片资源

请确保在 `public/images/` 目录下有以下图片文件夹：
- `scenic-spots/` - 景点图片
- `backgrounds/` - 背景图片

## 自定义配置

### 背景切换时间
在 `page.tsx` 和 `[spotId]/page.tsx` 中修改定时器间隔：

```typescript
const interval = setInterval(() => {
  // ...
}, 8000); // 修改这里的时间（毫秒）
```

### 卡片样式
在 `scenic-spots.module.css` 中修改卡片的样式和动画效果。

## 注意事项

- 请确保图片路径正确
- 如果需要添加新景点，在 `scenicSpots` 数组中添加新数据
- 动态路由会自动处理新添加的景点