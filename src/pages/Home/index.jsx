import { useCallback, useEffect, useState } from 'react';
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from '../../components/TextInput';
import { loadPosts } from "../../utils/load-posts";

import './styles.css';


export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [perPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
    
  const hasMorePosts = page + perPage >= allPosts.length;
  
  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

  const handleLoadPosts = useCallback(async (page, perPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page , perPage));
    setAllPosts(postsAndPhotos);
  }, []);
  
  const loadMorePosts = () => {
    const nextPage = page + perPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + perPage);
    
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  }

  const  handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  useEffect(() => {
    handleLoadPosts(0, perPage);
  }, [handleLoadPosts, perPage]);

  return (
    <section className="container">
      <div class="search-container">
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p className="search-msg">Post não encontrado.</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button onClick={loadMorePosts} text="Load more" disabled={hasMorePosts}/>
        )}
      </div>
    </section>
  );
}