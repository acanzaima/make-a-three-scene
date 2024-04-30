<p align="center">
	<img alt="logo" style="width: 32px;" src="https://oscimg.oschina.net/oscnet/up-f7fc4886c1f221511f714569fb07105ad5c.png">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">make-a-three-scene</h1>
<h4 align="center">可直接复用的 three.js 场景收藏夹</h4>
<p align="center">
	<a href="https://gitee.com/space-earth/make-a-three-scene/stargazers"><img src="https://gitee.com/space-earth/make-a-three-scene/badge/star.svg?theme=dark"></a>
	<a href="https://gitee.com/space-earth/make-a-three-scene/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"></a>
</p>

## 项目简介
`make-a-three-scene`是一个主要使用three.js创建的简单业务场景收藏夹，便于相同或类似业务场景下的效果快速复用。

* 所有场景均放置在`src/scenes`下，每个文件夹代表一个场景，你可以通过脚本命令 `yarn make:tpl 场景名称` 快速创建一个空场景模板(场景名仅限小写英文字母，数字和-的组合)
* 当你的场景添加完成后，你可以通过脚本命令 `yarn make:menu`生成场景菜单，同时你将在`/scene`路由页面看到你添加的场景
* 在线预览地址：<a href="https://space-earth.gitee.io/make-a-three-scene" target="_blank">点我查看</a>

## 其他说明

* 以场景`example`为例，执行`yarn make:tpl example`脚本命令后， `src/scenes/example`文件夹下包含`desc.json, scene.png, ScenePage.vue`三个文件, 你需要修改`desc.json`中每个字段的值为你想呈现的内容，其次你需要替换`scene.png`内容，这两项改动将用于`example`场景的缩略样式、提示信息等，最后你可以编辑`ScenePage.vue`文件来完成你的`example`场景效果（所有example场景需要使用的资源应当在`src/scenes/example`文件夹下管理）
* 通过脚本创建的空场景模板`ScenePage.vue`文件示例中，通过具名插槽提供了`theme`值（`light/dark`），你可以使用提供的值管理你的场景在浅色/深色主题下的样式；此外通过`props`接收`foldChange`值，可以在菜单栏折叠/展开时更新你的场景效果(如复位，重置相机等)
* 场景的最终实现可以是`.js/.ts`的文件形式，但应当至少满足便捷应用、便捷运行和便捷销毁三个特点，针对便捷应用这一特点，建议使用类或构造函数的形式实现
* `src/utils/resource-tracker.ts`提供了一个资源跟踪类，方便在运行时跟踪场景资源，并在销毁场景时便捷销毁此前跟踪的资源

## 备注
![输入图片说明](src/assets/images/%E5%9C%BA%E6%99%AF%E6%93%8D%E4%BD%9C.png)

上图为场景右上角的操作按钮，目前设想功能分别为作者/场景说明Popover, 另外一个为场景的场景图树结构可视化效果，目前暂未实现。
