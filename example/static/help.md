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

China: :cn: Japan: :jp: US: :us:

> Wanna know which emoji is supported, visit: [joypixels](https://www.joypixels.com/emoji)

## Link

[Demo](http://demo.cuiko.top/for-editor/)

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