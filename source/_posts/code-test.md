---
title: 'code test '
date: 2018-02-24 22:12:27
tags:
  - js
  - html
  - css
categories: 
  - 受到了开发建设
---

```js
$(function() {
  // Add copy icon
  var $copyIcon = $('<i class="fa fa-clipboard" aria-hidden="true"></i>')
  var $notice = $('<div class="copy-notice"></div>')
  $('figure.highlight').prepend($copyIcon)
  $('figure.highlight').prepend($notice)
  // copy function
  function copy(text, ctx) {
    if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      try {
        document.execCommand('copy') // Security exception may be thrown by some browsers.
        $(ctx)
          .prev('.copy-notice')
          .text(GLOBAL.copy.success)
          .velocity(
            {
              translateX: -30,
              opacity: 1
            },
            {
              loop: 1,
              duration: 750,
              easing: 'easeOutQuint'
            }
          )
      } catch (ex) {
        $(ctx)
          .prev('.copy-notice')
          .text(GLOBAL.copy.error)
          .velocity(
            {
              translateX: -30,
              opacity: 1
            },
            {
              loop: 1,
              duration: 750,
              easing: 'easeOutQuint'
            }
          )
        return false
      }
    } else {
      $(ctx)
        .prev('.copy-notice')
        .text(GLOBAL.copy.noSupport)
    }
  }
  // click events
  $('.highlight .fa-clipboard').on('click', function() {
    var selection = window.getSelection()
    var range = document.createRange()
    range.selectNodeContents(
      $(this)
        .next('table')
        .find('.code pre')[0]
    )
    selection.removeAllRanges()
    selection.addRange(range)
    var text = selection.toString()
    copy(text, this)
    selection.removeAllRanges()
  })
})
```

```html
  <h1> HTML5  </h1>
```

```css
body {
  background: #fff;
}
```

```ts
function foo() {}
var x = 0
function foo() {
  console.log(x)
}
```
