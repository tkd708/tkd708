import React from 'react';
import { Link } from 'gatsby';

export interface TagButtonProps {
  tag: string;
}

export const TagButton: React.FC<TagButtonProps> = ({ tag }) => (
  <p>
    <Link to={`/tags/${tag}`}>{tag}</Link>
  </p>
);
