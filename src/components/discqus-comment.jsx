'use client';

import { useEffect, useState } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { useSearchParams } from 'next/navigation';

const DisqusComments = ({ post }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const disqusShortname = "val-db";
  const disqusConfig = {
    url,
    identifier: id,
    title: post.title,
    language: 'id',
  };

  return (
    <div className='p-3'>
      {url && (
        <>
          <CommentCount shortname={disqusShortname} config={disqusConfig} />
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </>
      )}
    </div>
  );
};

export default DisqusComments;
