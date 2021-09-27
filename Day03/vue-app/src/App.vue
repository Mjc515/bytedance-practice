<template>
  <div id="container" >
    <div id="sidebar">
      <span @mousedown="dragStart('row')">Row</span>
      <span @mousedown="dragStart('col')">Col</span>
      <span @mousedown="dragStart('button')">Button</span>
    </div>
    <div id="editpanel" data-accept-type="row">
      <div class="row" data-accept-type="col" :data-row="i" v-for="(row, i) in rows" :key="row">
        <div class="col" data-accept-type="button" :data-col="j" v-for="(col, j) in row.cols" :key="col">
          <button v-for="btn in col.children" :key="btn">
            {{btn.content}}
          </button>
        </div>
      </div>
    </div>
  <div id="dragable" :style="{left: drag.x+'px', top:drag.y+'px'}" v-if="drag.isDragging">{{drag.type}}</div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { nextTick } from 'vue'
export default {
  name: 'App',
  data: () => ({
    drag: {
      x0: 0,
      y0: 0,
      dx: 0,
      dy: 0,
      x:10,
      y:10,
      type: "none",
      isDragging: false
    },
    rows: [
      // {
      //   type:"row",
      //   height: 100,
      //   cols:[
      //     {
      //       type:"col",
      //       width: 100,
      //       children:[
      //         {
      //           type:"button",
      //           content: "按钮"
      //         },
      //         {
      //           type:"button",
      //           content: "按钮"
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  }),
  components: {
  },
  methods: {
    dragStart(type) {
      this.drag.type = type
      this.drag.isDragging = true
       const move = e => {
         this.drag.x = e.clientX
         this.drag.y = e.clientY
      }
      const up = async e => {
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
        this.drag.isDragging = false
        await nextTick()
        // 必须等到 nextTick() 之后再取该点的element！！
        // 否则一直取到的是 div#dragable
        const ele = document.elementFromPoint(e.clientX, e.clientY)
        let current = ele
        while(current && current.dataset["acceptType"] !== type){
          current = current.parentElement
        }
        if(type === "row"){
          this.rows.push({cols:[]})
        }
        if(type === 'col'){
          const insertCol = {
            type:"col",
            width: 100,
            children:[]
          }
          this.rows[current.dataset["row"]].cols.push(insertCol)
        }
        if(type === 'button'){
          const insertBtn = {
            type:"button",
            content: "按钮"
          }
          const currentCols = this.rows[current.parentElement.dataset["row"]].cols
          currentCols[current.dataset["col"]].children.push(insertBtn)
        }
      }
      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    }
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #02fa0f;
  margin: 0;
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
}

#sidebar{
  height: 100%;
  width: 160px;
  background: #ededed;
}
#sidebar>*{
  width: 60px;
  height: 60px;
  display: inline-block;
  margin: 10px;
  box-sizing: border-box;
  border: 1px solid black;
  user-select: none;
}
#editpanel {
  flex: 1;
  overflow-y: scroll;
  padding: 0 10px;
}
.row {
  width: 100%;
  min-height: 300px;
  background: rgb(204, 230, 131);
  display: flex;
  padding: 20px;
  margin: 10px 0;
  box-sizing: border-box;
}
.col {
  height: 200px;
  min-width: 200px;
  background: rgb(192, 196, 255);
  margin: 10px;
}
#dragable {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 1px solid black;
}
</style>
