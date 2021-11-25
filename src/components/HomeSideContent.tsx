import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import { css } from '@emotion/react';
import { TagList } from './TagList';
import { Timeline } from 'react-twitter-widgets';

export interface HomwSideContentProps {
  categories: any[]; // {name, count}
  tags: any[]; // {name, count}
}

export const HomeSideContent: React.FC<HomwSideContentProps> = ({ categories, tags }) => {
  return (
    <div css={HomeSideContentContainer}>
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'NaoyaTakedaAU',
        }}
        options={{
          height: '500',
          width: '250',
        }}
      />
      <p style={{ margin: '24px 0px', fontSize: '24px' }}>Categories</p>
      <TagList tags={categories} primary direction="column" nowrap={false} />
      <p style={{ margin: '24px 0px', fontSize: '24px' }}>Tags</p>
      <TagList tags={tags} primary={false} direction="column" nowrap={false} />
    </div>
  );
};

const HomeSideContentContainer = css`
  padding: 54px 18px;
  overflow-y: auto;
  overflow-x: 'auto',
  width: 25%;

  @media (max-width: 750px) {
    display: none;
  }
`;
