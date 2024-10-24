import React from 'react';
import { postsData } from './data';
import { cn } from '../../utils';
import Post from './Post';



const PostContainer = (props) => {
    const { postsView } = props;
    return (
        <div className="mt-4 h-full w-full ">
            <div
                className={cn(
                    'grid gap-2',
                    postsView === 'gridView' ? 'grid-cols-2' : 'grid-cols-1',
                )}
            >
                {postsData.length ? (
                    postsData.map((post, idx) => <Post key={idx} post={post} />)
                ) : (
                    <p>No posts yet!</p>
                )}
            </div>
        </div>
    );
};

export default PostContainer;