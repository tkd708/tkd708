import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import { Button } from '@material-ui/core';
import { css } from '@emotion/react';
import Grid from '@material-ui/core/Grid';

export interface TagListProps {
  tags: any[];
  primary: boolean;
  nowrap: boolean;
}

export const TagList: React.FC<TagListProps> = ({ tags, primary, nowrap }) => {
  return (
    <div css={TagListContainer}>
      <Grid container spacing={1} direction="row" wrap={nowrap ? 'nowrap' : 'wrap'}>
        {tags.map((tag, index) => {
          return (
            <Grid item key={index}>
              <Button variant={primary ? 'contained' : 'text'} css={Tag}>
                <Link to={`/tags/${_.kebabCase(tag.name)}`}>
                  {primary ? `${tag.name} (${tag.count})` : `#${tag.name}`}
                </Link>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const TagListContainer = css`
  //padding: 10px 20px;
  //margin: 10px 0px;
  //max-height: 150px;
  //overflow-y: auto;
`;

const Tag = css`
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
`;
