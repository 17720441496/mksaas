import React from "react";
import ImageCarousel from "@/components/custom/ImageCarousel";

const ImageCarouselDemoPage: React.FC = () => {
  // 示例图片数据
  const demoImages = [
    {
      src: "/maiganhua/shouye1.jpg",
      alt: "麦秆画作品1",
      caption: "精美麦秆画作品展示 - 1",
    },
    {
      src: "/maiganhua/shouye2.jpg",
      alt: "麦秆画作品2",
      caption: "精美麦秆画作品展示 - 2",
    },
    {
      src: "/maiganhua/qingming.jpg",
      alt: "麦秆画作品3",
      caption: "精美麦秆画作品展示 - 3",
    },
    {
      src: "/maiganhua/gongju.jpg",
      alt: "麦秆画工具展示",
      caption: "传统麦秆画制作工具",
    },
    {
      src: "/maiganhua/anjian.jpg",
      alt: "麦秆画技艺展示",
      caption: "精湛的麦秆画制作技艺",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4e6] to-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3a0c0c] mb-4">图片轮播组件演示</h1>
          <p className="text-lg text-[#3a0c0c]/80 max-w-3xl mx-auto">
            这是一个功能完整的图片轮播组件，支持自动播放、手动控制、平滑过渡动画
            以及响应式设计，可在各种屏幕尺寸下正常工作。
          </p>
        </div>

        {/* 主要轮播演示 */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#3a0c0c] mb-2">主要轮播展示</h2>
            <p className="text-[#3a0c0c]/70">默认配置（3秒自动切换）</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <ImageCarousel images={demoImages} />
          </div>
        </section>

        {/* 自定义配置演示 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 快速切换演示 */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#3a0c0c] mb-1">快速切换</h3>
              <p className="text-sm text-[#3a0c0c]/70">1.5秒自动切换间隔</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <ImageCarousel
                images={demoImages}
                interval={1500}
                height="300px"
              />
            </div>
          </div>

          {/* 慢速切换演示 */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#3a0c0c] mb-1">慢速切换</h3>
              <p className="text-sm text-[#3a0c0c]/70">5秒自动切换间隔</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <ImageCarousel
                images={demoImages}
                interval={5000}
                height="300px"
              />
            </div>
          </div>
        </section>

        {/* 功能说明 */}
        <section className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[#3a0c0c] mb-6">功能特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#d4af37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3a0c0c] mb-1">自动播放</h3>
                <p className="text-[#3a0c0c]/70">可配置的自动切换间隔时间，默认3秒</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#d4af37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3a0c0c] mb-1">手动控制</h3>
                <p className="text-[#3a0c0c]/70">前进/后退按钮，支持手动切换图片</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#d4af37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3a0c0c] mb-1">悬停暂停</h3>
                <p className="text-[#3a0c0c]/70">鼠标悬停时自动暂停，离开后恢复播放</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#d4af37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3a0c0c] mb-1">平滑过渡</h3>
                <p className="text-[#3a0c0c]/70">使用CSS过渡实现平滑的图片切换效果</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#d4af37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3a0c0c] mb-1">响应式设计</h3>
                <p className="text-[#3a0c0c]/70">适配各种屏幕尺寸，移动端友好</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#d4af37]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#3a0c0c] mb-1">指示器</h3>
                <p className="text-[#3a0c0c]/70">当前位置指示器，支持点击快速跳转</p>
              </div>
            </div>
          </div>
        </section>

        {/* 使用说明 */}
        <section className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[#3a0c0c] mb-6">使用说明</h2>
          <div className="space-y-4">
            <p className="text-[#3a0c0c]/80">
              1. 引入组件：<code className="bg-gray-100 px-2 py-1 rounded">import ImageCarousel from "@/components/custom/ImageCarousel";</code>
            </p>
            <p className="text-[#3a0c0c]/80">
              2. 准备图片数据：创建包含src、alt和可选caption属性的图片数组
            </p>
            <p className="text-[#3a0c0c]/80">
              3. 使用组件：<code className="bg-gray-100 px-2 py-1 rounded">{'<ImageCarousel images={yourImages} />'}</code>
            </p>
            <p className="text-[#3a0c0c]/80">
              4. 可选配置：interval（切换间隔）、height（轮播高度）、autoplay（是否自动播放）
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageCarouselDemoPage;