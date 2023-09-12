import { Component } from "react";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from '../../components/TextInput';
import { loadPosts } from "../../utils/load-posts";

import './styles.css';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    perPage: 10,
    searchValue: ''
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

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, perPage, allPosts, searchValue } = this.state;
    const hasMorePosts = page + perPage >= allPosts.length;
    const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

    return (
      <section className="container">
        <div class="search-container">
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p className="search-msg">Post não encontrado.</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button onClick={this.loadMorePosts} text="Load more" disabled={hasMorePosts}/>
          )}
        </div>
      </section>
    );
  }
}