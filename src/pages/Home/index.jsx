import { Component } from "react";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { loadPosts } from "../../utils/load-posts";

import './styles.css';

export class Home extends Component {
  state = {
      posts: [],
      allPosts: [],
      page: 0,
      perPage: 10
  };
    
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, perPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page , perPage),
      allPosts: postsAndPhotos,
      });
  }


  
  loadMorePosts = () => {
      const { 
        page, 
        perPage, 
        allPosts, 
        posts
      } = this.state;
      const nextPage = page + perPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + perPage);
      
      posts.push(...nextPosts);
      this.setState({ posts, page: nextPage });
    }

    render() {
      const { posts, page, postsPerPage, allPosts } = this.state;
      const hasMorePosts = !(page + postsPerPage >= allPosts.length);

      return (
        <section className="container">
          <Posts posts={posts} />
          <div className="button-container">
            <Button onClick={this.loadMorePosts} text="Load more" disable={hasMorePosts}/>
          </div>
        </section>
      );
    }
}