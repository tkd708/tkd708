import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import _ from 'lodash';

export interface PostCardTags {
  tags: string[];
}

export const PostCardTags: React.FC<PostCardTags> = ({ tags }) => {
  return (
    <div css={TagContainer}>
      {tags.slice(1, 6).map((tag, index) => {
        return (
          <p key={index} css={TagButton}>
            <Link to={`/tags/${_.kebabCase(tag)}`}>{tag}</Link>
          </p>
        );
      })}
    </div>
  );
};

const TagContainer = css`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const TagButton = css`
  margin-right: 10px;
`;
