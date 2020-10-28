# for-editor

This is a markdown editor

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

------------
------------

## Paragraph

*italic*

**bold**

***bold-italic***

~~delete line~~

++underline++

[[keyboard text]]

2^10^

x~1~

==mark==

## emoji

|emoji|	emoji代码	|commit 说明
|----|----|----|
|:art: (调色板)|	```:art:```	|改进代码结构/代码格式
|:zap: (闪电):racehorse: (赛马)|	```:zap::racehorse:```	|提升性能
|:fire: (火焰)|	```:fire:```|	移除代码或文件
|:bug: (bug)|	```:bug:```	|修复 bug
|:ambulance: (急救车)|	```:ambulance:```|	重要补丁
|:sparkles: (火花)|	```:sparkles:```	|引入新功能
|:memo: (备忘录)	|```:memo:```	|撰写文档
|:rocket: (火箭)	|```:rocket:```	|部署功能
|:lipstick: (口红)	|```:lipstick:```	|更新 UI 和样式文件
|:tada: (庆祝)	|```:tada:```	|初次提交
|:white_check_mark: (白色复选框)	|```:white_check_mark:```	|增加测试
|:bookmark: (书签)|	```:bookmark:```	|发行/版本标签
|:construction: (施工)|	```:construction:```	|工作进行中
|:hammer: (锤子)|	```:hammer:```	|重大重构
|:wrench: (扳手)	|```:wrench:```	|修改配置文件
|:globe_with_meridians: (地球)|	```:globe_with_meridians:```|	国际化与本地化
|:pencil2: (铅笔)|	```:pencil2:```|	修复 typo

> Wanna know which emoji is supported, visit: [joypixels](https://www.joypixels.com/emoji)

> Emoji short name list, [reference](https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb)

## Link

[demo page](http://demo.cuiko.top/for-editor/)

## Quote

> `for-editor` is a markdown editor

## Code

### block code

```js
function main() {
  console.log("Hello World")
}
main()
```

```go
import (
  "log"
)

func main() {
  log.Println("Hello World")
}
```

### inline code

This is a `inline code`

## Hint

::: hint info
info
:::

::: hint warning
warning
:::

::: hint danger
danger
:::

::: hint success
success
:::

## List

- item1
  - subitem1
  - subitem2
  - subitem3
- item2
- item3

---

1. item1
2. item2
3. item3

---

- [x] item1
- [ ] item2
- [x] item3

## Table

| title      | description     |
| ---------- | --------------- |
| for-editor | markdown editor |

## Tex

Maxwell's Equations

$$
\nabla \times H = J + \frac{\partial D}{\partial t} \newline
\nabla \times E = - \frac{\partial B}{\partial t} \newline
\nabla \cdot B = 0 \newline
\nabla \cdot D = \rho
$$

Mass-energy equivalence: $E = mc^2$, Schrödinger equation: $\hat H \Psi=i \hbar \frac{\partial}{\partial t}\Psi$

## Collapse

::: collapse What is GitHub?
<iframe width="100%" height="350px" src="https://www.youtube.com/embed/w3jLJU7DT5E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::