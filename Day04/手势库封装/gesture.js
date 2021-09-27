/**
 * - 移动端常用事件
  - start、move、end //兼容touch和move
  - panstart、pan、panend
      panstart 开始滑屏, 第一次滑动
  - pressstart、pressend、presscancel
  - tap
 */
function enableGesture(ele) {
  let contexts = {}
  const MOUSE_TYPE = Symbol("mouse")
  if(!("ontouchstart" in document)){
     // PC端  mouse
     ele.addEventListener("mousedown", (event) => {
      contexts[MOUSE_TYPE] = {}
      onStart(event, contexts[MOUSE_TYPE])
      let move = (event) => {
          onMove(event, contexts[MOUSE_TYPE]);
      };
      let end = (event) => {
          onEnd(event, contexts[MOUSE_TYPE]);
          document.removeEventListener("mousemove", move);
      }
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", end, { once: true });
  });
  }
  ele.addEventListener("touchstart", e => {
    for(let touch of e.changedTouches) {
      contexts[touch.identifier] = {}
      onStart(touch, contexts[touch.identifier])
    }
  })
  ele.addEventListener("touchmove", e => {
    for(let touch of e.changedTouches) {
      onMove(touch, contexts[touch.identifier])
    }
  })
  ele.addEventListener("touchend", e => {
    for(let touch of e.changedTouches) {
      onEnd(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  })
  let onStart = (e, context) => {
    ele.dispatchEvent(Object.assign(new CustomEvent("start"), {
      clientX: e.clientX,
      clientY: e.clientY
    }))
    context.startX = e.clientX
    context.startY = e.clientY
    context.isTap = true
    clearTimeout(context.timeout)
    context.timeout = setTimeout(() => {
      context.isTap = false
      context.isPress = true
      ele.dispatchEvent(Object.assign(new CustomEvent("pressstart"), {
        clientX: e.clientX,
        clientY: e.clientY
      }))
    },500)
  }
  let onMove = (e, context) => {
    ele.dispatchEvent(Object.assign(new CustomEvent("move"), {
      clientX: e.clientX,
      clientY: e.clientY
    }))
    let dx = e.clientX - context.startX
    let dy = e.clientY - context.startY
    // 滑动距离超过 10 px
    if(dx ** 2 + dy ** 2 > 100 && (!context.isPan)){
      context.isPan = true
      if(context.isPress){
        ele.dispatchEvent(Object.assign(new CustomEvent("presscancel"), {
          clientX: e.clientX,
          clientY: e.clientY
        }))
      }
      clearTimeout(context.timeout)
      context.isTap = false
      context.isPress = false
      // 触发 panstart 事件  开始滑动
      ele.dispatchEvent(Object.assign(new CustomEvent("panstart"), {
        clientX: e.clientX,
        clientY: e.clientY,
        startX: context.startX,
        startY: context.startY
      }))
      return
    }
    if(context.isPan){
      // 触发 pan 事件   滑动中
      ele.dispatchEvent(Object.assign(new CustomEvent("pan"), {
        clientX: e.clientX,
        clientY: e.clientY,
        startX: context.startX,
        startY: context.startY
      }))
    }
    
  }
  let onEnd = (e,context) => {
    clearTimeout(context.timeout)
    if(context.isPan){
      // 触发 panend 事件  滑屏结束
      ele.dispatchEvent(Object.assign(new CustomEvent("panend"), {
        clientX: e.clientX,
        clientY: e.clientY,
        startX: context.startX,
        startY: context.startY
      }))
      context.isPan = false
    }
    if(context.isTap){
      ele.dispatchEvent(Object.assign(new CustomEvent("tap"), {
        clientX: e.clientX,
        clientY: e.clientY
      }))
      context.isPress = false
    }
    if(context.isPress){
      ele.dispatchEvent(Object.assign(new CustomEvent("pressend"), {
        clientX: e.clientX,
        clientY: e.clientY
      }))
      context.isTap = false
    }
    ele.dispatchEvent(Object.assign(new CustomEvent("end"), {
      clientX: e.clientX,
      clientY: e.clientY
    }))
  }
}