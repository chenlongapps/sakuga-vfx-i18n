# 轻提示

[English](README.md) · **简体中文** · [日本語](README.ja.md)

一条通知从左方拖着残影飞入，身后带速度线，在尘雾中以点状拟声字「ズザッ」落定，晃动片刻后缩小消失。

## 运行

```sh
python3 -m http.server 8000     # 在仓库目录中运行
# 打开 http://localhost:8000/toast/
```

## 使用

```html
<script src="toast.js"></script>
<sakuga-toast style="position: fixed; left: 24px; bottom: 24px"></sakuga-toast>
```

```js
el.show('保存成功！');
el.hide();
el.open;    // 显示期间为 true
```

| 属性 | 作用 | 默认值 |
|---|---|---|
| `duration` | 停留秒数 | 2.6 |
| `message` | `show()` 未传消息时显示的文字 | 保存成功！ |
| `dismiss-label` | ✕ 按钮的无障碍名称 | 关闭通知 |

- **把元素放在通知应该出现的位置。** 它的尺寸是 236 × 56 像素，隐藏时仍保留这块空间；请自行定位，通常固定在角落。
- **消息位于 `role="status"` 区域，** 屏幕阅读器会朗读。✕ 是真正的按钮。
- **一次只显示一条。** 再次调用 `show()` 会替换消息并重新播放入场动画。

## 限制

- **没有队列**，不支持多条通知堆叠，也没有错误、警告等类型。图标始终是对勾。
- **仅一行。** 过长的消息会被省略号截断。