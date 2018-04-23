# react-viewerjs

Image preview;React wrapper for [viewerjs](https://github.com/fengyuanchen/viewerjs)


## Install

npm i react-viewerjs

## API

### RViewer

| Property        | Description     | Type           | Default  | Required |
| --------- | ------ | ------------ | ---- | ---- |
| imageUrls | A picture or a collection of pictures for preview | string\|array | undefined    | true |
| options | preview config（[viewerjs options](https://github.com/fengyuanchen/viewerjs#options)） | object | undefined    | false |

### RViewerTrigger

Has has only one child element, which is used to trigger the picture preview

| Property        | Description     | Type           | Default  | Required |
| --------- | ------ | ------------ | ---- | ---- |
| index | In the picture collection, select the index image for preview | number | undefined    | no |

### Demo

- #### base
````jsx
import React from "react"
import { RViewer, RViewerTrigger } from '../react-viewerjs'
const OneImagePreview = () => {
  let sourceUrl = "./imgs/1.jpg"
  let options={
    toolbar: {//Since there is only one picture, let's hide "prev" and "next"
      prev: false,
      next: false
    }
  }
  return (
    <RViewer options={options} imageUrls={sourceUrl}>
      <RViewerTrigger>
        <button>one image preview</button>
      </RViewerTrigger>
    </RViewer>
  )
}
const MultiImagePreview = () => {
  let sourceUrl = ["./imgs/1.jpg","./imgs/2.jpg","./imgs/3.jpg","./imgs/4.jpg","./imgs/5.jpg"]
  return (
    <RViewer imageUrls={sourceUrl}>
      <RViewerTrigger>
        <button>Multiple images preview</button>
      </RViewerTrigger>
    </RViewer>
  )
}
const BaseDemoComponent = () => {
  
  return (
    <div>
      <OneImagePreview />
      <MultiImagePreview />
    </div>
  )
};
ReactDOM.render(<BaseDemoComponent />, document.getElementById('root'));
````
https://xiabingwu.github.io/react-viewerjs/#/ 

- #### list
````jsx
import React from "react"
import { RViewer, RViewerTrigger } from '../react-viewerjs'
const ListDemoComponent = () => {
  let sourceImageUrls = [
    "./imgs/1.jpg",
    "./imgs/2.jpg",
    "./imgs/3.jpg",
    "./imgs/4.jpg",
    "./imgs/5.jpg"
  ]
  let thumbImageUrls = sourceImageUrls//In reality, the thumbnail and the original may not be the same, which are set to be equal, just for the sake of a simple demonstration
  return (
    <RViewer imageUrls={sourceImageUrls}>
      <ul>
        {thumbImageUrls.map((pic, index) => {
          return (
            <li  key={index} style={{marginBottom:"20PX"}}>
              <span>image {index+1}</span>
              {/*By default, the index value is 0,So it is necessary to set the index prop*/}
              <RViewerTrigger index={index}>
                <img src={pic} style={{width:"50px",verticalAlign:"middle"}}  />
              </RViewerTrigger>
            </li>
          )
        })
        }
      </ul>
    </RViewer>
  )
};
ReactDOM.render(<ListDemoComponent />, document.getElementById('root'));
````
https://xiabingwu.github.io/react-viewerjs/#/list
