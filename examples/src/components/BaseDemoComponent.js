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
export default BaseDemoComponent