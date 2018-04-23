import React,{PureComponent,Children,cloneElement} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import ImageListRender from './ImageListRender'
const RViewerTriggerName=Symbol('RViewerTriggerName')
const isRViewerTrigger=(el)=>{
  return el.type&& el.type.componentName ==RViewerTriggerName;
}
/*
* 对viewerjs的react封装
* https://github.com/fengyuanchen/viewerjs
* */
function deepMap(children, callback) {//参考https://github.com/reactjs/react-tabs/blob/master/src/helpers/childrenDeepMap.js
  return Children.map(children, child => {
    if (child === null) return null;
    if (isRViewerTrigger(child)) {
      return callback(child);
    }
    if (child.props && child.props.children && typeof child.props.children === 'object') {
      return cloneElement(child, {
        ...child.props,
        children: deepMap(child.props.children, callback),
      });
    }
    return child;
  });
}


class  RViewerTrigger extends PureComponent{
  static propTypes = {
    children:  PropTypes.element.isRequired
  }
  render(){
    return null;
  }
}
RViewerTrigger.componentName=RViewerTriggerName

class RViewer extends PureComponent {
  static propTypes = {
    imageUrls:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      index:0//默认显示第0个元素
    }
  }

  show = (index=0) => {
    this.setState({
      isShow: true,
      index:index
    })
  }
  hide = () => {
    this.setState({
      isShow: false
    })
  }
  render() {
    const {children,imageUrls,options} = this.props
    let resultUrls =(typeof imageUrls === 'string') ? [imageUrls] : imageUrls
    // React v16.2.0颁布版本才能使用React.Fragment，如果没有的话，就用div包裹
    let Fragment=React.Fragment?React.Fragment:'div'
    return (
      <Fragment>
        {
          this.state.isShow ? <ImageListRender imageUrls={resultUrls} index={this.state.index} options={options} hide={this.hide}/> : null
        }
        {
          deepMap(children, child => {
            let props={
              onClick:()=>{
                let {index}=child.props;
                this.show(index);
              }
            };
            return cloneElement(child.props.children, props);
          })
        }
      </Fragment>
    )
  }
}
export{
  RViewerTrigger,
  RViewer
}
