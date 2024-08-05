'use client';

import { useEffect, useState, useCallback } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { useSearchParams, usePathname } from 'next/navigation';

const DisqusComments = ({ post }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const getUrl = useCallback(() => {
    return `https://val-db.vercel.app${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  }, [pathname, searchParams]);
  
  const [disqusConfig, setDisqusConfig] = useState(null);
  useEffect(() => {
    setDisqusConfig({
      url: getUrl(),
      identifier: searchParams.get('id'),
      title: post.title,
      language: 'id',
    });
  }, [getUrl, post.title, searchParams]);

  const disqusShortname = "val-db";

  if (!disqusConfig) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className='p-3'>
      <CommentCount shortname={disqusShortname} config={disqusConfig} />
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;