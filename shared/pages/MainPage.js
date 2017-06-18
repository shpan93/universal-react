import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Post = gql`
query Post($url: String!) {
  Post(url: $url) {
    id
    isPublished
    headline
    url
    blocks {
      id
      body
      image {
        id
        url
      }
    }
  }
}

`;

class MainPage extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

  renderBlock(block){
    console.log(block);
    return (
      <div className="post" key={block.id}>

        <div dangerouslySetInnerHTML={{__html: block.body}}></div>
        {block.image && block.image.url &&
        <img src={block.image.url} alt=""/>}
      </div>
    );
  }

  renderBlocks(){
    if(this.props.data && this.props.data.Post && this.props.data.Post.blocks){
      return this.props.data.Post.blocks.map(this.renderBlock);
    }

    return null
  }

  renderPageData(){
    if(this.props.data.Post){
      const post = this.props.data.Post;
      return (
        <div>
          <h3>{post.headline}</h3>
          <p>{post.url}</p>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div id="all-posts">
        {this.renderPageData()}
        {this.renderBlocks()}
      </div>
    );
  }
}

export default graphql(Post, {
  options: (ownProps) => {
    return {
      variables: {
        url: ownProps.params.post,
      },
    };
  }
})(MainPage);
