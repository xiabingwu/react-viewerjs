import React,{PureComponent,Children,cloneElement} from 'react'
import ReactDom from 'react-dom'
import Viewer from 'viewerjs'
require('viewerjs/dist/viewer.min.css')
class ImageListRender extends PureComponent {
    render() {
      const {imageUrls} = this.props;
      return (<div style={{display:'none'}} ref="imageListWrapper">
        {
          imageUrls.map((url, index) => {
            return <img src={url} key={index} style={{display: 'none'}}/>
          })
        }
      </div>)
    }
  
    componentDidMount() {
      const {index,hide,options:customOptions} = this.props;
      const {toolbar:customToolbar,hidden,...restOptions}=customOptions||{toolbar:{}}
      let options = {
        toolbar: {
          zoomIn: true,
          zoomOut: true,
          oneToOne: true,
          reset: true,
          prev: true,
          play: true,
          next: true,
          rotateLeft: true,
          rotateRight: 4,
          flipHorizontal: true,
          flipVertical: true,
          ...customToolbar
        },
        navbar: false,
        ...restOptions,
        hidden: () => {
          hidden&&hidden()
          hide()////关闭的时候通过调用父组件方法触发父组件state来卸载子组件
        }
      };
      /*因为Viewer接受的参数必须是一个图片容器或者是一个图片元素，其他元素初始化会被中断*/
      this.viewer = new Viewer(ReactDom.findDOMNode(this.refs.imageListWrapper), options);
      this.viewer.view(index);
    }
    componentWillUnmount() {
      this.viewer.destroy();
    }
  }
  export default ImageListRender